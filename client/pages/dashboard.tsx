import React, { FC } from 'react'
import CreatePost from '../components/CreatePost/CreatePost';
import { useAuth } from '../components/contexts/UserContext';
import { GetStaticProps } from 'next';
import axios from 'axios';

interface Post {
    text: string
    img: string
    created_at: string
    updated_at: string
    users_id: number
}

interface Props {
    posts: Post[]
}

const Dashboard: FC<Props> = ({ posts }) => {

    const { user, isFetching } = useAuth();

    if (isFetching) {
        return (
            <div>Loadoing</div>
        )
    }

    console.log(posts);
    


    return (

        <div className='flex justify-center items-center flex-col bg-gray-200 w-full h-screen overflow-hidden'>

            <div className='max-w-4xl h-full w-full flex flex-col items-center'>

                <div className='max-w-lg w-full mt-4'>
                    <CreatePost user={user} />
                </div>

                {
                    posts.map((item, i ) => {
                        return (
                            <p key={i}>
                                {item.text}
                            </p>
                        )
                    })
                }

            </div>

        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    
    const res = await axios.get("http://localhost:5000/posts")

    return {
        props: {
            posts: res.data
        }
    }
}

export default Dashboard