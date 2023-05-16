import Head from "next/head";
import { GoogleMaps } from "@/components/Maps/GoogleMaps";
import Overlay from "@/components/Overlay";
import React, { useState } from "react";
import Header from "@/components/Layout/Header";
import GameOver from "@/components/GameOver";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Rules from "@/components/Rules";
type Props = {
  irvineData: any;
};

const startingBalance = 10000;

export default function Home({ irvineData }: Props) {
  const [balance, setBalance] = useState(startingBalance);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [savedClicks, setSavedClicks] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [balanceDelta, setBalanceDelta] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const changeBalance = (changeBy: number) => {
    setBalanceDelta(changeBy);
    if (balance + changeBy > 0) {
      setBalance((balance) => balance + changeBy);
    } else {
      setBalance(0);
      setIsGameOver(true);
    }
  };

  return (
    <>
      <Head>
        <title>irvinesweeper</title>
        <meta name="og:title" content="IrvineSweeper" />
        <meta
          name="description"
          content="Because paying rent is like walking through a minefield."
        />
        <meta
          name="og:image"
          content="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/372/298/datas/original.jpg"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cursor />
      <main>
        <Header balance={balance} balanceDelta={balanceDelta} />
        <div className="!font-josefin relative h-screen w-full overflow-hidden">
          <GoogleMaps
            changeBalance={changeBalance}
            savedClicks={savedClicks}
            // @ts-ignore
            setSavedClicks={setSavedClicks}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            isActive={!(isGameOver || showGreeting || showRules)}
            showGreeting={showGreeting}
          />
          <Overlay
            setShowRules={setShowRules}
            showGreeting={showGreeting}
            setShowGreeting={setShowGreeting}
          />
          <Rules
            showRules={showRules}
            setShowRules={setShowRules}
            setShowGreeting={setShowGreeting}
          />
          <GameOver
            isGameOver={isGameOver}
            setGameOver={setIsGameOver}
            resetGame={() => {
              setBalance(startingBalance);
              setShowGreeting(true);
              savedClicks.forEach((circle: any) => {
                circle.setMap(null);
              });
              setSavedClicks([]);
            }}
          />
          <div
            className={
              "absolute top-0 left-0 h-full w-full shadow-[inset_0px_0px_150px_50px_rgba(0,0,0,0.5)] pointer-events-none transition duration-1000 delay-500 " +
              (!(isGameOver || showGreeting || showRules)
                ? "scale-100"
                : "scale-125")
            }
          />
          <Footer isVisible={!(isGameOver || showGreeting || showRules)} />
        </div>
      </main>
    </>
  );
}
