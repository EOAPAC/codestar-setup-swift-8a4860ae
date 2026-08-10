# Homepage: remove repetition, plain-language citation

Two jobs: each claim gets stated once, in the one place it lands hardest; and the "citation" section stops using a word most founders won't recognise.

## What's currently repeated

Reading the page top to bottom, the same four claims appear three to four times each:

- **Three published criteria / no categories** — hero subhead, proof-point card, step 2 of "Four steps", the criteria section lead, "What this award does not do" item 01, and the form subhead.
- **Five business days** — hero subhead, proof-point card, step 3, form heading, line above the submit button. The contact section then promises "within one business day", which reads as a contradiction.
- **Most entries are not selected** — hero subhead, proof-point card, step 3.
- **No twenty-page application** — "Assessed on what you built", "No long submission", form subhead.
- **Seal, badge, graphics arrive by email at no further cost** — step 4, the award band caption, and two of the six dark-section items.

## The fix: one claim, one home

Assign each claim a single owner and delete it elsewhere.

| Claim | Keeps it | Removed from |
| --- | --- | --- |
| Three criteria, no categories | The criteria section | Proof-point card, step 2 tail, dark-section item 01 |
| Five business days | The three proof points under "As seen in" | Hero subhead, step 3 tail, form heading |
| Most entries are not selected | Hero subhead | Proof-point card, step 3, criteria lead |
| Short entry, no long form | Step 1 of "Four steps" | "Assessed on what you built", dark item 05, form subhead |
| What a winner receives, no further cost | Step 4 | Award band caption, dark items 03 and 04 |

Knock-on edits:

- Hero subhead shortens to the one claim it owns plus the promise of a fast decision, without restating the criteria count.
- The three proof points become distinct: how entries are read, how fast a decision comes, and who the award is for — no overlap with the cards further down.
- "What this award does not do" drops from six cells to four genuinely new ones (no nominations, no ceremony, no renewal, no shortlist fee), keeping the numbered hairline grid, which then sits as a clean 2x2 or single row rather than a padded six.
- Criteria section keeps one button (See the full criteria page) instead of two that go to the same place.
- "Enter now" appears twice, in the hero and above the form — that repetition stays, since a repeated primary action is not repeated information.
- Contact changes to "We reply to email within one business day" so it reads as a different promise from the entry decision.

## Rewording the citation section

"Citation" is jargon. The section becomes plainly named and explained before the specimen is shown.

- Eyebrow: `The words you receive`
- Heading: `What the award actually says about you.`
- Lead paragraph: explains that every winner gets a short written statement — one paragraph, signed and dated — setting out what was assessed and why it was selected; it's what you'd quote on a profile, a site or in a press note.
- The specimen paragraph itself stays as-is, in italic inside the bordered card, with the label above it changed from "What a citation looks like" to `Specimen — the wording a winner receives`.
- The small print under the card stays: "Specimen. Not attributed to a recipient."
- Anywhere else the word "citation" appears alone (step 4 of "Four steps"), it becomes "your written award statement".

## Technical notes

All edits are in `src/routes/index.tsx`: the `proofPoints`, `winWorth`, `doesNotDo`, `howItWorks` and `criteria` arrays, and the `Hero`, `AwardBand`, `Criteria`, `SpecimenCitation`, `SubmissionForm` and `Contact` components. No layout system, token or component changes; no other page touched.
