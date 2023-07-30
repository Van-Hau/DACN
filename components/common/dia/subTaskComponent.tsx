import { Avatar, AvatarGroup, Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export interface ISubTaskComponentProps {
    subTask: any;
}

export default function SubTaskComponent(props: ISubTaskComponentProps) {
    return (
        <Stack sx={{ marginLeft: '20px' }}>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AvatarGroup max={2}>
                        {props.subTask.userWork.map((item: any, index: number) => (
                            <Avatar
                                sx={{ width: '20px', height: '20px' }}
                                key={index}
                                src={item.avatar}
                            />
                        ))}
                    </AvatarGroup>
                    <Typography sx={{ fontSize: '0.88em', marginLeft: '5px' }}>
                        {props.subTask.name}
                    </Typography>
                </Stack>
            </Stack>
            <Divider sx={{ width: '100%', margin: '8px 0' }} />
        </Stack>
    );
}
