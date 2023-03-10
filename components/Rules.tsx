import React, { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'

type Props = {
    showRules: boolean;
    setShowRules: any;
    setShowGreeting: any;
}

// const titleChoices = [
//     "Rent in Irvine is high. With the Irvine Company in charge, it keeps getting higher.",
    
// ]

// const title = titleChoices[Math.floor(Math.random() * titleChoices.length)];


const ruleArray = [
    <span key={'1'}>Trying to avoid the Irvine Company can feel like <span className="text-yellow-500"> walking through a minefield.</span></span>,
    <span key={'2'}>We decided to illustrate that feeling.</span>,
    <span key={'3'}>Click anywhere, and you&apos;ll gain <span className="text-green-400">$100.</span></span>,
    <span key={'4'}>Click on a property owned by the Irvine Company, and you&apos;ll <span className="text-red-500">pay the price.</span></span>,
    <span key={'5'}>Good luck surviving!</span>
]

const Rules = ({showRules, setShowRules, setShowGreeting}: Props) => {
    const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, {amount: "some"});

  return (
    <AnimatePresence>
        { showRules &&
        <motion.div
            initial={{ y: "100vh"}}
            animate={{ y: 0, transition: { duration: 1 , ease: 'easeInOut' } }}
            exit={{ y: "-100vh", opacity: 0, transition: { duration: 1 , ease: 'easeInOut' } }}
            ref={sectionRef}
            className="absolute bg-gray-700 bg-opacity-70 top-0 left-0 font-josefin w-full h-screen flex flex-col justify-center items-center text-white"
            onClick={() => {
                setShowRules(false)
            }}>
                <div className="text-center max-w-5xl px-5 md:px-32 flex flex-col gap-8">
                    {
                        ruleArray.map((rule, index) => (
                            <motion.span 
                            key={-1 * index} 
                            className={"text-2xl md:text-3xl"}
                            initial={{y: 150}}
                            animate={{y: 0, transition: {delay: index * 0.1, duration: 1, ease: 'easeOut'}}}
                            exit={{y: [0, 90, 0]}}
                            >
                                {rule}
                            </motion.span>
                        ))
                    }
                </div>
                
            </motion.div>
        }
    </AnimatePresence>
  )
}

export default Rules