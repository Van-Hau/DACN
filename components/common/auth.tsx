import { useAuth } from '@/hooks/auth-hook';
import { LayoutProps } from '@/models/common';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface AuthAminProps {
    children: any;
}

export function Auth({ children }: AuthAminProps) {
    const router = useRouter();
    const { profile, firstLoading } = useAuth();

    const convertProfileType: any = profile;
    const userID = convertProfileType?.data?.id;
    // console.log(firstLoading);
    useEffect(() => {
        // if (!profile) {
        //     router.push('/login');
        // }
        if (!firstLoading && !userID) {
            localStorage.removeItem('isLogin');
            localStorage.setItem('isLogin', '0');
            router.push('/login');
        }
    }, [router, profile, firstLoading, userID]);

    if (!userID) return <></>;

    return <div>{children}</div>;
}
