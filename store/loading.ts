import { createSlice } from '@reduxjs/toolkit';
export interface LoadingState {
    loading: boolean;
}
const initialState: LoadingState = {
    loading: false,
};
const loading = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

const { reducer, actions } = loading;

export const { setLoading } = actions;

export default reducer;
