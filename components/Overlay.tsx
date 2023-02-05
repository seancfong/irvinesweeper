import React, { useState } from 'react'

type Props = {}

const Overlay = (props: Props) => {
	const [ showGreeting, setShowGreeting ] = useState(true);
	
  return (
		<>
			{ showGreeting && (
				<div 
					className="absolute bg-gray-700 bg-opacity-70 top-0 left-0 font-josefin w-full h-full flex flex-col justify-center items-center" 
					onClick={() => {setShowGreeting(false)}}>
						<h2 className="text-4xl text-white font-light tracking-widest uppercase">
								Welcome to Irvine.
						</h2>
						<span className="text-gray-200 text-xl font-light">
								Click anywhere to begin.
						</span>
				</div>
			)}
		</>
  )
}

export default Overlay