import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './CategoriesSlice';

export default configureStore({
    reducer: {
        categories: categoriesReducer,
    },
});