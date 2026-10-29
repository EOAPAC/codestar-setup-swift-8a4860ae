import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AWARD_YEAR } from "@/content/award";
import {
  SPECIMEN_BYLINE,
  SPECIMEN_HEADLINE,
  SPECIMEN_OPENING_PARAGRAPHS,
  splitOnBusinessToken,
} from "@/content/specimen";
import markAsset from "@/assets/ea-mark.png.asset.json";

export const Route = createFileRoute("/winners/specimen")({
  head: () => ({
    meta: [
      { title: "Winner's Feature — format specimen | Entrepreneur Awards" },
      {
        name: "description",
        content:
          "A format specimen showing the length, structure and voice of an Entrepreneur Awards Winner's Feature. The business described is not a real recipient.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Winner's Feature — format specimen" },
      {
        property: "og:description",
        content:
          "A format specimen showing the length, structure and voice of an Entrepreneur Awards Winner's Feature.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SpecimenPage,
});

const INK = "#0F172A";
const TEXT = "#1a1a1a";
const MUTED = "#6B7785";
const BLUE = "#1978E5";
const LINE = "#E5E9F0";
const TINT = "#F7F9FC";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1978E5]";

/** Inline slot chip standing in for the winner's business name. */
function Slot() {
  return (
    <span
      style={{
        backgroundColor: "rgba(25,120,229,0.10)",
        borderRadius: "4px",
        padding: "0 2px",
        fontWeight: 400,
      }}
    >
      &lsaquo;Your Business&rsaquo;
    </span>
  );
}

/** Render text containing the business-name token with inline slot chips. */
function withSlot(text: string): React.ReactNode {
  const parts = splitOnBusinessToken(text);
  return parts.map((part, i) => (
    <span key={i}>
      {i > 0 ? <Slot /> : null}
      {part}
    </span>
  ));
}

type Block =
  | { kind: "p"; text: React.ReactNode }
  | { kind: "h"; text: string };

const article: Block[] = [
  ...SPECIMEN_OPENING_PARAGRAPHS.map((text) => ({ kind: "p" as const, text: withSlot(text) })),

  { kind: "h", text: "The constraint became the design brief" },
  {
    kind: "p",
    text: "What followed was not a growth plan. It was an attempt to find out where the time was actually going.",
  },
  {
    kind: "p",
    text: "The founder rebuilt the intake process, the part of the work that happens before anything visible is produced. Questions that had been asked in a first conversation moved earlier, into a structured form. Decisions that had been made case by case were written down as defaults, with the exceptions named explicitly. Work that had been improvised each time became a sequence, and the sequence was documented well enough that its own author had to stop remembering it.",
  },
  {
    kind: "p",
    text: "None of this is glamorous, and none of it is the kind of thing that gets written about. It is also, on the evidence submitted, what produced the result. Delivery time fell. The judgment calls that mattered stayed with the person who made them best, because the redesign moved everything around those calls out of that person's hands rather than the calls themselves.",
  },
  {
    kind: "p",
    text: "The distinction is worth sitting with. Plenty of businesses systematize the wrong half. They automate the judgment and keep the admin, and then wonder why the work stopped feeling like theirs.",
  },
  { kind: "h", text: "What the evidence actually showed" },
  {
    kind: "p",
    text: "The assessment does not reward intentions, and the entry was not selected because the story is appealing.",
  },
  {
    kind: "p",
    text: "What the panel could read was a documented change to a process, a measured reduction in delivery time that followed it, and client retention sustained across three consecutive years spanning the period before and after the change. Retention is the harder of those to argue with. A customer who stays is not expressing an opinion about a founder's methodology. They are re-buying.",
  },
  {
    kind: "p",
    text: "The scale of the business is modest and that is not incidental. Judged against sector, size and stage, the outcome is a stronger signal than the same figures would be from an operation with a service delivery team and a quality function. There was no department to absorb the risk of this decision. There was one person, deciding not to take the easy fix, and then doing the unglamorous work that decision required.",
  },
  { kind: "h", text: "The part that does not travel" },
  {
    kind: "p",
    text: "Every feature like this carries a temptation to extract a lesson, and the honest answer is that the lesson does not generalize cleanly.",
  },
  {
    kind: "p",
    text: "Refusing to hire is not a strategy. For most businesses in most conditions it is a mistake, and the graveyard of under-resourced companies is considerably larger than the shelf of ones that made scarcity work. What made it right here was a specific and correctly identified fact about where the value sat, and a willingness to test that belief by redesigning everything around it rather than defending it in the abstract.",
  },
  {
    kind: "p",
    text: "That is the harder skill, and it is the one the award is for. Not the refusal. The diagnosis underneath it.",
  },
  {
    kind: "p",
    text: (
      <>
        <Slot /> is now running the same operation with the same headcount and materially more of
        it. Whether that holds is a question for a later year. What can be said is that the founder
        was right about which part of the work could not be delegated, and acted on it before the
        market forced the question.
      </>
    ),
  },
];

function SpecimenPage() {
  const handleStart = () => toast("This selection page will be connected shortly.");

  return (
    <div className="min-h-screen bg-white font-sans antialiased" style={{ color: TEXT }}>
      {/* Persistent specimen banner */}
      <div
        role="note"
        className="fixed inset-x-0 top-0 z-50"
        style={{ backgroundColor: BLUE, color: "#fff" }}
      >
        <div
          className="mx-auto w-full px-6"
          style={{ maxWidth: "1120px", paddingTop: "10px", paddingBottom: "10px" }}
        >
          <p style={{ fontSize: "14px", lineHeight: 1.45 }}>
            Format specimen. This shows the length, structure and voice of a Winner&rsquo;s
            Feature. The business described is not a real recipient.
          </p>
        </div>
      </div>

      <header
        style={{ borderBottom: `1px solid ${LINE}`, marginTop: "72px" }}
        className="max-sm:!mt-[92px]"
      >
        <div className="mx-auto flex h-16 w-full items-center px-6" style={{ maxWidth: "1120px" }}>
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-sm ${focusRing}`}
            style={{ fontSize: "0.875rem", fontWeight: 600, color: INK }}
          >
            <img
              src={markAsset.url}
              alt="Entrepreneur Awards mark"
              className="h-7 w-7 shrink-0 object-contain"
            />
            Entrepreneur Awards
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full px-6" style={{ maxWidth: "680px", paddingTop: "56px" }}>
        <p
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "0.75rem",
            color: MUTED,
          }}
        >
          entrepreneurawards.co/winners/specimen
        </p>

        <p
          style={{
            marginTop: "24px",
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: BLUE,
          }}
        >
          {AWARD_YEAR} Winner Feature
        </p>

        <h1
          style={{
            marginTop: "16px",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: INK,
          }}
        >
          {withSlot(SPECIMEN_HEADLINE)}
        </h1>

        <p style={{ marginTop: "20px", fontSize: "1.125rem", lineHeight: 1.6, color: MUTED }}>
          Selected for the {AWARD_YEAR} Entrepreneur Award. A study in what happens when a founder
          refuses the obvious fix.
        </p>

        <p style={{ marginTop: "24px", fontSize: "0.875rem", color: MUTED }}>
          {SPECIMEN_BYLINE}
        </p>

        <div style={{ marginTop: "40px", height: "1px", backgroundColor: LINE }} />

        <article style={{ marginTop: "40px" }}>
          {article.map((block, i) =>
            block.kind === "h" ? (
              <h2
                key={i}
                style={{
                  marginTop: "48px",
                  fontSize: "1.375rem",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: INK,
                }}
              >
                {block.text}
              </h2>
            ) : (
              <p
                key={i}
                style={{
                  marginTop: i === 0 ? 0 : "28px",
                  fontSize: "19px",
                  lineHeight: 1.7,
                  color: TEXT,
                }}
              >
                {block.text}
              </p>
            ),
          )}
        </article>

        {/* Award statement panel */}
        <div
          className="rounded-xl"
          style={{
            marginTop: "56px",
            backgroundColor: TINT,
            border: `1px solid ${LINE}`,
            padding: "28px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: MUTED,
            }}
          >
            The award statement
          </p>
          <p style={{ marginTop: "14px", fontSize: "17px", lineHeight: 1.65, color: TEXT }}>
            The {AWARD_YEAR} Entrepreneur Award recognizes <Slot /> for building a service
            operation that grew without adding headcount, evidenced by client retention sustained
            across three consecutive years and a documented reduction in delivery time following
            the redesign of its intake process. Assessed on the measurable outcome, its consistency
            over time, and the founder&rsquo;s direct role in producing it.
          </p>
        </div>

        {/* Repeat notice */}
        <div
          className="rounded-xl"
          style={{ marginTop: "24px", border: `1px solid ${LINE}`, padding: "24px" }}
        >
          <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: MUTED }}>
            This is a format specimen. The business above is not a real recipient. Your feature is
            written from your own entry and your own award statement, and you review it before
            anything is published.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center text-center" style={{ margin: "64px 0 96px" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              color: INK,
            }}
          >
            This is what $595 produces.
          </h2>
          <p style={{ marginTop: "12px", fontSize: "1rem", lineHeight: 1.6, color: MUTED }}>
            Prepared from your entry, reviewed by you, published at a permanent address.
          </p>
          <button
            type="button"
            data-event="feature-order-click"
            onClick={handleStart}
            className={`mt-8 rounded-lg text-white transition-colors hover:bg-[#1568D0] ${focusRing}`}
            style={{
              height: "48px",
              padding: "0 24px",
              backgroundColor: BLUE,
              fontSize: "0.9375rem",
              fontWeight: 500,
            }}
          >
            Start my feature
          </button>
        </div>
      </main>
    </div>
  );
}
