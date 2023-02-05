import React, { useState } from 'react'

type Props = {
    isVisible: boolean
}

const ruleArray = [
    "Item 1",
    "Item 2",
    "Item 3"
]

const Rules = ({isVisible}: Props) => {

  return (
    <>
        { isVisible &&
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white">
                <h3 className={"text-3xl transition duration-1000 " + (isVisible ? "translate-y-0" : "translate-y-[100px] opacity-0")}>
                    Rules
                </h3>
            </div>
        }
    </>
  )
}

export default Rules