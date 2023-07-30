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
    ClickAwayListener,
    MenuList,
    MenuItem,
    Button,
    Menu,
    Paper,
    Popper,
    Grow,
    IconButton,
    Box,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import PacketItem from './packet-item';
import { packageApi } from '@/api/package';
import { useAppSelector } from '@/hooks/useRedux';

// import { PopoverSettingTeam } from '@/components/common';
export interface ProjectItemProps {
    name: string;
    handleAddpackage?: any;
    idProject: string;
    handleAddMember?: any;
    isAdmin?: boolean;
    handleAddMemberPackage?: any;
    handleCreateClass?: any;
}

export function ProjectItem(props: ProjectItemProps) {
    const {
        handleAddpackage,
        idProject,
        handleAddMember,
        isAdmin,
        handleAddMemberPackage,
        handleCreateClass,
    } = props;

    const [open, setOpen] = useState(false);
    const [showPacket, setShowPacket] = useState(false);
    const profile = useAppSelector((state) => state.user);
    const [listPacket, setListPacket] = useState<any>([]);

    const anchorRef = useRef<HTMLButtonElement>(null);
    const handleToggle = (e: any) => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (!showPacket || !profile?.id) {
            setListPacket([]);
            return;
        }
        (async () => {
            const { data } = await packageApi.getByIdUser(profile?.id, idProject);
            setListPacket(data);
        })();
    }, [showPacket, profile?.id, idProject]);

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 0 }}
            component="nav"
        >
            <ListItemButton
                sx={{
                    position: 'relative',
                    p: '2px',
                    ':hover': {
                        '& .show-icon-setting': {
                            opacity: 1,
                        },
                    },
                }}
            >
                <BookOutlinedIcon sx={{ fontSize: '20px', mr: 1 }} />
                <ListItemText onClick={() => setShowPacket(!showPacket)}>
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
                        {props.name}
                    </Typography>
                </ListItemText>
                {isAdmin && (
                    <Button
                        ref={anchorRef}
                        id="composition-button"
                        onClick={(e: any) => handleToggle(e)}
                    >
                        <SettingsIcon
                            // onClick={handleClickMenuSetting}
                            className="show-icon-setting"
                            sx={{ color: 'silver', fontSize: '16px', opacity: 0 }}
                        />
                    </Button>
                )}

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '0',
                        transform: 'translateY(calc(100%))',
                        right: '10px',
                        zIndex: '10',
                        display: open ? 'block' : 'none',
                        boxShadow:
                            'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                autoFocusItem={open}
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleAddpackage(idProject);
                                    }}
                                >
                                    Thêm kế hoạch
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                        handleAddMember(idProject);
                                    }}
                                >
                                    Quản lý thành viên
                                </MenuItem>
                                {/* <MenuItem onClick={handleClose}>Rời dự án</MenuItem> */}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Box>
                {!showPacket ? (
                    <IconButton
                        onClick={() => {
                            setShowPacket(true);
                        }}
                    >
                        <ArrowDropDownIcon />
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={() => {
                            setShowPacket(false);
                        }}
                    >
                        <ArrowDropUpIcon />
                    </IconButton>
                )}
            </ListItemButton>

            <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {listPacket.map((item: any, index: number) => (
                        <PacketItem
                            key={index}
                            name={item.name}
                            id={item.id}
                            isAdmin={isAdmin}
                            handleAddMember={() => {
                                handleAddMemberPackage(item.id, idProject);
                            }}
                            handleCreateClass={() => {
                                handleCreateClass(item.id, idProject);
                            }}
                        />
                    ))}
                </List>
            </Collapse>
        </List>
    );
}
