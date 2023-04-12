import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './CategoriesSlice';
import recentSheetSlice from './SheetsSlice';

export default configureStore({
    reducer: {
        categories: categoriesReducer,
        recentSheet: recentSheetSlice,
    },
});