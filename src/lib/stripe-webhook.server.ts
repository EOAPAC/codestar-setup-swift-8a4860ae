// Pure Stripe -> HubSpot mapping and signature check for the payment webhook.
// Runs on Web Crypto so it works on the Worker runtime.

export const ENTRY_LINKS: Record<string, number> = {
  plink_1UfNo8Gd5RmL1wBxDgpB41z7: 1,
  plink_1UfNpLGd5RmL1wBxLo3kdCx4: 2,
  plink_1UfNqGGd5RmL1wBxZZysa5ZC: 3,
  plink_1UfNrAGd5RmL1wBxxvLjMKVq: 4,
  plink_1UfNs3Gd5RmL1wBxYQgAq1uY: 5,
  plink_1UfNsyGd5RmL1wBx3IlN6U1z: 6,
  plink_1TxtSxGd5RmL1wBxpCrIxptD: 1,
};
export const FEATURE_LINK = "plink_1UGm5lGd5RmL1wBxwFxBc45A";
export const PACKAGE_LINK = "plink_1UEXw0Gd5RmL1wBxdvV8FvFL";
const ENTRY_CENTS = [12990, 25980, 38970, 51960, 64950, 77940];
const EXTRA_CENTS = [99700, 119400, 19700];
const TOLERANCE_S = 300;

const hex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyStripeSignature(raw: string, header: string | null, secret: string, nowS = Math.floor(Date.now() / 1000)) {
  if (!header || !secret) return false;
  const parts = header.split(",").map((p) => p.trim().split("="));
  const t = parts.find(([k]) => k === "t")?.[1];
  const sigs = parts.filter(([k]) => k === "v1").map(([, v]) => v ?? "");
  if (!t || !sigs.length || !/^\d+$/.test(t)) return false;
  if (Math.abs(nowS - Number(t)) > TOLERANCE_S) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const expected = hex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${t}.${raw}`)));
  return sigs.some((s) => safeEqual(s, expected));
}

export type Purchase =
  | { kind: "entry"; categories: number }
  | { kind: "extra"; label: "Winner's Feature" | "Winner's Feature + Award Package" | "Award Package" };

export function classifyPurchase(link: string | null | undefined, amountCents: number): Purchase | null {
  if (!link) return null;
  const n = ENTRY_LINKS[link];
  if (n) return { kind: "entry", categories: n };
  if (link === FEATURE_LINK) return { kind: "extra", label: amountCents >= 119400 ? "Winner's Feature + Award Package" : "Winner's Feature" };
  if (link === PACKAGE_LINK) return { kind: "extra", label: "Award Package" };
  return null;
}

export function classifyRefund(amountCents: number): "entry" | "extra" | "unknown" {
  if (ENTRY_CENTS.includes(amountCents)) return "entry";
  if (EXTRA_CENTS.includes(amountCents)) return "extra";
  return "unknown";
}

export const money = (cents: number) => {
  const v = cents / 100;
  return `US$${Number.isInteger(v) ? v.toLocaleString("en-US") : v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
export const isoDate = (unixS: number) => new Date(unixS * 1000).toISOString().slice(0, 10);

export function appendLine(existing: string | null | undefined, line: string) {
  const cur = (existing ?? "").trimEnd();
  return cur ? `${cur}\n${line}` : line;
}

export function extraLine(dateS: number, label: string, cents: number, sessionId: string) {
  return `${isoDate(dateS)}: ${label}, ${money(cents)}, ${sessionId}`;
}

export function refundLine(dateS: number, refunded: number, amount: number, kind: string, full: boolean, chargeId: string) {
  return `${isoDate(dateS)}: ${money(refunded)} refunded of ${money(amount)}, ${kind}, ${full ? "full" : "partial"}, ${chargeId}`;
}

export function hasRefundLine(existing: string | null | undefined, refunded: number, chargeId: string) {
  return (existing ?? "").split("\n").some((l) => l.includes(chargeId) && l.includes(`${money(refunded)} refunded`));
}

export function splitName(name: string | null | undefined) {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  return { firstname: parts[0] ?? "", lastname: parts.slice(1).join(" ") };
}
