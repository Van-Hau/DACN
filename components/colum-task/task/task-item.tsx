import NotificationsIcon from '@mui/icons-material/Notifications';
import { Card, CardMedia, Checkbox, Stack, styled, Tooltip, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import ImageDemo from '@/images/home/Advice.jpg';
import AvatarTask from './avatar';
import StarTask from './star-task';

import styles from './style.module.css';
import CommentInfoTask from './comment-info';
import FileUploadInfo from './file-info';
import StartEndDateTask from './start-end-date';
import SubTask from './sub-task';
import { memo, useMemo, useState } from 'react';
import { BACK_END_URL } from '@/constants/global';
import { useAppSelector } from '@/hooks/useRedux';

const CustomCheckBox = styled(Checkbox)({
    color: '#dfe1e6',
    backgroundColor: '#dfe1e6',
    fontSize: '15px',
    borderRadius: '3px',
    width: '15px',
    height: '15px',
    '&.Mui-checked': {
        color: 'rgba( 0, 113, 188 )',
        fontSize: '14px',
    },
    '&:hover': {
        backgroundColor: '#dfe1e6',
    },
    '&.Mui-disabled': {
        color: '#dfe1e6',
        backgroundColor: '#dfe1e6',
        fontSize: '15px',
        borderRadius: '3px',
        width: '15px',
        height: '15px',
    },
});
export interface ITaskItemComponentProps {
    item: any;
    index: number;
    onclickEdit: any;
    onclickChaneStatus: any;
}

const TaskItemComponent = ({
    item,
    index,
    onclickEdit,
    onclickChaneStatus,
}: ITaskItemComponentProps) => {
    const createDate = item.createdAt;
    //so sanh ngay hien tai voi ngay tao task neu lon hon 5 phut thi hien thi thong bao
    const checkTime = useMemo(() => {
        const date = new Date();
        const time = date.getTime() - new Date(createDate).getTime();
        if (time < 300000) {
            return true;
        }
        return false;
    }, [createDate]);

    return (
        <Draggable key={item.id} draggableId={item.id + ''} index={index}>
            {(provided) => (
                <Stack
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                        position: 'relative',
                        mr: '10px',
                        mt: '10px',
                    }}
                >
                    <Card
                        sx={{
                            position: 'relative',
                            background: '#fff',
                        }}
                    >
                        {checkTime && (
                            <Stack
                                sx={{
                                    height: 150,
                                    width: 150,
                                    clipPath: 'polygon(78% 0, 88% 0, 100% 15%, 100% 29%)',
                                    bgcolor: '#E94F4F',
                                    position: 'absolute',
                                    alignItems: 'flex-end',
                                    right: 0,
                                    zIndex: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: 'white',
                                        transform: 'translate(-20%, 90%) rotate(51deg)',
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        lineHeight: '12px',
                                        fontFamily: 'Inter',
                                    }}
                                >
                                    Mới
                                </Typography>
                            </Stack>
                        )}

                        {/* IMPORTANCE,MEDIUM, EMERGENCY*/}
                        <Stack
                            sx={{ position: 'relative' }}
                            className={
                                item.priority == 1
                                    ? styles.emergency
                                    : item.priority == 2
                                    ? styles.medium
                                    : item.priority == 3
                                    ? styles.importance
                                    : ''
                            }
                        >
                            <Stack
                                sx={{ position: 'absolute', bottom: 0, right: 0 }}
                                justifyContent="space-around"
                            >
                                <NotificationsIcon
                                    className="notification"
                                    sx={{
                                        color: 'rgba( 0, 113, 188 )',
                                        fontSize: '23px',
                                        fontWeight: 900,
                                        cursor: 'pointer',
                                        opacity: 0,
                                    }}
                                />
                            </Stack>

                            <Stack>
                                <Stack
                                    sx={{
                                        width: '100%',
                                        p: '10px',
                                        '&:hover': {
                                            '& .notification': {
                                                opacity: 1,
                                            },
                                        },
                                    }}
                                    spacing={'5px'}
                                >
                                    <Stack direction={'row'} spacing={1}>
                                        <Tooltip title={''}>
                                            <CustomCheckBox
                                                sx={{
                                                    cursor: 'pointer',
                                                }}
                                                // disabled={
                                                //     item?.userAssign?.id != profile.id &&
                                                //     item?.userCreate?.id != profile.id
                                                // }
                                                // 1: chua hoan thanh, 2: cho xac nhan, 3: da hoan thanh
                                                checked={item?.completed == 2}
                                                onChange={() => {
                                                    onclickChaneStatus(item);
                                                }}
                                                indeterminate={item?.completed == 1}
                                            />
                                        </Tooltip>
                                        <Stack
                                            sx={{
                                                width: '100%',
                                            }}
                                            direction="row"
                                            alignContent="center"
                                            onClick={onclickEdit}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '15px',
                                                    textAlign: 'left',
                                                    fontWeight: 600,
                                                    writingMode: 'horizontal-tb',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    ' -webkit-line-clamp': 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    width: '100%',
                                                    mt: '-3.5px',
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    {item?.background && (
                                        <CardMedia
                                            component="img"
                                            image={BACK_END_URL + item?.background}
                                            alt="green iguana"
                                            sx={{
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                                height: 'auto',
                                                width: '100%',
                                                maxHeight: '132px',
                                                border: '1px dashed rgba( 0, 113, 188 )',
                                            }}
                                            onClick={onclickEdit}
                                        />
                                    )}

                                    <Stack spacing={0.7} onClick={onclickEdit}>
                                        <Stack
                                            direction={'row'}
                                            sx={{
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <StartEndDateTask
                                                endAt={item.endAt}
                                                startAt={item.startAt}
                                            />

                                            <SubTask />
                                        </Stack>
                                        <Stack
                                            direction={'row'}
                                            sx={{
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <AvatarTask
                                                userCreate={item.userCreate}
                                                userAssign={item.userAssign}
                                            />
                                            <StarTask Priority={item.priority} />
                                        </Stack>
                                        <Stack
                                            direction={'row'}
                                            sx={{
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <CommentInfoTask />
                                            <FileUploadInfo attachment={0} />
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Card>
                </Stack>
            )}
        </Draggable>
    );
};

export default TaskItemComponent;
