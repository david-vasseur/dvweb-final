import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/feature/Navbar";
import Modal from "@/components/layout/modal/Modal";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactLenis } from "@/utils/lenis";

const archivo = Archivo({
	variable: "--font-sans"
})

const archivo_black = Archivo_Black({
	weight: ["400"]
})

export const metadata: Metadata = {
	title: "DVWEB – Agence Web",
	description: "DVWEB, votre agence web spécialisée dans la création de sites, applications et expériences digitales sur mesure.",
};


export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="fr">
				<ReactLenis root>
					<body
						className={`${archivo.className} antialiased overflow-x-hidden w-svw`}
					>
						<Navbar />
						{children}
						<Modal />
					</body>
				</ReactLenis>
			</html>
		</ClerkProvider>
	);
}
