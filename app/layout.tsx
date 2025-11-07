import type { Metadata } from "next";
import { Geist_Mono, Zalando_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/feature/Navbar";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const zalandoSans = Zalando_Sans({
	variable: "--font-zalando-sans",
	subsets: ["latin"],
	weight: ["400", "600", "700", "900"]
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
		<html lang="fr">
			<body
				className={`${zalandoSans.variable} ${geistMono.variable} antialiased`}
			>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
