import { Stack, Avatar, Typography, Box, Divider, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { notifyApi } from '@/api/notify-api';
import { useAppSelector } from '@/hooks/useRedux';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/redux/notification';
import dayjs, { Dayjs } from 'dayjs';
import { BACK_END_URL } from '@/constants/global';
import { taskApi } from '@/api/task-api';
export interface INotifyProps {
    notify: any;
}

export default function Notify(props: INotifyProps) {
    const user = useAppSelector((state) => state.user);
    const listNotify: any = useAppSelector((state) => state.notification.notification);
    const router = useRouter();
    const dispatch = useDispatch();
    const forwardLink = (link: string) => {
        router.push(link);
    };
    const read = async () => {
        if (props.notify.read) return;

        const { data } = await notifyApi.readNotify(Number(props.notify.id));
        const element = listNotify.filter((i: any) => i.id === props.notify.id)[0];
        const index = listNotify.indexOf(element);
        let newArr = [...listNotify];
        newArr[index] = data;
        dispatch(setNotification(newArr));
    };

    return (
        <Stack
            onClick={() => {
                read();
                if (props.notify.link !== undefined) forwardLink(props.notify.link);
            }}
            marginTop="10px"
            marginRight="12px"
            sx={{
                borderLeft: props.notify.read ? 'none' : '3px solid red',
                padding: '5px 5px 0 5px',
                '&:hover': {
                    background: '#f4f4f4',
                },
<<<<<<< HEAD
                cursor: 'pointer',
=======
                cursor:'pointer',
>>>>>>> dev
            }}
        >
            <Stack sx={{ flexDirection: 'row', marginLeft: '5px' }}>
                <Avatar
                    src={
                        props.notify.user.avatar !== undefined
                            ? `${BACK_END_URL}${props.notify.user.avatar}`
                            : ''
                    }
                />
                <Stack sx={{ marginLeft: '10px' }}>
                    <Typography>{props.notify.title}</Typography>
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            '& span': {
                                color: '#0629c2',
                            },
                        }}
                    >
                        <Typography>
                            <Box component="span" sx={{ color: '#0071bc' }}>
                                {props.notify.user.fullName}
                            </Box>
                            {props.notify.description}
                        </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: '0.85em', color: '#878787' }}>
                        {dayjs(props.notify.createdAt).format('HH:mm DD-MM-YYYY')}
                    </Typography>
                </Stack>
            </Stack>
            <Divider />
        </Stack>
    );
}
