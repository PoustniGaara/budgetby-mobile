import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from './redux/CategoriesSlice';
import { fetchRecentSheet } from './redux/SheetsSlice';
import { Text } from 'react-native';

//Import Default Data
import { getSlovakDefaultSheetData } from './assets/database/slovak_default_data';

import MainContainer from './navigation/MainContainer/MainContainer';
import HomeStackNavigator from './navigation/HomeStackNavigator';
import { createSheetTableAsync, findAllSheetsAsync, saveSheetAndGetIdAsync } from './persistance/local_persistance/SheetDAO';
import { createCategoryTableAsync, saveCategoriesAndGetIdsAsync } from './persistance/local_persistance/CategoryDAO';

export default function Launcher() {

    //consts
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchCategories());
    //     dispatch(fetchRecentSheet());
    // }, [dispatch]);

    // const categories = useSelector((state) => state.categories.categories);
    // const recentSheet = useSelector((state) => state.recentSheet.recentSheet);

    // if (!categories || !recentSheet) {
    //     // data hasn't been fetched yet, show a loading indicator or placeholder
    //     return <Text>Loading...</Text>;
    // }

    const [sheets, setSheets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);


    useEffect(() => {
        initializeTables();
        loadDataWithCheck();
    }, []);

    const initializeTables = async () => {
        try {
            // Create tables for all your modelDAOs
            await createSheetTableAsync();
            await createCategoryTableAsync();

        } catch (error) {
            console.log("Error initializing tables:", error);
        }
    };

    const loadDataWithCheck = async () => {
        try {
            const sheets = await findAllSheetsAsync();
            if (sheets.length === 0) {
                //first insert new data
                await insertDefaultData();
                //wait for data insertion and load data to redux
                await loadDefaultAppData();
            }
            else {
                loadUsersAppData();
            }
        }
        catch (error) {
            console.log("Error getting sheets:", error);
        }
    };

    const loadDefaultAppData = async () => {
        try {
            //insert data to tables
            //load sheet
            //load categories
            //load items

        }
        catch (error) {

        }
    };

    const loadUsersAppData = async () => {
        try {
            //load sheet
            //load categories
            //load items
        }
        catch (error) {

        }
    };

    const insertDefaultData = async () => {
        items = getSlovakDefaultItemsData();
        try {
            //insert sheet
            let sheet = getSlovakDefaultSheetData();
            setSheets(sheet);
            let sheetId = saveSheetAndGetIdAsync(sheet);
            //insert categories
            let categories = getSlovakDefaultCategoriesData(sheetId);
            setCategories(categories);
            let categoriesIds = saveCategoriesAndGetIdsAsync(categories);
            //insert items

        }
        catch (error) {

        }
    }



    return (
        < HomeStackNavigator />
    );
}

