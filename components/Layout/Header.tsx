import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className="fixed z-50 top-0 left-0 w-full px-24 flex justify-center pt-3 pb-10 bg-gradient-to-b from-[rgba(200,200,200,0.9)] to-[rgba(50,50,50,0)] ">
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