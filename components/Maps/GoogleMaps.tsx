import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MapContent } from "./MapContent";
import { ReactElement, useState } from "react";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

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
    setIsDrawerOpen: any,
    isDrawerOpen: boolean
}

export function GoogleMaps({ setIsDrawerOpen, isDrawerOpen }: Props) {
    const [isOpen, setisOpen] = useState(false);
    
    const toggleDrawer = () => {
        setisOpen(!isOpen);
    };

    const center = { lat: 33.7, lng: -117.76 };
    const zoom = 12;

    let mapsKey = process.env["NEXT_PUBLIC_GOOGLE_MAPS_KEY"];

    return (
      <>
        <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction='right' size={500}>
            <div className="flex-col items-center text-center font-xl py-20 px-20">
            <h1 className="text-6xl">Oh No!</h1>
            <h2 className="py-5 text-2xl">This property is owned by the <span className="underline text-yellow-500">Irvine Company</span></h2>
            <h1 className="text-2xl">Floorplans start at <span className="text-red-500 text-4xl font-bold">$1099</span></h1>
            </div>
        </Drawer>
        <Wrapper apiKey={mapsKey ?? ""} render={render}>
            <MapContent setIsDrawerOpen={setIsDrawerOpen} center={center} zoom={zoom}/>
        </Wrapper>
      </>
    );
  }