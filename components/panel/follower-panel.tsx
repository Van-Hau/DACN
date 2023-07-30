import { Grid, Stack, Typography } from '@mui/material';
import UserItem from '../dialog/UserItem';
import { useState, useEffect } from 'react';
import { authApi } from '@/api/auth-api';
export interface IFollowerPanelProps {
    listUser: any;
    deleteFromList: Function;
    addToList: Function;
    listSelectUser: any;
}

export default function FollowerPanel(props: IFollowerPanelProps) {
    return props.listUser.length == 0 ? (
        <Typography>Chưa có nhân viên nào trong công ty</Typography>
    ) : (
        <Stack
            sx={{
                height: '100%',
                overflow: 'auto',
                '&::-webkit-scrollbar': { width: '15px' },
                '&::-webkit-scrollbar-track': {
                    border: '1px solid #ddd',
                    borderRadius: '100vw',
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '15px',
                    background: 'linear-gradient(45deg,white,#c6c0b6)',
                },
            }}
        >
            <Grid
                container
                sx={{
                    marginTop: '10px',
                    paddingRight: '8px',
                }}
                spacing={2}
            >
                {props.listUser.map((item: any, index: any) => (
                    <Grid key={index} item sm={12}>
                        <UserItem
                            fullName={item.fullName}
                            check={props.listSelectUser.includes(item)}
                            positionWork={item.positionWork}
                            addToList={() => props.addToList(item)}
                            deleteFromList={() => props.deleteFromList(index)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
