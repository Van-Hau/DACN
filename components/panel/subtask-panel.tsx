import {
    AttachFileOutlined,
    CalendarMonthOutlined,
    PersonAddAltOutlined,
    WallpaperOutlined,
} from '@mui/icons-material';
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Fragment, useState, useRef } from 'react';
import ListItem from '../dialog/ListItem';
import { Dayjs } from 'dayjs';
import ChooseDate from '../dialog/ChooseDate';
import { SubTaskPayload } from '@/models/work';
import { enqueueSnackbar } from 'notistack';
export interface ISubTaskPanelProps {
    listSubTask: any;
    setListSubTask: Function;
    idClass: number;
    listFileOfSubTask: Array<any>;
    setListFileOfSubTask: Function;
    subBackground: File | undefined;
    setSubBackground: Function;
}

export default function SubTaskPanel(props: ISubTaskPanelProps) {
    const [subTaskName, setSubTaskName] = useState('');
    const [subTaskDescription, setSubTaskDes] = useState('');
    const [isAdd, setIsAdd] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [listSelect, setListSelect] = useState<any>([]);
    const [startValue, setStartValue] = useState<Dayjs | null>(null);
    const [endValue, setEndValue] = useState<Dayjs | null>(null);
    const [attachment, setAttachment] = useState<FileList>();
    const removeUser = (user: any) => {
        const copy = listSelect.filter((value: any) => value.email != user.email);
        setListSelect(copy);
    };
    const addUser = (user: any) => {
        setListSelect([...listSelect, user]);
    };
    const fileAttachmentSelectedHandler = (event: any) => {
        if (event.target.files) {
            setAttachment(event.target.files);
        }
    };
    const fileBackgroundSelectedHandler = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            props.setSubBackground(event.target.files[0]);
        }
    };
    const handleClick = (ref: any) => {
        ref.current.click();
    };
    const fileRef = useRef(null);
    const backgroundRef = useRef(null);
    const handleAdd = async () => {
        if (subTaskName == '') return;
        if (startValue === null) {
            enqueueSnackbar('Vui lòng chọn thời gian bắt đầu', { variant: 'error' });
            return;
        }
        if (endValue === null) {
            enqueueSnackbar('Vui lòng chọn thời gian kết thúc', { variant: 'error' });
            return;
        }
        const subTask: SubTaskPayload = {
            idClass: props.idClass,
            name: subTaskName,
            description: subTaskDescription,
            priority: 1,
            startAt: startValue.format('YYYY-MM-DD'),
            endAt: endValue.format('YYYY-MM-DD'),
            userWork: listSelect,
        };
        if (attachment != undefined) {
            const listFile = [];
            for (var i = 0; i < attachment?.length; i++) {
                var temp: any = attachment[i];
                var ext =
                    temp.name.substring(temp.name.lastIndexOf('.') + 1, temp.name.length) ||
                    temp.name;
                var file = new File([temp], subTaskName + '_' + i + '.' + ext, {
                    type: typeof temp,
                });
                listFile.push(file);
                //console.log(file);
            }
            await props.setListFileOfSubTask([...props.listFileOfSubTask, listFile]);
        }
        await props.setListSubTask([...props.listSubTask, subTask]);
        console.log(props.listSubTask);
        setSubTaskName('');
        setSubTaskDes('');
        setStartValue(null);
        setEndValue(null);
        setAttachment(undefined);
    };
    const handleRemove = (index: number) => {
        const copy = [...props.listSubTask];
        copy.splice(index, 1);
        props.setListSubTask(copy);
        const copyFile = [...props.listFileOfSubTask];
        copyFile.splice(index, 1);
        props.setListFileOfSubTask(copyFile);
    };
    return (
        <Stack
            sx={{
                '& input': {
                    color: '#fff',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#696969 !important',
                        borderWidth: '1px !important',
                    },
                },
                '& .Mui-focused': {
                    color: '#fff',

                    '& fieldset': {
                        borderColor: '#c4c4c4 !important',
                        borderWidth: '1px !important',
                    },
                },

                '& label': {
                    color: '#8b8b8b',
                    marginBottom: '5px',
                },
                '& .MuiOutlinedInput-root:hover': {
                    '& fieldset': {
                        borderColor: '#c4c4c4 !important',
                        borderWidth: '1px',
                    },
                },
                height: '100%',
                position: 'relative',
            }}
        >
            <ChooseDate
                isOpen={isOpen}
                setOpen={setOpen}
                startValue={startValue}
                endValue={endValue}
                setStartValue={setStartValue}
                setEndValue={setEndValue}
            />
            <ListItem
                isAdd={isAdd}
                setIsAdd={setIsAdd}
                addUser={addUser}
                removeUser={removeUser}
                listSelect={listSelect}
            />
            <Stack
                sx={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: '24px',
                }}
            >
                <Typography>Danh sách công việc con</Typography>
            </Stack>
            <Stack
                sx={{
                    background: 'rgb(33, 43, 54)',
                    padding: '0 16px 16px 16px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    height: '290px',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': { width: '15px' },
                    '&::-webkit-scrollbar-track': {
                        border: '1px solid #ddd',
                        borderRadius: '100vw',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: '15px',
                        background: 'linear-gradient(45deg,white,#c6c0b6)',
                    },
                    '& hr': {
                        borderColor: '#696969',
                    },
                }}
            >
                <Stack sx={{ height: '100%' }}>
                    {props.listSubTask.map((item: any, index: number) => (
                        <Fragment key={index}>
                            <Stack
                                sx={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography>{item.name}</Typography>
                                <Button
                                    onClick={() => handleRemove(index)}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '1em',
                                        fontWeight: '600',
                                        color: '#e73c5d',
                                        '&:hover': {
                                            background: '#f1505033',
                                        },
                                    }}
                                >
                                    Xóa
                                </Button>
                            </Stack>
                            <Divider />
                        </Fragment>
                    ))}
                </Stack>
            </Stack>
            <Stack
                sx={{
                    background: 'rgb(33, 43, 54)',
                    padding: '16px',
                    borderRadius: '8px',
                    flexGrow: '1',
                }}
            >
                <Stack>
                    <Box
                        component="label"
                        sx={{
                            alignSelf: 'flex-start',
                            color: 'rgba(0, 0, 0, 0.6)',
                        }}
                    >
                        Tên công việc con
                    </Box>
                    <TextField
                        onChange={(e) => setSubTaskName(e.target.value)}
                        value={subTaskName}
                        fullWidth
                        sx={{
                            '&>div:first-of-type:hover': {
                                border: '1px #c4c4c4 solid',
                            },
                            '& input': {
                                padding: '10px 14px !important',
                            },
                        }}
                    />
                </Stack>
                <Stack sx={{ marginTop: '10px' }}>
                    <Box
                        component="label"
                        sx={{
                            alignSelf: 'flex-start',
                            color: 'rgba(0, 0, 0, 0.6)',
                        }}
                    >
                        Mô tả
                    </Box>
                    <TextField
                        onChange={(e) => setSubTaskDes(e.target.value)}
                        value={subTaskDescription}
                        sx={{
                            padding: '3px',
                            color: '#fff',
                            borderRadius: '5px',
                            marginBottom: '16px',
                            '& .Mui-focused': {
                                '& fieldset': {
                                    borderColor: '#c4c4c4 !important',
                                    borderWidth: '1px !important',
                                },
                            },
                            '& textarea': {
                                color: '#fff',
                            },
                            '& .MuiOutlinedInput-root:hover': {
                                '& fieldset': {
                                    borderColor: '#c4c4c4 !important',
                                    borderWidth: '1px',
                                },
                            },
                        }}
                        multiline
                        rows={2}
                    />
                </Stack>
                <Stack sx={{ flexDirection: 'row' }}>
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            width: '33%',
                            '& p': {
                                fontSize: '0.9em',
                            },
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: '5px',
                        }}
                    >
                        <IconButton
                            onClick={() => setIsAdd(true)}
                            sx={{
                                padding: '8px',
                                borderRadius: '50%',
                                border: '1px dashed #fff',
                                color: '#fff',
                                marginRight: '10px',
                            }}
                        >
                            <PersonAddAltOutlined />
                        </IconButton>
                        <AvatarGroup max={3}>
                            {listSelect.map((item: any, index: any) => {
                                return <Avatar key={index} src={'/images/' + item.avatar} />;
                            })}
                        </AvatarGroup>
                    </Stack>
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            '& p': {
                                fontSize: '0.9em',
                            },
                            width: '33%',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: '5px',
                        }}
                    >
                        <Box
                            sx={{
                                appearance: 'none',
                                display: 'none',
                            }}
                            component={'input'}
                            type="file"
                            multiple={true}
                            ref={fileRef}
                            onChange={(e: any) => {
                                fileAttachmentSelectedHandler(e);
                            }}
                        />
                        <IconButton
                            onClick={() => handleClick(fileRef)}
                            sx={{
                                padding: '8px',
                                borderRadius: '50%',
                                border: '1px dashed #fff',
                                color: '#fff',
                                marginRight: '10px',
                            }}
                        >
                            <AttachFileOutlined />
                        </IconButton>
                        <Typography>
                            {attachment != undefined ? attachment?.length + ' file đã chọn' : ''}
                        </Typography>
                    </Stack>
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            '& p': {
                                fontSize: '0.9em',
                            },
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: '5px',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        <IconButton
                            sx={{
                                padding: '8px',
                                borderRadius: '50%',
                                border: '1px dashed #fff',
                                color: '#fff',
                                marginRight: '10px',
                            }}
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            <WallpaperOutlined />
                        </IconButton>
                        <Typography>
                            {props.subBackground ? props.subBackground.name : ''}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack marginTop="8px">
                    <Stack
                        sx={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Stack
                            sx={{
                                flexDirection: 'row',
                                '& p': {
                                    fontSize: '0.9em',
                                },
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginTop: '5px',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            <IconButton
                                sx={{
                                    padding: '8px',
                                    borderRadius: '50%',
                                    border: '1px dashed #fff',
                                    color: '#fff',
                                    marginRight: '10px',
                                }}
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                <CalendarMonthOutlined />
                            </IconButton>
                            <Typography>
                                {startValue === null
                                    ? 'Chưa đặt '
                                    : startValue?.format('DD/MM/YYYY')}
                            </Typography>
                            <Typography> - </Typography>
                            <Typography>
                                {endValue === null ? ' Chưa đặt' : endValue?.format('DD/MM/YYYY')}
                            </Typography>
                        </Stack>
                        <Button
                            onClick={handleAdd}
                            sx={{
                                alignSelf: 'flex-end',
                                background: 'rgb(0, 171, 85)',
                                padding: '8px 20px',
                                borderRadius: '8px',
                                textTransform: 'none',
                                color: '#fff',
                                fontSize: '0.8rem',
                                maxWidth: '360px',
                                fontWeight: '600',
                                textAlign: 'center',
                                marginRight: '20px',
                                '&:hover': {
                                    background: 'rgb(0, 123, 85)',
                                },
                            }}
                        >
                            Thêm
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
