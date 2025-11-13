"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";

const ModernCard = forwardRef<HTMLDivElement, { card: any }>((props, ref) => {

	const { card } = props

	return (
		<div 
			ref={ref} 
			className="relative group w-full max-w-md mx-auto
             drop-shadow-[8px_8px_20px_rgba(0,0,0,0.9)] transition-all duration-500
             hover:drop-shadow-[12px_12px_30px_rgba(0,0,0,0.9)]"
		>
			{/* --- SVG Clip Path Definition --- */}
			<svg width="0" height="0" className="absolute">
				<defs>
					<clipPath id={`clip-${card.id}`} clipPathUnits="objectBoundingBox">
						<path d="M 0.125,0
								C 0.125,0 0.875,0 0.875,0
								  1,0 1,0 1,0.083
								  1,0.083 1,0.833 1,0.833
								  1,0.917 1,0.917 0.875,0.917
								  0.875,0.917 0.625,0.917 0.625,0.917
								  0.56,0.917 0.573,1 0.5,1
								  0.5,1 0.125,1 0.125,1
								  0,1 0,1 0,0.917
								  0,0.917 0,0.083 0,0.083
								  0,0 0,0 0.125,0 Z" />
					</clipPath>

					{/* Filtre pour l'ombre avec clip-path */}
					<filter id={`shadow`} x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur in="SourceAlpha" stdDeviation="10" />
						<feOffset dx="8" dy="8" result="offsetblur" />
						<feComponentTransfer>
							<feFuncA type="linear" slope="0.5" />
						</feComponentTransfer>
						<feMerge>
							<feMergeNode />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>
			</svg>

			{/* --- Card container avec clip-path --- */}
			<div
				className="relative h-full bg-linear-to-br from-gray-900 to-gray-800 overflow-hidden transition-all duration-500 [clip-path:url(#clip-1)]"
				style={{
					filter: "drop-shadow(8px 8px 20px rgba(0,0,0,0.4))"
				}}
			>
				{/* Image */}
				<div className="relative h-64 w-full overflow-hidden">
					<Image
						src={card.image}
						alt={card.title}
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-110"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" />
				</div>

				{/* Content */}
				<div className="relative z-10 p-8 space-y-4 pb-20">
					<h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
						{card.title}
					</h3>
					<p className="text-gray-300 text-lg leading-relaxed">
						{card.paragraph}
					</p>
				</div>
			</div>

			{/* CTA - SORTI du clip-path, positionné par-dessus */}
			<div className="absolute z-30 bottom-0 right-6 pointer-events-auto">
				<Link 
					href={card.ctaLink || "#"} 
					className="flex items-center gap-2 text-gray-700 font-bold text-lg group/btn hover:gap-4 transition-all duration-300 cursor-pointer"
				>
					{card.cta}
					<ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
				</Link>
			</div>
		</div>
	);
});

ModernCard.displayName = 'ModernCard';

export default ModernCard;