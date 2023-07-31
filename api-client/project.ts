import axiosClient from './axios-client';
export const projectApi = {
    create(payload: any) {
        return axiosClient.post('/create-project', payload);
    },
    getByIdUser(id: any, idWorkSpace: any) {
        return axiosClient.get(`/get-project-by-id-user/${id}/${idWorkSpace}`);
    },
    getUserProject(idProject: number | string) {
        return axiosClient.get('/get-user-project-by-id-project/' + idProject);
    },
    addUser(payload: any) {
        return axiosClient.post('/add-user-project', payload);
    },
    deleteUser(id: any) {
        return axiosClient.delete('/remove-user-project/' + id);
    },
    updateAdmin(payload: any) {
        return axiosClient.post('/update-admin-project', payload);
    },
};
