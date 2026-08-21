"use client";

import { MutableRefObject, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const positions = [
  new THREE.Vector3(0, 3.3, 8.8),
  new THREE.Vector3(1.8, 2.5, 3.2),
  new THREE.Vector3(9.5, 2.8, -5.2),
  new THREE.Vector3(-4.6, 2.8, -15.2),
  new THREE.Vector3(7.0, 2.4, -25.0),
  new THREE.Vector3(0.8, 2.6, -35.8),
  new THREE.Vector3(0, 2.6, -46.3),
];

const targets = [
  new THREE.Vector3(0, 1.2, 0),
  new THREE.Vector3(0, 1.1, -1),
  new THREE.Vector3(8, 1.2, -10),
  new THREE.Vector3(-5.5, 1.2, -20),
  new THREE.Vector3(6, 1.1, -30),
  new THREE.Vector3(0, 1.2, -40),
  new THREE.Vector3(0, 1.1, -50),
];

export default function CameraRig({ progress, reduced, mobile }: { progress: MutableRefObject<number>; reduced: boolean; mobile: boolean }) {
  const { camera } = useThree();
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const p = reduced ? 0 : THREE.MathUtils.clamp(progress.current, 0, 1);
    const scaled = p * (positions.length - 1);
    const index = Math.min(positions.length - 2, Math.floor(scaled));
    const local = THREE.MathUtils.smoothstep(scaled - index, 0, 1);

    const desired = positions[index].clone().lerp(positions[index + 1], local);
    const desiredLook = targets[index].clone().lerp(targets[index + 1], local);
    if (mobile && !reduced) {
      desired.x = THREE.MathUtils.lerp(desired.x, desiredLook.x, 0.38);
      desired.y += 0.45;
    }
    const damp = 1 - Math.exp(-delta * 4.5);

    camera.position.lerp(desired, damp);
    look.lerp(desiredLook, damp);
    camera.lookAt(look);
  });

  return null;
}
