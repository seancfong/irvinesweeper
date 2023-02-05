import { currencyFormatter } from '@/helpers'
import { motion, useAnimationControls } from 'framer-motion'
import React, { useEffect } from 'react'

type Props = {
    balance: number
    delta: number
}

const Balance = ({ balance, delta }: Props) => {
  const deltaControls = useAnimationControls();
  const balanceControls = useAnimationControls();

  useEffect(() => {
    if (delta < 0) {
      console.log('balance minus ', delta);
      deltaControls.start({ 
        y: [10, 60],
        opacity: [0, 1, 1, 0],
        transition: {delay: 0.3, duration: 2, ease: 'easeInOut'} 
      })
      balanceControls.start({
        y: [0, -10, 0],
        rotate: [0, -2, 2, -3, 3, 0],
        transition: {delay: 0.5, duration: 0.5, ease: 'easeInOut'} 
      })
    }
  }, [delta])

  return (
    <div className="relative">
        <motion.h1 
          animate={balanceControls}
          className='!font-josefin font-semibold text-4xl text-white drop-shadow-lg tracking-wider'>
          {currencyFormatter.format(balance)}
        </motion.h1>
        <motion.span initial={{ opacity: 0 }} animate={deltaControls} className="!font-josefin text-red-600 absolute top-0 right-0 text-2xl">
          {currencyFormatter.format(delta)}
        </motion.span>  
    </div>
  )
}

export default Balance