
# Payment provider decision — Stripe vs HubSpot Payments

You're US-based, want a single HubSpot contact property (`consideration_fee_status`) updated on payment, and have a consideration-fee model with waivable entries. This plan compares both options against those constraints, then proposes the implementation path.

## Side-by-side

| Dimension | Stripe + HubSpot sync | HubSpot Payments (native) |
|---|---|---|
| **Availability (US)** | ✅ Global, US works | ✅ US only — you qualify |
| **Plan requirement** | Any Stripe account (free to open) | Requires **Commerce Hub** (paid HubSpot add-on / Starter+ with Payments enabled) |
| **Fees** | 2.9% + $0.30 (cards) | 2.9% + $0.30 (cards), **3.5% ACH** — HubSpot does not mark up |
| **Checkout UX** | Stripe Checkout — polished, mobile-first, Apple/Google Pay, custom branding | HubSpot payment link page — functional but plainer, less brand control |
| **Waiver / free-pass flow** | Skip Checkout entirely when `waived=true`; issue $0 session or bypass | Awkward — HubSpot payment links assume a fixed price; waivers need a separate "no payment" path anyway |
| **Metadata on payment** | Rich `metadata` object (submission ID, founder email, tier) travels with the charge | Limited — mostly tied to the contact/deal record |
| **Refunds / disputes / receipts** | Full programmatic control, Radar fraud scoring, tax, coupons | Basic; refunds via HubSpot UI |
| **HubSpot data landing** | Webhook → sets `consideration_fee_status = paid` on the contact via HubSpot API | Automatic — HubSpot writes the payment to the contact/deal timeline natively |
| **Engineering cost** | ~1 Checkout server fn + 1 webhook route (~80 LOC), reuses your existing HubSpot integration | Near-zero code, but you'd embed a HubSpot payment link and lose control of the flow |
| **Vendor lock-in** | Low — Stripe is portable | Higher — payments live inside HubSpot |
| **Best for** | You want flexibility, waivers, Checkout polish, portable data | You want zero code and already pay for Commerce Hub |

## Why I recommend Stripe for this project

1. **Waivable entries need conditional Checkout.** Your model routes standout founders to complimentary review. Stripe lets you skip Checkout or generate a $0 session cleanly. HubSpot Payments assumes a fixed link.
2. **You already have the HubSpot writeback pattern.** `src/lib/hubspot.functions.ts` already POSTs to HubSpot's Forms API. Adding a second server-side helper that PATCHes a contact property on payment is trivial and consistent.
3. **No new HubSpot plan required.** HubSpot Payments needs Commerce Hub. Stripe is free to open.
4. **Checkout is the reveal.** You want no prices on marketing pages — Stripe Checkout is the industry-standard "click, then see price" flow.
5. **Contact property > deal.** You picked the simplest sync (one property). That's a 5-line HubSpot API call from a Stripe webhook — no pipeline modeling, no deal stages.

## Proposed implementation (Stripe path)

### Data flow
```text
Submission form (free)
      │  submitHubSpotLead()  ← already exists
      ▼
HubSpot Contact created (status: submitted)
      │
      ├─ if waived by admin  →  status: waived  (no payment step)
      │
      └─ else  →  "Pay consideration fee" CTA on /thank-you
                       │
                       ▼
                Stripe Checkout Session (mode=payment)
                       │  metadata: { submissionId, email }
                       ▼
                checkout.session.completed webhook
                       │
                       ▼
             PATCH HubSpot contact: consideration_fee_status = paid
                       │
                       ▼
             Redirect to /payment-success
```

### Files to create/change
- **`src/lib/stripe.server.ts`** — server-only Stripe client (reads `STRIPE_SECRET_KEY` from `process.env` inside handlers).
- **`src/lib/checkout.functions.ts`** — `createCheckoutSession` server fn. Takes `submissionId` + email, creates a Stripe Checkout Session with metadata, returns URL. Called from `/thank-you`.
- **`src/routes/api/public/webhooks/stripe.ts`** — server route. Verifies Stripe signature (raw body + `STRIPE_WEBHOOK_SECRET`), handles `checkout.session.completed`, calls a HubSpot helper to set `consideration_fee_status = paid` on the contact matched by email.
- **`src/lib/hubspot.functions.ts`** — extend with `setContactConsiderationStatus({ email, status })` using HubSpot CRM API (`/crm/v3/objects/contacts/{id}?idProperty=email`).
- **`src/routes/thank-you.tsx`** — add a "Pay consideration fee — $X" CTA (price only visible here, not on marketing pages) that calls `createCheckoutSession` and redirects to Stripe.
- **`src/routes/payment-success.tsx`** (new) and **`src/routes/payment-canceled.tsx`** (new) — post-Checkout landing pages.

### HubSpot setup (you do)
1. In HubSpot → Settings → Properties → Contact properties, create:
   - `consideration_fee_status` — single-line text or dropdown with values: `submitted`, `paid`, `waived`, `refunded`.
2. Generate a Private App token in HubSpot with scopes: `crm.objects.contacts.read`, `crm.objects.contacts.write`.

### Secrets I'll ask for after you approve
- `STRIPE_SECRET_KEY` (test key first — `sk_test_...`)
- `STRIPE_WEBHOOK_SECRET` (from the Stripe dashboard after we deploy the webhook URL)
- `HUBSPOT_PRIVATE_APP_TOKEN`
- Stripe **Price ID** for the consideration fee (I'll create the product/price via tooling and print the ID, or you paste one you already have)

### What I will NOT do
- No prices anywhere on `/`, `/faq`, `/methodology`. Price appears only inside Stripe Checkout and (optionally) on `/thank-you` as the fee amount on the pay button.
- No design changes — reuse Button, Card, and existing layout.
- No changes to the free submission path — it keeps working exactly as it does now, and captures the lead even if the user never pays.

## If you'd rather go HubSpot Payments

Two-line summary of what that path looks like instead: I embed a HubSpot payment link on `/thank-you`, HubSpot handles the whole payment, and the payment auto-associates to the contact. No code beyond the link. Downsides: requires Commerce Hub, no waiver logic, no Apple/Google Pay branding parity, harder to migrate later.

## Recommendation

**Go with Stripe + HubSpot contact-property sync.** Approve this plan and I'll implement the files above in build mode, after you confirm you have (or will create) the Stripe account and HubSpot Private App token.
