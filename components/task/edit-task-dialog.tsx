import { taskApi } from '@/api/task-api';
import { BACK_END_URL } from '@/constants/global';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setLoading } from '@/redux/loading';
import { Stack, Typography, styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react';
import { useState } from 'react';
import PopoverSelectUserProcess from '../common/popover/select-user-process';
import PopoverSelectTime from '../common/popover/selectTime';
import CenterContentEdit from './center-content-edit';
import LeftMenuEdit from './leff-menu-edit';
import RightContent from './right-content-edit';
import { add } from 'date-fns';
import { tr } from 'date-fns/locale';

export interface IEditTaskDialogProps {
    open: boolean;
    setOpen: any;
    listUser: any;
    setListClass: any;
    idTask: any;
    treePackage: any;
}

export default function EditTaskDialog(props: IEditTaskDialogProps) {
    const { open, setOpen, listUser, setListClass, idTask, treePackage } = props;
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const dispatch = useAppDispatch();
    const [anchorElSelectTime, setAnchorElSelectTime] = useState<HTMLButtonElement | null>(null);
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [ValidateTime, setValidateTime] = useState('');
    const [openPriority, setOpenPriority] = useState(false);
    const [priority, setPriority] = useState<any>({ value: 0, url: '/images/project/start-1.svg' });
    const [backgroundUrl, setBackgroundUrl] = useState<any>(null);
    const profile = useAppSelector((state) => state.user);
    const [addSubTask, setAddSubTask] = useState(false);

    const [anchorElSelectUserProcess, setAnchorElSelectUserProcess] =
        useState<HTMLButtonElement | null>(null);
    const [userProcess, setUserProcess] = useState<any>(null);
    const [background, setbackground] = useState<any>();
    const [taskCurrent, setTaskCurrent] = useState<any>(null);
    const [listSubTask, setListSubTask] = useState<any>([]);

    const [isEdit, setIsEdit] = useState(false);

    React.useEffect(() => {
        if (!open || isEdit) return;
        dispatch(setLoading(true));

        if (idTask) {
            (async () => {
                const { data: data } = await taskApi.getById(idTask);
                setListSubTask(data.subTaskSelects);
                setTaskCurrent(data);
                setName(data.name);
                setDescription(data.description);
                setStartDate(data.startAt);
                setEndDate(data.endAt);
                setPriority({
                    value: data.priority,
                    url:
                        data.priority === 0
                            ? '/images/project/start-1.svg'
                            : data.priority === 1
                            ? '/images/project/start-2.svg'
                            : data.priority === 0
                            ? '/images/project/start-3.svg'
                            : '/images/project/start-4.svg',
                });
                setUserProcess(data.userAssign);
                if (data.background) {
                    setBackgroundUrl(BACK_END_URL + data.background);
                    setbackground(null);
                }
                dispatch(setLoading(false));
            })();
        }
    }, [idTask, isEdit, open]);

    const handleEditProject = async () => {
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
                idClass: null,
                priority: priority.value,
                startAt: startDate,
                title: name,
                userAssign: userProcess?.id,
                id: idTask,
            };
            formData.append('task', JSON.stringify(payload));

            const { data } = await taskApi.update(formData);
            setListClass((prev: any) => {
                const index = prev.findIndex((item: any) => item.classEntity.id === data.idClass);
                const newClass = { ...prev[index] };
                const indexTask = newClass.listTask.findIndex((item: any) => item.id === idTask);
                newClass.listTask[indexTask] = data;
                prev[index] = newClass;
                return [...prev];
            });
            setIsEdit(false);
            enqueueSnackbar('Chỉnh sửa việc thành công', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Chỉnh sửa việc thất bại', { variant: 'error' });
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
        setBackgroundUrl(null);
        setIsEdit(false);
        setTaskCurrent(null);
    };

    return (
        <Dialog open={open} fullWidth={true} maxWidth="lg">
            <DialogContent sx={{ p: 0, width: '100%', height: '90vh', mt: 1 }}>
                <Stack direction={'row'} spacing={2}>
                    <LeftMenuEdit
                        setOpen={setOpen}
                        resetForm={resetForm}
                        setOpenPriority={setOpenPriority}
                        isEdit={isEdit}
                        openPriority={openPriority}
                        priority={priority}
                        setPriority={setPriority}
                    />

                    <CenterContentEdit
                        isEdit={isEdit}
                        taskCurrent={taskCurrent}
                        profile={profile}
                        setIsEdit={setIsEdit}
                        name={name}
                        setName={setName}
                        description={description}
                        setDescription={setDescription}
                        handleEditProject={handleEditProject}
                        treePackage={treePackage}
                        listUser={listUser}
                        listSubTask={listSubTask}
                        setAddSubTask={setAddSubTask}
                        addSubTask={addSubTask}
                        setListSubTask={setListSubTask}
                    />
                    <RightContent
                        isEdit={isEdit}
                        setAnchorElSelectTime={setAnchorElSelectTime}
                        startDate={startDate}
                        endDate={endDate}
                        setAnchorElSelectUserProcess={setAnchorElSelectUserProcess}
                        userProcess={userProcess}
                        listUser={listUser}
                        background={background}
                        setbackground={setbackground}
                        backgroundUrl={backgroundUrl}
                        setBackgroundUrl={setBackgroundUrl}
                        onclickAddSubTask={() => {
                            if (!addSubTask) {
                                setAddSubTask(true);
                            }
                        }}
                    />
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
