import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import useComponentVisible from '../../lib/useComponentVisible';
import { useAuth } from '../contexts/UserContext';
import CoverToolTip from './CoverToolTip';
import Image from 'next/image';
import SaveCoverHeader from './SaveCoverHeader';

const CoverPhoto = () => {

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const { user } = useAuth();

    const [coverPhoto, setCoverPhoto] = useState(user.cover_photo);
    
    const [coverPhotoBlob, setCoverPhotoBlob] = useState({});
    const [showHead, setShowHead] = useState(false);

    return (
        <>
            {
                coverPhoto ?
                    <div className='absolute max-w-4xl w-full h-80 rounded-md'>
                        <div className='relative h-80'>
                            <Image
                                onClick={() => setIsComponentVisible(true)}
                                className='object-cover rounded-md'
                                src={coverPhoto}
                                alt="PROFILE"
                                layout='fill'
                            />
                        </div>
                    </div>
                    :
                    <div className="absolute max-w-4xl w-full bg-gradient-to-b from-slate-50 to-slate-400 h-80 rounded-md" />
            }
            <div className='flex items-end justify-end w-full h-80'>

                <div ref={ref} className='relative'>

                    <button onClick={() => setIsComponentVisible(true)} className="bg-white hover:bg-gray-50 p-1 rounded-md flex items-center gap-1 m-4">
                        <Icon
                            icon={"ant-design:camera-filled"}
                            width={20}
                            height={20}
                        />
                        <p className="font-semibold">Add Cover Photo</p>
                    </button>

                    {isComponentVisible && <CoverToolTip handleCover={setCoverPhoto} handleBlob={setCoverPhotoBlob} handleHead={setShowHead} />}
                </div>
            </div>

            { showHead && <SaveCoverHeader handleCover={setCoverPhoto} handleHead={setShowHead} imageBlob={coverPhotoBlob as Blob} /> }
        </>
    )
}

export default CoverPhoto