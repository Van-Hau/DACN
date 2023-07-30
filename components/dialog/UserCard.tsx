import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Link,
    Slide,
    Stack,
    Typography,
} from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { Instagram } from '@mui/icons-material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';
import Background from '@/images/dialog/background.jpg';
import AvatarProfile from '@/images/dialog/avatar_profile.jpg';
import Mask from '@/images/dialog/shape_avatar.svg';
import { BACK_END_URL } from '@/constants/index';
import { TransitionProps } from '@mui/material/transitions';

export interface IUserCardProps {
    avatar: string;
    fullName: string;
    positionWork: string;
    removeUser: Function;
    setUserSelect: Function;
    setIsAdd: Function;
}

export default function UserCard(props: IUserCardProps) {
    useEffect(() => {});
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleRemove = () => {
        props.removeUser();
        setOpen(false);
    };
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
        <Stack>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Xác nhận'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Bạn có chắc chắn muốn xóa ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleRemove}>Xóa</Button>
                </DialogActions>
            </Dialog>
            <Stack
                sx={{
                    background: '#212b36',
                    color: '#fff',
                    overflow: 'hidden',
                    textAlign: 'center',
                    position: 'relative',
                    borderRadius: '15px',
                }}
            >
                <Stack
                    sx={{
                        background: 'url(' + Background.src + ')',
                        paddingTop: 'calc(40%)',
                        backgroundSize: 'cover',
                        width: '100%',
                        position: 'relative',
                        height: '100%',
                    }}
                ></Stack>
                <Stack
                    sx={{
                        position: 'relative',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            mask: `url(${Mask.src}) center center / contain no-repeat`,
                            width: '100%',
                            height: '66px',
                            position: 'absolute',
                            left: '0',
                            right: '0',
                            top: '-38px',
                            color: '#212b36',
                            background: '#212b36',
                        }}
                    ></Box>
                    <Stack
                        sx={{
                            width: '100%',
                            position: 'absolute',
                            top: '-32px',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            src={props.avatar ? BACK_END_URL + props.avatar : ''}
                            sx={{ width: '64px', height: '64px' }}
                        />
                    </Stack>
                    <Typography
                        sx={{
                            fontSize: '1em',
                            lineHeight: '1.5',
                            margin: '48px 0px 4px',
                        }}
                        variant="h6"
                    >
                        {props.fullName}
                    </Typography>
                    <Stack sx={{ minHeight: '40px', padding: '0 5px' }}>
                        <Typography
                            sx={{
                                color: '#919eab',
                                fontSize: '0.85rem',
                                fontWeight: '400',
                            }}
                        >
                            {props.positionWork}
                        </Typography>
                    </Stack>
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            gap: '5px',
                            margin: '16px 0 16px',
                            justifyContent: 'center',
                        }}
                    >
                        <Link href="">
                            <IconButton>
                                <Facebook sx={{ color: '#00aaec' }} />
                            </IconButton>
                        </Link>
                        <Link href="">
                            <IconButton>
                                <Instagram sx={{ color: '#e02d69' }} />
                            </IconButton>
                        </Link>
                        <Link href="">
                            <IconButton>
                                <LinkedIn sx={{ color: '#00aaec' }} />
                            </IconButton>
                        </Link>
                        <Link href="">
                            <IconButton>
                                <Twitter sx={{ color: '#00aaec' }} />
                            </IconButton>
                        </Link>
                    </Stack>
                    <Stack
                        sx={{
                            padding: '24px 10px',
                            flexDirection: 'row',
                        }}
                    >
                        <Stack
                            width="100%"
                            sx={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                onClick={handleClickOpen}
                                sx={{
                                    border: '1px solid #ec000f',
                                    borderRadius: '0',
                                    color: '#fff',
                                    width: '40%',
                                    marginRight: '10px',
                                    '&:hover': {
                                        background: '#ef434e',
                                    },
                                }}
                            >
                                Xóa
                            </Button>
                            <Button
                                sx={{
                                    border: '1px solid #00aaec',
                                    color: '#fff',
                                    borderRadius: '0',
                                    width: '40%',
                                    fontWeight: '400',
                                    '&:hover': {
                                        opacity: '0.9',
                                    },
                                }}
                                onClick={() => {
                                    props.setUserSelect();
                                    props.setIsAdd(true);
                                }}
                            >
                                Xem
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
