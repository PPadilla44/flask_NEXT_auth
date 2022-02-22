import React from 'react'
import CreatePost from '../components/CreatePost/CreatePost';
import { useAuth } from '../components/contexts/UserContext';


const Dashboard = () => {

    const { user, isFetching } = useAuth();
    console.log("DASH",user);
    
    if(isFetching) {
        return (
            <div>Loadoing</div>
        )
    }



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

export default Dashboard