import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { forwardRef, ReactNode } from 'react';

type SceneProps = {
    children?: ReactNode;
};

const Scene = forwardRef<HTMLDivElement, SceneProps>((props, ref) => {

    const { children } = props;

    return (
        <div className="absolute w-full h-full">
            <Canvas
                camera={{ position: [0, 20, 0], fov: 35 }}
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