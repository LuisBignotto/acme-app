import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import LoginScreen from './src/screens/LoginScreen';
import TabNavigator from './src/navigation/TabNavigator';
import BaggageDetailsScreen from './src/screens/BaggageDetailsScreen';
import TicketDetailsScreen from './src/screens/TicketDetailsScreen';
import CreateTicketScreen from './src/screens/CreateTicketScreen';
import { navigationRef } from './src/navigation/RootNavigation';

const Stack = createStackNavigator();

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                try {
                    const decoded = jwt_decode(token);
                    const currentTime = Date.now() / 1000;
                    if (decoded.exp < currentTime) {
                        await AsyncStorage.removeItem('userToken');
                        setUserToken(null);
                    } else {
                        setUserToken(token);
                    }
                } catch (e) {
                    await AsyncStorage.removeItem('userToken');
                    setUserToken(null);
                }
            }
            setIsLoading(false);
        };
        checkToken();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={userToken ? 'Main' : 'Login'}>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="BaggageDetails" component={BaggageDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreateTicket" component={CreateTicketScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
