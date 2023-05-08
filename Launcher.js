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

        // console.log("1");
        // //for development purposes delete all sheets... in production this need to be deleted
        // await deleteAllSheetsAsync();
        // console.log("2");

        // //I also need to add the same thing for categories
        // await deleteAllCategoriesAsync();
        // //Delete all items for debug purposes
        // console.log("3");

        // await deleteAllItemsAsync();
        // console.log("4");


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
            let sheet = await getSlovakDefaultSheetData();
            console.log(`Inserting default sheet:${sheet}`);
            let sheetId = await saveSheetAndGetIdAsync(sheet);
            console.log(`Default sheet inserted with id:${sheetId}`);

            //Insert categories
            let categories = await getSlovakDefaultCategoriesData(sheetId);
            console.log(`Inserting default categories:${categories}`);
            let categoryIds = await saveCategoriesAndGetIdsAsync(categories);
            console.log(`Default categories inserted with ids:${categoryIds}`);

            //insert Items
            let items = getSlovakDefaultItemsData(categoryIds);
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


//This is deprecated code that I can use in case tables would need to be initialized despite of predefined DB

// function getDatabaseStructureAsync() {
//     return new Promise((resolve, reject) => {
//         getDatabase().then((db) => {
//             db.transaction((tx) => {
//                 tx.executeSql(
//                     "SELECT name FROM sqlite_master WHERE type='table';",
//                     [],
//                     (_, result) => {
//                         const tableNames = result.rows._array.map(row => row.name);
//                         resolve(tableNames);
//                     },
//                     (_, error) => {
//                         reject(error);
//                     }
//                 );
//             });
//         }).catch((error) => {
//             reject(error);
//         });
//     });
// }


// const initializeTables = async () => {
//     //Create Sheets table
//     try {
//         console.log('creating Sheets table');
//         await createSheetTableAsync();
//         console.log('Sheets table created');
//         const isSheetsCreated = await isTableCreatedAsync('Sheets');
//         console.log(isSheetsCreated);
//     }
//     catch (error) {
//         console.log("Error initializing Sheets table:", error);
//     }
//     // Create Categories table
//     try {
//         console.log('creating Categories table');
//         await createCategoryTableAsync();

//         const isTableCreated = await isCategoryTableCreatedAsync();
//         console.log(isTableCreated);
//         console.log('Categories table created')

//         const dbData = await getDatabaseStructureAsync();
//         dbData.forEach(element => {
//             console.log(`dbData ${element}`);

//         });

//     } catch (error) {
//         console.log("Error initializing Categories table:", error);
//     }
// };

