import { memo, useEffect, useRef, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import io from './socket.io-2.2.0';
import { BACK_END_SOCKET_URL } from '@/constants/global';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setMoveTask } from '@/redux/move-task';
import { setUpdateComplete } from '@/redux/update-complete';
import { setNotification } from '@/redux/notification';
import { notifyApi } from '@/api/notify-api';
export interface TestProps {}
let socket: any;
const SocketCustom = (Props: TestProps) => {
    const profile = useAppSelector((state) => state.user);
    const dispath = useAppDispatch();
    const listNotify = useAppSelector((state) => state.notification.notification);
    useEffect(() => {
        if (!profile?.id) return;
        socket = io(BACK_END_SOCKET_URL);
        console.log('vào');

        socket.on('connect', function (t: any) {
            console.log('connect', t);
            if (profile?.id) {
                console.log('join', profile?.id);
                socket.emit('join', profile?.id);
            }
        });
        socket.on('disconnect', function () {
            console.log('disconnect');
        });

        socket.on('notification', async function (data: any) {
            const { data: notify } = await notifyApi.getNotification(Number(profile.id));
            console.log('message', data);
            if (data?.type == 'moveTask') {
                dispath(setMoveTask(data));
            }
            dispath(setNotification(notify));
        });
        socket.on('update_complete', function (data: any) {
            dispath(setUpdateComplete(data));
        });
    }, [profile?.id]);

    return <></>;
};
export default memo(SocketCustom);
