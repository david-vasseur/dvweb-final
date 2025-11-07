'use client';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useEffect } from 'react';


export default function ScrollLink({ to, children }: { to: string, children: React.ReactNode }) {
    
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        
        gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: to, offsetY: 70 }, 
            ease: "power3.inOut"
        });
    };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    );
}
