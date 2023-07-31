import axiosClient from './axios-client';
export const subTaskApi = {
    create(payload: any) {
        return axiosClient.post('/create-sub-task', payload);
    },
    update(payload: any) {
        return axiosClient.put('/update-sub-task', payload);
    },
};
