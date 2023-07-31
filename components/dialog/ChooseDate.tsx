import { CloseOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

export interface IChooseDateProps {
    startValue: Dayjs | null;
    endValue: Dayjs | null;
    setStartValue: Function;
    setEndValue: Function;
    isOpen: boolean;
    setOpen: Function;
}

export default function ChooseDate(props: IChooseDateProps) {
    const [startTempValue, setStartTempValue] = useState<Dayjs | null>(props.startValue);
    const [endTempValue, setEndTempValue] = useState<Dayjs | null>(props.endValue);
    return (
        <Stack
            sx={{
                display: props.isOpen ? 'flex' : 'none',
                height: '100vh',
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                zIndex: '1000',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Stack
                sx={{
                    position: 'relative',
                    padding: '15px',
                    borderRadius: '8px',
                    width: '500px',
                    background: '#050404',
                }}
            >
                <IconButton
                    onClick={() => {
                        props.setOpen(false);
                    }}
                    sx={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        '&:hover': { background: 'rgb(84 79 79)' },
                    }}
                >
                    <CloseOutlined sx={{ color: '#fff' }} />
                </IconButton>
                <Stack
                    sx={{
                        '& fieldset': {
                            borderColor: '#696969 !important',
                            borderWidth: '1px !important',
                        },
                        '& svg': {
                            color: '#c8c5c5',
                        },
                    }}
                >
                    <Stack sx={{ marginBottom: '20px' }}>
                        <Box
                            component="label"
                            sx={{
                                alignSelf: 'flex-start',
                                color: 'rgba(0, 0, 0, 0.6)',
                            }}
                        >
                            Ngày bắt đầu
                        </Box>
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={startTempValue}
                            onChange={(newValue: any) => {
                                setStartTempValue(newValue);
                            }}
                        />
                    </Stack>
                    <Stack>
                        <Box
                            component="label"
                            sx={{
                                alignSelf: 'flex-start',
                                color: 'rgba(0, 0, 0, 0.6)',
                            }}
                        >
                            Ngày kết thúc
                        </Box>
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={endTempValue}
                            onChange={(newValue: any) => setEndTempValue(newValue)}
                        />
                    </Stack>
                </Stack>
                <Button
                    onClick={() => {
                        props.setEndValue(endTempValue);
                        props.setStartValue(startTempValue);
                        props.setOpen(false);
                    }}
                    sx={{
                        width: 'fit-content',
                        marginTop: '16px',
                        background: 'rgb(0, 171, 85)',
                        padding: '8px 20px',
                        borderRadius: '8px',
                        textTransform: 'none',
                        color: '#fff',
                        fontSize: '0.8rem',
                        maxWidth: '360px',
                        fontWeight: '600',
                        textAlign: 'center',
                        marginRight: '20px',
                        alignSelf: 'center',
                        '&:hover': {
                            background: 'rgb(0, 123, 85)',
                        },
                    }}
                >
                    Xác nhận
                </Button>
            </Stack>
        </Stack>
    );
}
