import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/awards")({
  beforeLoad: () => { throw redirect({ to: "/categories", statusCode: 301 }); },
});
