import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import RichText from '../common/ricktext';
import ContentSubTask from './sub-task/content-sub-task';

export interface ICenterContentEditProps {
    isEdit: boolean;
    taskCurrent: any;
    profile: any;
    setIsEdit: any;
    name: string;
    setName: any;
    description: string;
    setDescription: any;
    handleEditProject: any;
    treePackage: any;
    listUser: any;
    listSubTask: any;
    setAddSubTask: any;
    addSubTask: any;
    setListSubTask: any;
}

export default function CenterContentEdit(props: ICenterContentEditProps) {
    const {
        isEdit,
        taskCurrent,
        profile,
        setIsEdit,
        name,
        setName,
        description,
        setDescription,
        handleEditProject,
        treePackage,
        listUser,
        listSubTask,
        setAddSubTask,
        addSubTask,
        setListSubTask,
    } = props;
    return (
        <Stack flex={1}>
            <Breadcrumbs>
                <Typography sx={{ fontSize: '25px', opacity: 0.8, fontStyle: 'italic' }}>
                    {treePackage?.nameWorkspace}
                </Typography>

                <Typography sx={{ fontSize: '25px', opacity: 0.8, fontStyle: 'italic' }}>
                    {treePackage?.nameProject}
                </Typography>
                <Typography sx={{ fontSize: '25px', opacity: 0.8, fontStyle: 'italic' }}>
                    {treePackage?.namePackage}
                </Typography>
            </Breadcrumbs>
            {!isEdit ? (
                <Typography
                    variant="body2"
                    sx={{ fontSize: '25px', color: '#000', fontWeight: 700 }}
                    //envet double click
                    onDoubleClick={() => {
                        if (profile.id == taskCurrent?.userCreate?.id) setIsEdit(true);
                    }}
                >
                    {name}
                </Typography>
            ) : (
                <Stack>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '15px', color: '#000', fontWeight: 700 }}
                    >
                        {' '}
                        Tên công việc
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Nhập tên công việc...."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Stack>
            )}
            <Stack
                height={'80vh'}
                sx={{
                    overflow: 'auto',
                }}
            >
                <Stack mt={2}>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: '15px', color: '#000', fontWeight: 700 }}
                    >
                        {' '}
                        Mô tả
                    </Typography>
                    {!isEdit ? (
                        <Typography
                            sx={{
                                bgcolor: 'rgb(247, 249, 253)',
                                height: '300px',
                                padding: '10px',
                                borderRadius: '5px',
                            }}
                            dangerouslySetInnerHTML={{
                                __html: description,
                            }}
                            onDoubleClick={() => {
                                if (profile.id == taskCurrent?.userCreate?.id) setIsEdit(true);
                            }}
                        ></Typography>
                    ) : (
                        <RichText
                            onChange={(t: string) => setDescription(t)}
                            description={description}
                        />
                    )}
                </Stack>
                {isEdit && (
                    <Stack mt={2} direction={'row'} justifyContent={'end'} spacing={2}>
                        <IconButton
                            sx={{
                                border: '1px dashed rgb(0, 113, 188)',
                            }}
                            onClick={() => {
                                setIsEdit(false);
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Button variant="contained" onClick={handleEditProject}>
                            Lưu
                        </Button>
                    </Stack>
                )}
                <ContentSubTask
                    listUser={listUser}
                    idTask={taskCurrent?.id}
                    listSubTask={listSubTask}
                    setAddSubTask={setAddSubTask}
                    addSubTask={addSubTask}
                    setListSubTask={setListSubTask}
                />
            </Stack>
        </Stack>
    );
}
