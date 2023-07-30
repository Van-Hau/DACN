import { Stack, Typography } from '@mui/material';
import * as React from 'react';
import ItemSubTask from './item-sub-task';

export interface IContentSubTaskProps {
    listUser: any;
    idTask: any;
    listSubTask: any;
    setAddSubTask: any;
    addSubTask: any;
    setListSubTask: any;
}

export default function ContentSubTask(props: IContentSubTaskProps) {
    const { listUser, idTask, listSubTask, setAddSubTask, addSubTask, setListSubTask } = props;
    return (
        <Stack mt={2}>
            <Typography variant="body2" sx={{ fontSize: '25px', color: '#000', fontWeight: 600 }}>
                Công việc con
            </Typography>
            {addSubTask && (
                <ItemSubTask
                    listUser={listUser}
                    idTask={idTask}
                    setListSubTask={setListSubTask}
                    setAddSubTask={setAddSubTask}
                    addSubTask={addSubTask}
                />
            )}

            {listSubTask?.map((item: any, index: number) => (
                <ItemSubTask
                    listUser={listUser}
                    idTask={idTask}
                    key={index}
                    data={item}
                    setListSubTask={setListSubTask}
                    setAddSubTask={setAddSubTask}
                    addSubTask={addSubTask}
                />
            ))}
        </Stack>
    );
}
