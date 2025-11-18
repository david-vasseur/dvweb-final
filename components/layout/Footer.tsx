"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

function Footer() {
    const footerRef = useRef(null);
    const lineRef = useRef(null);
    const pathname = usePathname() || "/";
    console.log(pathname);
    

    useGSAP(() => {
        // Animation de la ligne de séparation
        gsap.from(lineRef.current, {
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 80%",
                end: "top 60%",
                scrub: 1,
            },
            scaleX: 0,
            opacity: 0,
            ease: "power2.out",
        });

        // Animation des colonnes
        gsap.from('.footer-col', {
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 75%",
                end: "top 50%",
                scrub: 1,
            },
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
        });

        ScrollTrigger.refresh();
    }, { scope: footerRef, dependencies: [pathname] });

    return (
        <footer ref={footerRef} className="relative bg-linear-to-b from-gray-900 to-black text-gray-300 pt-20 pb-10 overflow-hidden">
            {/* Dots décoration */}
            <div className="absolute top-10 left-10 w-20 h-20 opacity-10">
                <div className="grid grid-cols-3 gap-2">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full" />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6">
                {/* Ligne de séparation animée */}
                <div
                className="w-full h-1 bg-linear-to-r from-transparent via-cyan-500/50 to-transparent mb-16"
                style={{
                    clipPath: "ellipse(50% 20% at 50% 0%)",
                }}
                ></div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Colonne 1 - À propos */}
                    <div className="footer-col space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                                <Image src="/logo.png" width={32} height={32} alt="Logo" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">DVWEB</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Créateurs d'expériences web modernes et immersives. 
                            Nous transformons vos idées en réalités digitales exceptionnelles.
                        </p>
                        <div className="flex gap-4">
                            <Link 
                                href="https://facebook.com" 
                                className="w-10 h-10 bg-gray-800/50 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-cyan-500/50"
                            >
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link 
                                href="https://instagram.com" 
                                className="w-10 h-10 bg-gray-800/50 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-cyan-500/50"
                            >
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link 
                                href="https://linkedin.com" 
                                className="w-10 h-10 bg-gray-800/50 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-cyan-500/50"
                            >
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link 
                                href="https://twitter.com" 
                                className="w-10 h-10 bg-gray-800/50 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-700/50 hover:border-cyan-500/50"
                            >
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Colonne 2 - Navigation */}
                    <div className="footer-col space-y-6">
                        <h4 className="text-xl font-bold text-white">Navigation</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#hero" className="hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300"></span>
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="#services" className="hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300"></span>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="#portfolio" className="hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300"></span>
                                    Portfolio
                                </Link>
                            </li>
                            <li>
                                <Link href="#about" className="hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300"></span>
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300"></span>
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 3 - Services */}
                    <div className="footer-col space-y-6">
                        <h4 className="text-xl font-bold text-white">Nos Services</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#design" className="hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300"></span>
                                    Starter Pack
                                </Link>
                            </li>
                            <li>
                                <Link href="#development" className="hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300"></span>
                                    Pro Pack
                                </Link>
                            </li>
                            <li>
                                <Link href="#performance" className="hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-cyan-400 transition-all duration-300"></span>
                                    Premium Pack
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4 - Contact */}
                    <div className="footer-col space-y-6">
                        <h4 className="text-xl font-bold text-white">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group">
                                <MapPin className="w-5 h-5 text-cyan-400 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                    58 chemin des grands fonts<br />
                                    30390 Estezargues, France
                                </span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <Phone className="w-5 h-5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="tel:+33123456789" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                    +33 6 59 12 73 67
                                </a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <Mail className="w-5 h-5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="mailto:contact@lumilaya.fr" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                    contact@dvweb-agency.fr
                                </a>
                            </li>
                        </ul>

                        {/* Horaires */}
                        <div className="pt-4 border-t border-gray-800">
                            <p className="text-sm text-gray-500 mb-2">Horaires d'ouverture</p>
                            <p className="text-sm text-gray-400">Lun - Ven : 9h00 - 18h00</p>
                            <p className="text-sm text-gray-400">Sam - Dim : Fermé</p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Dvweb. Tous droits réservés.
                        </p>
                        <div className="flex gap-6">
                            <Link href="/mentions-legales" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                                Mentions légales
                            </Link>
                            <Link href="/politique-confidentialite" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                                Politique de confidentialité
                            </Link>
                            <Link href="/cgv" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                                CGV
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Glow effect en bas */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
        </footer>
    );
}

export default Footer;