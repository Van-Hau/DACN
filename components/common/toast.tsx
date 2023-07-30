import { InitToast } from '@/models/toast';
import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';

export interface IToastComponentProps {
    setToast: any;
    toast: InitToast;
}

export default function ToastComponent({ setToast, toast }: IToastComponentProps) {
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setToast({ open: false, message: '', severity: 'success' });
    };

    return (
        <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={toast.severity} sx={{ width: '100%' }}>
                {toast.message}
            </Alert>
        </Snackbar>
    );
}
