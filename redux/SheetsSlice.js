import { createSlice } from '@reduxjs/toolkit';

// States
const initialState = {
    currentSheet: null,
    sheets: []
};

// Reducers
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
        AddNewPurchaseToCurrentSheet: (state, action) => {

            console.log(action.payload);

            let currentCategoryId = action.payload.currentCategoryId;
            let currentItemId = action.payload.currentItemId;

            const category = state.currentSheet.categories.find((category) => category.id === currentCategoryId);
            if (category) {
                const item = category.items.find((item) => item.id === currentItemId);
                if (item) {
                    item.purchases.push(action.payload.purchase);
                }
            }
        }
    },
});

export const { AddNewPurchaseToCurrentSheet, setCurrentSheet, setSheets } = sheetSlice.actions;

export default sheetSlice.reducer;

// Selectors

// export const getCurrentPurchase = createSelector(
//     (state) => state.sheets.currentSheet,
//     (currentSheet, currentCategoryId, currentItemId) => {
//       if (!currentSheet) return null;
  
//       const category = currentSheet.categories.find((category) => category.categoryId === currentCategoryId);
//       if (!category) return null;
  
//       const item = category.items.find((item) => item.itemId === currentItemId);
//       if (!item) return null;
  
//       return item.purchases;
//     }
//   );