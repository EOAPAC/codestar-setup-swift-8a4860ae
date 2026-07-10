## Goal

Prove — with actual evidence, not assumptions — why HubSpot form submissions from `entrepreneurawards.co` aren't visible in the HubSpot portal, and identify the specific fix.

## Important context from prior work

- Form is a HubSpot embed (portal `20118879`, form `f992b0bc-4a99-4024-aa02-fae7270920e6`) but the actual submission was moved to a server function (`src/lib/hubspot.functions.ts`) that POSTs to `api.hsforms.com/submissions/v3/integration/submit/...` from the server, forwarding real client IP, User-Agent, hutk, pageUri, and referrer. The native HubSpot iframe submit is intercepted by a custom `submit` listener in `src/routes/index.tsx` that runs the server function and then navigates to `/thank-you`.
- Earlier a real test submission from Playwright landed in the portal as a normal contact; a later "sample data" test was flagged as spam. So "no submissions arriving" is likely "submissions arriving but hidden in spam contacts / filtered from views."

The audit below tests all of that, plus everything in Claude's prompt.

## Audit steps

### 1. End-to-end submission path (live, with Playwright)

- Open the published site (`https://www.entrepreneurawards.co/` if reachable; otherwise the Lovable preview) headless, viewport 1280×1800.
- Confirm `//js-na1.hs-scripts.com/20118879.js` loads and `hbspt.forms.create` renders the real HubSpot iframe form (not a static clone).
- Fill the form with a unique controlled lead: `lovable.debug.<timestamp>@gmail.com`, real-looking name/company/story.
- Capture every outbound network request during submit. Report exact URL, HTTP method, status, request body, and response body for:
  - our server function call (`/_serverFn/...`)
  - the resulting `api.hsforms.com/submissions/v3/integration/submit/20118879/f992b0bc-...` call (from server logs, since the browser doesn't see it)
  - any residual `forms.hsforms.com` / `js.hsforms.net` calls fired by the embed itself
- Screenshot the final state and record whether we land on `/thank-you`.

### 2. Payload + field-name verification

- From the captured server-function request body, list every `fields[].name` being sent and its value.
- Fetch the HubSpot form definition via `api.hsforms.com/forms/v2/forms/{formId}` (public metadata endpoint) and cross-check that each `name` we send exists on the form. Flag any mismatch — one unrecognized field name is enough to make HubSpot reject or partially drop the submission.
- Confirm portal ID and form GUID in the server function match the ones in the embed.
- Confirm `hutk` and `pageUri` are populated (missing hutk is a major spam signal).

### 3. Server logs

- Pull `stack_modern--server-function-logs` filtered for `hubspot` / `HubSpot` around the test submission to see the raw HubSpot response body — including any `errors[]` array, `inlineMessage`, or spam classification hints.

### 4. Domain authorization (the suspected cause)

- Check whether `entrepreneurawards.co` is a **connected/tracked domain** in the HubSpot portal that hosts the form. The form was originally set up under `globalrecognitionawards.org`; HubSpot's Forms API does not require the domain to be pre-registered to accept submissions, but the tracking cookie (`hubspotutk`) is set per-domain, so on the new domain most submissions arrive with **no hutk**, which is the #1 driver of the "spam contact" classification. Report exactly what needs to be added in HubSpot → Settings → Website → Domains & URLs → Tracked Domains.
- Report any CORS / CSP violations from the console related to `hsforms`, `hubspot`, `hs-scripts`, `hs-analytics`, `hs-banner`.

### 5. Client-side interference

- Check if any cookie-consent / privacy banner is gating `hs-scripts.com` (would block hutk from ever being set → spam flag).
- Verify our custom `submit` handler in `src/routes/index.tsx` calls `preventDefault()` and does **not** race the native HubSpot iframe submit (double submission or dropped submission).
- Check `/thank-you` redirect timing — confirm we `await` the server-fn result before navigating (so a failing submission wouldn't be masked by an early redirect).

### 6. Where the submissions actually are in HubSpot (walkthrough)

Regardless of the technical result, give you the exact clicks to check:
- Contacts → Contacts → filter view → **"All contacts"** vs default "My contacts"
- Contacts → Contacts → **Actions → View spam contacts**
- Marketing → Forms → your form → **Submissions tab** (shows all submissions including spam-flagged, unlike Contacts)
- Automation → Workflows → the workflow you showed earlier → History → check enrollment log for the test email

### 7. Findings report

For each of the six sections: **what was tested → what was observed (with exact status codes / field names / error strings) → pass or likely cause**. If a root cause is identified, name the specific fix and whether it lives in Lovable code or in HubSpot settings.

## Deliverables

- A written findings report in the chat (no assumption-based "the embed is wired correctly").
- One controlled test lead submitted with a unique `lovable.debug.<timestamp>@gmail.com` email so you can search for it in HubSpot.
- Only after findings: code changes, if any are needed. No speculative edits before evidence.
