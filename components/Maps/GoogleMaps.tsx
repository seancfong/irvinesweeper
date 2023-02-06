import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MapContent } from "./MapContent";
import { ReactElement, useEffect, useState } from "react";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import DrawerContent from "../DrawerContent";

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
    
    const closeCallback = () => {
        // @ts-ignore
        changeBalance(drawerData?.minRent * -1);
        toggleDrawer(drawerData);  
    }

    return (
        

      <>
        {/* Render this drawer on large */}
        <div className="hidden sm:block">
            <Drawer 
                open={isDrawerOpen} 
                onClose={closeCallback} 
                direction='right' 
                style={{ backgroundColor: "rgba(0,0,0,0)"}}
                size={500}
            >
                <DrawerContent drawerData={drawerData} closeCallback={closeCallback}/>
            </Drawer>
        </div>

        {/* Render this drawer on small */}
        <div className="block sm:hidden">
            <Drawer 
                open={isDrawerOpen} 
                onClose={closeCallback} 
                direction='right' 
                style={{ backgroundColor: "rgba(0,0,0,0)"}}
                size={"100vw"}
            >
                <DrawerContent drawerData={drawerData} closeCallback={closeCallback}/>
            </Drawer>
        </div>
        
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