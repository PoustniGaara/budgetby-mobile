import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Styles
import styles from './MainContainer.style';

// Navigators
import HomeStackNavigator from '../HomeStackNavigator';

//Screens
import Home from '../../components/Home/Home';
import ScanScreen from '../../components/Scan/ScanScreen';

export default function MainContainer() {

    const Tab = createBottomTabNavigator();

    //Screen name
    const homeName = "Home";
    const scanName = "Scan";

    return (
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;
                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn === scanName) {
                        iconName = focused ? 'scan' : 'scan-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarStyle: { ...styles.tabBar },
                headerShown: false,
            })}>

            <Tab.Screen name={homeName} component={Home} />
            <Tab.Screen name={scanName} component={ScanScreen} />
        </Tab.Navigator>
    )
}