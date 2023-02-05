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
    if (delta < 0 && balance < 10000) {
      deltaControls.start({ 
        y: [-20, 40, 60],
        opacity: [0, 1, 1, 0],
        transition: {delay: 0.5, duration: 2.5, ease: 'easeInOut'} 
      })
      balanceControls.start({
        y: [0, 10, 0],
        rotate: [0, -2, 2, -3, 3, 0],
        transition: {delay: 0.5, duration: 0.5, ease: 'easeInOut'} 
      })
    }
    else if(delta > 0){
      deltaControls.start({ 
        y: [20, -60],
        rotate: [0, 3],
        opacity: [0.5, 1, 1, 0],
        transition: {delay: 0.2, duration: 2, ease: 'easeInOut'} 
      })
      balanceControls.start({
        y: [0, 20, 0],
        transition: {duration: 0.5, ease: 'easeInOut'} 
      })
      delta = 0;
    }
  }, [delta, balance])

  return (
    <div className="relative">
        <motion.h1 
          animate={balanceControls}
          className='!font-josefin font-semibold text-4xl text-white drop-shadow-lg tracking-wider'>
          {currencyFormatter.format(balance)}
        </motion.h1>
        {delta < 0 && <motion.span initial={{ opacity: 0 }} animate={deltaControls} className="!font-josefin text-red-500 absolute top-0 right-0 text-3xl">
          {currencyFormatter.format(delta)}
        </motion.span>  }
        {delta > 0 && <motion.span initial={{ opacity: 0 }} animate={deltaControls} className="!font-josefin text-green-400 drop-shadow-lg absolute top-0 right-0 text-3xl">
          +{currencyFormatter.format(delta)}
        </motion.span>  }
        
    </div>
  )
}

export default Balance