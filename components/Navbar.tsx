"use client";

import { useEffect, useState } from "react";

const links = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

export default function Navbar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header className="nav-shell">
      <a className="brand" href="#home" aria-label="John Lorens home">JL.</a>
      <nav aria-label="Primary navigation">
        {links.map(([label, id]) => (
          <a key={id} href={`#${id}`} className="nav-link">{label}</a>
        ))}
      </nav>
      <div className="progress-track" aria-hidden="true">
        <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
}
