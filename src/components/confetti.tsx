import type { CSSProperties } from "react";

/**
 * Pure-CSS falling confetti strips. Absolutely positioned to fill the nearest
 * positioned ancestor; clip it with `relative overflow-hidden` on the parent.
 * Hidden entirely for users who prefer reduced motion.
 */
export function Confetti() {
  const dots = Array.from({ length: 24 });
  return (
    <div
      aria-hidden
      className="ea-confetti pointer-events-none absolute inset-0 z-0 overflow-hidden motion-reduce:hidden"
    >
      {dots.map((_, i) => {
        const left = (i * 41) % 100;
        const delay = (i % 8) * 0.5;
        const duration = 5 + (i % 6);
        const size = 4 + (i % 5);
        const colors = ["#1978E5", "#60a5fa", "#93c5fd", "#dbeafe", "#facc15", "#ffffff"];
        const color = colors[i % colors.length];
        const rotate = (i * 37) % 360;
        const drift = (i % 3) - 1;
        return (
          <span
            key={i}
            className="absolute block rounded-[1px] opacity-80"
            style={
              {
                left: `${left}%`,
                top: "-10%",
                width: `${size}px`,
                height: `${size * 1.6}px`,
                backgroundColor: color,
                transform: `rotate(${rotate}deg)`,
                animation: `ea-confetti-fall ${duration}s linear ${delay}s infinite`,
                "--ea-drift": `${drift * 40}px`,
              } as CSSProperties
            }
          />
        );
      })}
      <style>{`
        @keyframes ea-confetti-fall {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          8% { opacity: 0.95; }
          100% { transform: translateY(320px) translateX(var(--ea-drift, 0px)) rotate(720deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ea-confetti { animation: none; display: none; }
        }
      `}</style>
    </div>
  );
}
