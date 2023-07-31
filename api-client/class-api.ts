import axiosClient from './axios-client';
export const classApi = {
    create(payload: any) {
        return axiosClient.post('/create-class', payload);
    },
    getClassByIdPackage(packageId: any) {
        return axiosClient.get('/class/gets/' + packageId);
    },
};
