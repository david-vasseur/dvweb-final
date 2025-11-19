"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react'
import { Button } from '../ui/Button';
import ScrollLink from '../feature/ScrollLink';
import { SplitText } from 'gsap/SplitText';
import Scene from '../3d/Scene';
import { Logo } from '../3d/Logo';
import * as THREE from "three";

type WordKey = "inspirer" | "captiver" | "séduire";

function Header() {

    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<THREE.Group>(null);
    const circleRef = useRef(null);

    const wordsKey: WordKey[] = ["inspirer", "captiver", "séduire"];
    const phraseEnds = [
        "vos clients dès le premier clic.",
        "vos clients à chaque visite.",
        "vos clients de façon mémorable."
    ];

    // fonction pour lancer l'animation du logo une fois le canvas chargé
    const handleSceneReady = () => {
        const waitForLogo = () => {
            if (!logoRef.current) {
                requestAnimationFrame(waitForLogo);
                return;
            }

            gsap.to(logoRef.current.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.5,
                ease: "power3.out",
                onComplete: () => {
                // Quand le logo est prêt → lancer le reste
                startHeroAnimation();
            },
            });
        };

        waitForLogo();
    };

    // fonction pour lancer l'animation des élements du Hero une fois l'animation du logo terminée
    const startHeroAnimation = () => {
        if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return;

        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
                gsap.set(
                    [titleRef.current, subtitleRef.current, ctaRef.current],
                    { clearProps: "all" }
                );
            },
        });

        tl.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1
        })
        .to(
            subtitleRef.current,
            {
                y: 0,
                opacity: 1,
                duration: 1,
            },
            "-=0.6"
        )
        .to(
            Array.from(ctaRef.current.children),
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
            },
            "-=0.4"
        );
    };



    useGSAP(() => {

        if (!subtitleRef.current || !ctaRef.current?.children || !titleRef.current) return;

        gsap.set(titleRef.current, { opacity: 0, y: 100 });
        gsap.set(subtitleRef.current, { opacity: 0, y: 50 });
        gsap.set(ctaRef.current.children, { opacity: 0, y: 30 });

        const colors = {
            inspirer: "#22d3ee",   // cyan
            captiver: "#3b82f6",   // bleu
            séduire: "#a855f7",    // violet
            };

        const updateSubtitle = () => {
            if (!subtitleRef.current) return;

            // Tirage aléatoire
            const randomWords = [...wordsKey].sort(() => Math.random() - 0.5);
            const randomEnd = phraseEnds[Math.floor(Math.random() * phraseEnds.length)];

            // Appliquer les couleurs à chaque mot
            const coloredWords = randomWords
                .map((word) => `<span style="color:${colors[word]}; font-weight:600">${word}</span>`)
                .join(" ");

            // Construire le texte
            subtitleRef.current.innerHTML = `
                Ensembles, nous construisons un site web pour 
                <span class="dynamic-part">${coloredWords} ${randomEnd}</span>
            `;

            // SplitText sur la partie dynamique uniquement
            const dynamic = subtitleRef.current.querySelector(".dynamic-part");
            const split = new SplitText(dynamic, { type: "words" });

            // Animation GSAP
            gsap.from(split.words, {
                y: (i) => (i % 2 === 0 ? -80 : 80),
                rotationX: (i) => (i % 2 === 0 ? -90 : 90),
                opacity: 0,
                stagger: 0.05,
                duration: 1.2,
                ease: "back.out(1.7)",
            });
        };

        gsap.to(circleRef.current, {
            scale: 4, duration: .4, delay: .1, ease: "power2.in"
        })

        // Lancer la première fois
        updateSubtitle();

        // Changer toutes les 5 secondes
        const interval = setInterval(updateSubtitle, 5000);

        return () => clearInterval(interval);
    }, { scope: heroRef });

    return (
        <header
            ref={heroRef}
            className="h-svh w-svw flex  items-end bg-linear-to-b from-cyan-700 to-cyan-950 justify-center relative overflow-hidden px-6"
        >
            <div ref={circleRef} className="absolute z-20 w-full h-screen instet-0 bg-radial from-5% to-40% from-black/10 to-black pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-cyan-500/50 to-cyan-500/5" />
            <Scene onReady={handleSceneReady}>
                <Logo ref={logoRef} />
            </Scene>         

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <h1
                    ref={titleRef}
                    className={`text-[3rem] md:text-6xl 2xl:text-8xl font-black mb-6 bg-linear-to-br from-cyan-400/20 via-cyan-200 to-cyan-500 bg-clip-text text-transparent leading-tight bg-animate`}
                >
                    Expériences
                    <br />
                    Web Modernes
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-[1.1rem] md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                </p>

                <div ref={ctaRef} className="flex flex-col mb-10 lg:mb-30 sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg group cursor-pointer"
                    >
                        Démarrer un projet
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-300 px-8 py-6 text-lg"
                    >
                        <ScrollLink to='#portfolio'>
                            Voir nos réalisations 
                        </ScrollLink>                                                   
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header;