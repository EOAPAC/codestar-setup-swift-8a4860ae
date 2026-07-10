import { createServerFn } from "@tanstack/react-start";
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

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        submittedAt: data.submittedAt ?? Date.now(),
        fields: data.fields,
        context: {
          ...(data.context?.hutk ? { hutk: data.context.hutk } : {}),
          pageUri: data.context?.pageUri ?? "https://www.entrepreneurawards.co/",
          pageName: data.context?.pageName ?? "The Entrepreneur Awards",
          ...(data.context?.referrer ? { referrer: data.context.referrer } : {}),
        },
      }),
    });

    const body = await response.text();

    if (!response.ok) {
      console.error(`HubSpot Forms API submission failed [${response.status}]: ${body}`);
      throw new Error(`HubSpot submission failed [${response.status}]`);
    }

    return body ? JSON.parse(body) : { ok: true };
  });