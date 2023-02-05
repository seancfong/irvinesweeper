import React from 'react'

type Props = {
    balance: number
}

const Balance = ({ balance }: Props) => {
  return (
    <div>
        <span>
            ${balance}
        </span>
    </div>
  )
}

export default Balance