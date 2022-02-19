import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

interface User {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
}

const Dashboard = () => {

    const router = useRouter();

    const [users, setUsers] = useState<User[]>([]);


    useEffect(() => {


        axios.get("http://localhost:5000/users")
            .then(res => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
                router.push("/")
            })

    }, [router])

    return (
        <div className='flex justify-center items-center flex-col bg-gray-200 w-screen h-screen overflow-hidden'>
            <button
                className='bg-green-500 w-fit rounded-md p-2 text-lg font-bold'
                onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/")
                }}
            >Log Out</button>

            <div className='max-w-6xl bg-white h-full w-full text-black'>
                {
                    users.map((item, i) => {
                        return (

                            <div key={i}>
                                <h3>{`${item.first_name} ${item.last_name}`}</h3>
                                <h3>{item.email}</h3>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default Dashboard