import React, { useEffect, useState } from 'react'
import CreatePost from '../CreatePost/CreatePost';
import { useAuth } from '../../contexts/UserContext';
import axios from 'axios';

interface Post {
    text: string
    img: string
    created_at: string
    updated_at: string
    users_id: number
}



const Dashboard = () => {

    const { user } = useAuth();
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {

        const source = axios.CancelToken.source();

        const fetchPosts = async () => {
            try {
                const {data} = await axios.get("http://localhost:5000/posts", { cancelToken: source.token })
                setPosts(data)
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.log(err);
                }
            }
        }
        
        fetchPosts();

        return () => {
            source.cancel()
        }

}, [])




return (

    <div className='pt-14 flex justify-center items-center flex-col bg-gray-200 w-full h-screen overflow-hidden'>

        <div className='max-w-4xl h-full w-full flex flex-col items-center'>

            <div className='max-w-lg w-full mt-4'>
                <CreatePost user={user} />
            </div>

            {
                posts.map((item, i) => {
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


export default Dashboard