import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {};
const updateComplete = createSlice({
    name: 'updateComplete',
    initialState,
    reducers: {
        setUpdateComplete(state, action) {
            return action.payload;
        },
    },
});

const { reducer, actions } = updateComplete;

export const { setUpdateComplete } = actions;

export default reducer;
