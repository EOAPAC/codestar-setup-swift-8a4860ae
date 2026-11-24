import { useEffect, useState } from "react";

const HERO_SAMPLES = [
  "square-entrepreneur-of-the-year",
  "square-startup-founder",
  "square-growth-founder",
  "square-innovator",
  "square-turnaround",
  "square-employer",
  "square-impact-founder",
] as const;

const SOURCES = HERO_SAMPLES.map((name) => `/winner-samples/hero/${name}.webp`);

export function HeroSampleStack() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Frames are stacked and crossfaded, so fetch them all up front: the swap must never wait on the network.
  useEffect(() => {
    for (const src of SOURCES) {
      const image = new Image();
      image.src = src;
    }
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(preference.matches);
    apply();
    preference.addEventListener("change", apply);
    return () => preference.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const interval = setInterval(() => setIndex((current) => (current + 1) % SOURCES.length), 2500);
    return () => clearInterval(interval);
  }, [paused, reduced]);

  // Reduced motion means no cycling at all, so only the first frame is ever rendered.
  const frames = reduced ? SOURCES.slice(0, 1) : SOURCES;

  return <figure className="hero-sample">
    <div className="hero-sample-panel" aria-hidden="true" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <span className="hero-sample-card" />
      {frames.map((src, frame) => <img key={src} src={src} alt="" className={`hero-sample-img${frame === index ? " is-shown" : ""}`} />)}
    </div>
  </figure>;
}
