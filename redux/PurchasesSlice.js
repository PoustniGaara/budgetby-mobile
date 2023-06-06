import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recentPurchases: [],
    purchases: []
};

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: initialState,
    reducers: {
        setRecentPurchases: (state, action) => {
            state.recentPurchases = action.payload;
        },
        setPurchases: (state, action) => {
            state.purchases = action.payload;
        },

    },
});

export const { setRecentPurchases, setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
