import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useState } from 'react'
import { useUser } from './user';
interface User {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
}
interface Props {
    children?: ReactNode | any
    user : User | null
}

const RouteGaurd: FC<Props> = ({ children, user }) => {

    console.log("BLK,", user);
    
    const router = useRouter();

    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    async function authCheck(url: string) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/', '/dashboard'];
        const path = url.split('?')[0];

        if (!user && !publicPaths.includes(path)) {
            setAuthorized(false);
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}

export default RouteGaurd