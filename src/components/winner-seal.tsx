import { useId } from "react";
import markAsset from "@/assets/ea-mark-84.png.asset.json";

export function WinnerSeal({ size = 120, showYear = true }: { size?: number; showYear?: boolean }) {
  const arcId = `winner-arc-${useId().replace(/:/g, "")}`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true" className="awards-seal">
      <defs><path id={arcId} d="M 32 100 A 68 68 0 0 1 168 100" /></defs>
      <circle cx="100" cy="100" r="96" className="seal-outer" strokeWidth="3" />
      <circle cx="100" cy="100" r="86" className="seal-inner" strokeWidth="1.2" />
      <text fontSize="13" fontWeight="700" className="seal-ink"><textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">ENTREPRENEUR AWARDS</textPath></text>
      <image href={markAsset.url} x="76" y="55" width="48" height="48" />
      <line x1="80" y1="126" x2="120" y2="126" className="seal-rule" strokeWidth="1.5" />
      <text x="100" y="148" textAnchor="middle" fontSize="18" fontWeight="700" className="seal-ink">WINNER</text>
      {showYear && <text x="100" y="168" textAnchor="middle" fontSize="12" className="seal-muted">2027</text>}
    </svg>
  );
}