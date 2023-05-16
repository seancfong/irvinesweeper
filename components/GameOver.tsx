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
                className="absolute bg-gray-700 bg-opacity-70 top-0 left-0 font-josefin w-screen h-screen flex flex-col justify-center items-center">
                    <h2 className={"text-4xl text-white font-bold tracking-widest uppercase drop-shadow-lg transition duration-1000 ease-in-out "}>
                            you lose.
                    </h2>
                    <span className="w-80 text-center">
                        <h2 className={"text-md text-white font-medium tracking-wider uppercase drop-shadow-lg transition delay-[500ms] duration-[1000ms] ease-in-out "}>you failed to escape the irvine company</h2>
                    </span>

                    <span className="pt-16 md:py-5 text-center w-80">							
                        <span className={"animate-pulse font-semibold text-gray-100 text-xl drop-shadow-lg transition delay-[1200ms] duration-[1000ms] "}>
                                click anywhere to go home <br/>(not that you can afford it)
                        </span>
                    </span>
            </motion.div>
            }
		</AnimatePresence>
  )
}

export default GameOver