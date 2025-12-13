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
                end: "+=2500",
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
        .to(".message-clear", { scale: 0, opacity: 0 }, "<")
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
        tl.to(".message-final", {
            opacity: 1,
            scale: 1.4,
            yPercent: 35,
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
            <div className="glow-p1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/30 rounded-full blur-[120px] opacity-0 pointer-events-none" />
            <div className="glow-p2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 rounded-full blur-[120px] opacity-0 pointer-events-none" />
            <div className="glow-p3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/40 rounded-full blur-[120px] opacity-0 pointer-events-none" />

            {/* Glow final du titre */}
            <div 
                ref={glowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] opacity-0 pointer-events-none"
            />

            <div className="relative w-[70%] max-w-[900px] text-center z-10">
                {/* MESSAGE CLAIR */}
                <h2 
                    ref={titleRef}
                    className="message-clear text-4xl md:text-6xl max-w-7xl font-extrabold leading-snug opacity-0 text-white"
                >
                    <span className="text-cyan-500">Captez !</span>
                    {' '}
                    <span className="text-cyan-500"> Développez !</span>
                    {' '}
                    <span className="text-cyan-500">Convertissez !</span>
                    <br/>
                    {/* Votre site web au service de<br/> votre
                    <br/>
                    <span className=" text-cyan-500">Business</span> */}
                </h2>
                <span className="message-final text-4xl md:text-6xl max-w-7xl font-extrabold leading-snug opacity-0 scale-0 text-white">
                    Votre site web au service de
                    <br/> 
                    votre
                    <br/>
                    <span className=" text-cyan-500">Business</span>
                </span>

                {/* OVERLAY ANIMATIONS */}
                <div className="relative h-[280px] -translate-y-[50%] mt-12">
                    {/* B1 - Un site qui convertit */}
                    <div className="p p1 absolute inset-0 opacity-0 translate-y-6 scale-95 text-lg md:text-2xl text-gray-200 leading-relaxed">
                        <h3 className="text-cyan-400 font-extrabold mb-8">
                            Transformez vos visiteurs en clients.
                        </h3>
                        <p>
                            Un design clair et optimisé améliore 
                            immédiatement vos <span className="text-cyan-400 font-semibold">taux de conversion</span> 
                            et guide vos utilisateurs vers l’action 
                            avec plus d’<strong className="font-bold text-cyan-400">efficacité</strong>.
                        </p>
                    </div>

                    {/* B2 - Une image professionnelle forte */}
                    <div className="p p2 absolute inset-0 opacity-0 translate-y-6 scale-95 text-lg md:text-2xl text-gray-200 leading-relaxed">
                        <h3 className="text-cyan-500 font-extrabold mb-8">
                            Une image qui inspire confiance.
                        </h3>
                        <p>
                            Un site moderne renforce votre 
                            <strong className="font-bold text-cyan-500">crédibilité</strong> 
                            et donne à votre marque une présence en ligne 
                            <span className="text-cyan-500 font-semibold">solide et professionnelle</span>.
                        </p>
                    </div>

                    {/* B3 - Une expérience utilisateur fluide */}
                    <div className="p p3 absolute inset-0 opacity-0 translate-y-6 scale-95 text-lg md:text-2xl text-gray-200 leading-relaxed">
                        <h3 className="text-cyan-600 font-extrabold mb-8">
                            Une navigation simple qui retient vos visiteurs.
                        </h3>
                        <p>
                            Une expérience intuitive réduit les frictions, 
                            augmente le <span className="text-cyan-600 font-semibold">temps passé sur votre site</span> 
                            et aide vos visiteurs à trouver rapidement ce qu’ils recherchent, 
                            ce qui booste votre <strong className="text-cyan-600 font-bold">engagement</strong>.
                        </p>
                    </div>
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