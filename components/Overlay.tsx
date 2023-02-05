import React, { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion';

type Props = {
	showGreeting: boolean
	setShowGreeting: any
}

const Overlay = ({ showGreeting, setShowGreeting }: Props) => {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, {once: true});

  return (
		<AnimatePresence>
			{ showGreeting && (
				<>
					{/* <motion.div 
						exit={{ opacity: 0,  transition: { duration: 1 , ease: 'easeInOut' } }}
						className="absolute bg-gray-700 bg-opacity-70 top-[-100vh] left-0 w-full h-[200vh]"/> */}
					<motion.div
						initial={isInView ? { y: "100vh" } : false}
						animate={{ y: 0, opacity: 1, transition: { duration: 1 , ease: 'easeInOut' } }}
						exit={{ y: "-100vh", opacity: 0, transition: { duration: 1 , ease: 'easeInOut' } }}
						ref={sectionRef}
						className="absolute bg-gray-700 bg-opacity-70 top-0 left-0 font-josefin w-full h-screen flex flex-col justify-center items-center" 
						onClick={() => {setShowGreeting(false)}}>
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
					</motion.div>
				</>
			)}
		</AnimatePresence>
  )
}

export default Overlay