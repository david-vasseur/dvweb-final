"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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

    useGSAP(() => {
        if (!leftRef.current || !rightRef.current || !sectionRef.current || !headerRef.current) return;
        const leftSection = leftRef.current.children;
        const rightSection = rightRef.current.children;
        
        gsap.set(rightRef.current, { y: "-200vh" });

        gsap.timeline({
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=900vh",
            scrub: 1.5,
            pin: stickyRef.current,
            invalidateOnRefresh: true,
        }
    })
    .to(leftSection, { yPercent: -200, ease: "none" })
    .to(rightRef.current, { y: 0, ease: "none" }, 0);

    /* Animation Header */

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    })
        .to(
        subtitleRef.current,
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
        },
        "-=0.4"
        )
        .to(
        ctaRef.current,
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
        },
        "-=0.4"
        );
        
    }, []);

    return (
        <div className="w-screen">
            <header
                ref={headerRef}
                className="relative flex items-center justify-center h-screen w-full overflow-hidden"
            >
                {/* Background Image */}
                <img
                    src="/images/service1.png"
                    alt="Site Starter mockup"
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
                        className="px-10 py-4 bg-cyan-400 text-black font-semibold text-lg rounded-xl shadow-xl hover:scale-105 transition-transform opacity-0 translate-y-10"
                    >
                        Voir l’offre Starter →
                    </button>
                </div>
            </header>

            <section ref={sectionRef} className="relative w-full">
                <div ref={stickyRef} className="sticky z-500 flex top-0 left-0 h-screen w-full overflow-hidden bg-linear-to-b from-gray-900/90 to-cyan-950">
                    <div ref={leftRef} className="relative flex-1 h-full ">
                          {/* TEXT 1 — Intro / valeur */}
                        <div className="relative h-svh w-full flex flex-col justify-center items-start px-16 bg-cyan-400/10 text-white">
                            <h2 className="text-5xl font-bold mb-6">Un site vitrine professionnel pour 500 € HT</h2>
                            <p className="text-xl leading-relaxed max-w-xl">
                                Idéal pour lancer votre activité avec un budget maîtrisé.
                                Votre site Starter met en avant votre entreprise grâce à une structure claire,
                                un design moderne et un message impactant.
                            </p>
                        </div>

                        {/* IMAGE 2 — Fonctionnalités */}
                        <div className="relative h-svh w-full flex justify-center items-center">
                            <img 
                                src="/images/service1.png" 
                                alt="Fonctionnalités site Starter"
                                className="w-[70%] rounded-2xl shadow-2xl"
                            />
                        </div>

                        {/* TEXT 3 — CTA Final */}
                        <div className="relative h-svh w-full flex flex-col justify-center items-start px-16 bg-cyan-800/10 text-white">
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
                        {/* IMAGE 1 — Mockup principal */}
                        <div className="relative h-svh w-full flex justify-center items-center">
                            <img 
                                src="/images/service2.png" 
                                alt="Mockup site starter"
                                className="w-[70%] rounded-2xl shadow-2xl"
                            />
                        </div>

                        {/* TEXT 2 — Fonctionnalités clés */}
                        <div className="relative h-svh w-full flex flex-col justify-center items-start px-16 bg-cyan-600/10 text-white">
                            <h2 className="text-5xl font-bold mb-6">Les fonctionnalités essentielles</h2>
                            <ul className="text-xl leading-relaxed space-y-3 max-w-xl">
                                <li>• 1 homepage moderne & orientée conversion</li>
                                <li>• 3 à 5 sections essentielles (services, contact, présentation…)</li>
                                <li>• Formulaire de contact intégré</li>
                                <li>• Version mobile optimisée</li>
                                <li>• SEO technique inclus</li>
                            </ul>
                        </div>

                        {/* IMAGE 3 — Showcase final */}
                        <div className="relative h-svh w-full flex justify-center items-center">
                            <img 
                                src="/images/service3.png" 
                                alt="Exemple site final"
                                className="w-[75%] rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>        
            </section>
            <section className="relative z-1000 h-svh bg-green-950 w-full"></section>
        </div>
    );
}


