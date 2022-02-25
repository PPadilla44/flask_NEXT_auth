import { Icon } from '@iconify/react'
import React from 'react'
import useComponentVisible from '../../lib/useComponentVisible';
import { useAuth } from '../contexts/UserContext';
import PhotoToolTip from './PhotoToolTip'
import Image from 'next/image';


const AvatarPicker = () => {

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    const { user } = useAuth();

    return (
        <div className="w-40 h-40" ref={ref}>

            <button className="absolute bottom-0">

                {
                    user.avatar ?
                        <div className='p-1 bg-white rounded-full'>

                            <Image
                                onClick={() => setIsComponentVisible(true)}
                                className='object-cover rounded-full'
                                src={user.avatar}
                                alt="PROFILE"
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

            {isComponentVisible && <PhotoToolTip />}

        </div>
    )
}

export default AvatarPicker