import React, { Dispatch, SetStateAction, useState } from 'react';
import { Icon } from "@iconify/react"
import axios from 'axios';

interface Props {
    toggleReg: Dispatch<SetStateAction<boolean>>
}


const Register: React.FC<Props> = ({ toggleReg }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")

    const handleReg = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const userData = new FormData();
        userData.append("email", email)
        userData.append("password", password)
        userData.append("cPassword", cPassword)

        try {
            const { data } = await axios.post("http://localhost:5000/register", userData)
            console.log(data);

        } catch(err) {
            console.log(err);
            
        }
        
    }

    return (
        <>
            <div className='bg-slate-50 w-screen h-screen absolute opacity-90' />
            <div
                className='opacity-100 w-96 bg-white  shadow-lg rounded-md p-4 text-lg absolute z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>

                <Icon className=
                    'absolute right-2 top-2 cursor-pointer'
                    icon="codicon:chrome-close"
                    height={24}
                    width={24}
                    onClick={() => toggleReg(false)}
                />

                <h1 className='font-bold text-3xl'>Sign Up</h1>
                <p className='text-xs font-semibold text-gray-400' >{"It's quick and easy"}</p>

                <hr className='my-4' />

                <form onSubmit={handleReg } className='flex flex-col gap-5 text-white'>


                    <input
                        type="text"
                        placeholder='Email'
                        className='input-reg'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <input
                        type="text"
                        placeholder='Password'
                        className='input-reg'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <input type="text"
                        placeholder='Confirm Password'
                        className='input-reg'
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                    />

                    <button className='w-3/4 bg-green-600 hover:bg-green-600 active:translate-y-0.5 p-2 rounded-md font-bold self-center'>Sign Up</button>



                </form>

            </div>
        </>
    )
}

export default Register