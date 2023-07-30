import { IconButton, Stack } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

export interface IPriorityProps {
    setPriority: any;
}

export default function Priority(props: IPriorityProps) {
    const { setPriority } = props;
    return (
        <Stack
            direction={'row'}
            sx={{
                position: 'absolute',
                top: '-50px',
                left: '200%',
                transform: 'translateX(-50%)',
                zIndex: 100,
                bgcolor: '#fff',
                borderRadius: '5px',
                width: '200px',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            }}
        >
            <IconButton
                onClick={() => {
                    setPriority({ value: 0, url: '/images/project/start-1.svg' });
                }}
            >
                <Image
                    src="/images/project/start-1.svg"
                    alt="Picture of the author"
                    width={30}
                    height={30}
                />
            </IconButton>
            <IconButton
                onClick={() => {
                    setPriority({ value: 1, url: '/images/project/start-2.svg' });
                }}
            >
                <Image
                    src="/images/project/start-2.svg"
                    alt="Picture of the author"
                    width={30}
                    height={30}
                />
            </IconButton>
            <IconButton
                onClick={() => {
                    setPriority({ value: 2, url: '/images/project/start-3.svg' });
                }}
            >
                <Image
                    src="/images/project/start-3.svg"
                    alt="Picture of the author"
                    width={30}
                    height={30}
                />
            </IconButton>

            <IconButton
                onClick={() => {
                    setPriority({ value: 3, url: '/images/project/start-4.svg' });
                }}
            >
                <Image
                    src="/images/project/start-4.svg"
                    alt="Picture of the author"
                    width={30}
                    height={30}
                />
            </IconButton>
        </Stack>
    );
}
