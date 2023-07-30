import { Grid, Stack, Typography } from '@mui/material';
import Notify from './notify';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useEffect, useState } from 'react';
import { notifyApi } from '@/api/notify-api';
import { useAppSelector } from '@/hooks/useRedux';
export interface INotificationPanelProps {
    setExpand: Function;
    expand: string;
}

export default function NotificationPanel(props: INotificationPanelProps) {
    const user = useAppSelector((state) => state.user);
    const listNotify = useAppSelector((state) => state.notification.notification);
    // const addTo = async (user: any, entity: any) => {
    //     const description = `<span>${user.fullName}</span> đã thêm bạn vào <b>${entity.name}</b>`;
    // };
    // const translate = async (user: any, task: any, classEntity: any) => {
    //     const description = `<span>${user.fullName}</span> đã chuyển <b>${task.name}</b> sang cột ${classEntity.name}`;
    // };
    // const giveWork = async (user: any, task: any) => {
    //     const description = `<span>${user.fullName}</span> đã giao việc <b>${task.name}</b> cho bạn`;
    // };
    return (
        <Stack
            className={props.expand === 'notify' ? 'notify' : ''}
            sx={{
                position: 'fixed',
                width: '350px',
                display: 'none',
                '&.notify': {
                    display: 'flex',
                },
                ml: 1.3,
                borderRadius: '0px 5px 5px 0px',
                top: 0,
                left: '40px',
                zIndex: 3,
                borderRight: '1px #000 solid',
                p: '20px 8px 20px 20px',
                backgroundColor: '#fff',
                height: '100vh',
                minHeight: '100%',
            }}
        >
            <Stack
                sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    alignItems: 'center',
                }}
            >
                <Typography sx={{}}>Thông báo</Typography>
                <Stack
                    sx={{
                        flexDirection: 'row',
                        '& svg': {
                            color: '#878787',
                        },
                        '& svg:hover': {
                            color: '#0a0a0a',
                        },
                    }}
                >
                    <Typography
                        sx={{ color: 'rgba(0, 113, 188)', fontSize: '0.9em', marginRight: '4px' }}
                    >
                        Chưa đọc ({listNotify.filter((i) => i.read === false).length}){' '}
                    </Typography>
                    <NotificationsActiveIcon />
                </Stack>
            </Stack>
            <Grid
                container
                sx={{
                    width: '100%',
                    height: 'calc(100% - 44px)',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': { width: '12px' },
                    '&::-webkit-scrollbar-track': {
                        border: '1px solid #ddd',
                        borderRadius: '100vw',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'linear-gradient(45deg,#000,#54514d)',
                    },
                }}
            >
                <Grid item sm={12} md={12} lg={12}>
                    {listNotify.map((item: any, index) => (
                        <Notify key={index} notify={item} />
                    ))}
                </Grid>
            </Grid>
        </Stack>
    );
}
