import { Icon } from '@iconify/react'
import React from 'react'

const AvatarPicker = () => {
    
    return (
        <div className="w-40 h-40">

            <div className="absolute bottom-0">

                <div className=' relative'>
                    <Icon
                        className='bg-white rounded-full'
                        width={168}
                        height={168
                        } icon={"carbon:user-avatar-filled"}
                    />

                    <div className='bg-slate-200 p-2 rounded-full absolute bottom-3 right-3'>
                        <Icon
                            icon={"ant-design:camera-filled"}
                            width={24}
                            height={24}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AvatarPicker