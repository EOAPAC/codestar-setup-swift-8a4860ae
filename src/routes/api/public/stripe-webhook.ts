import { createFileRoute } from "@tanstack/react-router";
import {
  appendLine, classifyPurchase, classifyRefund, extraLine, hasRefundLine, refundLine, splitName, verifyStripeSignature,
} from "@/lib/stripe-webhook.server";

const HS = "https://api.hubapi.com";
type Props = Record<string, string | number>;

class HubSpotError extends Error {}

async function hs(key: string, method: string, path: string, body?: unknown) {
  return fetch(`${HS}${path}`, {
    method,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

async function readContact(key: string, email: string) {
  const res = await hs(key, "GET", `/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=ea_extras_purchased,ea_refunds`);
  if (res.status === 404) return null;
  if (!res.ok) throw new HubSpotError(`read ${res.status}`);
  const json = (await res.json()) as { properties?: Record<string, string | null> };
  return json.properties ?? {};
}

async function updateContact(key: string, email: string, properties: Props) {
  const res = await hs(key, "PATCH", `/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`, { properties });
  if (!res.ok) throw new HubSpotError(`update ${res.status}`);
}

async function createContact(key: string, properties: Props) {
  const res = await hs(key, "POST", `/crm/v3/objects/contacts`, { properties });
  if (!res.ok) throw new HubSpotError(`create ${res.status}`);
}

const methodNotAllowed = () => new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });

export const Route = createFileRoute("/api/public/stripe-webhook")({
  server: {
    handlers: {
      GET: methodNotAllowed, PUT: methodNotAllowed, PATCH: methodNotAllowed, DELETE: methodNotAllowed,
      POST: async ({ request }) => {
        const secret = process.env["STRIPE_WEBHOOK_SECRET"] ?? "";
        const key = process.env["HUBSPOT_SERVICE_KEY"] ?? "";
        const raw = await request.text();
        if (!(await verifyStripeSignature(raw, request.headers.get("stripe-signature"), secret))) {
          return new Response("Invalid signature", { status: 400 });
        }
        let event: { id: string; type: string; created: number; data: { object: any } };
        try { event = JSON.parse(raw); } catch { return new Response("Invalid payload", { status: 400 }); }
        const log = (msg: string) => console.log(`[stripe-webhook] ${event.id} ${event.type}: ${msg}`);
        const obj = event.data?.object ?? {};

        try {
          if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
            if (obj.payment_status !== "paid") { log("not paid yet, skipped"); return new Response("ok"); }
            const cents = Number(obj.amount_total ?? 0);
            const purchase = classifyPurchase(obj.payment_link, cents);
            if (!purchase) { log("unrelated payment link, ignored"); return new Response("ok"); }
            const email = String(obj.customer_details?.email ?? "").trim().toLowerCase();
            if (!email) { log("no email, skipped"); return new Response("ok"); }
            if (!key) throw new HubSpotError("missing key");

            const existing = await readContact(key, email);
            let props: Props;
            if (purchase.kind === "entry") {
              props = { ea_payment_status: "Paid", ea_amount_paid: cents / 100 };
            } else {
              const current = existing?.["ea_extras_purchased"] ?? "";
              props = { ea_upsell_status: "Paid" };
              if (!current.includes(obj.id)) props["ea_extras_purchased"] = appendLine(current, extraLine(event.created, purchase.label, cents, obj.id));
            }
            if (existing) { await updateContact(key, email, props); log(`updated contact (${purchase.kind})`); }
            else { await createContact(key, { email, ...splitName(obj.customer_details?.name), ...props }); log(`created contact (${purchase.kind})`); }
            return new Response("ok");
          }

          if (event.type === "charge.refunded") {
            const email = String(obj.billing_details?.email || obj.receipt_email || "").trim().toLowerCase();
            if (!email) { log("no email on refund, skipped"); return new Response("ok"); }
            if (!key) throw new HubSpotError("missing key");
            const amount = Number(obj.amount ?? 0), refunded = Number(obj.amount_refunded ?? 0);
            const kind = classifyRefund(amount);
            const existing = await readContact(key, email);
            if (!existing) { log("refund for unknown contact, skipped"); return new Response("ok"); }
            const props: Props = {};
            if (obj.refunded === true && kind === "entry") props["ea_payment_status"] = "Refunded";
            if (obj.refunded === true && kind === "extra") props["ea_upsell_status"] = "Refunded";
            const current = existing["ea_refunds"] ?? "";
            if (!hasRefundLine(current, refunded, obj.id)) props["ea_refunds"] = appendLine(current, refundLine(event.created, refunded, amount, kind, obj.refunded === true, obj.id));
            if (Object.keys(props).length) await updateContact(key, email, props);
            log(`refund recorded (${kind})`);
            return new Response("ok");
          }

          log("ignored");
          return new Response("ok");
        } catch (err) {
          log(`HubSpot failed: ${err instanceof HubSpotError ? err.message : "error"}`);
          return new Response("HubSpot update failed", { status: 500 });
        }
      },
    },
  },
});
