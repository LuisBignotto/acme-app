import { View, ActivityIndicator } from 'react-native';

import { NavigationProvider } from '../contexts/NavigationContext';

import LoginScreen from '../screens/LoginScreen';
import BaggageDetailsScreen from '../screens/BaggageDetailsScreen';
import TicketDetailsScreen from '../screens/TicketDetailsScreen';
import CreateTicketScreen from '../screens/CreateTicketScreen';
import QrCodeScannerScreen from '../screens/QrCodeScannerScreen';

import TabNavigator from './TabNavigator';

import { useUserContext } from '../contexts/UserContext';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function LoadingScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

function Main() {
    const { isLoading, user } = useUserContext();

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <NavigationProvider>
            <Stack.Navigator initialRouteName={user.jwtToken ? 'Main' : 'Login'}>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="BaggageDetails" component={BaggageDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreateTicket" component={CreateTicketScreen} options={{ headerShown: false }} />
                <Stack.Screen name="QrCodeScanner" component={QrCodeScannerScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationProvider>
    )
}

export default Main;