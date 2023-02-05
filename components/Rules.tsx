import React, { useState } from 'react'

type Props = {}

const Rules = (props: Props) => {
    const [ showRules, setShowRules ] = useState(false);

  return (
    <>
        <div className="absolute bottom-10 left-1/2 translate-x-[-50%]">
            <button
                onClick={() => setShowRules(true)}
                className="relative z-50 bg-gray-800 bg-opacity-30 border-black border-2 px-5 py-1 rounded-lg">
                Rules
            </button>
        </div>
        {
            showRules && (
                <div className="absolute top-0 left-0 w-full h-full bg-slate-300">
                    RULES
                </div>
            )
        }
    </>
  )
}

export default Rules