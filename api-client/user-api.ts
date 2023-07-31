import axiosClient from './axios-client';
import { NewMemberPayload } from './../models/user';
import axios from 'axios';
export const userApi = {
    getProfile() {
        return axiosClient.get('/user/profile');
    },
    getSelf() {
        return axiosClient.get('/user/self');
    },
    newMember(payload: FormData) {
        return axios.post('/api/user/newMember', payload);
    },
    updateInfo(payload: FormData) {
        return axios.post('/api/user/update', payload);
    },
    getAll() {
        return axiosClient.get('/user');
    },
    getAllOfCompany() {
        return axiosClient.get('/user/allUserCompany');
    },
    demo(pya: any) {
        return axiosClient.post('/signUp', pya);
    },
    deleteUser(idUser: any) {
        return axiosClient.delete('/user/delete/' + idUser);
    },
};
