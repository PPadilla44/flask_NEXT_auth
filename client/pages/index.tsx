import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import { useAuth } from '../components/contexts/UserContext'
import Dashboard from '../components/Home/Dashboard/Dashboard'
import LogReg from '../components/Home/Portal/Portal'



const Home: NextPage = () => {

  const { user, isFetching } = useAuth();

  if (isFetching) {
    return (
      <div className='bg-gray-200 w-screen h-screen overflow-hidden text-center'>
        <p>LOADING</p>
      </div>
    )
  }



  return (

    user.isLoggedIn ? <Dashboard /> : <LogReg />

  )
}


export default Home
