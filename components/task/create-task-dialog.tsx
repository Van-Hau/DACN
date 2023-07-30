import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
    Avatar,
    AvatarGroup,
    ClickAwayListener,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography,
    styled,
} from '@mui/material';
import RichText from '../common/ricktext';
import CloseIcon from '@mui/icons-material/Close';
import { enqueueSnackbar } from 'notistack';
import { workApi } from '@/api/work-api';
import { projectApi } from '@/api/project';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLoading } from '@/redux/loading';
import InfoIcon from '@mui/icons-material/Info';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PixIcon from '@mui/icons-material/Pix';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import SaveIcon from '@mui/icons-material/Save';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PopoverSelectTime from '../common/popover/selectTime';
import { useState } from 'react';
import moment from 'moment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PopoverSelectUserProcess from '../common/popover/select-user-process';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import BackgroungAddTask from './background';
import { taskApi } from '@/api/task-api';
import { BACK_END_URL } from '@/constants/global';
import Image from 'next/image';
import Priority from './priority';
import { set } from 'date-fns';
export interface ICreateTaskDialogProps {
    open: boolean;
    setOpen: any;
    classId: any;
    listUser: any;
    setListClass: any;
    treePackage: any;
}

export default function CreateTaskDialog(props: ICreateTaskDialogProps) {
    const { open, setOpen, classId, listUser, setListClass, treePackage } = props;
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const dispatch = useAppDispatch();
    const [anchorElSelectTime, setAnchorElSelectTime] = useState<HTMLButtonElement | null>(null);
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [ValidateTime, setValidateTime] = useState('');
    const [openPriority, setOpenPriority] = useState(false);
    const [priority, setPriority] = useState<any>({ value: 0, url: '/images/project/start-1.svg' });

    const [anchorElSelectUserProcess, setAnchorElSelectUserProcess] =
        useState<HTMLButtonElement | null>(null);
    const [userProcess, setUserProcess] = useState<any>(null);
    const [background, setbackground] = useState<any>();

    const handleCreateProject = async () => {
        if (name.trim() === '') {
            enqueueSnackbar('Vui lòng nhập tên', { variant: 'error' });
            return;
        }
        if (userProcess === null) {
            enqueueSnackbar('Vui lòng chọn người thực hiện', { variant: 'error' });
            return;
        }
        if (startDate === null || endDate === null) {
            enqueueSnackbar('Vui lòng chọn thời gian', { variant: 'error' });
            return;
        }
        //convert background to formData
        const formData = new FormData();
        if (background) {
            formData.append('background', background);
        }

        try {
            dispatch(setLoading(true));
            const payload = {
                description: description,
                endAt: endDate,
                idClass: classId,
                priority: priority.value,
                startAt: startDate,
                title: name,
                userAssign: userProcess?.id,
            };
            formData.append('task', JSON.stringify(payload));
            const { data } = await taskApi.create(formData);
            setListClass((prev: any) => {
                const index = prev.findIndex((item: any) => item.classEntity.id === classId);
                const newClass = { ...prev[index] };
                newClass?.listTask?.push(data);
                prev[index] = newClass;
                return [...prev];
            });
            setOpen(false);
            resetForm();
            enqueueSnackbar('Tạo công việc thành công', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Tạo công việc thất bại', { variant: 'error' });
        } finally {
            dispatch(setLoading(false));
        }
    };
    const handleAddTime = async (time: { timeStart: any; timeEnd: any }) => {
        setEndDate(time.timeEnd);
        setStartDate(time.timeStart);
    };
    const handleAddUserProcess = (user: any) => {
        setUserProcess(user);
    };
    const resetForm = () => {
        setName('');
        setDescription('');
        setStartDate(null);
        setEndDate(null);
        setUserProcess(null);
        setPriority({ value: 0, url: '/images/project/start-1.svg' });
        setbackground(null);
    };

    return (
        <Dialog open={open} fullWidth={true} maxWidth="lg">
            <DialogContent sx={{ p: 0, width: '100%', height: '90vh', mt: 1 }}>
                <Stack direction={'row'} spacing={2} height={'90vh'}>
                    <Stack
                        justifyContent={'space-between'}
                        bgcolor={'rgba(221, 221, 221, 0.25)'}
                        sx={{ width: '60px', mb: 2 }}
                    >
                        <Stack>
                            <IconButton
                                onClick={() => {
                                    setOpen(false);
                                    resetForm();
                                }}
                            >
                                <CloseIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                            </IconButton>
                            <IconButton>
                                <InfoIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                            </IconButton>
                            <IconButton>
                                <AttachFileIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                            </IconButton>
                        </Stack>
                        <Stack>
                            <ClickAwayListener
                                mouseEvent="onMouseDown"
                                touchEvent="onTouchStart"
                                onClickAway={() => setOpenPriority(false)}
                            >
                                <Tooltip title="Độ ưu tiên">
                                    <Stack sx={{ position: 'relative' }}>
                                        <IconButton onClick={() => setOpenPriority(!openPriority)}>
                                            <Image
                                                src={priority.url}
                                                alt="Picture of the author"
                                                width={30}
                                                height={30}
                                            />
                                        </IconButton>
                                        {openPriority ? (
                                            <Priority setPriority={setPriority} />
                                        ) : null}
                                    </Stack>
                                </Tooltip>
                            </ClickAwayListener>{' '}
                            <IconButton>
                                <ArrowCircleUpIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack flex={1}>
                        <Breadcrumbs>
                            <Typography
                                sx={{ fontSize: '25px', opacity: 0.8, fontStyle: 'italic' }}
                            >
                                {treePackage?.nameWorkspace}
                            </Typography>

                            <Typography
                                sx={{ fontSize: '25px', opacity: 0.8, fontStyle: 'italic' }}
                            >
                                {treePackage?.nameProject}
                            </Typography>
                            <Typography
                                sx={{ fontSize: '25px', opacity: 0.8, fontStyle: 'italic' }}
                            >
                                {treePackage?.namePackage}
                            </Typography>
                        </Breadcrumbs>
                        <Stack>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: '15px', color: '#000', fontWeight: 700 }}
                            >
                                {' '}
                                Tên công việc
                            </Typography>
                            <TextField
                                variant="outlined"
                                placeholder="Nhập tên công việc...."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Stack>
                        <Stack mt={2}>
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
                    </Stack>
                    <Stack
                        bgcolor={'rgb(247, 249, 253)'}
                        width={'260px'}
                        pl={2}
                        justifyContent={'space-between'}
                    >
                        <Stack spacing={1.5}>
                            <Stack spacing={'5px'} mt={2}>
                                {/* time */}
                                <TextTitle>Ngày thực hiện</TextTitle>
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
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Typography sx={{ fontWeight: '400', fontSize: '14px' }}>
                                            {startDate
                                                ? moment(startDate).format('DD/MM/yyyy')
                                                : 'Chưa đặt'}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: '400',
                                                fontSize: '14px',
                                            }}
                                        >
                                            -
                                        </Typography>
                                        <Typography sx={{ fontWeight: '400', fontSize: '14px' }}>
                                            {endDate
                                                ? moment(endDate).format('DD/MM/yyyy')
                                                : 'Chưa đặt'}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack spacing={'5px'} mt={2}>
                                <TextTitle>Người thực hiện</TextTitle>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Stack
                                        onClick={(e: any) => {
                                            setAnchorElSelectUserProcess(e.currentTarget);
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
                                        <PermIdentityIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                                    </Stack>

                                    <Avatar
                                        sx={{ width: '35px', height: '35px' }}
                                        src={
                                            userProcess?.avatar
                                                ? BACK_END_URL + userProcess?.avatar
                                                : ''
                                        }
                                    />

                                    <Stack justifyContent="center">
                                        <Typography sx={{ fontWeight: '700', fontSize: '12px' }}>
                                            {userProcess?.fullName || 'Chưa đặt'}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                maxWidth: '150px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                            fontWeight={300}
                                            fontStyle="italic"
                                            fontSize={'11px'}
                                        >
                                            {userProcess?.email || ''}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack spacing={'5px'} mt={2}>
                                <TextTitle>Người theo dõi</TextTitle>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Stack
                                        onClick={(e: any) => {
                                            // setAnchorElSelectUserProcess(e.currentTarget);
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
                                        <PermIdentityIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                                    </Stack>

                                    <AvatarGroup max={5}>
                                        {listUser?.map((item: any, index: number) => (
                                            <Avatar
                                                alt={item?.name}
                                                src={
                                                    item?.avatar ? BACK_END_URL + item?.avatar : ''
                                                }
                                                key={index}
                                            />
                                        ))}
                                    </AvatarGroup>
                                </Stack>
                            </Stack>
                            <Stack
                                sx={{
                                    width: '230px',
                                    backgroundColor: '#fff',
                                    boxShadow: ' 0px 1px 1px rgba(0, 0, 0, 0.25)',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    padding: '10px 5px',
                                }}
                                direction="row"
                                alignItems="center"
                            >
                                <PostAddIcon sx={{ opacity: 0.4 }} />
                                <Typography fontSize={'13px'} ml={2}>
                                    Tạo công việc con
                                </Typography>
                            </Stack>
                            <Stack
                                sx={{
                                    width: '230px',
                                    backgroundColor: '#fff',
                                    boxShadow: ' 0px 1px 1px rgba(0, 0, 0, 0.25)',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    padding: '10px 5px',
                                }}
                                direction="row"
                                alignItems="center"
                            >
                                <ColorLensIcon sx={{ opacity: 0.4 }} />
                                <Typography fontSize={'13px'} ml={2}>
                                    Thêm nhãn màu
                                </Typography>
                            </Stack>
                            <Stack
                                sx={{
                                    width: '230px',
                                    backgroundColor: '#fff',
                                    boxShadow: ' 0px 1px 1px rgba(0, 0, 0, 0.25)',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    padding: '10px 5px',
                                }}
                                direction="row"
                                alignItems="center"
                            >
                                <AttachFileIcon sx={{ opacity: 0.4 }} />
                                <Typography fontSize={'13px'} ml={2}>
                                    Thêm tệp đính kèm
                                </Typography>
                            </Stack>
                            <Stack
                                sx={{
                                    width: '230px',
                                    backgroundColor: '#fff',
                                    boxShadow: ' 0px 1px 1px rgba(0, 0, 0, 0.25)',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    padding: '10px 5px',
                                }}
                                direction="row"
                                alignItems="center"
                            >
                                <PixIcon sx={{ opacity: 0.4 }} />
                                <Typography fontSize={'13px'} ml={2}>
                                    Độ ưu tiên
                                </Typography>
                            </Stack>
                            <BackgroungAddTask
                                background={background}
                                setbackground={setbackground}
                                isEdit={true}
                            />
                        </Stack>
                        <Button
                            variant="contained"
                            sx={{ width: '230px', borderRadius: '20px', mb: 5 }}
                            onClick={handleCreateProject}
                        >
                            Tạo công việc
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>

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
        </Dialog>
    );
}
export const TextTitle = styled(Typography)({
    fontSize: '15px',
    fontWeight: 700,
    lineHeight: '18px',
    color: '#000',
    transition: '0.05s linear',
});
