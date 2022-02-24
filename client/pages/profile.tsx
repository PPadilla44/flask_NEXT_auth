import { GetServerSideProps } from "next";
import { useAuth } from "../components/contexts/UserContext";
import ProfileHeader from "../components/Profile/ProfileHeader";

const Profile = () => {

    const { isFetching } = useAuth();

    if (isFetching) {
        return (
            <div className='bg-gray-200 w-screen h-screen overflow-hidden text-center'>
                <p>LOADING</p>
            </div>
        )
    }

    return (
        <div className="bg-slate-200 w-full h-screen" >

            <ProfileHeader />


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