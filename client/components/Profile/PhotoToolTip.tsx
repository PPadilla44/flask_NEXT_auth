import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import useComponentVisible from '../../lib/useComponentVisible';
import PhotoPicker from './PhotoPicker';

const PhotoToolTip = () => {


    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);


    return (
        <div className='bg-white shadow-md absolute -left-12 -bottom-20 w-80 rounded-md m-1'>
            <button className='flex gap-2 mx-2 py-2 hover:bg-gray-50 w-full'>
                <Icon className=' cursor-pointer'
                    width={24}
                    height={24}
                    icon={"carbon:user-avatar-filled"}
                />
                <p>View profile picture</p>
            </button>

            <button onClick={() => setIsComponentVisible(true)} className='flex gap-2 mx-2 py-2 hover:bg-gray-50 w-full'>
                <Icon className='cursor-pointer'
                    width={24}
                    height={24}
                    icon={"ic:outline-insert-photo"}
                />
                <p>Update profile picture</p>
            </button>

            {isComponentVisible && <PhotoPicker ref={ref} setShowPicker={setIsComponentVisible} />}

        </div>
    )
}

export default PhotoToolTip