import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

interface User {
    id: string
    email: string
}

const dashboard = () => {

    const router = useRouter();

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {

        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/")
        }

        const headers = {
            "X-Auth-Token": token as string,
            "content-type": "application/json"
        }


        axios.get("http://localhost:5000/users", { headers: headers })
            .then(res => {
                setUsers(res.data);
            })
            .catch((err) => console.log(err.response.data))
    }, [])

    return (
        <div className='flex justify-center items-center flex-col bg-gray-200 w-screen h-screen overflow-hidden'>
            <button
            className='bg-green-500 w-fit'
                onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/")
                }}
            >Log Out</button>
            <table className='bg-slate-600 table-fixed w-96 h-96'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default dashboard