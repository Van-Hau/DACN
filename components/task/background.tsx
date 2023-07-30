import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardMedia, Dialog, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
export interface IBackgroungAddTaskProps {
    setbackground: any;
    background: any;
    backgroundDefault?: any;
    setbackgroundDefault?: any;
    isEdit: boolean;
}

export default function BackgroungAddTask(props: IBackgroungAddTaskProps) {
    const { background, setbackground, backgroundDefault, setbackgroundDefault, isEdit } = props;
    const uploadImageRef = useRef<HTMLInputElement>(null);
    // delete background
    const handleDeleteBackground = () => {
        if (isEdit) {
            setbackground('');
            if (setbackgroundDefault) setbackgroundDefault('');
        }
    };
    const handleUpload = async (file: any) => {
        if (isEdit) setbackground(file);
    };
    return (
        <Stack width={'230px'}>
            {backgroundDefault && !background ? (
                <Stack
                    sx={{
                        position: 'relative',
                        border: '1px dashed rgba(0, 113, 188, 0.4)',
                        borderRadius: '5px',
                        ':hover': {
                            '& .delete-background': {
                                opacity: 1,
                            },
                        },
                    }}
                >
                    {isEdit && (
                        <Stack
                            className="delete-background"
                            sx={{
                                position: 'absolute',
                                top: '4px',
                                right: '18px',
                                opacity: 0,
                                width: '15px',
                                height: '15px',
                                cursor: 'pointer',
                            }}
                        >
                            <Tooltip title="Xoá" placement={'left-start'}>
                                <IconButton
                                    sx={{ width: '30px', height: '30px' }}
                                    color={'error'}
                                    onClick={handleDeleteBackground}
                                >
                                    <DeleteIcon sx={{ color: 'red', fontSize: '15px' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Thay đổi">
                                <IconButton
                                    component="label"
                                    sx={{ width: '30px', height: '30px' }}
                                    color={'warning'}
                                >
                                    <Typography
                                        component={'input'}
                                        hidden
                                        accept="image/*"
                                        multiple
                                        type="file"
                                        ref={uploadImageRef}
                                        onChange={(e: any) => {
                                            handleUpload(e.target.files[0]);
                                        }}
                                    />
                                    <ChangeCircleIcon sx={{ color: 'yellow', fontSize: '15px' }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    )}
                    <Stack
                        sx={{
                            borderRadius: '5px',
                            bgcolor: '#ddd',
                            p: '2px',
                            border: '1px dashed rgba(0, 113, 188, 0.4)',
                            height: 'auto',
                            width: '100%',
                            maxHeight: '300px',
                        }}
                    >
                        <Tooltip title="Xem ảnh bìa">
                            <CardMedia
                                component="img"
                                src={backgroundDefault}
                                alt="Paella dish"
                                // style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                sx={{
                                    width: '100%',
                                    maxHeight: '300px',
                                    objectFit: 'contain',
                                    display: 'block',
                                    cursor: 'pointer',
                                    height: '80px',
                                }}
                            />
                        </Tooltip>
                    </Stack>
                </Stack>
            ) : background ? (
                <Stack
                    sx={{
                        position: 'relative',
                        border: '1px dashed rgba(0, 113, 188, 0.4)',
                        borderRadius: '5px',
                        ':hover': {
                            '& .delete-background': {
                                opacity: 1,
                            },
                        },
                    }}
                >
                    {isEdit && (
                        <Stack
                            className="delete-background"
                            sx={{
                                position: 'absolute',
                                top: '4px',
                                right: '18px',
                                opacity: 0,
                                width: '15px',
                                height: '15px',
                                cursor: 'pointer',
                            }}
                        >
                            <Tooltip title="Xoá" placement={'left-start'}>
                                <IconButton
                                    sx={{ width: '30px', height: '30px' }}
                                    color={'error'}
                                    onClick={handleDeleteBackground}
                                >
                                    <DeleteIcon sx={{ color: 'red', fontSize: '15px' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Thay đổi">
                                <IconButton
                                    component="label"
                                    sx={{ width: '30px', height: '30px' }}
                                    color={'warning'}
                                >
                                    <Typography
                                        component={'input'}
                                        hidden
                                        accept="image/*"
                                        multiple
                                        type="file"
                                        ref={uploadImageRef}
                                        onChange={(e: any) => {
                                            handleUpload(e.target.files[0]);
                                        }}
                                    />
                                    <ChangeCircleIcon sx={{ color: 'yellow', fontSize: '15px' }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    )}

                    <Stack
                        sx={{
                            borderRadius: '5px',
                            bgcolor: '#ddd',
                            p: '2px',
                            border: '1px dashed rgba(0, 113, 188, 0.4)',
                            height: 'auto',
                            width: '100%',
                            maxHeight: '300px',
                        }}
                    >
                        <Tooltip title="Xem ảnh bìa">
                            <CardMedia
                                component="img"
                                src={URL.createObjectURL(background)}
                                alt="Paella dish"
                                // style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                sx={{
                                    width: '100%',
                                    maxHeight: '300px',
                                    objectFit: 'contain',
                                    display: 'block',
                                    cursor: 'pointer',
                                    height: '80px',
                                }}
                            />
                        </Tooltip>
                    </Stack>
                </Stack>
            ) : (
                <Stack
                    component={'label'}
                    sx={{
                        height: '50px',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 1,
                        cursor: 'pointer',
                        color: 'rgba(0, 113, 188, 0.4)',
                        ':hover': {
                            border: '1px dashed rgba(0, 113, 188, 1)',
                            color: 'rgba(0, 113, 188, 1)',
                        },
                        border: '1px dashed rgba(0, 113, 188, 0.4)',
                    }}
                >
                    <Typography
                        component={'input'}
                        hidden
                        accept="image/*"
                        type="file"
                        ref={uploadImageRef}
                        onChange={(e: any) => {
                            handleUpload(e.target.files[0]);
                        }}
                    />
                    <AspectRatioIcon />
                    <Typography
                        sx={{
                            fontSize: { xs: '12px', sm: '13px' },
                            userSelect: 'none',
                        }}
                    >
                        Chọn ảnh bìa
                    </Typography>
                </Stack>
            )}
        </Stack>
    );
}
