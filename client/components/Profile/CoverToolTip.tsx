import { Icon } from '@iconify/react'
import React, { ChangeEvent, Dispatch, FC, useRef, useState } from 'react'
import { useAuth } from '../contexts/UserContext';

interface Props {
    handleCover: Dispatch<React.SetStateAction<string>>
    handleBlob: Dispatch<React.SetStateAction<{}>>
    handleHead: Dispatch<React.SetStateAction<boolean>>
}

const CoverToolTip: FC<Props> = ({ handleCover, handleHead, handleBlob }) => {

    const inputFile = useRef<HTMLInputElement>(null);

    const handlePicker = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    }

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImg = URL.createObjectURL(e.target.files[0]);
            handleCover(newImg)
            handleBlob(e.target.files[0])
            handleHead(true)
        }
    }


    return (
        <div className='bg-white shadow-md absolute right-2 z-50 -bottom-7 w-80 rounded-md m-1'>

            <button onClick={handlePicker} className='flex gap-2 mx-2 py-2 hover:bg-gray-50 w-full rounded-md'>
                <Icon className='cursor-pointer'
                    width={24}
                    height={24}
                    icon={"ic:outline-insert-photo"}
                />
                <p>Update cover photo</p>
            </button>

            <input
                type='file'
                accept="image/png, image/jpeg"
                ref={inputFile}
                style={{ display: 'none' }}
                onChange={handleImage}
            />


        </div>
    )
}

export default CoverToolTip