import { Icon } from '@iconify/react'
import axios from 'axios';
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { useCookies } from 'react-cookie';
import { User } from '../../pages/api/user'

interface Props {
    user: User
    toggleForm: Dispatch<SetStateAction<boolean>>

}

const CreatePostForm: FC<Props> = ({ user, toggleForm }) => {

    const [text, setText] = useState("");


    const [cookie, setCookie] = useCookies(["token"])


    const handleSubmit = async () => {

        if (text.length < 3) {
            console.log("NOT LONG ");
            return
        }

        const data = new FormData();

        data.append("text", text);

        toggleForm(false)

        const token = cookie.token


        const headers = {
            "X-Auth-Token": token as string,
            "content-type": "application/json"
        }

        try {

            console.log("POSTING");

            // const { data } = await axios.get<User>("http://localhost:5000/auth", { headers: headers })

            const res = axios.post("http://localhost:5000/posts", data, { headers: headers })
            console.log(res);

        } catch (err) {
            console.log(err);

        }

    }

    return (
        <>
            <div className='bg-slate-50 w-full h-full absolute opacity-75 left-0 top-0' />

            <div className='flex flex-col gap-4 opacity-100 w-96 bg-white  shadow-lg rounded-md p-3 text-lg absolute z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
                <div className='flex items-center justify-center relative font-medium text-2xl'>
                    <p>Create post</p>
                    <Icon className=
                        'absolute right-2 text-gray-500 cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full p-1'
                        icon="codicon:chrome-close"
                        height={36}
                        width={36}
                        onClick={() => toggleForm(false)}

                    />
                </div>

                <hr />

                <div className='flex items-center gap-1'>
                    <Icon className=' cursor-pointer' width={40} height={40} icon={"carbon:user-avatar-filled"} />
                    <p className='text-xl text-gray-600  font-medium'>{user.first_name}</p>
                </div>

                <input
                    type="text"
                    placeholder={`What's on your mind, ${user.first_name}?`}
                    className='text-black placeholder-gray-400 focus:outline-none'
                    value={text}
                    onChange={e => setText(e.target.value)}
                />


                <button
                    onClick={handleSubmit}
                    className='text-white bg-blue-500 p-1 rounded-md font-bold hover:bg-blue-600'>Post</button>


            </div>
        </>
    )
}

export default CreatePostForm