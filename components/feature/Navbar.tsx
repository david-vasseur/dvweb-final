"use client";

import { useDeviceStore } from "@/app/lib/store/useDeviceStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { MenuIcon, X } from "lucide-react";
import { useModalStore } from "@/app/lib/store/modalStore";
import { SignInForm } from "./form/SignInForm";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
function Navbar() {
    const [hovered, setHovered] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const { isMobile } = useDeviceStore();
    const { openModal, isOpen } = useModalStore();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const NUM_BANDS = 4;
	const bands = Array.from({ length: NUM_BANDS });

    const { user } = useUser();

    const pathname = usePathname();  

    useGSAP(() => {
        if (navRef.current) {
            gsap.to(
                navRef.current,
                {
                    translateY: 0, 
                    duration: 2,
                    ease: "power3.out",
                }
            );
        }
    }, [pathname]);


    return (
        <>
            {pathname !== "/dashboard" ? (
                <nav
                    ref={navRef}
                    className={`fixed top-0 left-0 w-full z-100001 flex justify-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] -translate-y-20`}
                >
                    {/* --- SVG Clip Path Definition (ton path exact) --- */}
                    <svg width="0" height="0" className="absolute">
                        <defs>
                            <clipPath id="nav-clip" clipPathUnits="objectBoundingBox">
                                {/* Path normalisé pour clipPath (en coordonnées 0–1) */}
                                <path
                                d="M0,0
                                    C0,0 1,0 1,0
                                    0.984,0 0.984,0.667 0.953,0.667
                                    0.953,0.667 0.594,0.667 0.594,0.667
                                    0.578,0.667 0.578,1 0.562,1
                                    0.562,1 0.438,1 0.438,1
                                    0.422,1 0.422,0.667 0.406,0.667
                                    0.406,0.667 0.047,0.667 0.047,0.667
                                    0.016,0.667 0.016,0 0,0Z"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                {isMobile ? (
                    <>
                        <div className="absolute w-screen h-[10vh] flex justify-between items-center px-5 z-50000">
                            <div>
                                <Image src={"/logo.png"} width={50} height={500} alt="logo" />
                            </div>
                            <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className={`w-8 h-8 text-cyan-100`} />
                                    </motion.div>						
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0, rotate: 90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: -90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <MenuIcon className="w-8 h-8 text-cyan-400" />
                                    </motion.div>						
                                )}
                                </AnimatePresence>
                            </div>			
                        </div>
                        <AnimatePresence mode="wait">
                            {isMenuOpen && (
                            <>			
                                <motion.div 
                                    key="overlay"
                                    className="fixed h-screen w-screen backdrop-blur-[0.5px] top-0 z-20 flex"
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                    {bands.map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex-1 bg-black"
                                            variants={{
                                                initial: { translateX: "600%" },
                                                animate: { translateX: 0 },
                                                exit: { translateX: "600%" },
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                ease: "easeInOut",
                                                delay: i * 0.05, 
                                            }}
                                        />
                                    ))}
                                </motion.div>		
                                <div className="w-full pl-10 pt-15">
                                    <motion.ul 
                                        className="relative z-30 space-y-6 text-3xl mt-20 font-bold text-cyan-500"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2, delay: 0.5, ease: "easeInOut" }}
                                    >
                                        {["Accueil", "Services", "Portfolio", "Contact", "FAQ"].map((item, index) => (
                                            <>
                                                <motion.li 
                                                    onClick={() => setIsMenuOpen(false)}
                                                    key={index}
                                                    initial={{ opacity: 0, translateY: 100 }}
                                                    animate={{ opacity: 1, translateY: 0 }}
                                                    exit={{ opacity: 0, translateY: 100, transition: { duration: 0.2 } }} // sans delay ici
                                                    transition={{
                                                    duration: 0.2,
                                                    delay: isMenuOpen ? 0.3 + index * 0.2 : 0, // delay seulement à l'ouverture
                                                    ease: "easeInOut",
                                                    }}
                                                >
                                                    <Link href={`${item === "Accueil" ? "/" : item === "Services" ? "/#services" : "#"}`}>
                                                        {item}
                                                    </Link>
                                                </motion.li>
                                            </>
                                        ))}
                                        <SignedOut>
                                            <motion.li 
                                                className="mt-15"
                                                onClick={() => openModal(<SignInForm />)}
                                                initial={{ opacity: 0, translateY: 100 }}
                                                animate={{ opacity: 1, translateY: 0 }}
                                                exit={{ opacity: 0, translateY: 100, transition: { duration: 0.2 } }} // sans delay ici
                                                transition={{
                                                duration: 0.2,
                                                delay: isMenuOpen ? 0.3 + 5 * 0.2 : 0, 
                                                ease: "easeInOut",
                                                }}
                                            >
                                                Se Connecter
                                            </motion.li>
                                        </SignedOut>
                                        <SignedIn>
                                            <motion.li 
                                                className="mt-15 text-cyan-200"
                                                onClick={() => setIsMenuOpen(false)}
                                                initial={{ opacity: 0, translateY: 100 }}
                                                animate={{ opacity: 1, translateY: 0 }}
                                                exit={{ opacity: 0, translateY: 100, transition: { duration: 0.2 } }} // sans delay ici
                                                transition={{
                                                duration: 0.2,
                                                delay: isMenuOpen ? 0.3 + 5 * 0.2 : 0, 
                                                ease: "easeInOut",
                                                }}
                                            >
                                                <Link
                                                    href={"/dashboard"}
                                                >
                                                    {user?.firstName}
                                                </Link>
                                            </motion.li>
                                        </SignedIn>
                                    </motion.ul>	
                                </div>
                            </>		
                            )}
                        </AnimatePresence>
                    </>
                ) : (
                        <div
                            className={`relative w-[50%] h-24 transition-all duration-500 ${hovered ? "translate-y-0" : "-translate-y-16"}`}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            style={{
                            clipPath: "url(#nav-clip)",
                            }}
                        >
                            {/* Fond visible */}
                            <div
                                className={`absolute inset-0 transition-colors duration-500 ${
                                    hovered ? "bg-linear-to-t from-gray-900 to-cyan-950" : "bg-linear-to-t from-gray-900 to-cyan-950"
                                }`}
                            />

                            {/* Contenu des liens */}
                            <div className="relative z-10 h-full flex items-center justify-around text-lg text-zinc-100 font-semibold">
                                <Link
                                    href="/"
                                    className="relative -translate-y-4 text-zinc-100 hover:text-zinc-400 transition-colors duration-200
                                                after:absolute after:left-0 after:-bottom-1 after:w-full after:h-1 after:bg-linear-to-r after:from-cyan-400 after:via-blue-400 after:to-cyan-300
                                                after:scale-x-0 after:origin-left hover:after:scale-x-100
                                                after:transition-transform after:duration-300 after:block"
                                    >
                                    Accueil
                                </Link>

                                <Link
                                    href="/#services"
                                    className="relative -translate-y-4 text-zinc-100 hover:text-zinc-400 transition-colors duration-200
                                                after:absolute after:left-0 after:-bottom-1 after:w-full after:h-1 after:bg-linear-to-r after:from-cyan-400 after:via-blue-400 after:to-cyan-300
                                                after:scale-x-0 after:origin-left hover:after:scale-x-100
                                                after:transition-transform after:duration-300 after:block"
                                >
                                    Services
                                </Link>
                                <Link
                                    href="#"
                                    className="relative -translate-y-4 text-zinc-100 hover:text-zinc-400 transition-colors duration-200
                                                    after:absolute after:left-0 after:-bottom-1 after:w-full after:h-1 after:bg-linear-to-r after:from-cyan-400 after:via-blue-400 after:to-cyan-300
                                                    after:scale-x-0 after:origin-left hover:after:scale-x-100
                                                    after:transition-transform after:duration-300 after:block"
                                >
                                    Portfolio
                                </Link>
                                <Link
                                    href="#"
                                    className="relative -translate-y-4 text-zinc-100 hover:text-zinc-400 transition-colors duration-200
                                                    after:absolute after:left-0 after:-bottom-1 after:w-full after:h-1 after:bg-linear-to-r after:from-cyan-400 after:via-blue-400 after:to-cyan-300
                                                    after:scale-x-0 after:origin-left hover:after:scale-x-100
                                                    after:transition-transform after:duration-300 after:block"
                                >
                                    Contact
                                </Link>
                                <Link
                                    href="#"
                                    className="relative -translate-y-4 text-zinc-100 hover:text-zinc-400 transition-colors duration-200
                                                    after:absolute after:left-0 after:-bottom-1 after:w-full after:h-1 after:bg-linear-to-r after:from-cyan-400 after:via-blue-400 after:to-cyan-300
                                                    after:scale-x-0 after:origin-left hover:after:scale-x-100
                                                    after:transition-transform after:duration-300 after:block"
                                >
                                    FAQ
                                </Link>
                                <SignedOut>
                                    <button
                                        onClick={() => openModal(<SignInForm />)}
                                        className="relative -translate-y-4 text-zinc-100 hover:text-zinc-400 transition-colors cursor-pointer duration-200
                                                        after:absolute after:left-0 after:-bottom-1 after:w-full after:h-1 after:bg-linear-to-r after:from-cyan-400 after:via-blue-400 after:to-cyan-300
                                                        after:scale-x-0 after:origin-left hover:after:scale-x-100
                                                        after:transition-transform after:duration-300 after:block"
                                    >
                                        Se Connecter
                                    </button>
                                </SignedOut>
                                <SignedIn>
                                    <Link
                                        href={"/dashboard"}
                                        className="relative -translate-y-4 text-zinc-100 hover:text-zinc-400 transition-colors cursor-pointer duration-200
                                                        after:absolute after:left-0 after:-bottom-1 after:w-full after:h-1 after:bg-linear-to-r after:from-cyan-400 after:via-blue-400 after:to-cyan-300
                                                        after:scale-x-0 after:origin-left hover:after:scale-x-100
                                                        after:transition-transform after:duration-300 after:block"
                                    >
                                        {user?.firstName}
                                    </Link>
                                </SignedIn>


                                {/* Label "Menu" visible quand replié */}
                                <span
                                    className={`absolute bottom-0 font-extrabold text-md transition-opacity duration-300 ${
                                    hovered ? "opacity-0" : "opacity-100"
                                    }`}
                                >
                                    Menu
                                </span>
                            </div>

                            {/* --- Contour SVG (ton path original en taille réelle) --- */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                viewBox="0 0 800 75"
                                preserveAspectRatio="none"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M 0.00,0.00
                                    C 0.00,0.00 800.00,0.00 800.00,0.00
                                        787.50,0.00 787.50,50.00 762.50,50.00
                                        762.50,50.00 475.00,50.00 475.00,50.00
                                        462.50,50.00 462.50,75.00 450.00,75.00
                                        450.00,75.00 350.00,75.00 350.00,75.00
                                        337.50,75.00 337.50,50.00 325.00,50.00
                                        325.00,50.00 37.50,50.00 37.50,50.00
                                        12.50,50.00 12.50,0.00 0.00,0.00 Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="text-zinc-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                                />
                            </svg>
                        </div>
                )}
                </nav>
            ) : (
                <></>
            )}
        </>
         
    );
}

export default Navbar;