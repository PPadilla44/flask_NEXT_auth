import Link from "next/link";
import { useUser } from "../components/user";

interface User {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
}

const Profile = () => {

    const user: User | null = useUser();


    console.log(user);


    return (
        <div className="bg-slate-200" >
            <Link href={"/"}  >HOMe</Link>

            <h1>Your Profile </h1>
            {user!.first_name}
        </div>
    )

}

export async function getStaticProps(context: any) {

    return {
        props: {
            protected: true
        }
    };
}

export default Profile