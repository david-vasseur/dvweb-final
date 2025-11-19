"use client"

import Header from "@/components/layout/Header";
import { useDeviceStore } from "./lib/store/useDeviceStore";
import { useEffect } from "react";
import Services from "@/components/layout/Services";
import NextTest from "@/components/layout/NextTest";

export default function Home() {

	const { detectDevice } = useDeviceStore();

	useEffect(() => {
		const cleanup = detectDevice();
		return cleanup; 
	}, [detectDevice]);

	return (
		<main className="overflow-x-hidden">
			<Header />
			<Services />
			<NextTest />
		</main>
	);
}
