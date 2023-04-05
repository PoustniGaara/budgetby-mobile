import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/Home/Home';
import Category from '../components/Category/Category';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#1c1c1e',
                },
                headerTintColor: '#fefffe',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            < HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="Category" component={Category} />
        </HomeStack.Navigator>
    );
};

export default HomeStackNavigator;