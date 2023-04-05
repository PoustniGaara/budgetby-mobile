import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/CategoriesSlice';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

//Styles
import gStyles from '../../globalStyles';
import styles from './MainContainer.style';

// Navigators
import HomeStackNavigator from '../HomeStackNavigator';

//Screens
import Home from '../../components/Home/Home';
import ScanScreen from '../../components/Scan/ScanScreen';
import Suggestions from '../../components/Suggestions/Suggestions';

//Screen name
const homeName = "Home";
const scanName = "Scan";
const suggestionsName = "Suggestions";

const Tab = createBottomTabNavigator();

export default function MainContainer() {

    //consts
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <NavigationContainer >
            <Tab.Navigator
                options={{}}
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        // color = 'white';
                        let iconName;
                        let rn = route.name;
                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === scanName) {
                            iconName = focused ? 'scan' : 'scan-outline';
                        } else if (rn === suggestionsName) {
                            iconName = focused ? 'search' : 'search-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                    tabBarStyle: { ...styles.tabBar },
                    headerShown: false,
                })}>

                <Tab.Screen name={homeName} component={HomeStackNavigator} />
                <Tab.Screen name={scanName} component={ScanScreen} />
                <Tab.Screen name={suggestionsName} component={Suggestions} />


            </Tab.Navigator>
        </NavigationContainer>
    )
}