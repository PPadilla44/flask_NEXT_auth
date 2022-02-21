import axios from "axios";
import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";
import { FC } from "react";
import { TailSpin } from "react-loader-spinner";
import getUser from "../lib/getUser";
import useUser from "../lib/getUser";
import { User } from "./api/user";

interface Props {
    user: User
}

const Profile: FC<Props> = ({ user }) => {

    console.log(user);

    return (
        <div className="bg-slate-200" >
            <h1>Your Profile </h1>
            <h1>{user?.first_name}</h1>
        </div>
    )

}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const cookies = context.req.cookies;
    const user = await getUser({cookies})

    if(user.isLoggedIn) {
        return {
            props: {
                user
            }
        }
    }

    return {
        redirect:{
            destination: "/",
            permanent: false
        }
    }
}



export default Profile