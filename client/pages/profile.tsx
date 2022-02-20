import Link from "next/link";
import { TailSpin } from "react-loader-spinner";
import useUser from "../lib/useUser";


const Profile = () => {

    const { user, isValidating } = useUser({
        redirectTo: "/"
    });
    console.log(user?.isLoggedIn);


    if (!user?.isLoggedIn || isValidating) {
        return (
            <div>
                <TailSpin />
            </div>
        )
    }


    return (
        <div className="bg-slate-200" >
            <Link href={"/"}  >HOMe</Link>

            <h1>Your Profile </h1>
            <h1>{user?.first_name}</h1>
        </div>
    )

}


export default Profile