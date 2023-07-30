import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import React from 'react';
import Success from '@/images/verify/Success.jpg';
import { useRouter } from 'next/router';
import { StylesProvider } from '@mui/styles';
export interface IVerifyPageProps {}
export default function VerifyPage(props: IVerifyPageProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push('https://mail.google.com/');
    };
    return (
        <StylesProvider injectFirst>
            <Stack alignItems="center" justifyContent="center" height="100vh">
                <Stack sx={{ maxWidth: '1000px', width: '80%' }}>
                    <Stack
                        sx={{
                            padding: '30px',
                            background: '#4a44ff',
                            color: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Stack
                            sx={{
                                position: 'relative',
                                '&::before': {
                                    content: "''",
                                    position: 'absolute',
                                    height: '2px',
                                    width: '50px',
                                    background: '#fff',
                                    transform: 'translateX(2em)',
                                    top: '0.6em',
                                },
                                '&::after': {
                                    content: "''",
                                    position: 'absolute',
                                    height: '2px',
                                    width: '50px',
                                    background: '#fff',
                                    transform: 'translateX(-3.5em)',
                                    top: '0.6em',
                                },
                            }}
                        >
                            <EmailIcon
                                sx={{
                                    color: '#fff',
                                    marginBottom: '10px',
                                }}
                            />
                        </Stack>
                        <Typography sx={{ fontSize: '20px' }}>Xác nhận địa chỉ Email</Typography>
                    </Stack>
                    <Stack sx={{ padding: '40px 30px 30px 30px', background: '#e9e9e9' }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '250px',
                                objectFit: 'cover',
                            }}
                            component="img"
                            src={Success.src}
                        />
                        <Stack
                            sx={{
                                background: '#fff',
                                padding: '30px 50px',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: '35px !important',
                                    marginBottom: '30px',
                                    textAlign: 'center',
                                }}
                            >
                                Bạn đã đăng ký thành công !
                            </Typography>
                            <Stack sx={{ padding: '18px 60px', alignItems: 'center' }}>
                                <Typography fontSize="18px">
                                    Vui lòng xác nhận tài khoản thông qua email để đăng nhập hệ
                                    thống
                                </Typography>
                                <Box sx={{ color: '#ffbe00', fontSize: '25px', fontWeight: '400' }}>
                                    Thanks !
                                </Box>
                            </Stack>
                            <Button
                                sx={{
                                    background: '#ffbe00',
                                    color: '#fff',
                                    borderRadius: '0',
                                    width: 'fit-content',
                                    padding: '6px 14px',
                                    '&:hover': {
                                        background: '#ffbe00',
                                        opacity: '0.9',
                                    },
                                }}
                                onClick={handleClick}
                            >
                                Xác nhận ngay
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </StylesProvider>
    );
}
