import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    recentCategories: [],
    currentCategory: null
};

export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setRecentCategories: (state, action) => {
            state.recentCategories = action.payload;

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

export const { setCategories, setRecentCategories, add, update, remove, setCurrentCategory } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
