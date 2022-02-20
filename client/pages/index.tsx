import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import { useRouter } from 'next/router';
import { TailSpin } from "react-loader-spinner";
import useUser from '../lib/useUser';



const Home: NextPage = () => {

  const { user, isValidating } = useUser({
    redirectTo: "/profile",
    redirectIfFound: true,
  });


  const [showReg, setShowReg] = useState(false);


  if (user?.isLoggedIn || isValidating) {
    return (
      <div>
        <TailSpin />
      </div>
    )
  }

  console.log("ASDS");

  return (
    <div className='flex justify-center bg-gray-200 w-screen h-screen overflow-hidden'>
      <main className='flex flex-col items-center w-[1200px]' >

        <div className='text-center flex gap-5 flex-col w-96 my-7'>
          <h1 className='text-6xl text-blue-600 font-bold'>FLEAKT</h1>
          <h4 className='text-2xl' >{"Welcome To Great World Of React And Flask Let's Do Authenification!"}</h4>
        </div>

        <Login toggleReg={setShowReg} />

        {showReg && <Register toggleReg={setShowReg} />}

      </main>
    </div>
  )
}



export default Home
