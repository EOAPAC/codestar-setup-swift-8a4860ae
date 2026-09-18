import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/salespage")({
  loader: () => {
    throw redirect({ to: "/winner-feature", statusCode: 301 });
  },
});
