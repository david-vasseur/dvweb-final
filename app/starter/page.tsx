"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";

export default function Page() {
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const featuresSectionRef = useRef(null);
    const headlineRef = useRef(null);
    const splitRef = useRef(null);
    const listRef = useRef<HTMLUListElement>(null);
    const ctaFinalRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        if (!leftRef.current || !rightRef.current || !sectionRef.current || !headerRef.current || !listRef.current || !imageRef.current) return;
        const leftSection = leftRef.current.children;
        const listItems = listRef.current.children;
        
       gsap.set(rightRef.current, { yPercent: -200 });

        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=1200vh",
                scrub: 1.5, 
                pin: stickyRef.current,
                invalidateOnRefresh: true,
            }
        });

        tl1.to(leftSection, { 
            yPercent: -200, 
            ease: "none" 
        }, 0)
        .to(rightRef.current, { 
            yPercent: 0,
            ease: "none" 
        }, 0);
    /* Animation Header */

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    })
    .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    },
    "-=0.4"
    )
    .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
    },
    "-=0.4"
    );

        /* Cta Section Animation */

        // SplitText : titres en words + chars
    const split = new SplitText(splitRef.current, {
        type: "chars",
    });
    const chars = split.chars;

    gsap.set(chars, { yPercent: 100, opacity: 0 });

    gsap.timeline({
        scrollTrigger: {
        trigger: featuresSectionRef.current,
        start: "top 75%",
        once: true,
        },
    })
        // ---- Headline animation ----
        .to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.02,
        })

        // ---- List fade + slide ----
        .to(
        listRef.current,
        {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
        },
        "-=0.3"
        )
        .from(
        listItems,
        {
            x: -20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
        },
        "<"
        )

        // ---- CTA ----
        .to(
        ctaFinalRef.current,
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
        },
        "-=0.2"
        );

        /* Image Animation */
        gsap.set(imageRef.current, { scale: 0.1 })
        gsap.fromTo(imageRef.current, 
            { scale: 0.1 },
            { scale: 0.8, scrollTrigger: {
                trigger: featuresSectionRef.current,
                start: "top bottom",
                end: "bottom center",
                scrub: 1.2
            } }
        )
        
    }, []);

    return (
        <div className="w-screen">
            <header
                ref={headerRef}
                className="relative flex items-center justify-center h-screen w-full overflow-hidden"
            >
                {/* Background Image */}
                <video
                    src="/videos/starter.mp4"
                    autoPlay
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 to-gray-700/30" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center px-6">
                    <h1
                        ref={titleRef}
                        className="text-white text-6xl md:text-7xl font-bold mb-6 opacity-0 translate-y-10"
                    >
                        Votre site vitrine professionnel pour 500€ HT
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-white/90 text-xl md:text-2xl max-w-2xl mb-10 opacity-0 translate-y-10"
                    >
                        Offrez une présence en ligne moderne, rapide et efficace — même avec un petit budget.
                    </p>

                    <button
                        ref={ctaRef}
                        className="px-10 py-4 bg-cyan-400 text-black font-semibold text-lg rounded-xl shadow-xl hover:scale-105 transition-transform opacity-1 translate-y-10"
                    >
                        Voir l’offre Starter →
                    </button>
                </div>
            </header>

            <section ref={sectionRef} className="relative w-full">
                <div ref={stickyRef} className="sticky z-500 flex top-0 left-0 h-screen w-full overflow-hidden bg-linear-to-b from-gray-900/90 to-cyan-950">
                    <div ref={leftRef} className="relative flex-1 h-full ">
                          {/* TEXT 1 — Intro / valeur */}
                        <div className="relative h-svh w-full flex flex-col justify-center items-start px-16 text-white">
                            <h2 className="text-5xl font-bold mb-6">Les fonctionnalités essentielles</h2>
                            <ul className="text-xl leading-relaxed space-y-3 max-w-xl">
                                <li>• 1 homepage moderne & orientée conversion</li>
                                <li>• 3 à 5 sections essentielles (services, contact, présentation…)</li>
                                <li>• Formulaire de contact intégré</li>
                                <li>• Version mobile optimisée</li>
                                <li>• SEO technique inclus</li>
                            </ul>
                        </div>

                        {/* IMAGE 2 — Fonctionnalités */}
                        <div className="relative h-svh w-full flex justify-center items-center">
                            <img 
                                src="/images/seo-optimisation.webp" 
                                alt="Fonctionnalités site Starter"
                                className="w-[70%] rounded-2xl shadow-2xl"
                            />
                        </div>

                        {/* TEXT 3 — CTA Final */}
                        <div className="relative h-svh w-full flex flex-col justify-center items-start px-16 text-white">
                            <h2 className="text-5xl font-bold mb-6">Un site qui vous fait gagner du temps</h2>
                            <p className="text-xl leading-relaxed max-w-xl">
                                Grâce à une mise en ligne rapide et un design efficace,
                                votre site Starter vous permet de vous concentrer sur votre activité.
                                <br /><br />
                                Vous êtes visible, crédible, professionnel — dès le premier jour.
                            </p>
                            <button className="mt-10 px-8 py-3 bg-white text-cyan-600 font-semibold rounded-xl shadow-lg hover:scale-105 transition-all">
                                Demander un devis gratuit →
                            </button>
                        </div>
                    </div>
                    <div ref={rightRef} className="relative flex-1 h-full">
                        {/* IMAGE 3 — Mockup principal */}
                        <div className="relative h-svh w-full flex justify-center items-center">
                            <img 
                                src="/images/focus.webp" 
                                alt="Mockup site starter"
                                className="w-[70%] rounded-2xl shadow-2xl"
                            />
                        </div>

                        {/* TEXT 2 — Fonctionnalités clés */}
                        <div className="relative h-svh w-full flex flex-col justify-center items-start px-16 text-white">
                            <h2 className="text-5xl font-bold mb-6">Votre prestation SEO en 5 points clairs</h2>
                            <ul className="text-xl leading-relaxed space-y-3 max-w-xl">
                                <li>Audit technique + audit de contenu + analyse concurrentielle
                                    → Pour identifier ce qui bloque votre visibilité actuelle.</li>
                                <li>Identification des termes réellement recherchés par vos futurs clients
                                    → Pour cibler les bonnes opportunités de trafic.</li>
                                <li>Amélioration de la vitesse, du mobile, des balises, de l’architecture des pages
                                    → Pour rendre votre site performant et compréhensible pour Google.</li>
                                <li>Réécriture ou création de pages, articles, textes optimisés
                                    → Pour répondre aux besoins des internautes et se placer devant la concurrence.</li>
                                <li>Rapports clairs + recommandations + ajustements
                                    → Pour garantir une progression durable et mesurable du trafic.</li>
                            </ul>
                        </div>

                        {/* IMAGE 1 — Showcase final */}
                        <div className="relative h-svh w-full flex justify-center items-center">
                            <img 
                                src="/images/essentials.webp" 
                                alt="Exemple site final"
                                className="w-[75%] rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>        
            </section>
            <section
                ref={featuresSectionRef}
                className="relative h-svh w-full text-white flex flex-col items-center justify-center px-10 bg-linear-to-t from-gray-900 to bg-cyan-950"
            >
                {/* IMAGE */}
                <Image ref={imageRef} src={"/images/service1.png"} alt="image cta" fill className="opacity-20 scale-70 grayscale-10" />
                {/* AMORCE */}
                <h2
                    ref={headlineRef}
                    className="text-5xl md:text-6xl font-bold mb-12 opacity-0"
                >
                    <span ref={splitRef}>Tout ce que votre site Starter inclut</span>
                </h2>

                {/* LISTE */}
                <ul
                    ref={listRef}
                    className="text-xl space-y-4 max-w-2xl opacity-0"
                >
                    <li className="flex items-start gap-3">
                    <span className="text-cyan-400 text-2xl">✓</span> Design moderne et responsive
                    </li>
                    <li className="flex items-start gap-3">
                    <span className="text-cyan-400 text-2xl">✓</span> 1 homepage + 3–5 sections essentielles
                    </li>
                    <li className="flex items-start gap-3">
                    <span className="text-cyan-400 text-2xl">✓</span> Optimisation mobile & tablette
                    </li>
                    <li className="flex items-start gap-3">
                    <span className="text-cyan-400 text-2xl">✓</span> Formulaire de contact intégré
                    </li>
                    <li className="flex items-start gap-3">
                    <span className="text-cyan-400 text-2xl">✓</span> SEO technique (balises, structure, vitesse)
                    </li>
                    <li className="flex items-start gap-3">
                    <span className="text-cyan-400 text-2xl">✓</span> Hébergement & conseils techniques
                    </li>
                </ul>

                {/* CTA */}
                <button
                    ref={ctaFinalRef}
                    className="mt-14 px-10 py-4 bg-cyan-400 text-black font-semibold text-lg rounded-xl shadow-xl hover:scale-105 transition-transform opacity-0"
                >
                    Demander un devis gratuit →
                </button>
            </section>
        </div>
    );
}


