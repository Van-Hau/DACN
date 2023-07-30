import {
    Avatar,
    Card,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { BACK_END_URL } from '@/constants/global';
import { use } from 'video.js/dist/types/tech/middleware';
import { useAppSelector } from '@/hooks/useRedux';
export interface IItemUserProps {
    type?: string;
    data?: any;
    onclickAdd?: any;
    index?: number;
    onDelete?: any;
    onRemoveManage?: any;
    onAddManage?: any;
    title: string;
}

export default function ItemUser(props: IItemUserProps) {
    const { type, data, onclickAdd, onDelete, onRemoveManage, onAddManage, index, title } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const profile = useAppSelector((state) => state.user);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card>
            <Stack direction="row" spacing={2} p={2} justifyContent={'space-between'}>
                <Stack direction="row" spacing={2} alignItems={'center'}>
                    <Avatar
                        sx={{ width: '50px', height: '50px' }}
                        src={data?.avatar ? BACK_END_URL + data?.avatar : ''}
                    ></Avatar>
                    <Stack>
                        <Typography variant="h6">{data?.fullName}</Typography>
                        <Typography variant="body1">{data?.email}</Typography>
                    </Stack>
                </Stack>
                {type != 'add' ? (
                    <Stack position={'relative'}>
                        {!data?.isDefault && profile?.id != data?.id ? (
                            <IconButton onClick={handleClick}>
                                <MoreVertIcon sx={{ cursor: 'pointer' }}></MoreVertIcon>
                            </IconButton>
                        ) : (
                            <></>
                        )}

                        <Typography
                            variant="body1"
                            sx={{
                                position: 'absolute',
                                top: -15,
                                left: -60,
                                color: '#f50057',
                                fontWeight: '60',
                            }}
                        >
                            {data?.isAdmin ? 'Quản lý' : ''}
                        </Typography>
                    </Stack>
                ) : (
                    <Tooltip title="Thêm thành viên" placement="top">
                        <IconButton onClick={() => onclickAdd(index)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                )}

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            onDelete(index);
                            setAnchorEl(null);
                        }}
                    >
                        {title}
                    </MenuItem>
                    {!data?.isAdmin ? (
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                onAddManage(index);
                            }}
                        >
                            Thêm làm quản lý
                        </MenuItem>
                    ) : (
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                onRemoveManage(index);
                            }}
                        >
                            Xóa quản lý
                        </MenuItem>
                    )}
                </Menu>
            </Stack>
        </Card>
    );
}
