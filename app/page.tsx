import Header from "@/components/layout/Header";
import Services from "@/components/layout/Services";
import MessageSection from "@/components/layout/Message3";
import FAQ from "@/components/layout/FAQ";
import Portfolio from "@/components/layout/Portfolio";
import NextTest from "@/components/layout/NextTest";

export default function Home() {

	

	return (
		<main className="overflow-x-hidden">
			<Header />
			<MessageSection />
			<Services />
			<NextTest />
			<Portfolio />
			<FAQ />
		</main>
	);
}
