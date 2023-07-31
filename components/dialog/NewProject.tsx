import { AddOutlined } from '@mui/icons-material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { Box, Button, Divider, Stack, Tab, TextField, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import ProjectPanel from '../panel/package-panel';
import { authApi } from '@/api/auth-api';
import FollowerPanel from '../panel/follower-panel';
import { userApi } from '@/api/user-api';
import { enqueueSnackbar } from 'notistack';
import { ProjectPayload } from '@/models/work';
import { workApi } from '@/api/work-api';
import PackagePanel from '../panel/package-panel';
import { useAppSelector } from '@/hooks/useRedux';
export interface INewProjectProps {
    setOpenDialog: Function;
    isOpenDialog: boolean;
    idWorkspace: number;
    loadProject: Function;
}

export default function NewProject(props: INewProjectProps) {
    const [value, setValue] = useState('1');
    const [projectName, setProjectName] = useState('');
    const [projectDes, setProjectDes] = useState('');

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    const [listPackage, setListPackage] = useState([]);

    function handleClickOutside(event: any, ref: any, callback: any) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    }
    const handleCreateProject = async () => {
        if (projectName === '') {
            enqueueSnackbar('Tên Project không được để trống', { variant: 'error' });
            return;
        }

        const payload: ProjectPayload = {
            workspaceId: props.idWorkspace,
            projectName: projectName,
            projectDescription: projectDes,
            listPackage: listPackage,
        };
        try {
            const { data } = await workApi.createProject(payload);
            if (data && data.errors == null) {
                enqueueSnackbar('Thêm thành công', { variant: 'success' });
                props.loadProject(props.idWorkspace);
                props.setOpenDialog(false);
            } else if (data?.errors?.errorMessage) {
                enqueueSnackbar(data?.errors?.errorMessage, { variant: 'error' });
            }
        } catch (error: any) {
            const { errors } = error.response.data;
            let message = '';
            for (const key in errors) {
                message += errors[key];
                break;
            }
            enqueueSnackbar(message, { variant: 'error' });
        }
    };
    const wrapperRef = useRef(null);
    return (
        <Stack
            onMouseDown={(e) => handleClickOutside(e, wrapperRef, () => props.setOpenDialog(false))}
            sx={{
                width: 'calc(100vw - 50px)',
                height: '100vh',
                zIndex: '100',
                display: props.isOpenDialog ? 'flex' : 'none',
                background: 'rgba(0, 0, 0, 0.5)',
                position: 'fixed',
                top: '0',
                left: '0',
                cursor: 'default',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
            }}
        >
            <Stack
                ref={wrapperRef}
                sx={{
                    alignItems: 'center',
                    //maxHeight: '80%',
                    height: '86%',
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
                <TabContext value={value}>
                    <Stack
                        direction="row"
                        sx={{
                            borderBottom: '1px solid rgba(50, 50, 93, 0.25)',
                            justifyContent: 'flex-start',
                            width: '100%',
                        }}
                    >
                        <TabList
                            onChange={handleChange}
                            sx={{
                                '& button': {
                                    color: '#fff',
                                    textTransform: 'none',
                                    fontSize: '1.1em',
                                },
                                '& .MuiTab-root.Mui-selected': {
                                    color: 'rgb(0, 171, 85) !important',
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: 'rgb(0, 171, 85) !important',
                                    height: '4px',
                                },
                            }}
                        >
                            <Tab value="1" label="Chung" />
                            <Tab value="2" label="Kế hoạch" />
                            {/* <Tab value="3" label="Người theo dõi" /> */}
                        </TabList>
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
                                        Tên Project
                                    </Box>
                                    <TextField
                                        onChange={(e) => setProjectName(e.target.value)}
                                        value={projectName}
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
                                        onChange={(e) => setProjectDes(e.target.value)}
                                        value={projectDes}
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
                        <TabPanel value="2" sx={{ width: '100%', height: '100%' }}>
                            <PackagePanel
                                listPackage={listPackage}
                                setListPackage={setListPackage}
                            />
                        </TabPanel>
                        {/* <TabPanel value="3" sx={{ width: '100%', height: '100%' }}>
                            <FollowerPanel
                                listUser={listUser}
                                deleteFromList={deleteFromList}
                                addToList={addToList}
                                listSelectUser={listSelectUser}
                            />
                        </TabPanel> */}
                        <Button
                            onClick={handleCreateProject}
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
