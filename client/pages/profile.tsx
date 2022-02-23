import { Icon } from "@iconify/react";
import { GetServerSideProps } from "next";
import { useAuth } from "../components/contexts/UserContext";

const Profile = () => {

    const { user, isFetching } = useAuth();

    if (isFetching) {
        return (
            <div className='bg-gray-200 w-screen h-screen overflow-hidden text-center'>
                <p>LOADING</p>
            </div>
        )
    }

    return (

        <div className="bg-slate-200 w-full h-screen" >

            <div className="bg-white w-full flex justify-center shadow-sm">

                <div className="max-w-4xl h-[450px] w-full flex flex-col items-center">

                    <div className="bg-gradient-to-b from-slate-50 to-slate-200 h-80 w-full rounded-md flex items-end justify-end p-4">
                        <button className="bg-white hover:bg-gray-50 p-1 rounded-md flex items-center gap-1">
                            <Icon
                                icon={"ant-design:camera-filled"}
                                width={20}
                                height={20}
                            />
                            <p className="font-semibold">Add Cover Photo</p>
                        </button>
                    </div>

                    <div className="flex items-center justify-between w-full px-5 relative h-20 ">

                        <div className="flex items-center">

                            <div className='self-end bg-white rounded-full relative '>

                                <Icon
                                    className=''
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
                            <h4 className="text-4xl font-bold">{`${user.first_name} ${user.last_name}`}</h4>
                        </div>


                        <div className="flex justify-end justify-self-end justify-items-end">
                            <button className="bg-slate-200 p-2 rounded-md flex items-center gap-1">
                                <Icon
                                    icon={"bxs:pencil"}
                                    width={20}
                                    height={20}
                                />
                                <p className="font-semibold">Edit profile</p>
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )

}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const cookies = context.req.cookies;

    if (!cookies.token) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}



export default Profile