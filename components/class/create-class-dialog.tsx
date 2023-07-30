import { classApi } from '@/api/class-api';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLoading } from '@/redux/loading';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react';
import RichText from '../common/ricktext';

export interface ICreateClassDialogProps {
    open: boolean;
    setOpen: any;
    idPacket: any;
}

export default function CreateClassDialog(props: ICreateClassDialogProps) {
    const { open, setOpen, idPacket } = props;
    const [description, setDescription] = React.useState('');
    const [name, setName] = React.useState('');
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpen(false);
    };
    const handleCreateProject = async () => {
        if (name.trim() === '') {
            enqueueSnackbar('Vui lòng nhập tên', { variant: 'error' });
            return;
        }
        try {
            dispatch(setLoading(true));
            const payload = {
                description: description,
                name: name,
                idPackage: idPacket,
            };
            const { data } = await classApi.create(payload);
            setOpen(false);
            enqueueSnackbar('Tạo giai đoạn thành công', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Tạo giai đoạn thất bại', { variant: 'error' });
        } finally {
            dispatch(setLoading(false));
        }
    };
    return (
        <Dialog open={open} fullWidth={true} maxWidth="md">
            <DialogTitle sx={{ bgcolor: '#eee' }}>
                {'Thêm giai đoạn'}{' '}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ mt: 3 }}>
                <Stack>
                    <Typography variant="body2" sx={{ fontSize: '14px', color: '#000' }}>
                        {' '}
                        Tên giai đoạn
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Nhập tên giai đoạn...."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Stack>
                <Stack mt={2}>
                    <Typography variant="body2" sx={{ fontSize: '14px', color: '#000' }}>
                        Mô tả
                    </Typography>
                    <RichText
                        onChange={(t: string) => setDescription(t)}
                        description={description}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleCreateProject} autoFocus variant="outlined">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
}
