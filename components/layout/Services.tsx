"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import React, { useRef } from 'react'

function Services() {

    const cardsRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef(null);
    const titleCard1Ref = useRef(null);
    const titleCard2Ref = useRef(null);
    const titleCard3Ref = useRef(null);
    const ctaCard1Ref = useRef(null);
    const ctaCard2Ref = useRef(null);
    const ctaCard3Ref = useRef(null);
    const horizonRef = useRef(null);
    const pathRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        if (!cardsRef.current || !titleRef.current || !titleCard1Ref.current || !ctaCard1Ref.current || !ctaCard2Ref.current || !ctaCard3Ref.current || !horizonRef.current) return

        const cards = gsap.utils.toArray(cardsRef.current.children);

        const split = new SplitText(titleRef.current, { type: "chars" });

        const path = pathRef.current;
        if (path) {
            const pathLength = path.getTotalLength();

            gsap.set(path, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength, // ← inversion ici
            });

            gsap.to(path, {
                strokeDashoffset: 0, // ← on revient à 0
                scrollTrigger: {
                trigger: path,
                start: "top 90%",
                end: "bottom bottom",
                scrub: 0.5,
                },
                ease: "none",
            });
        }

        gsap.fromTo(horizonRef.current, 
            { width: "10%" },
            { width: "100%", scrollTrigger: {
                trigger: horizonRef.current,
                start: "top 80%",
                end: "top 50%",
                scrub: 2.5
            }}
        )

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 90%",
                end: "top 50%",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(
            cards,
            { y: 200, scaleX: 0, opacity: 0 },
            { y: 0, scaleX: 1, opacity: 1, duration: 0.7, stagger: 0.3, ease: "power2.out" }
        )
        .fromTo(
            [titleCard1Ref.current, titleCard2Ref.current, titleCard3Ref.current],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
            ">" 
        )
        .fromTo(
            [ctaCard1Ref.current, ctaCard2Ref.current, ctaCard3Ref.current],
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
            "<"
        );


        gsap.from(split.chars, {
            y: (i) => (i % 2 === 0 ? -80 : 80),
            rotationX: (i) => (i % 2 === 0 ? -90 : 90),
            opacity: 0,
            stagger: 0.05,
            duration: 0.7,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
                end: "bottom 50%",
                toggleActions: "play none none reverse",
            },
        });

    }, [])

    return (
        <section id="services" className="relative mx-auto min-h-svh flex flex-col items-center justify-evenly py-24 overflow-hidden">

            {/* --- SVG décoratif animé --- */}
<svg
  className="absolute z-1 top-0 left-0 w-full h-full pointer-events-none opacity-40"
  viewBox="0 0 160 90"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#0ea5e9" />
      <stop offset="30%" stopColor="#38bdf8" />
      <stop offset="60%" stopColor="#e0f2fe" />
      <stop offset="100%" stopColor="#0ea5e9" />
    </linearGradient>
  </defs>

  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
    <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>

  <path
  ref={pathRef}
    d="M 0.00,10.00
           C 40.00,10.00 60.00,15.00 60.00,25.00
             60.00,50.00 15.00,40.00 15.00,55.00
             15.00,70.00 30.00,70.00 40.00,70.00
             60.00,70.00 70.00,45.00 95.00,45.00
             115.00,45.00 135.00,70.00 160.00,70.00"
    stroke="url(#blue-gradient)"
    strokeWidth="1"
    filter="url(#glow)"
    fill="none"
  />
</svg>


            {/* Svg Card */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id="card" clipPathUnits="objectBoundingBox">
                        <path d="
                           M 0.0667,0
                            C 0.0667,0 0.2667,0 0.2667,0
                            0.3333,0 0.3,0.05 0.3667,0.05
                            0.3667,0.05 0.6333,0.05 0.6333,0.05
                            0.7,0.05 0.6667,0 0.7333,0
                            0.7333,0 0.9333,0 0.9333,0
                            1,0 1,0.025 1,0.05
                            1,0.05 1,0.875 1,0.875
                            1,0.9 1,0.925 0.9333,0.925
                            0.9333,0.925 0.7,0.925 0.7,0.925
                            0.5667,0.925 0.6667,1 0.5333,1
                            0.5333,1 0.0667,1 0.0667,1
                            0,1 0,0.975 0,0.95
                            0,0.95 0,0.05 0,0.05
                            0,0.025 0,0 0.0667,0 Z
                        " />   
                    </clipPath>
                </defs>
            </svg>

            <div
                ref={horizonRef}
                className="absolute z-20 top-20 w-full h-2 bg-linear-to-r from-transparent via-cyan-300/50 to-transparent"
                style={{
                    clipPath: "ellipse(50% 15% at 50% 0%)",
                }}
            />

            {/* Fond */}
            <div className="absolute inset-0 z-0 bg-gray-900" />

            {/* Titre */}
            <h2 ref={titleRef} className="z-10 text-3xl 2xl:text-5xl md:text-6xl font-bold text-center text-white md:max-w-5xl leading-tight">
                Des solutions web{" "}
                <br/>
                <span className="text-cyan-300">adaptées à vos besoins</span>
            </h2>

            {/* Cartes */}
            <div
                ref={cardsRef}
                className="z-10 container mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8 mt-12"
            >
                {/* Service 1 */}
                <div 
                    className="relative aspect-3/4 p-8 flex flex-col justify-between drop-shadow-[8px_8px_10px_rgba(0,0,0,0.7)] hover:drop-shadow-[12px_12px_30px_rgba(0,0,0,0.5)] transition-all duration-500 group"
                >
                    <h3 ref={titleCard1Ref} className="absolute top-5 left-1/2 -translate-x-1/2 text-xl 2xl:text-3xl font-semibold text-white mb-4">Starter</h3>
                    <button ref={ctaCard1Ref} className="-z-2 absolute bottom-8 right-12 2xl:right-10 2xl:px-5 text-white text-sm 2xl:text-base py-1 lg:py-2 transition-all duration-300 hover:tracking-widest hover:text-cyan-200 cursor-pointer">
                        En savoir plus
                    </button>
                    <div className="relative flex flex-col justify-between h-full w-full bg-linear-to-b from-transparent from-55% via-cyan-900 to-cyan-500 overflow-hidden transition-all duration-500 [clip-path:url(#card)]">
                        <div className="absolute inset-0 w-full h-1/2 border-b-10 border-b-transparent overflow-hidden bg-transparent transform:translateZ(0) group-hover:scale-108 duration-500 transition-all">
                            <Image src={"/images/service1.png"} fill alt="mockup1" className="object-cover object-center inset-0! m-0!" />
                        </div>
                        <div className="flex-1 h-1/2" />
                        <div className="flex-1 flex flex-col justify-between px-4 2xl:px-8 py-3 mt-6 bg-linear-to-br from-cyan-900 to-cyan-500">
                            <p className="text-cyan-100 text-lg leading-relaxed mt-8">
                                Un site vitrine professionnel, rapide et optimisé pour le
                                référencement local. Idéal pour lancer votre activité avec un
                                budget maîtrisé.
                            </p>
                            <div className="mt-8">
                                <p className="text-base 2xl:text-xl font-medium text-cyan-300">
                                    à partir de 500 € HT
                                </p>
                            </div>
                        </div>
                    </div>                    
                </div>

                {/* Service 2 */}
                <div 
                    className="relative aspect-3/4 p-8 flex flex-col justify-between drop-shadow-[8px_8px_10px_rgba(0,0,0,0.7)] hover:drop-shadow-[12px_12px_30px_rgba(0,0,0,0.5)] transition-all duration-500 group"
                >
                    <h3 ref={titleCard2Ref} className="absolute top-5 left-1/2 -translate-x-1/2 text-xl 2xl:text-3xl font-semibold text-white mb-4">Business</h3>
                    <button ref={ctaCard2Ref} className="-z-2 absolute bottom-8 right-12 2xl:right-10 2xl:px-5 text-white text-sm 2xl:text-base py-1 lg:py-2 transition-all duration-300 hover:tracking-widest hover:text-cyan-200 cursor-pointer">
                        En savoir plus
                    </button>
                    <div className="relative flex flex-col justify-between h-full w-full bg-linear-to-b from-transparent from-55% via-cyan-900 to-cyan-500 overflow-hidden transition-all duration-500 [clip-path:url(#card)]">
                        <div className="absolute inset-0 w-full h-1/2 border-b-10 border-b-transparent overflow-hidden bg-transparent transform:translateZ(0) group-hover:scale-108 duration-500 transition-all">
                            <Image src={"/images/service2.png"} fill alt="mockup1" className="object-cover object-center inset-0! m-0!" />
                        </div>
                        <div className="flex-1 h-1/2" />
                        <div className="flex-1 flex flex-col justify-between px-4 2xl:px-8 py-3 mt-6 bg-linear-to-br from-cyan-900 to-cyan-500">
                            <p className="text-cyan-100 text-lg leading-relaxed mt-8">
                                Un site complet et administrable, avec CMS, SEO avancé et
                                intégration des réseaux sociaux. Conçu pour les entreprises en
                                croissance.
                            </p>
                            <div className="mt-8">
                                <p className="text-base 2xl:text-xl font-medium text-cyan-300">
                                    à partir de 1200 € HT
                                </p>
                            </div>
                        </div>
                    </div>                    
                </div>


                {/* Service 3 */}
                <div 
                    className="relative aspect-3/4 p-8 flex flex-col justify-between drop-shadow-[8px_8px_10px_rgba(0,0,0,0.7)] hover:drop-shadow-[12px_12px_30px_rgba(0,0,0,0.5)] transition-all duration-500 group"
                >
                    {/* Title et Bouton absolute */}
                    <h3 ref={titleCard3Ref} className="absolute top-5 left-1/2 -translate-x-1/2 text-xl 2xl:text-3xl font-semibold text-white mb-4">Premium</h3>
                    <button ref={ctaCard3Ref} className="-z-2 absolute bottom-8 right-12 2xl:right-10 2xl:px-5  text-white text-sm 2xl:text-base py-1 lg:py-2 transition-all duration-300 hover:tracking-widest hover:text-cyan-200 cursor-pointer">
                        En savoir plus
                    </button>
                    {/* Card clipped */}
                    <div className="relative flex flex-col justify-between  h-full w-full bg-linear-to-b from-transparent from-55% via-cyan-900 to-cyan-500 overflow-hidden transition-all duration-500 [clip-path:url(#card)]">
                        <div className="absolute inset-0 w-full h-1/2 border-b-10 border-b-transparent overflow-hidden bg-transparent transform:translateZ(0) group-hover:scale-108 duration-500 transition-all">
                            <Image src={"/images/service3.png"} fill alt="mockup1" className="object-cover object-center inset-0! m-0!" />
                        </div>
                        <div className="flex-1 h-1/2" />
                        <div className="flex-1 flex flex-col justify-between px-4 2xl:px-8 py-3 mt-6 bg-linear-to-br from-cyan-900 to-cyan-500">
                            <p className="text-cyan-100 text-lg leading-relaxed mt-8">
                                Une solution sur mesure : design exclusif, animations, hébergement
                                premium et stratégie digitale complète.
                            </p>
                            <div className="mt-8">
                                <p className="text-base 2xl:text-xl font-medium text-cyan-300">
                                    sur devis
                                </p>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </section>
    )
}

export default Services;