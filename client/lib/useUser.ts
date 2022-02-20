import useSWR from "swr";
import { createContext, useEffect } from "react";
import { User } from "../pages/api/user";
import { useRouter } from "next/router";

export const UserContext = createContext(null);


export default function useUser({ redirectTo = "", redirectIfFound = false } = {}) {

    const router = useRouter();

    const  { data: user, mutate: mutateUser, isValidating } = useSWR<User>("/api/user");
    
    

    useEffect(() => {

        if (!redirectTo || !user) return

        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && user?.isLoggedIn)
        ) {
            router.push(redirectTo)
        }
    }, [user, redirectIfFound, redirectTo, router])


    return { user, mutateUser, isValidating }
}