import React, { FC, useState } from 'react'
import { User } from '../../pages/api/user'
import CreatePostBtn from './CreatePostBtn'
import CreatePostForm from './CreatePostForm'

interface Props {
    user: User
}

const CreatePost: FC<Props> = ({ user }) => {

    const [showForm, setShowForm] = useState(false)

    return (
        <>
            <CreatePostBtn user={user} toggleForm={setShowForm} />
            { showForm && <CreatePostForm user={user} toggleForm={setShowForm} />}
            
        </>
    )
}

export default CreatePost