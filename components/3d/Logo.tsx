"use client";

import { Float, useGLTF } from "@react-three/drei";
import { forwardRef, JSX } from "react";
import * as THREE from "three";

export const Logo = forwardRef<THREE.Group, JSX.IntrinsicElements["group"]>((props, ref) => {

    const { scene } = useGLTF('/models/logo2.glb');

    return (
        <Float
            speed={2}                // vitesse de l'animation
            rotationIntensity={0.1}  // rotation
            floatIntensity={1.5}       // amplitude du mouvement
            floatingRange={[-0.3, 0.3]}
        >
            <group ref={ref} position={[0, 1, -1]} rotation={[0, 0, 0]} scale={0} >
                <primitive object={scene} />
            </group>            
        </Float>
    );
});
Logo.displayName = "Logo";
useGLTF.preload('/models/logo2.glb');