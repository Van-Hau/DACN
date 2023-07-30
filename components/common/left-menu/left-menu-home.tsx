import { Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import IconButtonHome from './icon-button';
import SearchIcon from '@mui/icons-material/Search';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import DrawerHomeComponent from './drawer-home';
export interface IHomePageProps {}

export interface ILefMenuHomeProps {}

export default function LefMenuHome(props: ILefMenuHomeProps) {
    return (
        <Stack
            sx={{
                backgroundColor: '#dfe1e6',
                // minHeight: '100vh',
                minWidth: '50px',
                width: '50px',
                marginRight: '350px',
                height: '100vh',
                p: '0px 10px 0px 10px',
                zIndex: 6,
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
                <IconButtonHome title={'Home'} Icon={HomeIcon} mt={'20px'} isActivate />
                <IconButtonHome title={'Home'} Icon={GroupAddIcon} mt={'5px'} />
                <IconButtonHome title={'Home'} Icon={SearchIcon} mt={'5px'} />
                <IconButtonHome title={'Home'} Icon={CoronavirusIcon} mt={'5px'} />
            </Stack>
            <DrawerHomeComponent />
        </Stack>
    );
}
