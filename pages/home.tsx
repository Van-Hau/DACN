import { MainLayout } from '@/components/common';

import TaskColumnComponent from '@/components/colum-task/task-column';
import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { height } from '@mui/system';
import { useRef } from 'react';

import HeaderTaskComponent from '@/components/colum-task/header-task';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/useRedux';

export interface IHomePageProps {}

function HomePage(props: IHomePageProps) {
    const router = useRouter();
    const { data } = router.query;

    //lăn chuột scroll ngang
    const handleScrollX = (e: any) => {
        // e.preventDefault();
        e.currentTarget.scrollLeft += e.deltaY;
    };
    // onWheel={handleScrollX}

    return (
        <PerfectScrollbar onWheel={handleScrollX}>
            <Stack
                sx={{
                    backgroundImage: `url(/images/background2.jpg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                {/* <HeaderTaskComponent /> */}
                <Stack
                    height="94.3vh"
                    sx={{
                        flexGrow: 1,
                        padding: '10px 20px',
                    }}
                >
                    {/* <TaskColumnComponent
                        listClass={undefined}
                        listUser={undefined}
                        setListClass={undefined}
                        treePackage={undefined}
                    /> */}
                </Stack>
            </Stack>
        </PerfectScrollbar>
    );
}
HomePage.Layout = MainLayout;
export default HomePage;
