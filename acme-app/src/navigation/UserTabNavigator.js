import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import SupportScreen from '../screens/SupportScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Tab = createBottomTabNavigator();

const UserTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Profile') {
                        iconName = 'home';
                    } else if (route.name === 'Search') {
                        iconName = 'search';
                    } else if (route.name === 'Support') {
                        iconName = 'question-circle';
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
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Support" component={SupportScreen} />
            <Tab.Screen name="EditProfile" component={EditProfileScreen} />
        </Tab.Navigator>
    );
};

export default UserTabNavigator;
