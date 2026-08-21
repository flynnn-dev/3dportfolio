"use client";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import CameraRig from "./CameraRig";
import SceneWorld from "./SceneWorld";
import ScrollManager from "./ScrollManager";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SceneCanvas() {
  const progress = useRef(0);
  const reduced = useReducedMotion();
  const [dpr, setDpr] = useState(1.5);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="scene-fixed" aria-hidden="true">
      <Canvas
        dpr={mobile ? 1 : dpr}
        gl={{ antialias: !mobile, powerPreference: "high-performance", alpha: false }}
        camera={{ position: [0, 3.3, 8.8], fov: mobile ? 54 : 48, near: 0.1, far: 90 }}
      >
        {!mobile && (
          <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
        )}
        <ScrollManager progress={progress} />
        <CameraRig progress={progress} reduced={reduced} mobile={mobile} />
        <SceneWorld progress={progress} reduced={reduced} mobile={mobile} />
      </Canvas>
    </div>
  );
}
