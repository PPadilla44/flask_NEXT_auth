import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState, FC } from 'react'
import { useCookies } from 'react-cookie';
import { useAuth } from './contexts/UserContext';

interface Props {
    toggleReg: Dispatch<SetStateAction<boolean>>
}

const Login: FC<Props> = ({ toggleReg }) => {

    const { login } = useAuth()

    const [cookie, setCookie] = useCookies(["token"])

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        if (!email || !password) {
            setErrors(['Invalid Login'])
            return
        }

        const userData = { email, password };

        try {
            const res = await login(userData)
            setCookie("token", res.data.token)
            setLoading(false)
            router.push("/dashboard")
        } catch (err: any) {
            setErrors(err.response.data)
            setLoading(false)
        }

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