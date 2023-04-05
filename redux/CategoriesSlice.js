import { createSlice } from '@reduxjs/toolkit';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../storage_functions/CategoriesStorage';

const initialState = {
    categories: [],
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        add: (state, action) => {
            addCategory(action.payload);
            state.categories.push(action.payload);
        },
        update: (state, action) => {
            updateCategory(action.payload);
            const index = state.categories.findIndex((category) => category.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
        remove: (state, action) => {
            deleteCategory(action.payload);
            state.categories = state.categories.filter((category) => category.id !== action.payload);
        },
    },
});

export const { setCategories, add, update, remove } = categoriesSlice.actions;

export const fetchCategories = () => async (dispatch) => {
    const categories = await getCategories();
    dispatch(setCategories(categories));
};

export default categoriesSlice.reducer;
