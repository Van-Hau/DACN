import { CustomDateTimePickerComponent } from '@/components/common/custom-datetime-picker';
import { TextTitle } from '@/components/task/create-task-dialog';
import { Popover, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export interface IPopoverSelectTimeProps {
    anchorEl: any;
    handleClose: any;
    endDate: any;
    startDate: any;
    taskEndDate?: Date | null;
    taskStartDate?: Date | null;
    setStartDate: any;
    setEndDate: any;
    ValidateTime?: any;
    onchange: (time: { timeStart: Date | null; timeEnd: Date | null }) => void;
}

export default function PopoverSelectTime(props: IPopoverSelectTimeProps) {
    const {
        anchorEl,
        handleClose,
        endDate,
        startDate,
        setStartDate,
        setEndDate,
        ValidateTime,
        taskEndDate,
        taskStartDate,
        onchange,
    } = props;
    const handleClosePopover = () => {
        handleClose();
    };

    const [choooseStartTime, setChooseStartTime] = useState(startDate ? new Date(startDate) : null);
    const [choooseEndTime, setChooseEndTime] = useState(endDate ? new Date(endDate) : null);

    useEffect(() => {
        setChooseStartTime(startDate ? new Date(startDate) : null);
        setChooseEndTime(endDate ? new Date(endDate) : null);
        return () => {
            setChooseStartTime(startDate ? new Date(startDate) : null);
            setChooseEndTime(endDate ? new Date(endDate) : null);
        };
    }, [endDate, startDate]);

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Stack sx={{ width: '300px', borderRadius: '10px', p: '10px' }} spacing={'5px'}>
                <TextTitle>Thời gian thực hiện</TextTitle>

                <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>Bắt đầu</Typography>
                <CustomDateTimePickerComponent
                    time={choooseStartTime}
                    setTime={(v: Date | null) => {
                        setChooseStartTime(v);
                    }}
                    maxTime={() => {
                        if (taskEndDate && choooseEndTime) {
                            const taskEnd = new Date(taskEndDate);
                            // const subtaskEnd = new Date(endDate);

                            return taskEnd.getTime() < choooseEndTime.getTime()
                                ? taskEnd
                                : choooseEndTime;
                        } else if (taskEndDate && !choooseEndTime) {
                            return new Date(taskEndDate);
                        } else if (!taskEndDate && choooseEndTime) {
                            return choooseEndTime;
                        } else {
                            return null;
                        }
                    }}
                    minTime={() => (taskStartDate ? new Date(taskStartDate) : null)}
                />

                <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>Kết khúc</Typography>

                <CustomDateTimePickerComponent
                    time={choooseEndTime}
                    setTime={(v: Date | null) => {
                        setChooseEndTime(v);
                    }}
                    maxTime={() => (taskEndDate ? new Date(taskEndDate) : null)}
                    minTime={() => {
                        if (taskStartDate && choooseStartTime) {
                            const taskStart = new Date(taskStartDate);
                            // const subtaskStart = new Date(startDate);

                            return choooseStartTime.getTime() > taskStart.getTime()
                                ? taskStart
                                : choooseStartTime;
                        } else if (taskStartDate && !choooseStartTime) {
                            return new Date(taskStartDate);
                        } else if (!taskStartDate && choooseStartTime) {
                            return choooseStartTime;
                        } else {
                            return null;
                        }
                    }}
                />

                <Stack
                    sx={{ justifyContent: 'flex-end', p: '5px' }}
                    direction={'row'}
                    spacing={'5px'}
                >
                    <Stack
                        sx={{
                            padding: '5px 10px',
                            background: '#E94F4F',
                            color: '#fff',
                            transition: 'all ease .3s',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            ':hover': {
                                background: '#E94F4Fcc',
                                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 12px',
                            },
                        }}
                        onClick={() => handleClosePopover()}
                    >
                        <Typography fontSize="12px" fontWeight={700}>
                            Đóng
                        </Typography>
                    </Stack>
                    <Stack
                        onClick={() => {
                            const time: { timeStart: Date | null; timeEnd: Date | null } = {
                                timeEnd: choooseEndTime,
                                timeStart: choooseStartTime,
                            };
                            setEndDate(choooseEndTime);
                            setStartDate(choooseStartTime);
                            onchange(time);
                            handleClosePopover();
                        }}
                        sx={{
                            padding: '5px 10px',
                            background: '#0071BC',
                            color: '#fff',
                            transition: 'all ease .3s',
                            cursor: 'pointer',
                            borderRadius: '5px',
                            ':hover': {
                                background: '#0071BCcc',
                                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 12px',
                            },
                        }}
                    >
                        <Typography fontSize="12px" fontWeight={700}>
                            Cập nhật
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Popover>
    );
}
