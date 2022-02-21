import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../components/Nav'

function MyApp({ Component, pageProps, router }: AppProps) {



  if (router.pathname === "/") {
    return <Component {...pageProps} />
  }

  return (
    <>
      <Nav {...pageProps} />
      <Component {...pageProps} />
    </>
  )

}

export default MyApp
