import { AxiosResponse } from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getUser, login, register } from '../../lib/Auth';
import { User } from '../../pages/api/user';
import { UserReg } from '../Register';

interface authContextType {
    isFetching: boolean
    user: User
    login: ({ email, password }: {
        email: string;
        password: string;
    }) => Promise<AxiosResponse<any, any>>
    register: (data: UserReg) => Promise<AxiosResponse<any, any>>
}

const initialState: authContextType = {
    isFetching: true,
    user: {
        isLoggedIn: false,
        id: "",
        first_name: "",
        last_name: "",
        email: "",
    },
    login,
    register
}

const UserContext = createContext<authContextType>(initialState);


type Props = {
    children: ReactNode;
};

export const UserProvider = ({ children }: Props) => {

    const [user, setUser] = useState<User>(initialState.user);
    const [isFetching, setIsFetching] = useState(initialState.isFetching)

    const [cookie, setCookie] = useCookies(["token"]);

    useEffect(() => {
        setIsFetching(true)
        console.log("FETCHN");
        if (cookie.token) {
            getUser({ cookies: cookie })
                .then(data => {
                    setUser(data)
                    setIsFetching(false)
                })
                .catch(err => {
                    console.log(err)
                    setIsFetching(false)
                })

        } else {
            setUser(initialState.user)
            setIsFetching(false)
        }
    }, [cookie])

    const value = {
        user,
        isFetching,
        login,
        register
    }


    return (
        <UserContext.Provider value={value} >
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(UserContext)
}
