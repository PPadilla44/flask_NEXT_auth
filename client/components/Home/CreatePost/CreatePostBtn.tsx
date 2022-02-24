import { Icon } from '@iconify/react'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { User } from '../../../pages/api/user'

interface Props {
  user: User
  toggleForm: Dispatch<SetStateAction<boolean>>

}

const CreatePostBtn: FC<Props> = ({ user, toggleForm }) => {


  return (
    <div className='bg-white w-full rounded-sm shadow-md p-3'>

      <div className='flex'>

        {
          /* TODO
          USER AVATAR
          */
        }
        <Icon className=' cursor-pointer' width={40} height={40} icon={"carbon:user-avatar-filled"} />

        <button
          onClick={() => toggleForm(true)}

          className='bg-gray-100 rounded-full w-full ml-3 
        text-left px-4 text-xl text-gray-500 hover:bg-gray-200 active:bg-gray-300'>
          {`What's on your mind, ${user.first_name}?`}
        </button>


      </div>

      <hr className='my-3' />

      <div className='flex justify-center '>
        <button
          onClick={() => toggleForm(true)}
          className='flex gap-1 hover:bg-gray-100 active:bg-gray-200 h-full p-4 rounded-md'>
          <Icon className=' cursor-pointer' width={24} height={24} icon={"ic:outline-insert-photo"} />
          <p>Photo</p>
        </button>
      </div>

    </div >
  )
}

export default CreatePostBtn