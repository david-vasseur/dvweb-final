import Image from 'next/image';
import { forwardRef } from 'react';

const CardFaq = forwardRef<HTMLDivElement, { question: string; answer: string; index: number }>(
    ({ question, answer, index }, ref) => {

        const colors = ["#0E7490","#11697F","#155E75","#145468","#164E63"]

        return (
            <div id={`${index + 1}`} ref={ref} className={`relative h-[30vh] xl:h-[30vh] z-[${index + 1}]`}>
                {/* PENSER A CORRIGER CA / PETIT HACK TEMPORAIRE */}
                <div className="absolute hidden bg-cyan-700 text-cyan-800 lg:bg-text-900" />
                
                <div
                    id="card-inner"
                    className={`relative will-change-transform w-full h-full p-2 xl:p-[2em] flex gap-[4em]`}
                    style={{ backgroundColor: colors[index] }}
                >
                    <div id="card-content" className="flex-3 text-center">
                        <h3 className="text-xl xl:text-5xl font-black mb-10 xl:mb-20">{question}</h3>
                        <p className="text-sm xl:text-2xl font-semibold text-gray-800">{answer}</p>
                    </div>

                    <div
                        id="card-img"
                        className="hidden lg:flex lg:flex-1 aspect-video rounded-lg overflow-hidden"
                    >
                        <Image
                            width={400}
                            height={400}
                            src={`/images/faq/card-${index + 1}.webp`}
                            alt={question}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        );
    }
);

CardFaq.displayName = "CardFaq";

export default CardFaq;
