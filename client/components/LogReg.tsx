import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';

const LogReg = () => {

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

export default LogReg