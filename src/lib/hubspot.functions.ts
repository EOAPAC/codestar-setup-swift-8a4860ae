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
    const portalId = "20118879";
    const formId = "f992b0bc-4a99-4024-aa02-fae7270920e6";
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    // Pull the real end-user IP and User-Agent from the incoming request so
    // HubSpot's spam scoring sees a real browser, not a datacenter blank.
    // Missing IP + missing hutk is the #1 reason server-side submissions get
    // flagged as spam even when the payload looks clean.
    let ipAddress: string | undefined;
    let userAgent: string | undefined;
    try {
      const req = getWebRequest();
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

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(userAgent ? { "User-Agent": userAgent } : {}),
      },
      body: JSON.stringify({
        submittedAt: data.submittedAt ?? Date.now(),
        fields: data.fields,
        context,
      }),
    });

    const body = await response.text();

    if (!response.ok) {
      console.error(`HubSpot Forms API submission failed [${response.status}]: ${body}`);
      throw new Error(`HubSpot submission failed [${response.status}]`);
    }

    return body ? JSON.parse(body) : { ok: true };
  });
