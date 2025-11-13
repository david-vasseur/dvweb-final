import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { forwardRef, ReactNode } from 'react';

type SceneProps = {
    children?: ReactNode;
    onReady?: () => void;
};

const Scene = forwardRef<HTMLDivElement, SceneProps>((props, ref) => {

    const { children, onReady } = props;

    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas
                onCreated={() => {
                    console.log("Canvas created");
                    if (onReady) onReady();
                }}
                camera={{ position: [0, 20, 1], fov: 35 }}
            >
                <Environment 
                    files={'/models/neon_photostudio_2k.hdr'}
                    background={false}
                    resolution={1024}
                    environmentIntensity={1}
                />
                {children}
            </Canvas>
        </div>
    )
})

Scene.displayName = "Scene";

export default Scene;