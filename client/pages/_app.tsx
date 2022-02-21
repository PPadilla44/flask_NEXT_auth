import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../components/Nav';

function MyApp({ Component, pageProps, router }: AppProps) {



  return (
    <>

        <Nav/>
        <Component {...pageProps} />

    </>
  )

}

export default MyApp
