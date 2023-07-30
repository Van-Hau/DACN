import { CustomCheckBox } from '@/components/common/component-custom';
import { Avatar, Badge, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import RichText from '@/components/common/ricktext';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';
import PopoverSelectTime from '@/components/common/popover/selectTime';
import { BACK_END_URL } from '@/constants/global';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PopoverSelectUserProcess from '@/components/common/popover/select-user-process';
import { enqueueSnackbar } from 'notistack';
import { subTaskApi } from '@/api/sub-task-api';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLoading } from '@/redux/loading';
import moment from 'moment';
import { styled } from '@mui/material/styles';

export interface IItemSubTaskProps {
    listUser: any;
    idTask: any;
    data?: any;
    setListSubTask: any;
    setAddSubTask: any;
    addSubTask: any;
}

export default function ItemSubTask(props: IItemSubTaskProps) {
    const { listUser, idTask, data, setListSubTask, setAddSubTask, addSubTask } = props;
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [anchorElSelectTime, setAnchorElSelectTime] = useState<HTMLButtonElement | null>(null);
    const [userCreate, setUserCreate] = useState<any>(null);
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [ValidateTime, setValidateTime] = useState('');
    const [userProcess, setUserProcess] = useState<any>(null);
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useAppDispatch();

    const [anchorElSelectUserProcess, setAnchorElSelectUserProcess] =
        useState<HTMLButtonElement | null>(null);

    const handleAddTime = async (time: { timeStart: any; timeEnd: any }) => {
        setEndDate(time.timeEnd);
        setStartDate(time.timeStart);
    };
    const handleAddUserProcess = (user: any) => {
        setUserProcess(user);
    };
    React.useEffect(() => {
        if (data) {
            setDescription(data.description);
            setName(data.name);
            setStartDate(data.startDate);
            setEndDate(data.endDate);
            const user = listUser.find((item: any) => item.id === data.userAssign);
            setUserProcess(user);

            const userCreate = listUser.find((item: any) => item.id === data.userCreate);
            setUserCreate(userCreate);
        }
    }, [data]);
    const handleSave = async () => {
        if (name.trim() === '') {
            enqueueSnackbar('Tên công việc con không được để trống', { variant: 'error' });
            return;
        }
        if (userProcess === null) {
            enqueueSnackbar('Người thực hiện không được để trống', { variant: 'error' });
            return;
        }
        try {
            dispatch(setLoading(true));

            const payload = {
                description: description,
                endDate: endDate,
                idTask: idTask,
                idUserAssign: userProcess?.id,
                name: name,
                startDate: startDate,
            };

            const { data: dataNew } = await subTaskApi.create(payload);
            setListSubTask((pre: any) => {
                return [dataNew, ...pre];
            });
            setAddSubTask(false);
            enqueueSnackbar('Thêm công việc con thành công', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Thêm công việc con thất bại', { variant: 'error' });
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleEdit = async () => {
        if (name.trim() === '') {
            enqueueSnackbar('Tên công việc con không được để trống', { variant: 'error' });
            return;
        }
        if (userProcess === null) {
            enqueueSnackbar('Người thực hiện không được để trống', { variant: 'error' });
            return;
        }
        try {
            dispatch(setLoading(true));

            const payload = {
                description: description,
                endDate: startDate,
                idUserAssign: userProcess?.id,
                name: name,
                startDate: endDate,
                id: data.id,
            };

            const { data: dataNew } = await subTaskApi.update(payload);
            setListSubTask((pre: any) => {
                return pre.map((item: any) => {
                    if (item.id === dataNew.id) {
                        return dataNew;
                    }
                    return item;
                });
            });
            setIsEdit(false);

            enqueueSnackbar('Cập nhật công việc con thành công', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Cập nhật công việc con thất bại', { variant: 'error' });
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <Stack
            mt={2}
            bgcolor={'rgb(247, 249, 253 )'}
            sx={{
                p: '10px',
                borderRadius: '5px',
            }}
        >
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <ZoomOutMapIcon
                    sx={{
                        rotate: '45deg',
                        color: 'rgb(0, 113, 188)',
                        fontSize: '20px',
                    }}
                />
                <CustomCheckBox
                    sx={{
                        cursor: 'pointer',
                    }}
                />
                {!data || isEdit ? (
                    <TextField
                        placeholder="Tên công việc con"
                        focused
                        value={name}
                        onChange={(e: any) => {
                            setName(e.target.value);
                        }}
                        sx={{
                            width: '100%',
                            fontWeight: 600,
                            '.MuiInputBase-root': {
                                height: '50px',
                            },
                        }}
                    />
                ) : (
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '18px', color: '#000', fontWeight: 600, width: '100%' }}
                        onDoubleClick={() => {
                            setIsEdit(true);
                        }}
                    >
                        {data?.name}
                    </Typography>
                )}

                {(!data || isEdit) && (
                    <Stack direction="row" spacing={1}>
                        <Stack
                            onClick={(e: any) => {
                                setAnchorElSelectTime(e.currentTarget);
                            }}
                            sx={{
                                width: '35px',
                                height: '35px',
                                border: '1px dashed #0071BC',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                '&> svg': {
                                    transform: 'scale(0.8)',
                                },
                            }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <CalendarMonthIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                        </Stack>
                    </Stack>
                )}
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    onDoubleClick={() => {
                        setIsEdit(true);
                    }}
                >
                    <Stack
                        onClick={(e: any) => {
                            if (isEdit || addSubTask) setAnchorElSelectUserProcess(e.currentTarget);
                        }}
                        sx={{
                            width: '35px',
                            height: '35px',
                            border: '1px dashed #0071BC',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            '&> svg': {
                                transform: 'scale(0.8)',
                            },
                        }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        {!userProcess ? (
                            <PermIdentityIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                        ) : (
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <SmallAvatar
                                        alt={userCreate?.fullName}
                                        src={
                                            userCreate?.avatar
                                                ? BACK_END_URL + userCreate?.avatar
                                                : ''
                                        }
                                    />
                                }
                            >
                                <Avatar
                                    alt={userProcess?.fullName}
                                    src={
                                        userProcess?.avatar
                                            ? BACK_END_URL + userProcess?.avatar
                                            : ''
                                    }
                                />
                            </Badge>
                        )}
                    </Stack>
                </Stack>
            </Stack>
            {!data || isEdit ? (
                <Stack mt={2} ml={8}>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '15px', color: '#000', fontWeight: 700 }}
                    >
                        {' '}
                        Mô tả
                    </Typography>

                    <RichText
                        onChange={(t: string) => setDescription(t)}
                        description={description}
                    />
                </Stack>
            ) : (
                <Typography
                    mt={2}
                    ml={8}
                    onDoubleClick={() => {
                        setIsEdit(true);
                    }}
                    sx={{
                        fontSize: '17px',
                        width: '100%',
                        color: '#43434390',
                    }}
                    dangerouslySetInnerHTML={{
                        __html: data?.description,
                    }}
                ></Typography>
            )}
            <Stack
                mt={2}
                direction={'row'}
                justifyContent={'space-between'}
                spacing={2}
                ml={8}
                onDoubleClick={() => {
                    setIsEdit(true);
                }}
            >
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '15px', color: '#000', fontWeight: 700 }}
                    >
                        {' '}
                        Thời gian:{' '}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '15px', color: '#000', fontWeight: 400 }}
                    >
                        {startDate ? moment(startDate).format('DD/MM/yyyy') : 'Chưa đặt'}
                        {'-'}
                        {endDate ? moment(endDate).format('DD/MM/yyyy') : 'Chưa đặt'}
                    </Typography>
                </Stack>
                {(!data || isEdit) && (
                    <Stack direction={'row'} spacing={1} height={'35px'}>
                        <IconButton
                            sx={{
                                border: '1px dashed rgb(0, 113, 188)',
                                height: '35px',
                                width: '35px',
                            }}
                            onClick={() => {
                                if (data) {
                                    setIsEdit(false);
                                } else {
                                    setAddSubTask(false);
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (data) {
                                    handleEdit();
                                } else {
                                    handleSave();
                                }
                            }}
                        >
                            Lưu
                        </Button>
                    </Stack>
                )}
            </Stack>

            <PopoverSelectTime
                anchorEl={anchorElSelectTime}
                handleClose={() => {
                    setAnchorElSelectTime(null);
                }}
                onchange={(time: { timeStart: Date | null; timeEnd: Date | null }) =>
                    handleAddTime(time)
                }
                ValidateTime={ValidateTime}
                endDate={endDate}
                startDate={startDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <PopoverSelectUserProcess
                anchorEl={anchorElSelectUserProcess}
                handleClose={() => {
                    setAnchorElSelectUserProcess(null);
                }}
                userProcess={userProcess}
                handleAddUserProcess={handleAddUserProcess}
                listUser={listUser}
                setUserProcess={setUserProcess}
            />
        </Stack>
    );
}
const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));
