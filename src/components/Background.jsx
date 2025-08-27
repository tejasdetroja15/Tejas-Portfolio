import React from "react"

const AnimatedBackground = () => {
	return (
		<div className="fixed inset-0 -z-10">
			<div className="absolute inset-0">
				<div
					className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-accent-purple/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 animate-pulse-soft"></div>
				<div
					className="absolute top-0 -right-4 w-96 h-96 bg-accent-blue/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block animate-pulse-soft" style={{animationDelay: '2s'}}></div>
				<div
					className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-accent-green/30 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 animate-pulse-soft" style={{animationDelay: '4s'}}></div>
					<div
					className="absolute -bottom-10 right-20 w-96 h-96 bg-accent-purple/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block animate-pulse-soft" style={{animationDelay: '6s'}}></div>
			</div>
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
		</div>
	)
}

export default AnimatedBackground

