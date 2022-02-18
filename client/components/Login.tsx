import axios from 'axios'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface Props {
    toggleReg: Dispatch<SetStateAction<boolean>>
}

const Login: React.FC<Props> = ({ toggleReg }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const hadleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const userData = new FormData();
        userData.append("email", email)
        userData.append("password", password)

        try {
            const { data } = await axios.post("http://localhost:5000/login", userData)
            console.log(data);

        } catch(err) {
            console.log(err);
            
        }
        
    }
    return (
        <div className='w-96 bg-white text-white shadow-md rounded-md p-10 text-lg'>

            <form className='flex flex-col gap-5' autoComplete='off'>


                <input
                    type="text"
                    placeholder='Email'
                    className='input-login' />


                <input
                    type="text"
                    placeholder='Password'
                    className='input-login' />

                <button className='bg-blue-600 p-3 rounded-md font-bold hover:bg-blue-700 active:outline active:outline-2 active:outline-blue-500 active:shadow-md'>Log In</button>


                <hr />

                <button type='button' onClick={() => toggleReg(true)} className='bg-green-600 w-fit p-3 rounded-md font-bold self-center hover:bg-green-700 active:outline active:outline-2 active:outline-blue-500 active:shadow-md'>Create new account</button>
            </form>

        </div>
    )
}

export default Login