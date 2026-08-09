import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/methodology")({
  beforeLoad: () => {
    throw redirect({ to: "/criteria" });
  },
});
