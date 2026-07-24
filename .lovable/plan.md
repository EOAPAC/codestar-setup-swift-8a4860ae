Yes. Lovable Payments can connect to HubSpot through the HubSpot standard connector + a small server-side sync after a payment succeeds. This replaces the GRA-branded HubSpot payment iframe with a native, branded checkout and keeps your HubSpot workflows healthy by creating deals for paid entries.

## What we will build

1. **Choose and enable Lovable Payments provider**
   - Run `recommend_payment_provider` to determine Stripe vs Paddle for a one-time entry fee.
   - Enable the recommended provider (Stripe or Paddle Payments). A test environment is created immediately.

2. **Connect HubSpot to the project**
   - Use the HubSpot standard connector (`connector_id: hubspot`) to link your HubSpot account.
   - This gives the project a server-side gateway connection to create contacts and deals.

3. **Create a payment product for the entry fee**
   - Create one product/price in the chosen provider for the entry fee.
   - Keep the amount as an editable constant in the code.

4. **Replace the HubSpot payment iframe on `/complete`**
   - Remove the current `payments-iframe-container` HubSpot embed.
   - Build a branded Lovable Payments checkout button: clicking it calls a server function to create a checkout session and redirects the user to Stripe/Paddle checkout.
   - After success, redirect to `/thank-you`.

5. **Sync payment data back to HubSpot**
   - After successful payment, call a server function that uses the HubSpot connector to:
     - Find or create the contact (by email from the submitted entry form).
     - Create a deal associated with that contact, set to the stage you need for your workflow.
   - Store the payment/entry record in Lovable Cloud so the sync is reliable and idempotent.

6. **Database layer (Lovable Cloud)**
   - Add an `entries` table with: id, email, first_name, last_name, company, form_data, payment_status, payment_provider_id, deal_id, created_at.
   - Grant appropriate permissions and enable RLS.

7. **Wire it together end-to-end**
   - Entry form submission on `/` writes to HubSpot form (as today) and also records the entry in Lovable Cloud.
   - Redirect to `/complete` with a payment button for that entry.
   - After payment, write payment status and create HubSpot deal.

## Deliverables
- `/complete` becomes a branded entry-fee payment page.
- `/thank-you` remains the confirmation page.
- HubSpot receives a new deal for every paid entry, keeping existing workflows intact.
- No HubSpot payment iframe or GRA branding remains.

## Open decision
What is the entry fee amount for the new product? Once you confirm, we can create the product and build the checkout.