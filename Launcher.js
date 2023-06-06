import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSheet, setSheets } from './redux/SheetsSlice';
import { setCategories, setRecentCategories } from './redux/CategoriesSlice';
import { setItems, setRecentItems } from './redux/ItemsSlice';
import { transformDataFromNormalizedToObject } from './helpers/ObjectMapper';
import getDatabase from "./persistance/local_persistance/Database";

//Import Default Data
import { getSlovakDefaultSheetData, getSlovakDefaultItemsData, getSlovakDefaultCategoriesData } from './assets/database/slovak_default_data';
import { getEnglishDefaultSheetData, getEnglishDefaultItemsData, getEnglishDefaultCategoriesData } from './assets/database/english_default_data';

import HomeStackNavigator from './navigation/HomeStackNavigator';
import { createSheetTableAsync, findAllSheetsAsync, saveSheetAndGetIdAsync, isTableCreatedAsync, deleteAllSheetsAsync } from './persistance/local_persistance/SheetDAO';
import { createCategoryTableAsync, saveCategoriesAndGetIdsAsync, isCategoryTableCreatedAsync, findAllCategoriesAsync, deleteAllCategoriesAsync } from './persistance/local_persistance/CategoryDAO';
import { saveItemsAndGetIdsAsync, findAllItemsAsync, deleteAllItemsAsync } from './persistance/local_persistance/ItemDAO';
import { savePurchasesAndGetIdsAsync, findAllPurchasesAsync } from './persistance/local_persistance/PurchaseDAO';

export default function Launcher() {

    //consts
    const dispatch = useDispatch();

    const [loadDone, setLoadDone] = useState(false);

    useEffect(() => {
        const initAsync = async () => {
            // I guess I dont need initializeTables if I have predefined database, but maybe I am wrong 06/05
            // await initializeTables();
            await loadDataWithCheck();
        };
        initAsync();
    }, []);



    const loadDataWithCheck = async () => {

        console.log('loading data with check');
        try {
            const sheets = await findAllSheetsAsync();
            if (sheets.length === 0) {
                //Insert default data
                console.log('I am inserting default data');
                await insertDefaultData();
                //wait for data insertion and load data to redux
            }
            //Load data to redux
            await loadUsersAppDataToRedux();
        }
        catch (error) {
            console.log("Error loading data withc check", error);
        }
    };

    const loadUsersAppDataToRedux = async () => {
        console.log("loading user data to redux");
        try {

            //load sheets
            console.log("loading all sheets to redux");
            const sheets = await findAllSheetsAsync();
            console.log(sheets);
            // dispatch(setSheets(sheets));
            console.log(`these sheets were load to redux: ${sheets}`)

            console.log("loading recent sheet to redux");
            const recentSheet = sheets.reduce((max, sheet) => {
                return sheet.id > max.id ? sheet : max;
            }, { id: -Infinity });
            // dispatch(setRecentSheet(recentSheet));

            //load categories
            console.log("loading all categories to redux");
            const categories = await findAllCategoriesAsync();
            // dispatch(setCategories(categories));
            console.log(`these categories were load to redux: ${categories}`)

            console.log("loading recent categories to redux");
            const recentCategories = categories.filter(category => category.sheetId === recentSheet.id);
            // dispatch(setRecentCategories(recentCategories));

            //load items 
            console.log("loading all items to redux");
            const items = await findAllItemsAsync();
            // dispatch(setItems(items));
            console.log(`these items were load to redux: ${items}`)

            console.log("loading recent items to redux");
            const recentCategoryIds = recentCategories.map(category => category.id);
            const recentItems = items.filter(item => recentCategoryIds.includes(item.categoryId));
            // dispatch(setRecentItems(recentItems));

            //load purchases
            console.log("loading all purchases to redux");
            const purchases = await findAllPurchasesAsync();
            console.log(`these purchases were load to redux: ${purchases}`)

            const mappedSheets = await transformDataFromNormalizedToObject(sheets, categories, items, purchases);
            dispatch(setSheets(mappedSheets));
            //currentSheet should be the most recent one
            const currentMappedSheet = mappedSheets.reduce((max, sheet) => {
                return sheet.id > max.id ? sheet : max;
            }, { id: -Infinity });
            dispatch(setCurrentSheet(currentMappedSheet));


            setLoadDone(true);

        }
        catch (error) {
            console.log(`error occured while loading data in redux${error}`);
        }
    };

    //First start of the app
    const insertDefaultData = async () => {
        try {

            //Insert sheet
            let sheet = await getEnglishDefaultSheetData();
            console.log(`Inserting default sheet:${sheet}`);
            let sheetId = await saveSheetAndGetIdAsync(sheet);
            console.log(`Default sheet inserted with id:${sheetId}`);

            //Insert categories
            let categories = await getEnglishDefaultCategoriesData(sheetId);
            console.log(`Inserting default categories:${categories}`);
            let categoryIds = await saveCategoriesAndGetIdsAsync(categories);
            console.log(`Default categories inserted with ids:${categoryIds}`);

            //insert Items
            let items = getEnglishDefaultItemsData(categoryIds);
            console.log(`Inserting default items:${items}`);
            let itemIds = await saveItemsAndGetIdsAsync(items);
            console.log(`Default items inserted with ids:${itemIds}`);


        }
        catch (error) {
            console.log(`error occured when inserting default data ${error}`);
        }
    }

    return (
        <>
            {loadDone ? (
                <HomeStackNavigator />
            ) : (
                <Text>Loading...</Text>
            )}
        </>
    );
}
