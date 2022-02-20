import axios from 'axios'
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useState } from 'react'
import useUser from '../lib/useUser';
import { useCookies } from 'react-cookie';

interface Props {
    toggleReg: Dispatch<SetStateAction<boolean>>
}

const Login: React.FC<Props> = ({ toggleReg }) => {

    const [cookie, setCookie] = useCookies(["token"])

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        const userData = new FormData();
        userData.append("email", email)
        userData.append("password", password)

        axios.post("http://localhost:5000/login", userData)
            .then(res => {
                setCookie("token", res.data.token)
                setLoading(false)
                router.push("/dashboard")
            })
            .catch(err => {

                setErrors(err.response.data)
                setLoading(false)
            })

    }



    return (
        <div className='w-96 bg-white text-white shadow-md rounded-md p-10 text-lg'>

            <form onSubmit={handleLogin} className='flex flex-col gap-5'>

                {
                    errors.map((item, i) => {
                        return (
                            <p key={i} className="text-center text-red-700">{item}</p>
                        )
                    })
                }
                <input
                    type="email"
                    placeholder='Email'
                    className='input-login'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />


                <input
                    type="text"
                    placeholder='Password'
                    className='input-login'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className='bg-blue-600 p-3 rounded-md font-bold hover:bg-blue-700 active:outline active:outline-2 active:outline-blue-500 active:shadow-md'>Log In</button>


                <hr />

                <button type='button' onClick={() => toggleReg(true)} className='bg-green-600 w-fit p-3 rounded-md font-bold self-center hover:bg-green-700 active:outline active:outline-2 active:outline-blue-500 active:shadow-md'>Create new account</button>
            </form>

        </div>
    )
}

export default Login