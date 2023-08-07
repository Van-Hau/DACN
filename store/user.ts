import { UserModel } from '@/models/user';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserModel = {
    avatar: '',
    company: '',
    district: '',
    email: '',
    fullName: '',
    phone: '',
    positionWork: '',
    scaleWork: 0,
    userOwnerId: '',
    role: '',
    address: '',
};
const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state = action.payload;
            return state;
        },
    },
});

const { reducer, actions } = user;

export const { setUser } = actions;

export default reducer;
