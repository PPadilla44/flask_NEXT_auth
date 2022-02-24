import { Icon } from '@iconify/react'
import React from 'react'

const EditProfileBtn = () => {
    return (
        <div className="flex">
            <button className="bg-slate-200 p-2 rounded-md flex items-center gap-1">
                <Icon
                    icon={"bxs:pencil"}
                    width={20}
                    height={20}
                />
                <p className="font-semibold">Edit profile</p>
            </button>
        </div>
    )
}

export default EditProfileBtn