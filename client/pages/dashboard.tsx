import React, { FC } from 'react'
import { GetServerSideProps } from 'next';
import getUser from '../lib/getUser';
import { User } from './api/user';
import CreatePost from '../components/CreatePost/CreatePost';

interface Props {
    user: User
}

const Dashboard: FC<Props> = ({ user }) => {


    return (

        <div className='flex justify-center items-center flex-col bg-gray-200 w-full h-screen overflow-hidden'>

            <div className='max-w-4xl h-full w-full flex flex-col items-center'>

                <div className='max-w-lg w-full mt-4'>

                    <CreatePost user={user} />
                </div>


            </div>

        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    const cookies = context.req.cookies;
    const user = await getUser({ cookies })

    if (user.isLoggedIn) {
        return {
            props: {
                user
            }
        }
    }

    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    }
}

export default Dashboard