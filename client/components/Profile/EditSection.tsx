import React from 'react'
import { useAuth } from '../contexts/UserContext'
import AvatarPicker from './AvatarPicker'
import CoverPhoto from './CoverPhoto'

const EditSection = () => {

    const { user } = useAuth();

    return (
        <div className="max-w-4xl h-[450px] w-full flex flex-col items-center">
            <CoverPhoto />
            <div className="flex items-center justify-between w-full px-5 relative h-20 ">
                <div className="flex items-center gap-3">
                    <AvatarPicker />
                    <h4 className="text-4xl font-bold">{`${user.first_name} ${user.last_name}`}</h4>
                </div>
            </div>
        </div>
    )
}

export default EditSection