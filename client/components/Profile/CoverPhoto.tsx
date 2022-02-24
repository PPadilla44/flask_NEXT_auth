import { Icon } from '@iconify/react'
import React from 'react'

const CoverPhoto = () => {
    return (
        <div className="bg-gradient-to-b from-slate-50 to-slate-400 h-80 w-full rounded-md flex items-end justify-end p-4">
            <button className="bg-white hover:bg-gray-50 p-1 rounded-md flex items-center gap-1">
                <Icon
                    icon={"ant-design:camera-filled"}
                    width={20}
                    height={20}
                />
                <p className="font-semibold">Add Cover Photo</p>
            </button>
        </div>
    )
}

export default CoverPhoto