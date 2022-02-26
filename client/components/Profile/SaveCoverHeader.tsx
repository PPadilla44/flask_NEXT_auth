import { Icon } from '@iconify/react'
import React, { Dispatch, FC, useState } from 'react'
import { useCookies } from 'react-cookie'
import { uploadCover } from '../../lib/User'
import user from '../../pages/api/user'
import { useAuth } from '../contexts/UserContext'

interface Props {
    handleCover: Dispatch<React.SetStateAction<string>>
    handleHead: Dispatch<React.SetStateAction<boolean>>
    imageBlob: Blob
}


const SaveCoverHeader: FC<Props> = ({ handleCover, handleHead, imageBlob }) => {

    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [cookie, setCookie] = useCookies(["token"])

    const handleCancel = () => {
        handleCover(user.cover_photo)
        handleHead(false)
    }

    const handleUpload = async () => {
        setLoading(true);
        try {
            const uploadData = {
                imageBlob: imageBlob,
                uploadPreset: "my-uploads",
                token: cookie.token
            }
            const { response } = await uploadCover(uploadData);
            console.log(response.data);

            setLoading(false)
            handleHead(false);

        } catch (err) {
            setLoading(false)
            console.log(err);
        }

    }

    return (
        <>
            <div
                className='fixed mt-14 left-0 top-0 w-screen bg-gray-800 opacity-90
                    h-11 px-5 py-7'
            />
            <div className='fixed mt-14 left-0 top-0 w-screen font-semibold 
                    h-11 px-5 py-7 text-white flex justify-between items-center'>

                <div className='flex gap-4'>
                    <Icon className='cursor-pointer'
                        width={24}
                        height={24}
                        icon={"emojione-monotone:globe-showing-americas"}
                    />
                    <p>Your cover photo is public</p>
                </div>
                <div className='flex gap-3'>

                    {
                        loading ?
                            <>
                                <button disabled className="bg-gray-900 opacity-50 p-2 px-7 rounded-md">Cancel</button>
                                <button disabled className='font-semibold opacity-50 bg-blue-600 p-2 px-7 rounded-md'>Save Changes</button>
                            </>

                            :
                            <>
                                <button onClick={handleCancel} className="bg-gray-900 hover:bg-gray-700 p-2 px-7 rounded-md">Cancel</button>
                                <button onClick={handleUpload} className='font-semibold bg-blue-600 hover:bg-blue-500 p-2 px-7 rounded-md'>Save Changes</button>
                            </>

                    }

                </div>
            </div>
        </>
    )
}

export default SaveCoverHeader