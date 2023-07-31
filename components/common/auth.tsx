import { userApi } from '@/api/index';
import { notifyApi } from '@/api/notify-api';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLoading, setNotification, setUser } from '@/redux/index';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface AuthAminProps {
    children: any;
}

export function Auth({ children }: AuthAminProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await userApi.getProfile();
                const { data: notification } = await notifyApi.getNotification(data.id);
                dispatch(setLoading(false));
                dispatch(setUser(data));
                dispatch(setNotification(notification));
                if (!data?.id) {
                    router.push('/login');
                    return;
                }
            } catch (error) {
                router.push('/login');
            }
        })();
    }, []);

    return <div>{children}</div>;
}
