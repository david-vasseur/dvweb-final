"use client"

import { forwardRef } from 'react';

interface Props {
    title?: string;
}

const CardPortfolio = forwardRef<HTMLDivElement, Props >(
    ({ title }, ref) => {
        return (
            <div ref={ref} className="absolute w-[85%] h-[85%] rounded-lg bottom-2 left-1/2 -translate-x-1/2 origin-center flex items-center justify-center font-black text-4xl">
                <h3>{title}</h3>
            </div>
        )
    });

CardPortfolio.displayName = "CardProtfolio";

export default CardPortfolio;