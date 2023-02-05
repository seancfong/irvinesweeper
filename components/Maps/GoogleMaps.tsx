import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MapContent } from "./MapContent";
import { ReactElement, useEffect, useState } from "react";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { currencyFormatter } from "@/helpers";
import changeBalance from "../Layout/Header";

export interface ProcessEnv {
    [key: string]: string;
}

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    /* @ts-ignore */
  return null;
};

type Props = {
    changeBalance: any
    savedClicks: Array<any>
    setSavedClicks: () => {}
    isDrawerOpen: boolean
    setIsDrawerOpen: any
    isActive: boolean
    showGreeting: boolean
}


export function GoogleMaps({ showGreeting, isActive, changeBalance, savedClicks, setSavedClicks, isDrawerOpen, setIsDrawerOpen }: Props) {    
    const [drawerData, setDrawerData] = useState({});
    const [panControl, setPanControl ] = useState(null)

    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
    
    const toggleDrawer = (community : any) => {
        setIsDrawerOpen((isDrawerOpen : any) => (!isDrawerOpen));
        setDrawerData(community);
    };

    useEffect(() => {
        if (panControl && !isActive) {
            console.log('panning')
            // @ts-ignore
            panControl();
        }
    }, [ showGreeting, panControl ]);

    const center = { lat: 33.686830, lng: -117.779413 };
    const zoom = 13;

    let mapsKey = process.env["NEXT_PUBLIC_GOOGLE_MAPS_KEY"];

    return (
      <>
        <Drawer 
            open={isDrawerOpen} 
            onClose={() => {
                // @ts-ignore
                changeBalance(drawerData?.minRent * -1);
                toggleDrawer(drawerData);
            }} 
            direction='right' size={500} 
            style={{ backgroundColor: "rgba(0,0,0,0)"}}
            lockBackgroundScroll={true}
        >
                <div className="overflow-x-auto overflow-y-auto text-white px-10 w-full h-full bg-[#161616] rounded-l-3xl flex flex-col justify-between items-center text-center font-xl py-10 uppercase">
                    <div>
                        <img src={
                            /* @ts-ignore  */
                            drawerData?.image
                            } alt="???" className="shadow-xl border-4 border-white rounded-lg w-full h-40 object-cover" />
                        {/* @ts-ignore */}
                        <h1 className="pt-6 text-4xl drop-shadow-lg px-10 uppercase">{drawerData?.name}</h1>
                        {/* @ts-ignore */}
                        <h2 className="text-md italic lowercase">&quot;{drawerData?.status != "" ? drawerData.status : drawerData.description}&quot;</h2>

                        <h1 className="pt-10 text-3xl">oh no! this property is owned by the <span className="text-6xl text-[#FF311F]">Irvine Company</span></h1>

                        
                        
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl">
                            Rent starting at <span className="text-[#FF311F] text-4xl font-bold">
                            {/* @ts-ignore */}
                            {currencyFormatter.format(drawerData?.minRent)}</span>
                        </h1>
                        <button 
                        onClick={() => {
                            // @ts-ignore
                            changeBalance(drawerData?.minRent * -1);
                            toggleDrawer(drawerData);
                        }} 
                        className="outline outline-[#FF311F] uppercase outline-4 rounded-full px-6 py-2 text-xl transition duration-50 ease-in-out bg-inherit hover:bg-[#FF311F] hover:text-white text-[#FF311F] hover:scale-110 hover:shadow-lg hover:shadow-[#FF311F]">pay rent</button>
                    </div>
                </div>
        </Drawer>
        <Wrapper apiKey={mapsKey ?? ""} render={render}>
            <MapContent 
                setIsDrawerOpen={setIsDrawerOpen} 
                setDrawerData={setDrawerData}
                center={center} zoom={zoom}
                savedClicks={savedClicks}
                setSavedClicks={setSavedClicks}
                changeBalance={changeBalance}
                isActive={isActive}
                setPanControl={setPanControl}
            />
        </Wrapper>
      </>
    );
  }