import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recentItems: [],
    items: [],
    currentItem: null
};

export const itemsSlice = createSlice({
    name: 'items',
    initialState: initialState,
    reducers: {
        setCurrentItem: (state, action) => {
            state.currentItem = action.payload;
        },
        setRecentItems: (state, action) => {
            state.recentItems = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setRecentItems, setItems, setCurrentItem } = itemsSlice.actions;

export default itemsSlice.reducer;
