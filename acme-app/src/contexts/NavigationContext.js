import { createContext, useContext, useRef } from 'react'; 

import { useUserContext } from './UserContext';

import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from '../navigation/RootNavigation';

const NavigationContext = createContext({
    navigate: () => {},
    reset: () => {},
});

export function NavigationProvider({ children }) {
    const { isLogged } = useUserContext();
    
    const navigate = (name, params) => {
        if (!navigationRef.current) {
            console.error("[ERROR]: navRef is not loaded");
            return;
        }

        if (!isLogged()) {
            //aqui vc pode fazer uma logica pra caso o cara nao esteja logado
            //e tente forcar navegacao
        }

        navigationRef.current.navigate(name, params);
    }

    const reset = (routes) => {
        if (!navigationRef.current) {
            console.error("[ERROR]: navRef is not loaded");
            return;
        }

        navigationRef.current.reset(routes);
    } 
    
    return (
        <NavigationContext.Provider
            value={{
                navigate,
                reset
            }}
        >
            <NavigationContainer ref={navigationRef}>
                {children}
            </NavigationContainer>
        </NavigationContext.Provider>
    )
}

export function useNavigationContext() { 
    const context = useContext(NavigationContext);

    return context;
}