import Header from "@/components/layout/Header";
import Services from "@/components/layout/Services";
import NextTest from "@/components/layout/NextTest";
import MessageSection from "@/components/layout/Message3";

export default function Home() {

	

	return (
		<main className="overflow-x-hidden">
			<Header />
			<MessageSection />
			<Services />
			<NextTest />
		</main>
	);
}
