import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import SignInImage from '@/images/home/signin.svg';
import SignUpImage from '@/images/home/signup.svg';
import { classesSignPage } from 'mocks';

export interface IWindowSignUpComponentProps {
    setSingUp: any;
}

export default function WindowSignUpComponent({ setSingUp }: IWindowSignUpComponentProps) {
    const handleSingin = () => {
        setSingUp('');
    };
    const handleSingUp = () => {
        setSingUp('sign-up-mode');
    };
    return (
        <Stack sx={classesSignPage.panel}>
            <Stack className="panel left-panel">
                <Stack>
                    <Typography variant="h3">Đã có tài khoản ?</Typography>
                    <Typography>Hãy đăng nhập để trải nghiệm hệ thống</Typography>
                    <Button onClick={handleSingin} variant="contained">
                        Đăng Nhập
                    </Button>
                </Stack>
                <Box component="img" src={SignInImage.src} />
            </Stack>
            <Stack className="panel right-panel">
                <Stack>
                    <Typography variant="h3">Chưa có tài khoản ?</Typography>
                    <Typography>Đăng ký để tìm hiểu những sản phẩm của công ty</Typography>
                    <Button onClick={handleSingUp} variant="contained">
                        Đăng Ký
                    </Button>
                </Stack>
                <Box component="img" src={SignUpImage.src} />
            </Stack>
        </Stack>
    );
}
