import { createFileRoute } from "@tanstack/react-router";
import { zipSync } from "fflate";

import { winnerKitFiles } from "@/content/winner-kit";

export const Route = createFileRoute("/api/public/winner-kit/zip")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;

        const entries = await Promise.all(
          winnerKitFiles.map(async (file) => {
            const res = await fetch(`${origin}${file.url}`);
            if (!res.ok) throw new Error(`Could not read ${file.filename}`);
            const buf = new Uint8Array(await res.arrayBuffer());
            return [file.filename, buf] as const;
          }),
        );

        const zipped = zipSync(Object.fromEntries(entries), { level: 0 });
        // Copy into a fresh buffer so the Response body is a plain ArrayBuffer.
        const body = new Uint8Array(zipped);

        return new Response(body, {
          headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": 'attachment; filename="entrepreneur-awards-winner-kit.zip"',
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
