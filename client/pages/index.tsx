import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import getUser from '../lib/getUser';



const Home: NextPage = () => {

  const [showReg, setShowReg] = useState(false);

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

export const getServerSideProps: GetServerSideProps = async (context) => {

  const cookies = context.req.cookies;
  const user = await getUser({ cookies })

  if (user.isLoggedIn) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false
      }
    }
  }

  return {
    props: {
    }
  }

}


export default Home
