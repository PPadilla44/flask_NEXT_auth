import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../components/user';
import RouteGaurd from '../components/RouteGaurd';
import Link from 'next/link';

function MyApp({ Component, pageProps, router }: AppProps) {

  console.log(router.pathname);
  

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (token) {

      const headers = {
        "X-Auth-Token": token as string,
        "content-type": "application/json"
      }

      axios.get("http://localhost:5000/auth", { headers: headers })
        .then(res => {
          setUser(res.data)
        })
        .catch(err => console.log(err))
    }

  }, []);

  console.log(user);
  

  return (
    <UserContext.Provider value={user}>
      <RouteGaurd user={user} >
        <nav className='bg-white h-14 w-full'>
          <Link href={"/"}>LOGIN</Link>
        </nav>
        <Component {...pageProps} />
      </RouteGaurd>
    </UserContext.Provider>

  )

}

export default MyApp
