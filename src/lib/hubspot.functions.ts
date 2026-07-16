import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

export const submitHubSpotLead = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        submittedAt: z.number().optional(),
        fields: z
          .array(
            z.object({
              name: z.string().min(1).max(200),
              value: z.string().max(5000),
            }),
          )
          .min(1),
        context: z
          .object({
            hutk: z.string().max(200).optional(),
            pageUri: z.string().url().optional(),
            pageName: z.string().max(300).optional(),
            referrer: z.string().max(1000).optional(),
          })
          .optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const portalId = "24057088";
    const formId = "e11dcc5d-8be4-4fe7-86ff-10f733956165";
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    // HubSpot returns 400 if any field name isn't defined on the form.
    // Allowlist the fields the embed actually configures; drop the rest
    // (e.g. hidden helper inputs like "brand" scraped from the DOM).
    const ALLOWED_FIELDS = new Set([
      "firstname",
      "lastname",
      "email",
      "company",
      "entry_story",
    ]);
    const filteredFields = data.fields.filter((f) => ALLOWED_FIELDS.has(f.name));


    // Pull the real end-user IP and User-Agent from the incoming request so
    // HubSpot's spam scoring sees a real browser, not a datacenter blank.
    // Missing IP + missing hutk is the #1 reason server-side submissions get
    // flagged as spam even when the payload looks clean.
    let ipAddress: string | undefined;
    let userAgent: string | undefined;
    try {
      const req = getRequest();
      if (req) {
        const headers = req.headers;
        const forwarded = headers.get("x-forwarded-for");
        ipAddress =
          forwarded?.split(",")[0]?.trim() ||
          headers.get("cf-connecting-ip") ||
          headers.get("x-real-ip") ||
          undefined;
        userAgent = headers.get("user-agent") ?? undefined;
      }
    } catch {
      // getWebRequest is unavailable outside a request scope; ignore.
    }

    const context: Record<string, string> = {
      pageUri: data.context?.pageUri ?? "https://www.entrepreneurawards.co/",
      pageName: data.context?.pageName ?? "The Entrepreneur Awards",
    };
    if (data.context?.hutk) context.hutk = data.context.hutk;
    if (data.context?.referrer) context.referrer = data.context.referrer;
    if (ipAddress) context.ipAddress = ipAddress;

    const requestBody: {
      submittedAt?: number;
      fields: typeof filteredFields;
      context: typeof context;
    } = {
      fields: filteredFields,
      context,
    };

    // Do not forward the browser-provided timestamp. Preview/test clocks can be
    // ahead of HubSpot's clock, which makes HubSpot reject the whole request as
    // INVALID_TIMESTAMP. Omitting submittedAt lets HubSpot timestamp receipt.
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(userAgent ? { "User-Agent": userAgent } : {}),
      },
      body: JSON.stringify(requestBody),
    });

    const body = await response.text();

    if (!response.ok) {
      console.error(`HubSpot Forms API submission failed [${response.status}]: ${body}`);
      return { ok: false, status: response.status };
    }

    return { ok: true, data: body ? JSON.parse(body) : null };
  });
