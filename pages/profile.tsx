import { MainLayout } from '@/components/common';
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    Tab,
    TextField,
    Typography,
} from '@mui/material';
import Background from '@/images/dialog/background.jpg';
import WorkIcon from '@mui/icons-material/Work';
import {
    AccountBox,
    AddPhotoAlternate,
    EmailRounded,
    FacebookOutlined,
    FavoriteRounded,
    ImageRounded,
    Instagram,
    LinkedIn,
    LocationOnOutlined,
    TextFieldsOutlined,
    Twitter,
} from '@mui/icons-material';
import { useAppSelector } from '@/hooks/useRedux';
import { Fragment, useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import NewProfileComponent from '@/components/dialog/NewProfileComponent';
import InfomationComponent from '@/components/profile/InfomationComponent';
import { BACK_END_URL } from '../constants';
import { authApi, userApi } from '../api-client';
export interface IProfileProps {}

function Profile(props: IProfileProps) {
    const [user, setUser] = useState<any>();
    const [value, setValue] = useState('1');
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    useEffect(() => {
        const fetch = async () => {
            const { data } = await userApi.getProfile();
            setUser(data);
        };
        fetch();
    }, []);
    return user ? (
        <Stack>
            <Stack
                sx={{
                    width: '100%',
                    padding: '0 40px',
                    overflow: 'auto',
                    height: '100vh',
                    '&::-webkit-scrollbar': { width: '15px' },
                    '&::-webkit-scrollbar-track': {
                        border: '1px solid #ddd',
                        borderRadius: '100vw',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#c4c4c4',
                    },
                }}
            >
                <TabContext value={value}>
                    <Stack sx={{ width: '100%' }}>
                        <Stack>
                            <Stack
                                sx={{
                                    position: 'relative',
                                    background: 'rgba(0,0,0,0.1)',
                                    height: '300px',
                                    overflow: 'hidden',

                                    color: '#fff',
                                    '& button': {
                                        textTransform: 'none',
                                        color: '#000',
                                        fontSize: '0.8rem',
                                        maxWidth: '360px',
                                        minHeight: '48px',
                                        fontWeight: '600',
                                        textAlign: 'center',
                                        marginRight: '20px',
                                    },
                                    '& svg': {
                                        color: 'rgb(145, 158, 171)',
                                    },
                                }}
                            >
                                <Stack
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundSize: 'cover !important',
                                        backgroundRepeat: 'no-repeat',
                                        background: `url(${Background.src})`,
                                    }}
                                ></Stack>
                                <Stack
                                    sx={{
                                        flexDirection: 'row',
                                        bottom: '24px',
                                        position: 'absolute',
                                        left: '50px',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar
                                        src={user.avatar ? BACK_END_URL + user.avatar : ''}
                                        sx={{
                                            width: '100px',
                                            height: '100px',
                                            marginRight: '24px',
                                            justifyContent: 'center',
                                        }}
                                    />
                                    <Stack>
                                        <Typography>{user.fullName}</Typography>
                                        <Typography>{user.positionWork}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack
                                    sx={{
                                        flexDirection: 'row',
                                        zIndex: '2',
                                        justifyContent: 'flex-end',
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
                                        <Tab value="1" label="Thông Tin" />
                                    </TabList>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack sx={{ background: 'rgba(0,0,0,0.04)' }}>
                            <TabPanel value="1" sx={{ width: '100%', height: '100%' }}>
                                <InfomationComponent user={user} setUser={setUser} />
                            </TabPanel>
                        </Stack>
                    </Stack>
                </TabContext>
            </Stack>
        </Stack>
    ) : (
        <Fragment />
    );
}
Profile.Layout = MainLayout;
export default Profile;
