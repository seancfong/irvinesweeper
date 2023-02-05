import { currencyFormatter } from '@/helpers'
import React, { useEffect } from 'react'

type Props = {
    balance: number
}

const Balance = ({ balance }: Props) => {
    useEffect(() => {
			console.log('balance change')
		}, [balance])

  return (
    <div>
        <h1 className='!font-josefin font-semibold text-4xl text-white drop-shadow-lg tracking-wider'>
          {currencyFormatter.format(balance)}
        </h1>
    </div>
  )
}

export default Balance