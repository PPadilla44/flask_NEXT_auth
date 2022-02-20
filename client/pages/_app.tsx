import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import axios from 'axios';
import useUser, { UserContext } from '../lib/useUser';
import RouteGaurd from '../components/RouteGaurd';
import Link from 'next/link';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps, router }: AppProps) {



  return (
    // <RouteGaurd >
    <SWRConfig
      value={{
        fetcher: (url, method) => axios({ url, method }).then(r => r.data),
        onError: (err) => {
          console.error(err)
        },
      }}
    >

      <nav className='bg-white h-14 w-full flex justify-around'>
        <Link href={"/"}>LOGIN</Link>
        <Link href={"/dashboard"}>DASH</Link>
        <Link href={"/profile"}>PROPS</Link>
      </nav>
      <Component {...pageProps} />
    </SWRConfig >

  )

}

export default MyApp
