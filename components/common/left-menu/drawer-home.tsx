import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StarIcon from '@mui/icons-material/Star';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Collapse,
    FormControl,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select,
    Stack,
    Typography,
} from '@mui/material';
import { MenuItems } from './menu-item';

export interface IDrawerHomeComponentProps {}

export default function DrawerHomeComponent(props: IDrawerHomeComponentProps) {
    console.log('vaod');
    return (
        <Stack
            sx={{
                position: 'fixed',
                width: '350px',
                display: 'flex',
                ml: 1.3,
                borderRadius: '0px 5px 5px 0px',
                top: 0,
                left: '40px',
                zIndex: 100,
                p: 1,
                backgroundColor: '#fff',
                height: '100vh',
                minHeight: '100%',
            }}
        >
            {/* ---------------------- */}

            <IconButton
                sx={{
                    position: 'absolute',
                    right: -10,
                    top: 10,
                    zIndex: 1000,
                    background: 'rgba( 0, 113, 188 )',
                    width: '20px',
                    height: '20px',
                    color: '#fff',
                    ':hover': {
                        background: 'rgba( 0, 113, 188 )',
                    },
                }}
                size="small"
                color="primary"
            >
                <NavigateBeforeIcon />
            </IconButton>

            {/* ---------------------- */}
            <Stack direction="row" alignItems={'center'}>
                <Stack sx={{ width: '90%' }}>
                    <Typography sx={{ fontFamily: 'Noto Sans Display' }}>Workspace</Typography>
                </Stack>
                {/* <Stack onClick={() => props.closex()}>
            <CloseIconAnimation />
        </Stack> */}
            </Stack>
            <Stack direction="row" alignItems={'center'} spacing={1}>
                <Stack sx={{ width: '100%' }}>
                    <FormControl fullWidth size="small">
                        <Select value={'default-ws'} defaultValue={'default-ws'}>
                            <MenuItem value="default-ws">
                                <em>Hiện tại bạn chưa có Workspace</em>
                            </MenuItem>

                            <MenuItem defaultValue={''}>Phòng lập trình</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack
                    sx={{ p: 1, cursor: 'pointer' }}
                    // onClick={(event: any) => setAnchorEl(event.currentTarget)}
                >
                    <SettingsIcon />
                </Stack>

                {/* <PopoverMainSliderBar
                    close={() => setAnchorEl(null)}
                    anchorEl={anchorEl}
                    isWorkspace={workspace}
                /> */}
            </Stack>
            <Stack sx={{ p: '10px 0px 10px 0px' }}>
                <Stack direction="row" alignItems={'center'} position={'relative'}>
                    <Typography
                        component="input"
                        placeholder="Tìm kiếm team/kế hoạch"
                        sx={{
                            fontSize: '16px',
                            lineHeight: '28px',
                            padding: ' 8px 16px',
                            width: '100%',
                            minHeight: '40px',
                            maxHeight: '40px',
                            border: 'unset',
                            borderRadius: '5px',
                            outlineColor: '#dddddd50',
                            backgroundColor: ' rgb(255, 255, 255)',
                            autoComplete: 'off',
                            boxShadow:
                                ' rgba(0, 0, 0, 0) 0px 0px 0px 0px,rgba(0, 0, 0, 0) 0px 0px 0px 0px,rgba(0, 0, 0, 0) 0px 0px 0px 0px,rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
                        }}
                    />

                    <IconButton
                        sx={{
                            display: 'block',
                            position: 'absolute',
                            right: 0,
                            top: 5,
                            p: 1,
                        }}
                    >
                        <ClearIcon
                            sx={{
                                display: 'block',
                                fontSize: '15px',
                                '&:hover': {
                                    color: 'red',
                                },
                                height: '100%',
                            }}
                        />
                    </IconButton>
                </Stack>
            </Stack>

            <Stack
                sx={{
                    maxHeight: '100%',
                    overflow: 'auto',
                    ' &::-webkit-scrollbar': {
                        width: '6px',
                    },
                    ' &::-webkit-scrollbar-thumb': {
                        width: '6px',
                        background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
                        borderRadius: '6px',
                    },
                }}
            >
                <Stack display={'flex'}>
                    <Typography textAlign={'center'}>Không tìm thấy kết quả phù hợp!</Typography>
                </Stack>
                <Stack sx={{ justifyContent: 'space-between', mb: 2 }}>
                    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 0 }}
                            component="nav"
                        >
                            <ListItemButton sx={{ p: '2px' }}>
                                <StarIcon
                                    sx={{
                                        fontSize: '20px',
                                        mr: 1,
                                    }}
                                />
                                <ListItemText>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: '12px', sm: '14px' },
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            color: '#10375e',
                                        }}
                                    >
                                        Favorite
                                    </Typography>
                                </ListItemText>

                                <ArrowDropDownIcon />
                            </ListItemButton>
                            {/* <Collapse in={openFavorite} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {getAllProjectInAllMenu()
                                        .filter((x: any) => x.IsFavorite == true)
                                        .map((project: any) => (
                                            <ProjectItem
                                                key={project.ID}
                                                project={project}
                                                menu={project.MenuID}
                                                setPopoverState={props.setPopoverState}
                                                emitChangeFavorite={handleChangeFavorite}
                                            />
                                        ))}
                                </List>
                            </Collapse> */}
                        </List>
                    </Stack>
                </Stack>

                <MenuItems />
                <MenuItems />
                <MenuItems />
                <MenuItems />
            </Stack>
        </Stack>
    );
}
