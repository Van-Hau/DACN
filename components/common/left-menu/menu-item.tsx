import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Collapse,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
    Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ProjectItem from './project-item';

// import { PopoverSettingTeam } from '@/components/common';
export interface MenuItemProps {}

export function MenuItems(props: MenuItemProps) {
    const [open, setOpen] = useState(false);

    const [userCreateMenuId, setuserCreateMenuId] = useState('');
    const [popoverSettingMenu, setPopoverSettingMenu] = useState(null);

    const handleClickMenuSetting = (e: any) => {};

    const handleClosePopoverSettingProject = (value: any) => {
        setPopoverSettingMenu(null);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 0 }}
            component="nav"
        >
            <ListItemButton
                sx={{
                    p: '2px',
                    ':hover': {
                        '& .show-icon-setting': {
                            opacity: 1,
                        },
                    },
                }}
            >
                <BookOutlinedIcon sx={{ fontSize: '20px', mr: 1 }} />
                <ListItemText>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: '#10375e',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            ' -webkit-line-clamp': 1,
                            WebkitBoxOrient: 'vertical',
                            width: '100%',
                        }}
                    >
                        Dự Án 1
                    </Typography>
                </ListItemText>

                <SettingsIcon
                    onClick={handleClickMenuSetting}
                    className="show-icon-setting"
                    sx={{ color: 'silver', fontSize: '16px', opacity: 0 }}
                />

                <Tooltip title="Công việc chưa xem" placement="right">
                    <Stack
                        sx={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '3px',
                            border: '1px solid #56595D80',
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // opacity: 0,
                            ml: '5px',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                color: '#56595D80',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                ' -webkit-line-clamp': 1,
                                WebkitBoxOrient: 'vertical',
                                fontWeight: 600,
                            }}
                        >
                            99+
                        </Typography>
                    </Stack>
                </Tooltip>

                <ArrowDropDownIcon />
                {/*                        
                //     />
                // // ) : (
                // //     <ArrowDropUpIcon
                // //         onClick={() => {
                // //             emitMenuSelect(menu.ID);
                // //             setOpen(!open);
                // //         }}
                // //     />
                // // )} */}
            </ListItemButton>
            <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                </List>
            </Collapse>
            {/* <PopoverSettingTeam
                handleAnchorEl={handleClosePopoverSettingProject}
                anchorEl={popoverSettingMenu}
                MenuID={menu.ID}
                setOpen={setOpen}
                menuName={menu.MenuName}
                userCreateMenuId={userCreateMenuId}
                menu={menu}
                workspaceId={workspaceId}
            /> */}
        </List>
    );
}
