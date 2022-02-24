import { Icon } from '@iconify/react'
import React, { useRef } from 'react'

const PhotoToolTip = ({ handleImage } : { handleImage : React.Dispatch<React.SetStateAction<{}>> }) => {

    const inputFile = useRef<HTMLInputElement>(null);

    const handlePicker = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    }

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

            <button onClick={handlePicker} className='flex gap-2 mx-2 py-2 hover:bg-gray-50 w-full'>
                <Icon className=' cursor-pointer'
                    width={24}
                    height={24}
                    icon={"ic:outline-insert-photo"}
                />
                <p>Update profile picture</p>
            </button>
            <input
                type='file'
                accept="image/png, image/jpeg"
                ref={inputFile}
                style={{ display: 'none' }}
                onChange={(e) => {
                    if (e.target.files) {
                        console.log(e.target.files[0]);
                        
                        handleImage(e.target.files[0])
                    }
                }}
            />
        </div>
    )
}

export default PhotoToolTip