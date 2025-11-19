"use client"

import { animatePageIn } from "@/utils/animations";
import { useEffect } from "react";

const Template = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
        animatePageIn()
    }, [])

    return (
        <div>
            <div id="page-transition-top" className="h-1/2 w-screen bg-cyan-800 fixed z-500 top-0 left-0" />
            <div id="page-transition-bottom" className="h-1/2 w-screen bg-cyan-800 fixed z-500 bottom-0 left-0" />
            <div id="page-transition-left" className="min-h-screen w-1/2 bg-cyan-800 fixed z-500 top-0 left-0" />
            <div id="page-transition-right" className="min-h-screen w-1/2 bg-cyan-800 fixed z-500 top-0 right-0" />
            {children}
        </div>
    )
}

export default Template;