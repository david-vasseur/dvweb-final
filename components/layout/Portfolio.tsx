"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react"

function Portfolio() {

    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const leftRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                end: "top 5%",
                scrub: 1
            }
        })
        .fromTo(cardsRef.current[2], 
            {opacity:0.8, scaleX: 0.3, scaleY: 0.4, yPercent: -10},
            {opacity: 1, scaleX: 1, scaleY: 0.5, yPercent: 0, duration: 1 }
        )
        .fromTo(cardsRef.current[2], 
            {scaleY: 0.5},
            {scaleY: 1, duration: 1 }
        )
        .fromTo(leftRef.current[0],
            {opacity: 0},
            {opacity: 1, duration: 2}, "<"
        )
        .fromTo(leftRef.current[1],
            {opacity: 0},
            {opacity: 1, duration: 2}, "<"
        )
        .fromTo(cardsRef.current[1], 
            {scaleY: 0.5, opacity: 0},
            {scaleY: 1, opacity: 1, duration: 0.5 }
        )
        .fromTo(cardsRef.current[0], 
            {scaleY: 0.5, opacity: 0},
            {scaleY: 1, opacity: 1, duration: 0.5 }
        );

        // gsap.timeline({
        //     scrollTrigger: {
        //         trigger: sectionRef.current,
        //         start: "top top",
        //         end: "+=2000vh",
        //         scrub: true,
        //         pin: true
        //     }
        // })

        // .set(cardsRef.current[0], { z: -60, y: -60 })
        // .set(cardsRef.current[1], { z: -30, y: -30 })
        // .set(cardsRef.current[2], { z: 0, y: 0 })

        // /* Premiere phase */
        // .to(cardsRef.current[2], { z: 10 , opacity: 0, duration: 1})
        // .to(cardsRef.current[1], { z: 0, y: 0, duration: 1 }, "<")
        // .to(cardsRef.current[0], { z: -30, y: -30, duration: 1 }, "<")
        // .to(cardsRef.current[2], { zIndex: -1, duration: 0.01 }, ">")
        // .to(cardsRef.current[2], { z: -60, y: -60, opacity: 1, duration: 0.3 }, ">")

        // /* Deuxieme phase */

        // .to(cardsRef.current[1], { z: 10 , opacity: 0, duration: 1 })
        // .to(cardsRef.current[0], { z: 0 , y: 0, duration: 1 }, "<")
        // .to(cardsRef.current[2], { z: -30 , y: -30, duration: 1 }, "<")
        // .to(cardsRef.current[1], { zIndex: -2, duration: 0.01 }, ">")
        // .to(cardsRef.current[1], { z: -60, y: -60, opacity: 1, duration: 0.3 }, ">")


        const cards = cardsRef.current;

        const positions = [
            { z: -60, y: -60 },
            { z: -30, y: -30 },
            { z: 0,   y: 0 }
        ];

        // initial positions
        cards.forEach((card, i) => gsap.set(card, positions[i]));

        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2000vh",
            scrub: true,
            pin: true
            }
        });

        const order = [2, 1, 0]; // ordre d’empilement initial (top → bottom)

        for (let i = 0; i < order.length - 1; i++) {
            const topIndex = order[i];
            const midIndex = order[(i + 1) % 3];
            const bottomIndex = order[(i + 2) % 3];

            tl
                .to(cards[topIndex], { z: 10, opacity: 0, duration: 1 })
                .to(cards[midIndex], { z: 0, y: 0, duration: 1 }, "<")
                .to(cards[bottomIndex], { z: -30, y: -30, duration: 1 }, "<")
                .to(cards[topIndex], { zIndex: -3 - i, duration: 0.01 }, ">")
                .to(cards[topIndex], { ...positions[0], opacity: 1, duration: 0.3 }, ">")
            }
        });

        // .to(cardsRef.current[1],
        //     { scaleX: 1.0625, zIndex: 3, y: 0, duration: 1}, "<"
        // )
        // .to(cardsRef.current[2],
        //     { scaleX: 1.0625, zIndex: 2, y: -20, duration: 1}, "<"
        // )
        // .to(cardsRef.current[0], { zIndex: 1, duration: 0.1 }, ">")
        // .fromTo(cardsRef.current[0], 
        //     { scaleX: 0.882, opacity: 1, y: 0 },
        //     { scaleX: 0.882, opacity: 1, y: -40, duration: 0.5 }, ">")

        /* Deuxieme phase */
        // .to(cardsRef.current[1],
        //     { scaleX: 1.1, opacity: 0, duration: 1}
        // )
        // .to(cardsRef.current[2],
        //     { scaleX: 1.1333, zIndex: 3, y: 0, duration: 1}, "<"
        // )
        // .to(cardsRef.current[0], { scaleX: 0.941, zIndex:2, y: -20, duration: 1 }, "<")
        // .to(cardsRef.current[1], { zIndex: 1, duration: 0.1 }, ">")
        // .fromTo(cardsRef.current[1], 
        //     { scaleX: 0.937, opacity: 1, y: 0 },
        //     { scaleX: 0.937, opacity: 1, y: -40, duration: 0.5 }, ">")
    

    return (
        <section id="portfolio" ref={sectionRef} className="h-svh w-full overflow-hidden flex flex-col pt-20 xl:pt-5">
            <div className="flex-2 text-center font-black flex items-center justify-center">
                <h2 className="text-3xl 2xl:text-5xl md:text-6xl">Des examples de projet</h2>
            </div>
            <div className="h-[85%] flex">
                <div ref={el => {leftRef.current[0] = el}} className="flex-1 bg-green-400 hidden xl:flex"></div>
                <div className="w-full xl:w-[70%] overflow-hidden relative perspective-midrange transform-3d">
                    <div ref={el => {cardsRef.current[0] = el}} className="absolute w-[85%] h-[85%] rounded-lg bg-red-400 bottom-2 left-1/2 -translate-z-20 -translate-x-1/2 -translate-y-20 origin-center flex items-center justify-center font-black text-4xl">CARD3</div>
                    <div ref={el => {cardsRef.current[1] = el}} className="absolute w-[85%] h-[85%] rounded-lg bg-green-400 bottom-2 left-1/2 -translate-z-15 -translate-x-1/2 -translate-y-10 origin-center flex items-center justify-center font-black text-4xl">CARD2</div>
                    <div ref={el => {cardsRef.current[2] = el}} className="absolute w-[85%] h-[85%] rounded-lg bg-blue-400 bottom-2 left-1/2 -translate-z-10 -translate-x-1/2 origin-center flex flex-col items-center justify-center font-black text-4xl">
                        <Image fill src={"/images/portfolio/logo_daikoomyo.jpeg"} alt="logo daikoomyo" className="object-cover rounded-lg" />
                        <div className="flex-2 w-full h-2/3 relative overflow-hidden rounded-t-lg">
                            
                        </div>
                        <div className="flex-1 h-1/3"></div>
                    </div>
                </div>
                <div ref={el => {leftRef.current[1] = el}} className="flex-1 bg-blue-400 hidden xl:flex"></div>
            </div>
            <div className="flex-1 text-center font-black flex items-center justify-center">
                <span>Lorem ipsum dolor sit amet consectetur.</span>
            </div>
        </section>
    )
}

export default Portfolio