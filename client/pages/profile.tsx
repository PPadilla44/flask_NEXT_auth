import { GetServerSideProps } from "next";
import { useAuth } from "../components/contexts/UserContext";

const Profile = () => {

    const { user } = useAuth();

    console.log("PROFILE", user);

    return (

        <div className="bg-slate-200" >
            <h1>Your Profile </h1>
            <h1>{user.first_name}</h1>
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