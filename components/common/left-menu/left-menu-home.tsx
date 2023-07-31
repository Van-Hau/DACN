import { Person } from '@mui/icons-material';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { Stack, Badge } from '@mui/material';
import { useRouter } from 'next/router';
import DrawerHomeComponent from './drawer-home';
import IconButtonHome from './icon-button';
import { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationPanel from '@/components/nofification/nofification-panel';
import { useAppSelector } from '@/hooks/useRedux';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loading';
export interface IHomePageProps {}

export interface ILefMenuHomeProps {
    setExpand: Function;
    expand: string;
}

export default function LefMenuHome(props: ILefMenuHomeProps) {
    const router = useRouter();
    const [menuSelected, setMenuSelected] = useState(0);
    const handleExpand = () => {
        if (props.expand === 'expand') {
            props.setExpand('');
            return;
        }
        props.setExpand('expand');
    };
    const handleNotify = () => {
        if (props.expand === 'notify') {
            props.setExpand('');
            return;
        }
        props.setExpand('notify');
    };
    const dispatch = useDispatch();
    const listNotify = useAppSelector((state) => state.notification.notification);
    return (
        <Stack
            className={props.expand === 'expand' ? 'expand' : ''}
            sx={{
                backgroundColor: '#dfe1e6',
                // minHeight: '100vh',
                // minWidth: '50px',
                width: '50px',
                transition: '0.5s ease',
                '&.expand': {
                    marginRight: '350px',
                },
                height: '100vh',
                p: '0px 10px 0px 10px',
                // zIndex: 6,
                position: 'relative',
            }}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Stack sx={{ height: '100vh', flex: '1' }} spacing={1} alignItems={'center'}>
                <Stack pt={'10px'}>
                    <Stack>
                        <Stack sx={{ position: 'relative' }}>
                            <MenuIcon
                                onClick={handleExpand}
                                sx={{
                                    width: '30px',
                                    height: '30px',
                                    cursor: 'pointer',
                                    color: 'rgba(0, 113, 188)',
                                }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
                <IconButtonHome
                    onPress={() => {
                        router.push('/statistic');
                        setMenuSelected(0);
                    }}
                    title={'Home'}
                    Icon={HomeIcon}
                    mt={'20px'}
                    isActivate={menuSelected === 0}
                />

                <Badge
                    badgeContent={listNotify.filter((i) => i.read === false).length}
                    color="primary"
                    sx={{ marginTop: '5px !important' }}
                >
                    <IconButtonHome
                        onPress={() => {
                            handleNotify();
                            setMenuSelected(1);
                        }}
                        title={'Notification'}
                        Icon={NotificationsIcon}
                        mt={'0px'}
                        isActivate={menuSelected === 1}
                    />
                </Badge>

                <IconButtonHome
                    onPress={() => {
                        router.push('/list_staff');
                        setMenuSelected(2);
                    }}
                    title={'Danh sách nhân viên'}
                    Icon={GroupAddIcon}
                    mt={'5px'}
                    isActivate={menuSelected === 2}
                />

                <IconButtonHome
                    onPress={() => {
                        router.push('/profile');
                        setMenuSelected(3);
                    }}
                    title={'Cá Nhân'}
                    Icon={Person}
                    mt={'5px'}
                    isActivate={menuSelected === 3}
                />
            </Stack>
            <NotificationPanel setExpand={props.setExpand} expand={props.expand} />
            <DrawerHomeComponent setExpand={props.setExpand} expand={props.expand} />
        </Stack>
    );
}
