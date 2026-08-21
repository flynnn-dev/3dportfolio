"use client";

import { MouseEvent, ReactNode, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  target?: string;
};

export default function MagneticButton({ href, children, variant = "primary", target }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      onMouseMove={move}
      onMouseLeave={reset}
      className={`magnetic-btn ${variant === "primary" ? "magnetic-primary" : "magnetic-ghost"}`}
    >
      <span>{children}</span>
    </a>
  );
}
