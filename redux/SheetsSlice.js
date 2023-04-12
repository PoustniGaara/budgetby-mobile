import { createSlice } from '@reduxjs/toolkit';
import { getRecentSheet } from '../storage_functions/SheetsStorage';

const recentSheetInitialState = {
    recentSheet: null
};

export const recentSheetSlice = createSlice({
    name: 'recentSheet',
    initialState: recentSheetInitialState,
    reducers: {
        setRecentSheet: (state, action) => {
            state.recentSheet = action.payload;
        },
    },
});

export const { setRecentSheet } = recentSheetSlice.actions;

export const fetchRecentSheet = () => async (dispatch) => {
    const sheet = await getRecentSheet();
    dispatch(setRecentSheet(sheet));
};

export default recentSheetSlice.reducer;
