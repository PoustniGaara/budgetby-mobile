import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSheet: null,
    sheets: []
};

export const sheetSlice = createSlice({
    name: 'sheets',
    initialState: initialState,
    reducers: {
        setCurrentSheet: (state, action) => {
            state.currentSheet = action.payload;
        },
        setSheets: (state, action) => {
            state.sheets = action.payload;
        },
    },
});

export const { setCurrentSheet, setSheets } = sheetSlice.actions;

export default sheetSlice.reducer;
