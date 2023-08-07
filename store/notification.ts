import { createSlice } from '@reduxjs/toolkit';
export interface NotificationState {
    notification: Array<any>;
}
const initialState: NotificationState = {
    notification: [],
};
const notification = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setNotification(state, action) {
            state.notification = action.payload;
        },
    },
});

const { reducer, actions } = notification;

export const { setNotification } = actions;

export default reducer;
