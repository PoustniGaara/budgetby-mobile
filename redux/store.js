import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './CategoriesSlice';
import sheetSlice from './SheetsSlice';
import itemsSlice from './ItemsSlice';

export default configureStore({
    reducer: {
        categories: categoriesSlice,
        sheets: sheetSlice,
        items: itemsSlice,
    },
});