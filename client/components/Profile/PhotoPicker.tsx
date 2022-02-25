import { Icon } from '@iconify/react'
import axios from 'axios';
import React, { ChangeEvent, Dispatch, forwardRef, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import Image from 'next/image';
import { useAuth } from '../contexts/UserContext';
import { uploadAvatar } from '../../lib/User';


const PhotoPicker = forwardRef<HTMLDivElement, { setShowPicker: Dispatch<React.SetStateAction<boolean>> }>
    (function PhotoPicker({ setShowPicker }, ref) {


        const { mutateUser, user } = useAuth();

        const inputFile = useRef<HTMLInputElement>(null);
        const [image, setImage] = useState("");
        const [imageBlob, setImageBlob] = useState({});
        const [loading, setLoading] = useState(false);

        const [cookie, setCookie] = useCookies(['token']);

        const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const newImg = URL.createObjectURL(e.target.files[0]);
                setImage(newImg);
                setImageBlob(e.target.files[0])
            }
        }

        const handlePicker = () => {
            if (inputFile.current) {
                inputFile.current.click();
            }
        }

        const handleUpload = async () => {
            setLoading(true);
            try {
                const uploadData = {
                    imageBlob: imageBlob as Blob,
                    uploadPreset: "my-uploads",
                    token: cookie.token
                }
                const { data } = await uploadAvatar(uploadData);
                console.log(data);


                if (mutateUser) {
                    mutateUser(m => (
                        {
                            ...m, user:
                                { ...m.user, avatar: data.url }
                        }
                    ))
                }
                setLoading(false)
                setShowPicker(false);

            } catch (err) {
                setLoading(false)
                setShowPicker(false);
                console.log(err);
            }

        }

        return (
            <>
                <div className='bg-slate-50 w-full h-full fixed opacity-75 left-0 top-0' />

                <div ref={ref} className='flex flex-col gap-4 opacity-100 w-full max-w-2xl bg-white  shadow-lg rounded-md p-3 text-lg fixed z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
                    <div className='flex items-center justify-center relative font-medium text-xl'>
                        <p>Update profile picture</p>
                        <Icon className=
                            'absolute right-2 text-gray-500 cursor-pointer bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full p-1'
                            icon="codicon:chrome-close"
                            height={36}
                            width={36}
                            onClick={() => setShowPicker(false)}
                        />
                    </div>

                    <hr />

                    <div className='flex justify-center flex-col items-center gap-5'>

                        <button
                            onClick={handlePicker}
                            className='w-64 self-center rounded-lg justify-center p-2 flex items-center gap-2 bg-sky-50 hover:bg-slate-100 text-blue-700 font-medium'>
                            <Icon
                                icon="carbon:add-alt"
                                height={24}
                                width={24}
                                onClick={() => setShowPicker(false)}
                            />
                            <p>Upload Photo</p>
                        </button>

                        <Image
                            className='object-cover rounded-full'
                            src={image ? image : user.avatar}
                            layout="fixed"
                            width={300}
                            height={300}
                            alt="Temp-prof"
                        />

                        <input
                            type='file'
                            accept="image/png, image/jpeg"
                            ref={inputFile}
                            style={{ display: 'none' }}
                            onChange={handleImage}
                        />
                    </div>


                    <hr />

                    <div className='flex gap-3 self-end'>

                        <button
                            onClick={() => setShowPicker(false)}
                            className='text-blue-400 w-fit  py-1 px-6 rounded-md
                        font-medium hover:bg-slate-50 self-end'>Cancel</button>
                        <button
                            onClick={handleUpload}
                            className='text-white w-fit bg-blue-500 py-1 px-6 rounded-md
                        font-bold hover:bg-blue-600 self-end'>Save</button>

                    </div>

                </div>
            </>
        )
    });

export default PhotoPicker