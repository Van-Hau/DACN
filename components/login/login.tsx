import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    Typography,
} from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { authApi } from '@/api/auth-api';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loading';
export interface ILoginComponentProps {
    setSignUp2: any;
}

export default function LoginComponent({ setSignUp2 }: ILoginComponentProps) {
    const [nameSignIn, setNameSignIn] = useState('');
    const router = useRouter();

    const [passwordSignIn, setPasswordSignIn] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const [type, setType] = useState('password');
    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
        setType(showPassword ? 'password' : 'text');
    };

    const handleSingUp2 = () => {
        setSignUp2('sign-up-mode2');
    };
    const handleLogin = async () => {
        if (nameSignIn === '') {
            enqueueSnackbar('Email không được để trống', { variant: 'error' });
            return;
        }
        if (passwordSignIn === '') {
            enqueueSnackbar('Password không được để trống', { variant: 'error' });
            return;
        }
        const payload = {
            email: nameSignIn,
            password: passwordSignIn,
        };
        try {
            dispatch(setLoading(true));

            const { data } = await authApi.login(payload);
            enqueueSnackbar(data.message, { variant: 'success' });
            router.push(
                {
                    pathname: '/home',
                    query: {
                        data: data,
                    },
                },
                '/home'
            );
        } catch (error: any) {
            enqueueSnackbar('Login faill !', { variant: 'error' });
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <Box component="form">
            <Typography variant="h2">Đăng Nhập</Typography>
            <OutlinedInput
                onChange={(e: any) => setNameSignIn(e.target.value)}
                value={nameSignIn}
                endAdornment={<PersonIcon sx={{ color: '#fff' }} />}
                placeholder="Email"
            />
            <OutlinedInput
                onChange={(e: any) => setPasswordSignIn(e.target.value)}
                value={passwordSignIn}
                endAdornment={
                    showPassword ? (
                        <VisibilityOff
                            onClick={handleClickShowPassword}
                            sx={{
                                color: '#fff',
                                '&:hover': {
                                    color: '#6e6b6b',
                                    cursor: 'pointer',
                                },
                            }}
                        />
                    ) : (
                        <Visibility
                            onClick={handleClickShowPassword}
                            sx={{
                                color: '#fff',
                                '&:hover': {
                                    color: '#6e6b6b',
                                    cursor: 'pointer',
                                },
                            }}
                        />
                    )
                }
                placeholder="Password"
                type={type}
            />
            <Button
                sx={{ color: '#fff', background: '#000' }}
                variant="outlined"
                onClick={handleLogin}
            >
                Đăng Nhập
            </Button>
            <Stack flexDirection="row" className="account-text">
                Chưa có tài khoản ?{' '}
                <Typography
                    onClick={handleSingUp2}
                    sx={{
                        color: '#002dff',
                        cursor: 'pointer',
                        '&:hover': { color: '#ff0000' },
                    }}
                >
                    Đăng ký
                </Typography>
            </Stack>
        </Box>
    );
}
