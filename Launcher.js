import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from './redux/CategoriesSlice';
import { fetchRecentSheet } from './redux/SheetsSlice';
import { Text } from 'react-native';

// import LoginScreen from './screens/LoginScreen';
import MainContainer from './navigation/MainContainer/MainContainer';
import HomeStackNavigator from './navigation/HomeStackNavigator';

export default function Launcher() {

    //consts
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchRecentSheet());
    }, [dispatch]);

    const categories = useSelector((state) => state.categories.categories);
    const recentSheet = useSelector((state) => state.recentSheet.recentSheet);

    if (!categories || !recentSheet) {
        // data hasn't been fetched yet, show a loading indicator or placeholder
        return <Text>Loading...</Text>;
    }

    return (
        < HomeStackNavigator />
    );
}

