import {useState} from 'react'

type Props = {
};

const Header = (props: Props) => {
  const [balance, setBalance] = useState(10000);
  const changeBalance = (changeBy : number) => {
    if(balance - changeBy >= 0){
      setBalance(balance - changeBy);
    }
    else{
      
    }
  }
  return (
    <div className="fixed z-50 top-0 left-0 w-full px-16 flex justify-between py-6 bg-gradient-to-b from-[rgba(253,179,5,0.2)] to-[rgba(0,0,0,.05)] ">
        <a href="/">
          <h1 className="!font-josefin font-normal text-4xl">
            <span className="drop-shadow-lg text-yellow-500">
              irvine
            </span>
            <span className="text-white drop-shadow-lg">
              sweeper
            </span>
          </h1>
        </a>
        <h1 className='!font-josefin font-normal text-4xl text-white'>
        ${balance}
        </h1>
        
    </div>
  )
}

export default Header