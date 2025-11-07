"use client"

import Header from "@/components/layout/Header";
import { useDeviceStore } from "./lib/store/useDeviceStore";
import { useEffect } from "react";

export default function Home() {

	const { detectDevice } = useDeviceStore();

	useEffect(() => {
		const cleanup = detectDevice();
		return cleanup; 
	}, [detectDevice]);

	return (
		<>
			<Header />
		</>
	);
}
