"use client";

import { useEffect } from "react";

export default function TestMobile() {
    useEffect(() => {
        console.log("matchMedia:", window.matchMedia("(max-width: 768px)").matches);
    }, []);

  return <div>Voir console</div>;
}
