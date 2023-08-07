import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {};
const moveTask = createSlice({
    name: 'moveTask',
    initialState,
    reducers: {
        setMoveTask(state, action) {
            return action.payload;
        },
    },
});

const { reducer, actions } = moveTask;

export const { setMoveTask } = actions;

export default reducer;
