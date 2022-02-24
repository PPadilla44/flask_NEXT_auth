import { Icon } from '@iconify/react'
import axios from 'axios';
import React, { useState } from 'react'
import useComponentVisible from '../../lib/useComponentVisible';
import { useAuth } from '../contexts/UserContext';
import PhotoToolTip from './PhotoToolTip'
import { useCookies } from 'react-cookie';
import Image from 'next/image';


const AvatarPicker = () => {

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    const { user } = useAuth();

    const [image, setImage] = useState({})
    const [url, setUrl] = useState(user.avatar ? user.avatar : "")
    const [cookie, setCookie] = useCookies(['token'])

    const handleUpload = async () => {

        console.log(image);

        const formData = new FormData()
        formData.append("file", image as Blob)
        formData.append("upload_preset", "my-uploads")


        try {
            const { data } = await axios.post("https://api.cloudinary.com/v1_1/pablo-padilla/image/upload",
                formData
            )
            console.log(data.url);
            setUrl(data.url)

            const userData = new FormData();
            userData.append("avatar", data.url)

            const token = cookie.token

            const headers = {
                "X-Auth-Token": token as string,
                "content-type": "application/json"
            }

            const res = await axios.post("http://localhost:5000/users/avatar", userData, { headers: headers });

            console.log(res.data);

        } catch (err) {
            if (!axios.isCancel(err)) {
                console.log(err);
            }
        }

    }


    return (
        <div className="w-40 h-40" ref={ref}>

            <button className="absolute bottom-0">

                {
                    url ?
                        <div className='p-1 bg-white rounded-full'>

                            <Image
                                onClick={() => setIsComponentVisible(true)}
                                className='object-cover rounded-full'
                                src={url}
                                alt="P{RIFLE"
                                layout='fixed'
                                width={168}
                                height={168}
                            />
                        </div>
                        :

                        <Icon
                            className='bg-white rounded-full'
                            onClick={() => setIsComponentVisible(true)}
                            width={168}
                            height={168}
                            icon={"carbon:user-avatar-filled"}
                        />

                }



                <div className='bg-slate-200 p-2 rounded-full absolute bottom-3 right-3'>
                    <Icon
                        icon={"ant-design:camera-filled"}
                        width={24}
                        height={24}
                    />
                </div>

            </button>

            {isComponentVisible && <PhotoToolTip handleImage={setImage} />}

        </div>
    )
}

export default AvatarPicker