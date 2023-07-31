import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import CreateTaskDialog from '../task/create-task-dialog';
import HeaderColumnTaskComponent from './header-column-task';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TaskItemComponent from './task/task-item';
import EditTaskDialog from '../task/edit-task-dialog';
import { taskApi } from '@/api/task-api';
import { set } from 'date-fns';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setLoading } from '@/redux/loading';
import { enqueueSnackbar } from 'notistack';

export interface ITaskColumnComponentProps {
    listClass: any;
    listUser: any;
    setListClass: any;
    treePackage: any;
    openDialogAddTask: any;
    setOpenDialogAddTask: any;
    openDialogEditTask: any;
    setOpenDialogEditTask: any;
    taskId: string;
}
export default function TaskColumnComponent({
    listClass,
    listUser,
    setListClass,
    treePackage,
    openDialogAddTask,
    setOpenDialogAddTask,
    openDialogEditTask,
    setOpenDialogEditTask,
    taskId,
}: ITaskColumnComponentProps) {
    const [idClass, setIdClass] = useState('');
    const [idTask, setIdTask] = useState('');
    const [isRender, setIsRender] = useState(false);
    const [loadingD, setLoadingD] = useState(false);
    const dispatch = useAppDispatch();
    const moveTask = useAppSelector((state) => state.moveTask);
    const profile = useAppSelector((state) => state.user);

    useEffect(() => {
        if (!moveTask?.taskEntity?.classEntity?.id || profile.id == moveTask?.userCreate?.id)
            return;
        setListClass((pre: any) => {
            const classIdDes = pre.findIndex(
                (item: any) => item.classEntity.id == moveTask?.taskEntity?.classEntity?.id
            );
            let classIdSource = -1;
            let taskIndex = -1;
            pre.forEach((item: any, index2: number) => {
                item.listTask.forEach((task: any, index: number) => {
                    if (task.id == moveTask?.taskEntity?.id) {
                        classIdSource = index2;
                        taskIndex = index;
                    }
                });
            });
            if (classIdSource == -1) return pre;

            const task = pre[classIdSource].listTask.splice(taskIndex, 1)[0];
            pre[classIdDes].listTask.push(task);

            return pre;
        });
        setIsRender(!isRender);
    }, [moveTask]);
    useEffect(() => {
        if (taskId !== '-1') {
            setOpenDialogEditTask(true);
            setIdTask(taskId);
        }
    }, [taskId]);

    const onDragEnd = async (result: any) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId == source.droppableId && destination.index == source.index)
            return;

        setListClass((pre: any) => {
            //remove task in source
            const sourceColumn = pre[source.droppableId];
            const destinationColumn = pre[destination.droppableId];
            const task = sourceColumn.listTask.splice(source.index, 1)[0];
            //add task in destination
            destinationColumn.listTask.splice(destination.index, 0, task);
            return pre;
        });
        setIsRender(!isRender);

        try {
            const classId = listClass[destination.droppableId]?.classEntity?.id;
            const { data } = await taskApi.moveTask({ idClass: classId, id: draggableId });
        } catch (error: any) {
            console.log(error?.response?.data?.message);
        }
    };
    const handleChaneStatus = async (payload: any) => {
        try {
            dispatch(setLoading(true));
            if (payload?.id) {
                const { data } = await taskApi.updateStatus(payload.id);
                setListClass((pre: any) => {
                    //GET class idClass
                    const classId = pre.findIndex(
                        (item: any) => item.classEntity.id == data.idClass
                    );
                    // //GET task index
                    const taskIndex = pre[classId].listTask.findIndex(
                        (item: any) => item.id == payload.id
                    );
                    // //update status
                    pre[classId].listTask[taskIndex].completed = data.completed;
                    return pre;
                });
                setLoadingD(!loadingD);
            }
        } catch (error: any) {
            console.log(error?.response?.data?.errors?.errorMessage);
            if (error?.response?.data?.errors?.errorMessage) {
                enqueueSnackbar(error?.response?.data?.errors?.errorMessage, { variant: 'error' });
            } else {
                enqueueSnackbar('Không thể thay đổi trạng thái', { variant: 'error' });
            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Stack direction={'row'}>
                <CreateTaskDialog
                    open={openDialogAddTask}
                    setOpen={setOpenDialogAddTask}
                    classId={idClass}
                    listUser={listUser}
                    setListClass={setListClass}
                    treePackage={treePackage}
                />
                <EditTaskDialog
                    open={openDialogEditTask}
                    setOpen={setOpenDialogEditTask}
                    listUser={listUser}
                    setListClass={setListClass}
                    idTask={idTask}
                    treePackage={treePackage}
                />
                {listClass?.map((item: any, index: any) => {
                    let height = 0;
                    item?.listTask?.forEach((element: any, index: number) => {
                        if (element.background) {
                            height += 270;
                        } else {
                            if (index == 0) height += 190;
                            else height += 140;
                        }
                    });
                    return (
                        <Droppable key={index} droppableId={index + ''}>
                            {(provided, snapshot) => (
                                <Stack
                                    // height={'100vh'}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        background: '#f3f3f3',
                                        minWidth: '341px',
                                        margin: '10px 0',
                                        borderRadius: '5px',
                                        padding: '15px 15px',
                                        marginRight: '45px',

                                        overflowX: 'auto',
                                        // width: '95vw',
                                        height: item.listTask?.length == 0 ? 60 : height,
                                        maxHeight: 'calc(100vh - 100px)',
                                        '.expand &': {
                                            width: 'calc(95vw - 350px)',
                                        },
                                        '.notify &': {
                                            width: 'calc(95vw - 350px)',
                                        },

                                        '&::-webkit-scrollbar': { height: '15px' },
                                        '&::-webkit-scrollbar-track': {
                                            border: '1px solid #ddd',
                                            borderRadius: '100vw',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            borderRadius: '15px !important',
                                            background: 'linear-gradient(45deg,#b8b8b8,#c6c0b6)',
                                        },
                                    }}
                                >
                                    <HeaderColumnTaskComponent
                                        title={item?.classEntity?.name}
                                        onclickAdd={() => {
                                            setOpenDialogAddTask(true);
                                            setIdClass(item?.classEntity?.id);
                                        }}
                                    />
                                    {/* <NewTask
                              idClass={item.classEntity.id}
                              setOpenTask={setOpenTask}
                              isOpenTask={isOpenTask}
                          /> */}
                                    <PerfectScrollbar>
                                        {item.listTask?.map((task: any, index: any) => (
                                            <TaskItemComponent
                                                onclickEdit={() => {
                                                    setOpenDialogEditTask(true);
                                                    setIdTask(task.id);
                                                }}
                                                key={index}
                                                item={task}
                                                index={index}
                                                onclickChaneStatus={handleChaneStatus}
                                            />
                                        ))}
                                    </PerfectScrollbar>
                                    {provided.placeholder}
                                </Stack>
                            )}
                        </Droppable>
                    );
                })}
            </Stack>
        </DragDropContext>
    );
}
