import Link from 'next/link'
import React from 'react'

const Nav = () => {
    return (
        <nav className='bg-white h-14 w-full flex justify-around'>
            <Link href={"/"}>LOGIN</Link>
            <Link href={"/dashboard"}>DASH</Link>
            <Link href={"/profile"}>PROPS</Link>
        </nav>
    )
}

export default Nav