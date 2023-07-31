import { LayoutProps } from '@/models/common';
import { Backdrop, CircularProgress, Container, Stack } from '@mui/material';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { Auth } from '../auth';
import LefMenuHome from '../left-menu/left-menu-home';
import { useAppSelector } from '@/hooks/useRedux';
import Socket from '../socket';
export interface MainLayoutProps {}

export function MainLayout({ children }: LayoutProps) {
    const [expand, setExpand] = useState('');
    const loading = useAppSelector((state) => state.loading);

    return (
        <Auth>
            <Socket />
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: 10000,
                }}
                open={loading?.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stack height="100vh" position="relative" direction={'row'} overflow={'hidden'}>
                <Stack>
                    <LefMenuHome expand={expand} setExpand={setExpand} />
                </Stack>

                <Stack component="main" flexGrow={1} mt={{ xs: 2, md: 0 }}>
                    {children}
                </Stack>
            </Stack>{' '}
        </Auth>
    );
}
