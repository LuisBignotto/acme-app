import React from 'react';
import { UserProvider } from './src/contexts/UserContext';
import { NavigationProvider } from './src/contexts/NavigationContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    return (
        <UserProvider>
            <NavigationProvider>
                <AppNavigator />
            </NavigationProvider>
        </UserProvider>
    );
}
