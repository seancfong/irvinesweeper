import React from 'react'
import { currencyFormatter } from '@/helpers'

type Props = {
  drawerData: any
  closeCallback: any
}

const DrawerContent = ({ drawerData, closeCallback }: Props) => {
  return (
    <div className="text-white px-10 h-full bg-[#161616] rounded-l-3xl flex flex-col gap-3 justify-between items-center text-center font-xl py-10 uppercase overflow-y-scroll scrollbar-hide">
      <div>
          <div className="shadow-xl border-4 border-white rounded-lg w-full h-40 overflow-hidden">
          <img src={
              /* @ts-ignore  */
              drawerData?.image
              } alt="???" className="w-full h-full object-cover" />
          </div>
          {/* @ts-ignore */}
          <h1 className="pt-6 text-3xl sm:text-4xl drop-shadow-lg px-10 uppercase">{drawerData?.name}</h1>
          {/* @ts-ignore */}
          <h2 className="text-md italic lowercase">
            &quot;{drawerData?.status != null && drawerData?.status != "" ? drawerData.status : drawerData.description}&quot;
          </h2>

          <h1 className="pt-5 text-2xl sm:text-3xl">
            oh no! this property is owned by the <br/> 
            <span className="text-4xl sm:text-6xl text-[#FF311F]">
              Irvine Company
            </span>
          </h1>
      </div>

      <div className="flex flex-col gap-3 pt-5">
          <h1 className="text-2xl">
              Rent starting at <span className="text-[#FF311F] text-4xl font-bold">
              {/* @ts-ignore */}
              {currencyFormatter.format(drawerData?.minRent)}</span>
          </h1>
          <button 
          onClick={closeCallback} 
          className="bottom-0 outline outline-[#FF311F] uppercase outline-4 rounded-full px-6 py-2 text-xl transition duration-50 ease-in-out bg-inherit hover:bg-[#FF311F] hover:text-white text-[#FF311F] hover:scale-110 hover:shadow-lg hover:shadow-[#FF311F]">pay rent</button>
      </div>
  </div>
  )
}

export default DrawerContent