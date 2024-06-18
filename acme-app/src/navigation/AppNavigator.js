import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useUserContext } from '../contexts/UserContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserTabNavigator from './UserTabNavigator';
import BaggageTabNavigator from './BaggageTabNavigator';
import BaggageDetailsScreen from '../screens/BaggageDetailsScreen';
import TicketDetailsScreen from '../screens/TicketDetailsScreen';
import CreateTicketScreen from '../screens/CreateTicketScreen';
import QrCodeScannerScreen from '../screens/QrCodeScannerScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { user, isLoading } = useUserContext();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack.Navigator initialRouteName={user.jwtToken ? (user.role == 3 ? 'BaggageMain' : 'UserMain') : 'Login'}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserMain" component={UserTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="BaggageMain" component={BaggageTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="BaggageDetails" component={BaggageDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateTicket" component={CreateTicketScreen} options={{ headerShown: false }} />
            <Stack.Screen name="QrCodeScanner" component={QrCodeScannerScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
