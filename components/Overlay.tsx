import React, { useState } from 'react'

type Props = {}

const Overlay = (props: Props) => {
	const [ showGreeting, setShowGreeting ] = useState(true);
  return (
		<>
			{ showGreeting && (
				<div 
					className="absolute bg-gray-700 bg-opacity-70 top-0 left-0 font-josefin w-full h-full flex flex-col justify-center items-center shadow-[inset_0px_0px_30px_5px_rgba(0,0,0,0.5)]" 
					onClick={() => {setShowGreeting(false)}}>
						<h2 className="text-4xl text-white font-bold tracking-widest uppercase drop-shadow-lg">
								Welcome to Irvine.
						</h2>
						<span className="font-semibold py-5 text-gray-200 text-xl drop-shadow-lg">
								click anywhere to begin
						</span>
				</div>
			)}
		</>
  )
}

export default Overlay