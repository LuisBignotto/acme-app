import { useState, useEffect, createContext, useContext } from 'react';
import useSession from '../hooks/useSession';

const UserContext = createContext({
    user: {
        userId: null,
        jwtToken: null,
        roleId: null
    },
    isLoading: true,
    isLogged: () => {}
});

export function UserProvider({ children }) {
    const { getSession } = useSession();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({ 
        userId: null,
        jwtToken: null,
        roleId: null
    });

    const isLogged = () => {
        return !isLoading && !user.jwtToken;
    }

    useEffect(() => {
        async function getUserData() {
            const data = await getSession();

            if (!data) {
                //deslogado
                setIsLoading(false);
                return;
            }

            setUser(data);
            setIsLoading(false);
        }

        getUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading, isLogged }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);

    return context;
}