import { useEffect, useState } from "react";
import { WinnerSeal } from "@/components/winner-seal";
import { MOCK_AWARDS } from "@/content/awards-mock";
import markAsset from "@/assets/ea-mark-84.png.asset.json";

export function WinnerFile({ kind, title }: { kind: "banner" | "square" | "story" | "certificate" | "badge" | "signature" | "assessment"; title: string }) {
  if (kind === "badge") return <div className="sample-badge"><WinnerSeal size={150} /></div>;
  if (kind === "assessment") return <div className="sample-assessment"><strong>Assessment record</strong><p>{title}</p>{["Originality", "Traction", "Achievement"].map((criterion) => <div key={criterion}><span>{criterion}</span><i /></div>)}</div>;
  if (kind === "signature") return <div className="sample-email"><i /><i /><div><img src={markAsset.url} alt="" /><strong>{title}</strong><p>Entrepreneur Awards winner</p></div></div>;
  return <div className={`sample-${kind}`}>
    {kind === "certificate" || kind === "story" ? <img src={markAsset.url} alt="" /> : <WinnerSeal size={100} showYear={false} />}
    <div>{kind === "certificate" && <p>Entrepreneur Awards certifies</p>}<strong>{title}</strong>{kind === "banner" && <p>Entrepreneur Awards winner · entrepreneurawards.co</p>}</div>
  </div>;
}

export function WinnerFileStack() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: ReturnType<typeof setInterval> | undefined;
    let transition: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      clearInterval(interval);
      clearTimeout(transition);
      setFading(false);
      if (preference.matches) { setIndex(0); return; }
      if (paused) return;
      interval = setInterval(() => {
        setFading(true);
        transition = setTimeout(() => { setIndex((current) => (current + 1) % MOCK_AWARDS.length); setFading(false); }, 150);
      }, 2500);
    };
    start();
    preference.addEventListener("change", start);
    return () => { clearInterval(interval); clearTimeout(transition); preference.removeEventListener("change", start); };
  }, [paused]);
  const title = `${MOCK_AWARDS[index]?.name ?? "Entrepreneur of the Year"} 2027`;
  return <figure className="winner-file-hero">
    <div className={`winner-file-stack${fading ? " is-fading" : ""}`} aria-hidden="true" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="stack-certificate"><WinnerFile kind="certificate" title={title} /></div>
      <div className="stack-square"><WinnerFile kind="square" title={title} /></div>
      <div className="stack-banner"><WinnerFile kind="banner" title={title} /></div>
    </div>
    <figcaption>Sample winner files</figcaption>
  </figure>;
}