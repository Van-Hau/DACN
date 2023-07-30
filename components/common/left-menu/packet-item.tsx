import SettingsIcon from '@mui/icons-material/Settings';
import { useRef, useState } from 'react';

import { setPackage } from '@/redux/home';
import store from '@/redux/home_store';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import {
    Box,
    Button,
    ClickAwayListener,
    MenuItem,
    MenuList,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@/hooks/useRedux';
import Link from 'next/link';

export interface PacketItemProps {
    name: string;
    id: string;
    isAdmin?: boolean;
    handleAddMember?: any;
    handleCreateClass?: any;
}

export default function PacketItem(props: PacketItemProps) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useAppDispatch();

    const anchorRef = useRef<HTMLButtonElement>(null);
    const handleToggle = (e: any) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };
    const handleOpenDialog = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };
    const handleSetPackage = async () => {
        dispatch(setPackage({ id: props.id }));
    };
    return (
        <Stack
            direction="row"
            onClick={() => handleSetPackage()}
            sx={{
                p: '2px 5px 2px 5px',
                marginBottom: '2px',
                cursor: 'pointer',
                ':hover': {
                    bgcolor: '#00000010',
                    '& .show-icon-setting-child': {
                        opacity: 1,
                    },
                    borderRadius: '4px',
                },
                '&.Mui-selected': {
                    bgcolor: '#428bca40',
                },

                '&:hover': {
                    backgroundColor: '#EEEEEE',
                    color: 'black',
                },
                // background: 'linear-gradient(to left, #9cecfb, #65c7f7, #0052d4)',
                // : '#fff',
                borderRadius: '4px',
            }}
            alignItems={'center'}
            justifyItems={'center'}
        >
            <Stack
                sx={{
                    width: '100%',
                    flexDirection: 'row',
                    ml: 1,
                }}
            >
                <StarBorderOutlinedIcon
                    sx={{
                        fontSize: '20px',
                        mr: 1,
                        // color: '#ffcd40',
                        zIndex: 1,
                    }}
                />
                <Link href={`/class/${props.id}`}>
                    <Typography
                        sx={{
                            fontSize: '15px',
                            color: '#000',
                            //  '#0f2244',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            ' -webkit-line-clamp': 1,
                            WebkitBoxOrient: 'vertical',
                            width: '100%',
                            fontWeight: 600,
                            // : 400,
                        }}
                    >
                        {props.name}
                    </Typography>
                </Link>
            </Stack>
            <Stack
                spacing={'2px'}
                sx={{ ml: 'auto', alignItems: 'center', position: 'relative' }}
                direction={'row'}
            >
                {props.isAdmin && (
                    <Button
                        ref={anchorRef}
                        id="composition-button"
                        onClick={(e: any) => handleToggle(e)}
                    >
                        <SettingsIcon
                            className="show-icon-setting-child"
                            sx={{
                                color: 'silver',
                                fontSize: '16px',
                                opacity: 0,
                                ':hover': { color: '#428bca' },
                            }}
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
                                <MenuItem onClick={props.handleAddMember}>
                                    Quản lý thành viên
                                </MenuItem>
                                <MenuItem onClick={props.handleCreateClass}>
                                    Thêm giai đoạn
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Box>
            </Stack>
        </Stack>
    );
}
