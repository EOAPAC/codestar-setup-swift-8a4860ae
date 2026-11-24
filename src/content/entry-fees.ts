export const ENTRY_FEES = {
  entry: 129.90,
  shortlist: 0,
} as const;

export const ENTRY_FEE_LABEL = `$${ENTRY_FEES.entry.toFixed(2)}`;

/** Amount with no currency symbol, for copy that already writes "US$". */
export const ENTRY_FEE_AMOUNT = ENTRY_FEES.entry.toFixed(2);

export function totalRequiredEntryFees() {
  return ENTRY_FEES.entry + ENTRY_FEES.shortlist;
}