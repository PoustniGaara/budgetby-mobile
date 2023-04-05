import { SET_CATEGORY_ID } from "./actions";

const initialState = {
    id: 0,
}

function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CATEGORY_ID:
            return { ...state, id: action.payload };
        default:
            return state;
    }
}

export default categoryReducer;