import { Avatar, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export interface IUserItemProps {
    addToList: any;
    deleteFromList: any;
    fullName: string;
    positionWork: string;
    check: boolean;
}

export default function UserItem(props: IUserItemProps) {
    // const [isChoose, setChoose] = useState(props.check);
    useEffect(() => {
        //  console.log(props.check);
    });
    return (
        <Stack
            sx={{
                alignItems: 'center',
                justifyContent: 'start',
                flexDirection: 'row',
                padding: '24px',
                color: '#fff',
                background: '#212b36',
                boxShadow:
                    'rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px',
                overflow: 'hidden',
                borderRadius: '15px',
            }}
        >
            <Avatar
                sx={{
                    height: '48px',
                    width: '48px',
                }}
            />
            <Stack
                sx={{
                    padding: '0 8px 0 16px',
                    flexGrow: '1',
                    alignItems: 'flex-start',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1em',
                        lineHeight: '1.5',
                    }}
                    variant="h6"
                >
                    {props.fullName}
                </Typography>
                <Typography
                    sx={{
                        color: '#919eab',
                        fontSize: '0.85rem',
                        fontWeight: '400',
                    }}
                >
                    {props.positionWork}
                </Typography>
            </Stack>
            {props.check ? (
                <Button
                    onClick={() => {
                        // setChoose((state) => !state);
                        props.deleteFromList();
                    }}
                    sx={{
                        background: 'transparent',
                        color: 'rgb(0, 171, 85)',
                        height: '30px',
                        fontSize: '13px',
                        fontWeight: '700',
                        minWidth: '64px',
                        padding: '4px 5px',
                        justifyItems: 'flex-end',
                        '&:hover': {
                            background: 'rgba(0, 171, 85, 0.08)',
                        },
                    }}
                >
                    Đã chọn
                </Button>
            ) : (
                <Button
                    onClick={() => {
                        // setChoose((state) => !state);
                        props.addToList();
                    }}
                    sx={{
                        background: 'transparent',
                        color: '#fff',
                        height: '30px',
                        fontSize: '13px',
                        fontWeight: '700',
                        minWidth: '64px',
                        border: '1px solid rgba(145, 158, 171, 0.32)',
                        padding: '3px 9px',
                        justifyItems: 'flex-end',
                        '&:hover': {
                            border: '1px solid #fff',
                        },
                    }}
                >
                    Thêm
                </Button>
            )}
        </Stack>
    );
}
