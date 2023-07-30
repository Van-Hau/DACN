import { Stack } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import Start1 from '@/images/task/start-1.svg';
import Start2 from '@/images/task/start-2.svg';
import Start3 from '@/images/task/start-3.svg';
import Start4 from '@/images/task/start-4.svg';
export interface IStarTaskProps {
    Priority: number;
}

export default function StarTask(props: IStarTaskProps) {
    const { Priority } = props;
    return (
        <Stack>
            {Priority === 1 ? (
                <Image src={Start2} alt="chat-task" width={24} height={24} />
            ) : Priority === 2 ? (
                <Image src={Start3} alt="chat-task" width={24} height={24} />
            ) : Priority === 3 ? (
                <Image src={Start4} alt="chat-task" width={24} height={24} />
            ) : (
                <></>
            )}
        </Stack>
    );
}
