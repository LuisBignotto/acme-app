import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ManagerBaggageScreen from '../screens/ManagerBaggageScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Tab = createBottomTabNavigator();

const BaggageTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'ManageBaggage') {
                        iconName = 'qrcode';
                    } else if (route.name === 'EditProfile') {
                        iconName = 'user';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#367CFF',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarShowLabel: false
            })}
        >
            <Tab.Screen name="ManageBaggage" component={ManagerBaggageScreen} />
            <Tab.Screen name="EditProfile" component={EditProfileScreen} />
        </Tab.Navigator>
    );
};

export default BaggageTabNavigator;
