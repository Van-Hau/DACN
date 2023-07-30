import { useAuth } from '@/hooks/auth-hook';
import { LayoutProps } from '@/models/common';
import { Container, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Auth } from '../auth';
import Footer from '../footer';
import Header from '../header';
import LefMenuHome from '../left-menu/left-menu-home';

export interface MainLayoutProps {}

export function MainLayout({ children }: LayoutProps) {
    return (
        // <Auth>
        <Stack minHeight="100vh" position="relative">
            <LefMenuHome />

            <Box component="main" flexGrow={1} mt={{ xs: 2, md: 0 }}>
                <Container maxWidth={false}>{children}</Container>
            </Box>
        </Stack>
        // </Auth>
    );
}
