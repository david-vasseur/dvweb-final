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

function Header() {

    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<THREE.Group>(null);

    const wordsKey = ["inspirer", "captiver", "séduire"];
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
            ctaRef.current.children,
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

        if (!subtitleRef.current || !ctaRef.current || !titleRef.current) return;

        gsap.set(titleRef.current, { opacity: 0, y: 100 });
        gsap.set(subtitleRef.current, { opacity: 0, y: 50 });
        gsap.set(ctaRef.current, { opacity: 0, y: 30 });

        const updateSubtitle = () => {
            if (!subtitleRef.current) return;
            // Choisir un ordre aléatoire des mots clés
            const randomWords = [...wordsKey].sort(() => Math.random() - 0.5);
            const randomEnd = phraseEnds[Math.floor(Math.random() * phraseEnds.length)];

            subtitleRef.current.innerHTML = `Avec nous, vous construisez un site web pour ${randomWords.join(" ")} ${randomEnd}`;

            // Split en mots pour animation
            const split = new SplitText(subtitleRef.current, { type: "words" });

            split.words.forEach((word) => {
                const wrapper = document.createElement("span");
                wrapper.style.display = "inline-block";
                wrapper.style.overflow = "hidden";
                wrapper.style.verticalAlign = "top";
                word.parentNode?.insertBefore(wrapper, word);
                wrapper.appendChild(word);
            });

            gsap.from(split.words, {
                y: (i) => (i % 2 === 0 ? -100 : 100),
                rotationX: (i) => (i % 2 === 0 ? -90 : 90),
                opacity: 0,
                stagger: 0.05,
                duration: 1.2,
                ease: "back.out(1.7)",
            });
        };

        // Lancer la première fois
        updateSubtitle();

        // Changer toutes les 5 secondes
        const interval = setInterval(updateSubtitle, 5000);

        // const tl = gsap.timeline({ 
        //     defaults: { ease: 'power3.out' },
        //     // Ajoute clearProps pour nettoyer après l'animation
        //     onComplete: () => {
        //         gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        //             clearProps: 'all'
        //         });
        //     }
        // });

        // if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return

        // tl.from(titleRef.current, {
        //     y: 100,
        //     opacity: 0,
        //     duration: 1.2,
        //     delay: 0.6,
        // })
        // .from(subtitleRef.current, {
        //     y: 50,
        //     opacity: 0,
        //     duration: 1,
        // }, '-=0.6')
        // .from(ctaRef.current.children, {
        //     y: 30,
        //     opacity: 0,
        //     duration: 0.8,
        //     stagger: 0.2
        // }, '-=0.4');

        return () => clearInterval(interval);
    }, { scope: heroRef });

    return (
        <header
            ref={heroRef}
            className="h-svh w-svw flex pb-10 lg:pb-30 items-end  justify-center relative overflow-hidden px-6"
        >
            <Scene onReady={handleSceneReady}>
                <Logo ref={logoRef} />
            </Scene>
            
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-blue-500/5 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <h1
                    ref={titleRef}
                    className={`text-[3rem] md:text-8xl font-black mb-6 bg-linear-to-br from-cyan-400/20 via-cyan-200 to-cyan-500 bg-clip-text text-transparent leading-tight bg-animate`}
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

                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
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