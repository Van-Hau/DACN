import axios from 'axios';
import { ClassPayload, NewWorkspacePayload, ProjectPayload, TaskPayload } from '../models';
import axiosClient from './axios-client';
export const workApi = {
    createWorkspace(payload: NewWorkspacePayload) {
        return axiosClient.post('/workspace/create', payload);
    },
    getAll() {
        return axiosClient.get('/workspace/gets');
    },
    getAllProject(workId: number) {
        return axiosClient.get('/project/gets/' + workId);
    },
    createProject(payload: ProjectPayload) {
        return axiosClient.post('/project/create', payload);
    },
    createClass(payload: ClassPayload) {
        return axiosClient.post('/class/create', payload);
    },
    getAllClass(packageId: number) {
        return axiosClient.get('/class/gets/' + packageId);
    },
    createTask(payload: FormData) {
        return axiosClient.post('/task/create', payload);
    },
    getUserWorkPage(idWorkSpace: number | string) {
        return axiosClient.get('/get-by-workspace/' + idWorkSpace);
    },
    addUserToWorkSpace(payload: any) {
        return axiosClient.post('/add-user-workspace', payload);
    },
    deleteUsersFromWorkSpace(id: any) {
        return axiosClient.delete('/delete-user-workspace/' + id);
    },
    updateManage(payload: any) {
        return axiosClient.post('/update-user-workspace', payload);
    },
    getWorkSpaceByUser(id: any) {
        return axiosClient.get('/get-workspace-by-user/' + id);
    },
};
