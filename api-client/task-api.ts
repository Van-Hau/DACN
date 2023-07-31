import axiosClient from './axios-client';
export const taskApi = {
    create(payload: any) {
        return axiosClient.post('/create-task', payload);
    },
    getById(id: any) {
        return axiosClient.get(`/get-task/${id}`);
    },
    getIdPackage(id: any) {
        return axiosClient.get(`/get-id-package/${id}`);
    },
    getByUser(idUser: Number, start: string, end: string) {
        return axiosClient.get(`/get-task-by-user/${idUser}/${start}/${end}`);
    },
    update(payload: any) {
        return axiosClient.put('/update-task', payload);
    },
    moveTask(payload: any) {
        return axiosClient.put('/move-task', payload);
    },
    updateStatus(id: any) {
        return axiosClient.put(`/update-task-status/${id}`);
    },
};
