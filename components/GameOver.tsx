import React, { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion';

type Props = {
    isGameOver: boolean
    setGameOver: any
    resetGame: any
}

const GameOver = ({ isGameOver, setGameOver, resetGame }: Props) => {

  return (
		<AnimatePresence>
            { isGameOver &&
            <motion.div 
                initial={{ y: "-100vh", opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 1 , ease: 'easeInOut' } }}
                exit={{ y: "-100vh", transition: { duration: 1 , ease: 'easeInOut' } }}
                onClick={() => {
                    setGameOver(false)
                    resetGame();
                }}
                className="absolute bg-gray-700 bg-opacity-70 top-0 left-0 font-josefin w-full h-full flex flex-col justify-center items-center">
                    <h2 className={"text-4xl text-white font-bold tracking-widest uppercase drop-shadow-lg transition duration-1000 ease-in-out "}>
                            Game Over
                    </h2>
                    <span className="overflow-hidden">
                        <h2 className={"text-md text-white font-medium tracking-wider uppercase drop-shadow-lg transition delay-[500ms] duration-[1000ms] ease-in-out "}>you failed to escape the irvine company</h2>
                    </span>

                    <span className="py-5">							
                        <span className={"animate-pulse font-semibold text-gray-100 text-xl drop-shadow-lg transition delay-[1200ms] duration-[1000ms] "}>
                                click anywhere to go home (not that you can afford it)
                        </span>
                    </span>
            </motion.div>
            }
		</AnimatePresence>
  )
}

export default GameOver