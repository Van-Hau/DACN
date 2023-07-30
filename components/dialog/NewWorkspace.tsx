import { AddOutlined } from '@mui/icons-material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { Box, Button, Divider, Stack, Tab, TextField, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import ProjectPanel from '../panel/package-panel';
import { authApi } from '@/api/auth-api';
import FollowerPanel from '../panel/follower-panel';
import { NewWorkspacePayload } from '@/models/work';
import { workApi } from '@/api/work-api';
import { enqueueSnackbar } from 'notistack';
import { useAppSelector } from '@/hooks/useRedux';

export interface INewWorkspaceProps {
    setOpenDialog: Function;
    isOpenDialog: boolean;
}

export default function NewWorkspace(props: INewWorkspaceProps) {
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceDes, setWorkspaceDes] = useState('');
    const user = useAppSelector((state) => state.user);
    function handleClickOutside(event: any, ref: any, callback: any) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    }
    const handleCreateWorkspace = async () => {
        if (workspaceName === '') {
            enqueueSnackbar('Tên Workspace không được để trống', { variant: 'error' });
            return;
        }
        if (!user.id) {
            enqueueSnackbar('Bạn chưa đăng nhập', { variant: 'error' });
            return;
        }

        const payload: NewWorkspacePayload = {
            name: workspaceName,
            description: workspaceDes,
            idUserCreate: user.id,
        };
        try {
            const { data } = await workApi.createWorkspace(payload);
            enqueueSnackbar('Thêm thành công', { variant: 'success' });
        } catch (error: any) {
            const { errors } = error.response.data;
            let message = '';
            for (const key in errors) {
                message += errors[key];
                break;
            }
            enqueueSnackbar(message, { variant: 'error' });
        }

        props.setOpenDialog(false);
    };

    const wrapperRef = useRef(null);
    return (
        <Stack
            onMouseDown={(e) => handleClickOutside(e, wrapperRef, () => props.setOpenDialog(false))}
            sx={{
                position: 'fixed',
                top: '0',
                left: '-60px',
                height: '100vh',
                width: '100vw',
                color: '#fff',
                overflowY: 'auto',
                zIndex: '12',
                display: props.isOpenDialog == true ? 'flex' : 'none',
                justifyContent: 'center',
                alignItems: 'center',
                background: ' rgba(0,0,0,0.5)',
            }}
        >
            <Stack
                ref={wrapperRef}
                sx={{
                    alignItems: 'center',
                    //maxHeight: '80%',
                    height: '70%',
                    width: '80%',
                    maxWidth: '1000px',
                    justifyContent: 'unset',
                    background: '#161c24',
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    color: '#fff',
                    padding: '20px',
                }}
            >
                <TabContext value="1">
                    <Stack
                        direction="row"
                        sx={{
                            borderBottom: '1px solid rgba(50, 50, 93, 0.25)',
                            justifyContent: 'flex-start',
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: '600',
                                fontSize: '20px',
                                lineHeight: '24px',
                                color: 'rgba(255, 255, 255, 0.87)',
                                flexGrow: '1',
                                ml: '20px',
                            }}
                        >
                            Tạo WorkSpace
                        </Typography>
                    </Stack>
                    <Stack
                        sx={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexGrow: '1',
                            maxHeight: '550px',
                        }}
                    >
                        <TabPanel value="1" sx={{ width: '100%', height: '100%' }}>
                            <Stack
                                sx={{
                                    '& input': {
                                        fontWeight: '600',
                                        color: '#fff',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#696969 !important',
                                            borderWidth: '1px !important',
                                        },
                                    },
                                    '& .Mui-focused': {
                                        color: '#fff',
                                        '& fieldset': {
                                            borderColor: '#fff !important',
                                            borderWidth: '1px !important',
                                        },
                                    },

                                    '& label': {
                                        color: '#8b8b8b',
                                        marginBottom: '5px',
                                    },
                                    '& .MuiOutlinedInput-root:hover': {
                                        '& fieldset': {
                                            borderColor: '#c4c4c4 !important',
                                            borderWidth: '1px',
                                        },
                                    },
                                }}
                            >
                                <Stack>
                                    <Box
                                        component="label"
                                        sx={{
                                            alignSelf: 'flex-start',
                                            color: 'rgba(0, 0, 0, 0.6)',
                                        }}
                                    >
                                        Tên WorkSpace
                                    </Box>
                                    <TextField
                                        onChange={(e) => setWorkspaceName(e.target.value)}
                                        value={workspaceName}
                                        fullWidth
                                    />
                                </Stack>
                                <Stack sx={{ marginTop: '20px' }}>
                                    <Box
                                        component="label"
                                        sx={{
                                            alignSelf: 'flex-start',
                                            color: 'rgba(0, 0, 0, 0.6)',
                                        }}
                                    >
                                        Mô tả
                                    </Box>
                                    <TextField
                                        onChange={(e) => setWorkspaceDes(e.target.value)}
                                        value={workspaceDes}
                                        sx={{
                                            color: '#fff',
                                            borderRadius: '5px',
                                            marginBottom: '24px',
                                            '&:hover': {
                                                border: '1px #c4c4c4 solid',
                                            },
                                            '& textarea': {
                                                color: '#fff',
                                            },
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                            border: '1px solid rgba(145, 158, 171, 0.32)',
                                        }}
                                        multiline
                                        rows={5}
                                    />
                                </Stack>
                            </Stack>
                        </TabPanel>

                        <Button
                            onClick={handleCreateWorkspace}
                            sx={{
                                width: 'fit-content',
                                background: 'rgb(0, 171, 85)',
                                padding: '8px 20px',
                                borderRadius: '8px',
                                textTransform: 'none',
                                color: '#fff',
                                fontSize: '0.8rem',
                                maxWidth: '360px',
                                fontWeight: '600',
                                textAlign: 'center',
                                marginRight: '20px',
                                '&:hover': {
                                    background: 'rgb(0, 123, 85)',
                                },
                            }}
                        >
                            Xác nhận
                        </Button>
                    </Stack>
                </TabContext>
            </Stack>
        </Stack>
    );
}
