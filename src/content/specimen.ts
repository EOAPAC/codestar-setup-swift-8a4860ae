/**
 * Single source of truth for the Winner's Feature format specimen.
 * Used by /winners/specimen and by the preview frames on /winner-options
 * so the two can never drift apart.
 */

/** Inline token standing in for the winner's business name. */
export const SPECIMEN_BUSINESS_TOKEN = "\u2039Your Business\u203A";

export const SPECIMEN_HEADLINE = `How ${SPECIMEN_BUSINESS_TOKEN} Made Its Smallest Constraint The Reason Customers Stay`;

export const SPECIMEN_BYLINE = "By Entrepreneur Awards Editorial";

/** The opening paragraphs, in publication order. */
export const SPECIMEN_OPENING_PARAGRAPHS = [
  "Most companies at this stage solve a capacity problem the same way. Demand rises, the team strains, and the answer is more people. It is the fix every advisor recommends and the one most founders reach for, because it is the only lever that visibly moves.",
  `${SPECIMEN_BUSINESS_TOKEN} did the opposite, and the decision is the reason it was selected.`,
  "Faced with more work than its team could absorb, the founder declined to hire. The reasoning was not financial. It was that the quality customers were paying for lived in a small number of judgment calls made early in each engagement, and that those calls did not survive being handed to someone new. Adding people would have protected the revenue and quietly damaged the thing the revenue was for.",
];

/**
 * Split text on the business-name token so a caller can render its own
 * inline slot treatment between the plain segments.
 */
export function splitOnBusinessToken(text: string): string[] {
  return text.split(SPECIMEN_BUSINESS_TOKEN);
}
