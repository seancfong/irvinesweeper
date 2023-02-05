import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MapContent } from "./MapContent";
import { ReactElement, useState } from "react";
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
}


export function GoogleMaps({ changeBalance, savedClicks, setSavedClicks }: Props) {   
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
    const [drawerData, setDrawerData] = useState({});
    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
    
    const toggleDrawer = (community : any) => {
        setIsDrawerOpen(!isDrawerOpen);
        // setDrawerData(community);
    };

    const center = { lat: 33.7, lng: -117.76 };
    const zoom = 12;

    let mapsKey = process.env["NEXT_PUBLIC_GOOGLE_MAPS_KEY"];

    return (
      <>
        <Drawer 
            open={isDrawerOpen} 
            onClose={() => {
                // @ts-ignore
                changeBalance(drawerData?.calc_minRent * -1);
                toggleDrawer(drawerData);
            }} 
            direction='right' size={500} 
            style={{ backgroundColor: "rgba(0,0,0,0)"}}
            lockBackgroundScroll={true}
        >
            <div className="text-white w-full h-full bg-[#ACBAC9] rounded-l-3xl flex-col items-center text-center font-xl py-20 px-20">
            <h1 className="text-6xl">Oh No!</h1>
            <h2 className="py-5 text-2xl">This property is owned by the <span className="underline text-yellow-500">Irvine Company</span></h2>
            <h1 className="text-2xl">
                Floorplans start at 
                <span className="text-red-500 text-4xl font-bold">
                    {/* @ts-ignore  */ 
                        currencyFormatter.format(drawerData?.calc_minRent)
                    }
                </span>
            </h1>
            <img src={
                /* @ts-ignore  */
                drawerData?.communityHeroSqImage
                } alt="irvine company didnt provide this image because they suck" />
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
            />
        </Wrapper>
      </>
    );
  }