"use client"

import faq from '@/data/faq.json';
import CardFaq from '../ui/CardFaq';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function FAQ() {

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef= useRef<HTMLDivElement>(null);

useGSAP(() => {
       
    const master = gsap.timeline({
        scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 50%",
            end: "+=1000",
            scrub: 1,
            // pin: true,
            // pinSpacing: false
        }
    })

    master.to([cardRefs.current[1], cardRefs.current[2], cardRefs.current[3], cardRefs.current[4],],
        { yPercent: -50, duration: 1 }
    )
    .to(cardRefs.current[0], { filter: "grayscale(100%)", duration: 1 }, "<")
    .to([cardRefs.current[2], cardRefs.current[3], cardRefs.current[4],],
        { yPercent: -100, duration: 1 }
    )
    .to(cardRefs.current[1], { filter: "grayscale(100%)", duration: 1 }, "<")
    .to([cardRefs.current[3], cardRefs.current[4],],
        { yPercent: -150, duration: 1 }
    )
    .to(cardRefs.current[2], { filter: "grayscale(100%)", duration: 1 }, "<")
    .to(cardRefs.current[4],
        { yPercent: -200, duration: 1 }
    )
    .to(cardRefs.current[3], { filter: "grayscale(100%)", duration: 1 }, "<")

    }, []);

    return (
        <section id="FAQ" className="">
            <div id="FAQ title" className="flex items-center justify-center p-6 py-15 bg-gray-900 min-h-[40vh]">
                <h2 className="text-6xl xl:text-8xl text-center font-black max-w-7xl">Les questions qui reviennent le plus souvent</h2>
            </div>
            <div ref={wrapperRef} className="relative overflow-hidden h-[90vh]">
                <div ref={containerRef} id="FAQ content" className="">
                    {faq.map((card, index) => (
                        <CardFaq key={index} ref={el => { cardRefs.current[index] = el; }} question={card.question} answer={card.answer} index={index} />
                    ))}
                </div>
            </div> 
            <div id="FAQ cta" className="relative z-15 py-15 flex flex-col items-center justify-center gap-15 bg-gray-900 min-h-[40vh]">
                <h3 className="text-6xl xl:text-8xl text-center font-black text-transparent bg-linear-to-r from-cyan-400 to-cyan-600 bg-clip-text">Pret à passer à l'action ?</h3>
                <Button
                        size="lg"
                        className="bg-linear-to-r from-cyan-500 to-cyan-800 hover:from-cyan-600 hover:to-cyan-800 text-white px-8 py-6 text-lg group cursor-pointer"
                    >
                        Prenons contact !
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
            </div>                       
        </section>
    )
}

export default FAQ;