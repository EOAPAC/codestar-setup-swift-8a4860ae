import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/salespage")({
  beforeLoad: () => {
    throw redirect({ to: "/your-award", statusCode: 301 });
  },
});
