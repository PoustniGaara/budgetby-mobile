import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recentItems: [],
    items: []
};

export const itemsSlice = createSlice({
    name: 'items',
    initialState: initialState,
    reducers: {
        setRecentItems: (state, action) => {
            state.recentItems = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setRecentItems, setItems } = itemsSlice.actions;

// export const fetchRecentSheet = () => async (dispatch) => {
//     const sheet = await getRecentSheet();
//     dispatch(setRecentSheet(sheet));
// };

export default itemsSlice.reducer;
