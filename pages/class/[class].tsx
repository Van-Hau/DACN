import { MainLayout } from '@/components/common';

import TaskColumnComponent from '@/components/colum-task/task-column';
import { Stack } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import HeaderTaskComponent from '@/components/colum-task/header-task';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { packageApi } from '@/api/package';
import { classApi } from '@/api/class-api';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { setLoading } from '@/redux/loading';

export interface IClassPageProps {}

export default function ClassPage(props: IClassPageProps) {
    const router = useRouter();
    const url = router.query;
    const [listUser, setListUser] = useState([]);
    const [listClass, setListClass] = useState<any>([]);
    const [treePackage, setTreePackage] = useState<any>(null);
    const [openDialogAddTask, setOpenDialogAddTask] = useState(false);
    const [openDialogEditTask, setOpenDialogEditTask] = useState(false);
    const dispatch = useAppDispatch();
    //lăn chuột scroll ngang
    const handleScrollX = (e: any) => {
        // e.preventDefault();
        if (openDialogEditTask || openDialogAddTask) return;
        e.currentTarget.scrollLeft += e.deltaY;
    };
    useEffect(() => {
        if (!url?.class) return;
        dispatch(setLoading(true));
        (async () => {
            Promise.all([
                packageApi.getUserPacket(url?.class as string),
                classApi.getClassByIdPackage(url?.class),
                packageApi.getTreePackageById(url?.class),
            ])
                .then((res) => {
                    const { data } = res[0];
                    setListUser(data);
                    const { data: dataClass } = res[1];
                    setListClass(dataClass);

                    const { data: dataTreeClass } = res[2];
                    setTreePackage(dataTreeClass);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    dispatch(setLoading(false));
                });
        })();
    }, [url?.class]);

    const reLoad = useAppSelector((state) => state.updateComplete);

    useEffect(() => {
        if (!reLoad || !url?.class) return;
        (async () => {
            const { data } = await classApi.getClassByIdPackage(url?.class as string);
            setListClass(data);
        })();
    }, [reLoad]);

    return (
        <PerfectScrollbar
            onWheel={handleScrollX}
            style={{
                backgroundImage: `url(/images/background2.jpg)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Stack
                sx={{
                    width: '80vw',
                }}
            >
                <HeaderTaskComponent listUser={listUser} treePackage={treePackage} />
                <Stack
                    sx={{
                        minHeight: 'calc(100vh - 50px)',
                        flexGrow: 1,
                        padding: '10px 20px',
                    }}
                    direction={'row'}
                >
                    <TaskColumnComponent
                        listClass={listClass}
                        listUser={listUser}
                        setListClass={setListClass}
                        treePackage={treePackage}
                        openDialogAddTask={openDialogAddTask}
                        setOpenDialogAddTask={setOpenDialogAddTask}
                        openDialogEditTask={openDialogEditTask}
                        setOpenDialogEditTask={setOpenDialogEditTask}
                        taskId={url.task !== undefined ? url.task + '' : '-1'}
                    />
                    <Stack width={200}></Stack>
                </Stack>
            </Stack>
        </PerfectScrollbar>
    );
}
ClassPage.Layout = MainLayout;
