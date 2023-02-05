import React, { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Rules from './Rules';

type Props = {
	showGreeting: boolean
	setShowGreeting: any
}

const Overlay = ({ showGreeting, setShowGreeting }: Props) => {
    const [ showRules, setShowRules ] = useState(false);
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, {once: true});

  return (
		<AnimatePresence>
			{ showGreeting && (
				<>
					<motion.div
						initial={isInView ? { y: "100vh" } : false}
						animate={{ y: 0, opacity: 1, transition: { duration: 1 , ease: 'easeInOut' } }}
						exit={{ y: "-100vh", opacity: 0, transition: { duration: 1 , ease: 'easeInOut' } }}
						ref={sectionRef}
						className="absolute bg-gray-700 bg-opacity-70 top-0 left-0 font-josefin w-full h-screen flex flex-col justify-center items-center" 
						onClick={() => {setShowGreeting(false)}}>
							<div 
								
								className="text-center break-words flex flex-col items-center">
								<h2 className={"text-4xl text-white font-bold tracking-widest uppercase drop-shadow-lg transition duration-1000 ease-in-out " + (isInView ? "opacity-[100%]" : "opacity-[0%] translate-y-4")}>
										Welcome to Irvine.
								</h2>
								<span className="overflow-hidden">
									<h2 className={"text-md text-white font-medium tracking-wider uppercase drop-shadow-lg transition delay-[100ms] duration-[1000ms] ease-in-out " + (isInView ? "opacity-[100%]" : "opacity-[0%] -translate-y-10")}>(NOT brought to you by the Irvine Company)</h2>
								</span>

								<span className="py-5">							
									<span className={"animate-pulse font-semibold text-gray-100 text-xl drop-shadow-lg transition delay-[1200ms] duration-[1000ms] " + (isInView ? "opacity-[100%]" : "opacity-[0%] -translate-y-32")}>
										click anywhere to begin
									</span>
								</span>
							</div>
					</motion.div>
					{/* <div className="absolute bottom-10 left-1/2 translate-x-[-50%]">
						<button
							onClick={() => setShowRules((showRules) => (!showRules))}
							className="relative z-50 bg-gray-800 bg-opacity-30 border-black border-2 px-5 py-1 rounded-lg">
							Rules
						</button>
					</div> */}
				</>
			)}
		</AnimatePresence>
  )
}

export default Overlay