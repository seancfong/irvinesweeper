import { useEffect } from 'react';
import Balance from '../Balance';

type Props = {
  balance: number
  balanceDelta: number
};

const Header = ({ balance, balanceDelta }: Props) => {
  useEffect(() => {
    if (balanceDelta < 0) {
      console.log('balance minus ', balanceDelta);
    }
  }, [balanceDelta])

  return (
    <div className="fixed z-50 top-0 left-0 w-full px-16 flex justify-between items-center py-6 bg-gradient-to-b from-[rgba(253,179,5,0.2)] to-[rgba(0,0,0,0)] pointer-events-none">
      <h1 className="!font-josefin font-normal text-4xl drop-shadow-lg">
        <span className=" text-yellow-500">
          irvine
        </span>
        <span className="text-white">
          sweeper
        </span>
      </h1>
      <Balance balance={balance} />
        
    </div>
  )
}

export default Header