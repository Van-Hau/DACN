import { MainLayout } from '@/components/common';
import { Avatar, IconButton, Popover, Stack, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
export interface IHomePageProps {}
const CustomIcon = styled(Stack)({
    borderRadius: '10px',
    cursor: 'pointer',
    padding: '10px',
    border: '1px solid #fff',
    ':hover': {
        background: 'hsl(0 0% 90%)',
    },
});
function HomePage(props: IHomePageProps) {
    // const [popoverState, setPopoverState] = useState<
    //     'notify' | 'importantNotify' | 'chat' | 'search' | 'none' | 'member' | 'menu'
    // >('none');

    return <Stack></Stack>;
}
HomePage.Layout = MainLayout;
export default HomePage;
