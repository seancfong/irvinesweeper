import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className="fixed z-50 top-0 left-0 w-full px-24 flex justify-center py-3 bg-gradient-to-b from-[rgba(100,100,100,0.9)] to-[rgba(250,250,250,0)] ">
        <a href="/">
          <h1 className="font-josefin text-4xl">
            <span className="text-green-500">
              bRen
            </span>
            <span>
              tals
            </span>
          </h1>
        </a>
    </div>
  )
}

export default Header