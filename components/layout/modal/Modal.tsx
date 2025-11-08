"use client";

import { X } from "lucide-react";
import ModalPortal from "./ModalPortal";
import { useModalStore } from "@/app/lib/store/modalStore";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


export default function Modal() {

    const { isOpen, content, closeModal } = useModalStore();
    const modalRef = useRef(null);    

    useGSAP(() => {
        if (!isOpen || !modalRef.current) return;

        gsap.set(modalRef.current, { scale: 0, opacity: 0, transformOrigin: "center" });

        gsap.to(modalRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            });
    }, [isOpen]);

    const handleClose = () => {
        if (!modalRef.current) return;
        gsap.to(modalRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
            onComplete: closeModal,
        });
    };

    return (
        <ModalPortal>
            <div
                style={{ display: isOpen ? "flex" : "none" }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-1000000"
                onClick={() => handleClose()}
                >
                <div
                    ref={modalRef}
                    
                    className="relative z-1000000 bg-linear-to-br from-cyan-700/20 to-black/50 text-white text-center cursor-default text-base xl:text-xl font-extrabold rounded-md py-20 px-10 max-w-lg mx-4 lg:mx-auto w-full lg:w-2/3 shadow-lg shadow-black/90"
                    onClick={(e) => e.stopPropagation()}
                >
                    <X 
                    className="absolute right-3 top-3 stroke-3 text-cyan-400 hover:scale-110 hover:text-red-600 transition-transform duration-300 cursor-pointer" 
                    onClick={() => handleClose()} 
                    />
                    {content}
                </div>
            </div>
        </ModalPortal>
    );
}