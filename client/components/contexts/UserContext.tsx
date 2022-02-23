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

    const [state, setState] = useState(initialState);

    const [cookie, setCookie] = useCookies(["token"]);

    useEffect(() => {

        setState(s => ({...s, isFetching: true }));
        
        if (cookie.token) {
            console.log("FETCHN");
            getUser({ cookies: cookie })
                .then(data => setState(s => ({ ...s, user: data, isFetching: false }) ))
                .catch(err => {
                    setState(s => ({ ...s, isFetching: false }) )
                    console.log(err)
                })

        } else {
            setState(s => ({ ...s, isFetching: false, user: initialState.user }) );
        }
    }, [cookie])

    const value = {
        ...state
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
