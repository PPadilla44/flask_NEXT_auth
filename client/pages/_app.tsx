import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '../components/Nav'
import { UserProvider } from '../components/contexts/UserContext'

function MyApp({ Component, pageProps, router }: AppProps) {

  return (
    <UserProvider>
      <Nav {...pageProps} />
      <div className='pt-14'>
        <Component {...pageProps} />
      </div>
    </UserProvider>
  )

}

export default MyApp
