"use client"

import { create } from "zustand";

interface MacState {
    isMac: boolean;
    setIsMac: (value: boolean) => void;
    detectMac: () => () => void;
}

export const useMacStore = create<MacState>((set) => ({
    isMac: false,

    setIsMac: (value) => set({ isMac: value }),

    detectMac: () => {
        const check = () => {
            const isMac = navigator.userAgent.includes("Mac") ||
                          navigator.platform.toUpperCase().includes("MAC");
            set({ isMac });
        };

        check(); // première détection au mount

        // Très rare, mais on reste propre
        window.addEventListener("useragentchange", check as any);

        return () => window.removeEventListener("useragentchange", check as any);
    },
}));
