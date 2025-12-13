"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react'

function NextTest() {

    useGSAP(() => {

        gsap.to(".grad-test", { rotateX: 0, scrollTrigger: {
            trigger: ".grad-test",
            start: "bottom 60%",
            end: "bottom top",
            scrub: 1
        } })

    })

    return (
        <div className="h-svh relative flex items-center justify-center w-svw bg-linear-to-t from-gray-900 to-cyan-950">
            <div className="grad-test absolute bottom-0 h-full w-screen bg-[url('/test.webp')] bg-no-repeat bg-bottom bg-contain transform rotate-x-90 origin-bottom" />
        </div>
    )
}

export default NextTest;