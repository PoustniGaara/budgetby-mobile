import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainContainer from './MainContainer/MainContainer';
import Home from '../components/Home/Home';
import ItemScreen from '../components/ItemScreen/ItemScreen';
import PurchaseScreen from '../components/PurchaseScreen/PurchaseScreen';
import { NavigationContainer } from '@react-navigation/native';



const HomeStackNavigator = () => {

    const HomeStack = createNativeStackNavigator();

    return (
        <NavigationContainer>
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
                <HomeStack.Screen name="Home" component={MainContainer} options={{ title: 'Domov' }} />
                <HomeStack.Screen name="ItemScreen" component={ItemScreen} options={{ title: 'Položky' }} />
                <HomeStack.Screen name="PurchaseScreen" component={PurchaseScreen} options={{ title: 'Nákupy' }} />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
};

export default HomeStackNavigator;