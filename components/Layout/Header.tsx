import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className="flex justify-center items-center pt-3 pb-1">
        <h1 className="font-primary text-4xl">
        <span className="text-green-500">
            bRen
        </span>
        tals
        </h1>
    </div>
  )
}

export default Header