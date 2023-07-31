import axiosClient from './axios-client';
export const packageApi = {
    create(payload: any) {
        return axiosClient.post('/create-package', payload);
    },
    getByIdUser(id: any, idPackage: any) {
        return axiosClient.get(`/get-package-by-id-user/${id}/${idPackage}`);
    },
    getUserPacket(id: number | string) {
        return axiosClient.get('/get-user-package-by-id-package/' + id);
    },
    addUser(payload: any) {
        return axiosClient.post('/add-user-package', payload);
    },
    deleteUser(id: any) {
        return axiosClient.delete('/remove-user-package/' + id);
    },
    updateAdmin(payload: any) {
        return axiosClient.post('/update-admin-package', payload);
    },
    getTreePackageById(id: any) {
        return axiosClient.get('/get-tree-package/' + id);
    },
};
