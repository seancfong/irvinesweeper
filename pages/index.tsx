import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { GoogleMaps } from '@/components/Maps/GoogleMaps'

export default function Home() {
  return (
    <>
      <Head>
        <title>bRentals</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <GoogleMaps/>
      </main>
    </>
  )
}
