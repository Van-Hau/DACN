import { Avatar, AvatarGroup, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SubTaskComponent from './subTaskComponent';
export interface ITaskComponentProps {
    task: any;
}

export default function TaskComponent(props: ITaskComponentProps) {
    // useEffect(() => {
    //     console.log(props.task, 'ss');
    // }, []);
    return (
        <Stack>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AvatarGroup max={2}>
                        {props.task.userWork.map((item: any, index: number) => (
                            <Avatar
                                sx={{ width: '20px', height: '20px' }}
                                key={index}
                                src={item.avatar}
                            />
                        ))}
                    </AvatarGroup>
                    <Typography sx={{ fontSize: '0.88em', marginLeft: '5px' }}>
                        {props.task.name}
                    </Typography>
                </Stack>
                {props.task.subTask.length > 0 && (
                    <IconButton>
                        <ArrowDropDownIcon sx={{ cursor: 'pointer' }} />
                    </IconButton>
                )}
            </Stack>
            <Divider sx={{ width: '100%', margin: '8px 0' }} />
            {props.task.subTask.map((item: any, index: number) => (
                <SubTaskComponent key={index} subTask={item} />
            ))}
        </Stack>
    );
}
