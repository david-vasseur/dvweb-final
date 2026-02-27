"use client";

import { Float, useGLTF } from "@react-three/drei";
import { forwardRef, JSX } from "react";
import * as THREE from "three";

export const Laptop = forwardRef<THREE.Group, JSX.IntrinsicElements["group"]>((props, ref) => {

    const { scene } = useGLTF('/models/laptop.glb');

    return (
        <group ref={ref} {...props}> 
            <Float
                speed={2}
                rotationIntensity={0.1}
                floatIntensity={1.5}
                floatingRange={[-0.3, 0.3]}
            >
            <group position={[-0, -10, 2]} rotation={[0.1, 3.1, 1.4]} scale={1}>
                <primitive object={scene}  />
            </group>
                      
            </Float>
        </group>
    );
});
Laptop.displayName = "Laptop";
useGLTF.preload('/models/laptop.glb');