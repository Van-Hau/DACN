import axiosClient from './axios-client';

export const notifyApi = {
    getNotification(idUser: any) {
        return axiosClient.get(`/get-notify-by-id-user/${idUser}`);
    },
    readNotify(idNotify: Number) {
        return axiosClient.put(`/read-notify/${idNotify}`);
    },
};
