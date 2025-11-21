"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";


export default function MessageSection() {
    const container = useRef(null);
    const glowRef = useRef(null);
    const titleRef = useRef(null);

    useGSAP(() => {
        const split = new SplitText(".message-clear", { type: "chars" });

        gsap.from(split.chars, {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".message-clear",
                start: "top 90%",
                end: "bottom center",
                scrub: 1,
            }
        });

        gsap.to(".message-clear", { opacity: 0.4, scrollTrigger: {
            trigger: ".message-clear",
                start: "top 90%",
                end: "bottom center",
                scrub: 0.2,
        } })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "+=2000",
                scrub: 1,
                pin: true,
                pinType: "fixed", // Force le type de pin
                pinSpacing: true,
                anticipatePin: 1
            },
        });

        // baseline fade
        // tl.to(".message-clear", { opacity: 0.4, duration: 0.1 }, 0);

        // p1 → apparition avec glow + scale
        tl.to(".p1", { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.6 
        })
        .to(".glow-p1", {
            opacity: 0.6,
            scale: 1.5,
            duration: 0.6
        }, "<")
        // p1 → disparition
        .to(".p1", { 
            opacity: 0, 
            y: -20,
            scale: 0.95,
            duration: 0.6 
        })
        .to(".glow-p1", {
            opacity: 0,
            scale: 0.8,
            duration: 0.6
        }, "<")
        
        // p2 → apparition avec glow cyan + scale
        .to(".p2", { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.6 
        })
        .to(".glow-p2", {
            opacity: 0.8,
            scale: 1.8,
            duration: 0.6
        }, "<")
        // p2 → disparition
        .to(".p2", { 
            opacity: 0, 
            y: -20,
            scale: 0.95,
            duration: 0.6 
        })
        .to(".glow-p2", {
            opacity: 0,
            scale: 0.8,
            duration: 0.6
        }, "<")
        
        // p3 → apparition avec glow purple + scale
        .to(".p3", { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.6 
        })
        .to(".glow-p3", {
            opacity: 0.8,
            scale: 1.8,
            duration: 0.6
        }, "<")
        // p3 → disparition
        .to(".p3", { 
            opacity: 0, 
            y: -20,
            scale: 0.95,
            duration: 0.6 
        })
        .to(".glow-p3", {
            opacity: 0,
            scale: 0.8,
            duration: 0.6
        }, "<");

        // Impact final avec glow massif
        tl.to(".message-clear", {
            opacity: 1,
            scale: 1.4,
            duration: 1.2,
            ease: "power3.out",
        })
        .to(glowRef.current, {
            opacity: 1,
            scale: 2,
            duration: 1.2,
            ease: "power3.out",
        }, "<")
        .to(titleRef.current, {
            textShadow: "0 0 40px rgba(6, 182, 212, 0.8), 0 0 80px rgba(6, 182, 212, 0.4)",
            duration: 1.2,
            ease: "power3.out",
        }, "<");

    }, []);

    return (
        <section
            ref={container}
            className="h-screen w-full flex items-center justify-center relative bg-gray-950 overflow-hidden"
            style={{ 
                width: 'calc(100vw - var(--scrollbar-width, 0px))',
                maxWidth: '100%'
            }}
        >
            {/* Grille de fond */}
            <div className="absolute opacity-10 inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

            {/* Glow de fond pour les paragraphes */}
            <div className="glow-p1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/30 rounded-full blur-[120px] opacity-0 pointer-events-none" />
            <div className="glow-p2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/40 rounded-full blur-[120px] opacity-0 pointer-events-none" />
            <div className="glow-p3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/40 rounded-full blur-[120px] opacity-0 pointer-events-none" />

            {/* Glow final du titre */}
            <div 
                ref={glowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/50 rounded-full blur-[150px] opacity-0 pointer-events-none"
            />

            <div className="relative w-[70%] max-w-[900px] text-center z-10">
                {/* MESSAGE CLAIR */}
                <h2 
                    ref={titleRef}
                    className="message-clear text-4xl md:text-6xl max-w-7xl font-extrabold leading-snug opacity-0 text-white"
                >
                    <span className="text-red-400">Captez !</span>
                    {' '}
                    <span className="text-cyan-500"> Développez !</span>
                    {' '}
                    <span className="text-purple-500">Convertissez !</span>
                    <br/>
                    Votre site web au service de<br/> votre
                    <br/>
                    <span className=" text-cyan-500">Business</span>
                </h2>

                {/* OVERLAY ANIMATIONS */}
                <div className="relative h-[180px] mt-12">
                    {/* P1 - Problème */}
                    <p className="p p1 absolute inset-0 opacity-0 translate-y-6 scale-95 text-lg md:text-2xl text-gray-200 leading-relaxed">
                        Vous <span className="text-red-400 font-bold">perdez des clients</span> sans le savoir. Une <span className="text-red-400 font-semibold">mauvaise expérience </span> ou un
                        manque de clarté peut <span className="text-red-400 font-bold">faire fuir</span> vos prospects.
                    </p>

                    {/* P2 - Bénéfice */}
                    <p className="p p2 absolute inset-0 opacity-0 translate-y-6 scale-95 text-lg md:text-2xl text-gray-200 leading-relaxed">
                        <strong className="text-xl md:text-3xl p-2 bg-linear-to-r from-zinc-400 to-zinc-500">
                            Des <span className="text-cyan-400 font-extrabbold">résultats mesurables.</span>
                        </strong>
                        <br/>
                        Un site optimisé <span className="text-cyan-400 font-semibold">améliore vos conversions </span>
                        et renforce votre <span className="text-cyan-400 font-bold">crédibilité</span>.
                    </p>

                    {/* P3 - Transformation */}
                    <p className="p p3 absolute inset-0 opacity-0 translate-y-6 scale-95 text-lg md:text-2xl text-gray-200 leading-relaxed">
                        Une <span className="text-purple-400 font-bold">expérience qui démarque</span>. Votre site devient un <span className="text-purple-400 font-semibold">atout moderne </span>
                        qui <span className="text-purple-400 font-bold">capte et retient</span> l'attention.
                    </p>
                </div>

                {/* Particules décoratives */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            {/* Ligne décorative animée */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-px h-16 bg-linear-to-b from-transparent via-cyan-500 to-transparent opacity-30" />
        </section>
    );
}