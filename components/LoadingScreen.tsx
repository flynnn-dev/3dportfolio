"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const duration = 1050;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(() => setHidden(true), 220);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <div className={`loading-screen ${progress === 100 ? "loading-exit" : ""}`} role="status" aria-live="polite">
      <div>
        <p className="loading-name">JOHN LORENS</p>
        <p className="loading-copy">Initializing Portfolio...</p>
        <div className="loading-line"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
        <p className="loading-percent">{progress}%</p>
      </div>
    </div>
  );
}
