import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentYearMonth } from '../helpers/DateHelper';

const STORAGE_KEY = 'sheets';
const currentDataKey = getCurrentYearMonth();

const initialSheet = {
    dateKey: currentDataKey,
    total: 0,
    lastMonthPercentage: 0,
};

export const getRecentSheet = async () => {
    try {
        const recentSheet = await AsyncStorage.getItem(`sheets_${currentDataKey}`);
        if (recentSheet) {
            return JSON.parse(recentSheet);
        } else {
            await AsyncStorage.setItem(`sheets_${currentDataKey}`, JSON.stringify(initialSheet));
            return initialSheet;
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        return initialSheet;
    }
};

// export const getRecentSheet = async () => {
//     return initialSheet;
// }

// export const getRecentSheet = async () => {
//     try {
//         let dateKey = getCurrentYearMonth();
//         await AsyncStorage.setItem(dateKey, JSON.stringify(initialSheet));
//         const recentSheet = await AsyncStorage.getItem(dateKey);
//         if (recentSheet) {
//             return JSON.parse(recentSheet);
//         } else {
//             return initialSheet;
//         }
//     } catch (error) {
//         console.error('Error fetching recentSheet:', error);
//         return initialSheet;
//     }
// };

// export const getCategories = async () => {
//     try {
//         const categories = await AsyncStorage.getItem(STORAGE_KEY);
//         if (categories) {
//             return JSON.parse(categories);
//         } else {
//             await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCategories));
//             return defaultCategories;
//         }
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         return defaultCategories;
//     }
// };

export const addSheet = async (newSheet) => {
    try {
        const categories = await getCategories();
        categories.push(newSheet);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch (error) {
        console.error('Error adding Sheet:', error);
    }
};

export const updateSheet = async (updatedSheet) => {
    try {
        const categories = await getCategories();
        const index = categories.findIndex((Sheet) => Sheet.id === updatedSheet.id);
        if (index !== -1) {
            categories[index] = updatedSheet;
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
        }
    } catch (error) {
        console.error('Error updating Sheet:', error);
    }
};

export const deleteSheet = async (SheetId) => {
    try {
        const categories = await getCategories();
        const filteredCategories = categories.filter((Sheet) => Sheet.id !== SheetId);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCategories));
    } catch (error) {
        console.error('Error deleting Sheet:', error);
    }
};
