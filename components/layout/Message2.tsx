"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

export default function MessageSection() {
    const container = useRef(null);

    useGSAP(() => {

        const split = new SplitText(".message-clear", { type: "chars" });

        gsap.from(split.chars, {
            opacity: 0,
            y: 20,
            stagger: 0.02,
            duration: 0.6,
            ease: "power2.out",
        });

        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            },
        });

        // baseline fade
        tl.to(".message-clear", { opacity: 0.4, duration: 0.5 }, 0);

        // p1 → p2 → p3
        tl.to(".p1", { opacity: 1, y: 0, duration: 0.6 })
            .to(".p1", { opacity: 0, y: -20, duration: 0.6 })
            .to(".p2", { opacity: 1, y: 0, duration: 0.6 })
            .to(".p2", { opacity: 0, y: -20, duration: 0.6 })
            .to(".p3", { opacity: 1, y: 0, duration: 0.6 })
            .to(".p3", { opacity: 0, y: -20, duration: 0.6 });

        // impact final
        tl.to(".message-clear", {
            opacity: 1,
            scale: 1.4,
            duration: 1.2,
            ease: "power3.out",
        });

    }, []);

    return (
        <section
            ref={container}
            className="h-screen flex items-center justify-center relative bg-gray-950"
        >
            <div className="relative w-[70%] max-w-[900px] text-center">
                {/* MESSAGE CLAIR */}
                <h2 className="message-clear text-3xl md:text-4xl max-w-7xl font-extrabold leading-snug opacity-0">
                    J’aide les entreprises et indépendants<br/>à créer des expériences web<br/>performantes et esthétiques.
                </h2>

                {/* OVERLAY ANIMATIONS */}
                <div className="relative h-[150px] mt-8">
                    <p className="p p1 absolute inset-0 opacity-0 translate-y-6 text-lg md:text-xl">
                        Vous perdez des clients sans le savoir. Une mauvaise expérience ou un
                        manque de clarté peut faire fuir vos prospects.
                    </p>

                    <p className="p p2 absolute inset-0 opacity-0 translate-y-6 text-lg md:text-xl">
                        Des résultats mesurables. Un site optimisé améliore vos conversions
                        et renforce votre crédibilité.
                    </p>

                    <p className="p p3 absolute inset-0 opacity-0 translate-y-6 text-lg md:text-xl">
                        Une expérience qui vous démarque. Votre site devient un atout
                        moderne qui capte et retient l’attention.
                    </p>
                </div>
            </div>
        </section>
    );
}
