import { createFileRoute } from "@tanstack/react-router";
import TermsAndConditions from "@/pages/TermsAndConditions";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Entrepreneur Awards" },
      {
        name: "description",
        content:
          "The terms governing entry, winner packages and badge licensing for the Entrepreneur Awards.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Terms and Conditions | Entrepreneur Awards" },
      {
        property: "og:description",
        content:
          "The terms governing entry, winner packages and badge licensing for the Entrepreneur Awards.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://entrepreneurawards.co/terms-and-conditions",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://entrepreneurawards.co/terms-and-conditions",
      },
    ],
  }),
  component: TermsAndConditions,
});
