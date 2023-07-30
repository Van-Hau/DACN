import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { authApi } from '@/api/auth-api';
export interface IVerifyRedirectPageProps {}
export default function VerifyRedirectComponent({}: IVerifyRedirectPageProps) {
    const router = useRouter();
    const [validity, setValidate] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id, verifyCode } = router.query;
    useEffect(() => {
        async function fetchMyAPI() {
            const payload: any = {
                id: id,
                verifyCode: verifyCode,
            };
            try {
                const { data } = await authApi.validate(payload);
                if (data) {
                    setValidate(true);
                }
            } catch (error: any) {
                //get message error
                setValidate(false);
            }
            if (id != undefined) {
                setLoading(true);
            }
        }
        fetchMyAPI();
    }, [id]);
    const toLogin = () => {
        router.push('/login');
    };
    return !loading ? (
        <Stack></Stack>
    ) : (
        <Stack alignItems="center">
            {validity ? (
                <Stack alignItems="center">
                    <Typography m="20px 0" variant="h3">
                        Xác thực thành công
                    </Typography>
                    <Button onClick={toLogin} sx={{ width: 'fit-content' }} variant="contained">
                        Đăng nhập
                    </Button>
                </Stack>
            ) : (
                <Typography mt="20px" variant="h3">
                    Xác thực thất bại
                </Typography>
            )}
        </Stack>
    );
}
