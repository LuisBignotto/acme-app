import React, { useState, useEffect, createContext, useContext } from 'react';
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
        return !isLoading && !!user.jwtToken;
    };

    useEffect(() => {
        const getUserData = async () => {
            const data = await getSession();

            if (!data) {
                setIsLoading(false);
                return;
            }

            setUser(data);
            setIsLoading(false);
        };

        getUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading, isLogged }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);
    return context;
}
