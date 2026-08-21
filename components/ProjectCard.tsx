"use client";

import { MouseEvent, useRef } from "react";
import { Project } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const tilt = (event: MouseEvent<HTMLElement>) => {
    if (reduced || !ref.current || window.innerWidth < 900) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateX(${py * -4}deg) rotateY(${px * 5}deg) translateY(-4px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  };

  return (
    <article ref={ref} onMouseMove={tilt} onMouseLeave={reset} className="project-card reveal-card">
      <div className="project-visual" aria-hidden="true">
        <div className="window-bar"><span /><span /><span /></div>
        <div className="project-visual-grid">
          <strong>{project.accent}</strong>
          <div><span /><span /><span /><span /></div>
        </div>
        <p>0{index + 1} / SELECTED WORK</p>
      </div>
      <div className="project-body">
        <p className="eyebrow">PROJECT 0{index + 1}</p>
        <h3>{project.title}</h3>
        <p className="muted">{project.description}</p>
        <div className="tag-row">
          {project.technologies.map((tech) => <span key={tech}>{tech}</span>)}
        </div>
        <ul className="feature-grid">
          {project.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
        <div className="project-actions">
          <a href={project.github}>GitHub <span aria-hidden="true">↗</span></a>
          <a href={project.demo}>Live Demo <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  );
}
