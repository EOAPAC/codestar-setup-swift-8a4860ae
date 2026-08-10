# Homepage design audit and rebuild for credibility

The homepage has the right content but the sections read as a stack of unrelated blocks: three different heading sizes doing the same job, two numbered lists styled identically but meaning different things, an unlabelled full-bleed photo, and colour used decoratively rather than to signal hierarchy. This fixes the rhythm, the type scale and the use of colour, and puts real faces on the page so credibility is shown rather than claimed.

## What's wrong now

1. **No type scale.** Section headings are all `4xl/5xl`, body copy is inconsistently `text-sm`, `text-base` and `text-lg` across sections that sit at the same level. Card titles in "What a win is worth" are `text-base` while criteria titles are `text-2xl`, so the eye can't tell what outranks what.
2. **Two numbering systems that look the same.** "Four steps" and "The three criteria" both use a small blue numeral, so the page appears to count 1-2-3-4 then 1-2-3 again with no visual distinction between a process and a rubric.
3. **Section rhythm is flat.** Almost every section is `py-24 md:py-32` on white, with the only breaks being one grey band and one dark band. Nothing groups related sections together.
4. **The award band is decoration.** A full-bleed product photo with a caption underneath, carrying no claim, sitting between the publication strip and the value section.
5. **Credibility signals are thin.** The "As seen in" strip is the only proof element and it is unqualified plain text; there are no people, no assessor, no volume, no dated evidence anywhere above the form.
6. **Colour is used inconsistently.** Blue appears as an eyebrow, as numerals, as a citation label, as link underline and as the primary button — five different jobs, so it stops meaning "important".

## The fix

**Type scale, applied everywhere**
One scale, three levels, no exceptions:
- Section heading: `text-4xl md:text-5xl`, semibold, tracking-tight
- Section lead: `text-lg md:text-xl`, muted
- Card/step title: `text-lg`, semibold
- Body: `text-base leading-relaxed`, muted
- Eyebrow/label: `text-xs uppercase tracking-[0.12em]`

Every section gets an eyebrow so each one announces its role before the heading.

**Colour discipline**
Blue is reserved for: the primary button, links, and section eyebrows. Numerals stop being blue and become large outlined grey figures. The dark band and a new tinted band carry the colour contrast instead. No new colours; the existing tokens plus one new subtle surface token for the tinted band.

**Numbering, made distinct**
- "Four steps" becomes a horizontal process: large light-grey numerals `01 02 03 04` with a connecting hairline, so it reads as a sequence in time.
- "The three criteria" drops numerals entirely and becomes three bordered cards with a thin blue left rule, so it reads as a rubric, not a sequence.

**Section order and rhythm**
Alternating surfaces so related things group:

```text
hero (white, trophy background)
credibility band (tinted) — as seen in + three proof figures + assessor line
award band (full-bleed photo, now carrying a claim overlay-free caption)
what a win is worth (white)
four steps (tinted)
the three criteria (white)
specimen citation + winners photo (tinted, side by side)
what this award does not do (dark)
entry form (white)
contact (tinted)
footer
```

**New credibility band, directly under the hero**
Replaces the bare publication strip. Keeps "As seen in" and the six names, then adds a single row of three plain facts in the same treatment as the rest of the page: assessed against three published criteria, a decision in five business days, most entries not selected. Underneath, one line naming Harry Neto, Awards Director, as the assessor, with the group photo of the assessment panel at small size beside it. No numerals invented — only facts already on the page.

**Photographs**
Two of the three uploads, chosen for where they carry a claim:
- The boardroom group with the award (`11a8bb52`) — used small and contained in the credibility band, next to the assessor line. Faces near the proof.
- The solo winner in the lobby (`84b8f7d8`) — used in the specimen citation section, contained at 4:5 on the left with the citation card on the right, so the citation reads as belonging to a person.
The five-person office shot is left unused; it says the same thing as the boardroom shot with less warmth.
The existing crystal-award full-bleed band stays, with its caption tightened to one line.

**Contact section**
Currently three identical grey pills. Becomes the email as the single emphasised item with LinkedIn and Twitter as plain text links, so there is one clear action.

## Technical notes

- All changes in `src/routes/index.tsx`; no other page touched. One new surface token added to `src/styles.css` for the tinted band, in `oklch`, registered in `@theme inline`.
- The two chosen uploads are pushed to the CDN with `lovable-assets create` and referenced from `.asset.json` pointers; no binaries added to the repo.
- Contained images reuse `src/components/site-figure.tsx` (card radius, explicit dimensions, aspect-ratio, lazy). Full-bleed band keeps square corners and `loading="eager"`.
- No copy is rewritten except the award band caption and the contact block; headings and body text stay as written.
- No prices, currency or money numerals anywhere, per the existing rule.
- HubSpot form markup, its submit handling and the example-answer toggles are untouched.
