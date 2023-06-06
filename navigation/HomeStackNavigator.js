import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Locals
import AddPurchaseModal from '../components/PurchaseScreen/AddPurchaseModal/AddPurchaseModal';
import NameModal from '../components/PurchaseScreen/AddPurchaseModal/NameModal/NameModal';
import QuantityModal from '../components/PurchaseScreen/AddPurchaseModal/QuantityModal/QuantityModal';

import MainContainer from './MainContainer/MainContainer';
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
                <HomeStack.Screen name="Home" component={MainContainer} options={{ title: 'Home' }} />
                <HomeStack.Screen name="ItemScreen" component={ItemScreen} options={{ title: 'Items' }} />
                <HomeStack.Screen name="PurchaseScreen" component={PurchaseScreen} options={{ title: 'Purchases' }} />
                <HomeStack.Screen name="AddPurchaseModal" component={AddPurchaseModal} />

            </HomeStack.Navigator>
        </NavigationContainer>
    );
};

export default HomeStackNavigator;