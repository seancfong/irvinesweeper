import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type Props = {
    isVisible: boolean
}

const Footer = ({ isVisible }: Props) => {
  return (
    <AnimatePresence>
        { isVisible && (
            <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20}}
                className="fixed bottom-0 left-0 z-50 px-10">
                <img src="/bar.png" alt="bar" className="lg:w-[20vw] max-w-[10rem] pb-6"/>
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default Footer