"use client";

import { Float, useGLTF } from "@react-three/drei";
import { forwardRef, JSX } from "react";
import { Mesh } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

export const Logo = forwardRef<Mesh, JSX.IntrinsicElements["mesh"]>((props, ref) => {

    const { scene } = useGLTF('/models/logo2.glb');

    return (
        <Float
            speed={2}                // vitesse de l'animation
            rotationIntensity={0.1}  // rotation
            floatIntensity={1.5}       // amplitude du mouvement
            floatingRange={[0, 0]}
        >
            {/* <mesh ref={ref} position={[0, 1, -2]} {...props}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
            </mesh> */}
            <primitive ref={ref} object={scene} position={[0, 1, -2]} rotation={[0, 0, 0]} scale={1} />
        </Float>
    );
});
Logo.displayName = "Logo";
useGLTF.preload('/logo2.glb');