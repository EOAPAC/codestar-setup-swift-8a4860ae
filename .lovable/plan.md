## Plan: Reframe the winner's written statement as a unique assessment record

### Why
The "What the award actually says about you" section currently reads like a promise that every winner receives a ready-made, generic marketing paragraph they can quote. That could create expectations we may not meet. We need to present it as a dated, individual record of the assessment, written for that specific business.

### Changes

1. **SpecimenCitation section in `src/routes/index.tsx`**
   - Rewrite the body copy:
     > Winners receive a dated, signed record of the assessment. It states what was judged and why the entry was selected, written for that specific business rather than from a template. You can use it as the basis for any quote you choose.
   - Change the card label from `Specimen — the wording a winner receives` to `Specimen — an example of the record`.
   - Keep the italic specimen wording in the card unchanged.

2. **Four steps section (HowItWorks)**
   - In step 4, change `and your written award statement arrive by email` to `and the written record of your assessment` so it matches the new framing and avoids a duplicate promise.

3. **Check for other generic-text promises**
   - Search `src/routes/index.tsx` and `src/components/site-footer.tsx` for any other language that implies a templated or generic text is generated. Remove or rephrase.

### What stays the same
- Layout, image, card, and specimen wording remain unchanged.
- No other pages are modified.
