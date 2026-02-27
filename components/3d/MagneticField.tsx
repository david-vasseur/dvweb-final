"use client";

import { MutableRefObject, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type MagneticFieldProps = {
  progressRef: MutableRefObject<number>;
};

export default function MagneticField({ progressRef }: MagneticFieldProps) {
  const points = useRef<THREE.Points | null>(null);
  const material = useRef<THREE.ShaderMaterial | null>(null);

  const count = 4000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!material.current) return;

    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    material.current.uniforms.uForce.value = progressRef.current;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} />
      </bufferGeometry>

      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uForce: { value: 0 },
        }}
        vertexShader={`
          uniform float uTime;
          uniform float uForce;

          void main() {
            vec3 pos = position;

            float dist = length(pos.xy);
            float attraction = uForce * 2.0;

            pos.xy -= normalize(pos.xy) * attraction * 0.5;
            pos.z += sin(dist * 4.0 + uTime) * 0.3 * (1.0 - uForce);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 2.0 + uForce * 3.0;
          }
        `}
        fragmentShader={`
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            float strength = 0.05 / d;
            gl_FragColor = vec4(0.0, 0.8, 1.0, strength);
          }
        `}
      />
    </points>
  );
}