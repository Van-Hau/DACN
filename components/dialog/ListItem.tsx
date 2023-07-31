import { AddOutlined, CloseOutlined, SearchOutlined } from '@mui/icons-material';
import { Button, Divider, Grid, IconButton, OutlinedInput, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserItem from './UserItem';
import { authApi } from '@/api/auth-api';
import { userApi } from '@/api/user-api';
export interface IListItemProps {
    isAdd: boolean;
    setIsAdd: any;
    addUser: Function;
    removeUser: Function;
    listSelect: Array<any>;
}

export default function ListItem(props: IListItemProps) {
    const [listUser, setListUser] = useState<any>([]);
    const [isActive, setActive] = useState(false);

    // const [listSelectUser, setListSelectUser] = useState<any>([]);
    // const addToList = (user: any) => {
    //     const newList = [...listSelectUser, user];
    //     setListSelectUser(newList);
    // };
    // //let listUser: any[] = [];
    // const deleteFromList = (index: any) => {
    //     const newList = [...listSelectUser];
    //     newList.splice(index, 1);
    //     setListSelectUser(newList);
    // };
    const classes = {
        search: {
            '&': {
                width: '100%',
            },
            '&>div': {
                transitionDelay: '0s',
                paddingLeft: '15px',
            },
            '& input': {
                // padding: '8px 14px',
                // transitionDelay: '0s',
                // transitionDuration: '0.1s',
            },
            '& button:before': {
                content: "''",
                position: 'absolute',
                left: '0',
                width: '1px',
                height: '50%',
                background: '#000',
            },
        },
        typography: {
            transform: 'translateX(calc(-100%))',
        },
    } as const;
    useEffect(() => {
        // console.log('list current', props.listSelect);
        const fetchData = async () => {
            await userApi.getAll().then((res) => {
                // console.log(res.data);
                setListUser(res.data);
            });
        };
        fetchData();
    }, [props.isAdd]);
    const ref = useRef(null);
    return (
        <Stack
            sx={{
                display: props.isAdd ? 'flex' : 'none',
                height: '100vh',
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                zIndex: '1000',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Stack
                sx={{
                    width: '500px',
                    alignItems: 'center',
                    borderRadius: '15px',
                    justifyContent: 'center',
                    background: '#222222',
                    padding: '0 32px 0 32px',
                    boxShadow: 'rgba(0, 0, 0, 0.24) -40px 40px 80px -8px',
                }}
            >
                <Stack
                    sx={{ maxHeight: '700px', height: 'auto', width: '100%', position: 'relative' }}
                >
                    <Stack
                        sx={{
                            boxSizing: 'border-box',
                            padding: '16px 8px 16px 20px',
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Typography
                            sx={[
                                {
                                    fontWeight: '600',
                                    fontSize: '1em',
                                    flexGrow: '1',
                                    color: '#fff',
                                    textAlign: 'left',
                                    position: 'absolute',
                                    left: '0',
                                    transition: '0.5s ease-in-out',
                                    // transform: translateX(calc(-100%))
                                },
                                isActive ? classes.typography : {},
                            ]}
                            variant="h6"
                        >
                            Thêm thành viên
                        </Typography>
                        <Stack
                            sx={[
                                {
                                    padding: '24px 0',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    width: '38px',
                                    //
                                    marginRight: '10px',
                                    transition: '0.5s ease',
                                },
                                isActive ? classes.search : {},
                            ]}
                        >
                            <OutlinedInput
                                placeholder="Search ..."
                                endAdornment={
                                    <IconButton
                                        onClick={() => {
                                            setActive((pre) => !pre);
                                        }}
                                        sx={{
                                            borderRadius: '0',
                                            background: '#fff',
                                            position: 'relative',
                                            padding: '7px',

                                            '&:hover': {
                                                background: '#fff',
                                            },
                                        }}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                }
                                sx={{
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    padding: '0',
                                    width: '100%',
                                    background: '#fff',
                                    transitionDelay: '0.3s',
                                    '& input': {
                                        padding: '0',
                                        background: '#fff',
                                    },
                                    '& fieldset': {
                                        borderColor: '#c4c4c4',
                                    },
                                }}
                            ></OutlinedInput>
                        </Stack>
                        <IconButton
                            onClick={() => props.setIsAdd(false)}
                            sx={{ '&:hover': { background: 'rgba(145, 158, 171, 0.08)' } }}
                        >
                            <CloseOutlined sx={{ color: '#fff' }} />
                        </IconButton>
                    </Stack>
                    <Divider
                        sx={{
                            borderColor: '#fff',
                            width: '100%',
                        }}
                    />
                    <Grid
                        container
                        sx={{
                            marginTop: '10px',
                            paddingRight: '8px',
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
                        spacing={2}
                    >
                        {listUser.map((item: any, index: any) => {
                            return (
                                <Grid key={index} item sm={12}>
                                    <UserItem
                                        check={
                                            props.listSelect.filter(
                                                (value) => value.email == item.email
                                            ).length > 0
                                        }
                                        fullName={item.fullName}
                                        positionWork={item.positionWork}
                                        addToList={() => props.addUser(item)}
                                        deleteFromList={() => props.removeUser(item)}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Stack
                        sx={{
                            padding: '20px 8px 20px 20px',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            onClick={() => {
                                props.setIsAdd(false);
                            }}
                            sx={{
                                background: '#00ab55',
                                color: '#fff',
                                lineHeight: '1.71429',
                                fontSize: '0.875rem',
                                fontWeight: '700',
                                textTransform: 'none',
                                padding: '6px 16px',
                                minWidth: '64px',

                                borderRadius: '8px',
                                width: 'fit-content',
                                '&:hover': { background: 'rgba(0,171,85,0.6)' },
                            }}
                        >
                            Xác Nhận
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
