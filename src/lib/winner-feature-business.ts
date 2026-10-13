export function sanitizeBusiness(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const cleaned = raw.replace(/[<>]/g, "").trim().slice(0, 60);
  return cleaned || undefined;
}

export function fillBusiness(text: string, business: string): string {
  return text.replace(/\[Your Business\]|‹Your Business›/g, () => business);
}