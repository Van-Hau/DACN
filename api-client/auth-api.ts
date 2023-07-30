import { VerifyPayload } from './../models/auth';
import { LoginPayload, RegisterPayload } from '@/models/index';
import axiosClient from './axios-client';

export const authApi = {
    login(payload: LoginPayload) {
        return axiosClient.post('/login', payload);
    },

    logout() {
        return axiosClient.post('/logout');
    },

    getProfile() {
        return axiosClient.get('/profile');
    },
    signUp(payload: RegisterPayload) {
        return axiosClient.post('/signup', payload);
    },
    validate(payload: VerifyPayload) {
        return axiosClient.post('/verification', payload);
    },
};
