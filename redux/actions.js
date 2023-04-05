export const SET_CATEGORY_ID = 'SET_CATEGORY_ID';

export const setCategory = id => dispatch => {
    dispatch({
        type: SET_CATEGORY_ID,
        payload: id,
    });
};