"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react'
import { Button } from '../ui/Button';
import ScrollLink from '../feature/ScrollLink';

function Header() {

    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ 
            defaults: { ease: 'power3.out' },
            // Ajoute clearProps pour nettoyer après l'animation
            onComplete: () => {
                gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
                    clearProps: 'all'
                });
            }
        });

        tl.from(titleRef.current, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            delay: 0.3,
        })
        .from(subtitleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
        }, '-=0.6')
        .from(ctaRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
        }, '-=0.4');
    }, { scope: heroRef });

    return (
        <header
            ref={heroRef}
            className="h-screen flex pb-10 lg:pb-0 items-end lg:items-center justify-center relative overflow-hidden px-6"
        >
            
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-blue-500/5 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl font-bold mb-6 bg-linear-to-br from-cyan-400/20 via-cyan-200 to-cyan-500 bg-clip-text text-transparent leading-tight bg-animate"
                >
                    Expériences
                    <br />
                    Web Modernes
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Nous transformons vos idées en applications web exceptionnelles
                    avec Next.js, React Three Fiber et des animations immersives
                </p>

                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg group"
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