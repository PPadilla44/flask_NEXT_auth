import Link from 'next/link'
import React from 'react'
import { Icon } from "@iconify/react"
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useAuth } from './contexts/UserContext'


const Nav = () => {
    
    const { user } = useAuth();

    const [cookie, setCookie, removeCookie] = useCookies(["token"])
    const router = useRouter();

    const logout = () => {
        removeCookie("token");
        router.push("/");
    }

    if (!user.isLoggedIn) {
        return <></>
    }

    return (
        <nav className='bg-white h-14 w-full flex justify-end items-center px-4 relative shadow-md overflow-hidden'>

            <Link href={"/"} passHref={true} >
                <Icon className='absolute left-1/2 cursor-pointer' width={48} height={48} icon={"ant-design:home-filled"} />
            </Link>

            <div className='flex gap-6 items-center'>
                <div className='flex items-center gap-1'>
                    <Link href={"/profile"} passHref={true} >
                        <Icon className=' cursor-pointer' width={32} height={32} icon={"carbon:user-avatar-filled"} />
                    </Link>
                    <p className='text-sm font-medium'>{user.first_name}</p>
                </div>
                <button onClick={logout}>
                    <Icon width={24} height={24} icon={"carbon:logout"} />
                </button>
            </div>
        </nav>
    )
}

export default Nav