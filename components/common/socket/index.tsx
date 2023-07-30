import { memo, useEffect, useRef, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth-hook';
import io from './socket.io-2.2.0';
import { BACK_END_SOCKET_URL } from '@/constants/global';
export interface TestProps {}
let socket: any;
const SocketCustom = (Props: TestProps) => {
    const { profile }: any = useAuth();

    useEffect(() => {
        if (!profile?.data?.id) return;
        socket = io(BACK_END_SOCKET_URL);

        socket.on('connect', function (t: any) {
            if (t && profile?.data?.id) {
                socket.emit('join', profile?.data?.id);
            }
        });
        socket.on('disconnect', function () {
            console.log('disconnect');
        });

        socket.on('chat', function (data: any) {
            console.log('message', data);
        });
    }, [profile?.data?.id]);

    return <></>;
};
export default memo(SocketCustom);
