import React, { createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../navigation/RootNavigation';

const NavigationContext = createContext({
    navigate: () => {},
    reset: () => {},
});

export function NavigationProvider({ children }) {
    
    const navigate = (name, params) => {
        if (!navigationRef.current) {
            console.error("[ERROR]: navRef is not loaded");
            return;
        }

        navigationRef.current.navigate(name, params);
    };

    const reset = (routes) => {
        if (!navigationRef.current) {
            console.error("[ERROR]: navRef is not loaded");
            return;
        }

        navigationRef.current.reset(routes);
    };

    return (
        <NavigationContext.Provider value={{ navigate, reset }}>
            <NavigationContainer ref={navigationRef}>
                {children}
            </NavigationContainer>
        </NavigationContext.Provider>
    );
}

export function useNavigationContext() {
    const context = useContext(NavigationContext);
    return context;
}
