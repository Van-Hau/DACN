import { CalendarMonthOutlined, PeopleOutline, PersonAddAltOutlined } from '@mui/icons-material';
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useRef, useState } from 'react';

export interface ITaskPanelProps {
    taskName: string;
    taskDes: string;
    setTaskName: Function;
    setTaskDes: Function;
    startValue: Dayjs | null;
    endValue: Dayjs | null;
    background: File | undefined;
    setBackground: Function;
    listUser: Array<any>;
    listFollower: Array<any>;
    attachment: FileList | undefined;
    setAttachment: Function;
    priority: number;
    setPriority: Function;
}

export default function TaskPanel(props: ITaskPanelProps) {
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const fileSelectedHandler = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            props.setBackground(event.target.files[0]);
            setBackgroundUrl(URL.createObjectURL(event.target.files[0]));
        }
    };
    const fileAttachmentSelectedHandler = (event: any) => {
        if (event.target.files) {
            props.setAttachment(event.target.files);
        }
    };
    const handleClick = (ref: any) => {
        ref.current.click();
    };
    const wrapperRef = useRef(null);
    const fileRef = useRef(null);
    return (
        <Stack
            sx={{
                height: '100%',
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
            }}
        >
            <Grid container spacing={3} sx={{ width: '100%' }}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Stack
                        sx={{
                            width: '100%',

                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#696969 !important',
                                    borderWidth: '1px !important',
                                },
                            },
                            '& .Mui-focused': {
                                color: '#fff',
                                '& fieldset': {
                                    borderColor: '#fff !important',
                                    borderWidth: '1px !important',
                                },
                            },

                            '& .MuiOutlinedInput-root:hover': {
                                '& fieldset': {
                                    borderColor: '#c4c4c4 !important',
                                    borderWidth: '1px',
                                },
                            },
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
                                Tên công việc
                            </Box>
                            <TextField
                                value={props.taskName}
                                onChange={(e: any) => {
                                    props.setTaskName(e.target.value);
                                }}
                                fullWidth
                            />
                        </Stack>
                        <Stack sx={{ marginTop: '20px' }}>
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
                                sx={{
                                    color: '#fff',
                                    borderRadius: '5px',
                                    marginBottom: '24px',
                                    '&:hover': {
                                        border: '1px #c4c4c4 solid',
                                    },
                                    '& textarea': {
                                        color: '#fff',
                                    },
                                    '& fieldset': {
                                        border: 'none',
                                    },
                                    border: '1px solid rgba(145, 158, 171, 0.32)',
                                }}
                                value={props.taskDes}
                                onChange={(e: any) => props.setTaskDes(e.target.value)}
                                multiline
                                rows={5}
                            />
                        </Stack>
                        <Stack sx={{ marginTop: '20px' }}>
                            <Box
                                component="label"
                                sx={{ alignSelf: 'flex-start', color: 'rgba(0, 0, 0, 0.6)' }}
                            >
                                Độ ưu tiên
                            </Box>
                            <Select
                                value={props.priority}
                                onChange={(e: any) => props.setPriority(e.target.value)}
                                sx={{
                                    fontWeight: '600',
                                    color: '#fff',
                                }}
                            >
                                <MenuItem value={3}>Cao</MenuItem>
                                <MenuItem value={2}>Vừa</MenuItem>
                                <MenuItem value={1}>Thấp</MenuItem>
                            </Select>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Stack
                        sx={{
                            width: '100%',
                            '& button': {
                                textTransform: 'none',
                                color: '#fff',
                                background: 'rgb(33, 43, 54)',
                            },
                        }}
                    >
                        <Stack marginBottom="8px">
                            <Box
                                component="label"
                                sx={{
                                    alignSelf: 'flex-start',
                                    color: 'rgba(0, 0, 0, 0.6)',
                                }}
                            >
                                Ngày thực hiện
                            </Box>
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
                                >
                                    <CalendarMonthOutlined />
                                </IconButton>
                                <Typography>
                                    {props.startValue === null
                                        ? 'Chưa đặt '
                                        : props.startValue?.format('DD/MM/YYYY')}
                                </Typography>
                                <Typography> - </Typography>
                                <Typography>
                                    {props.endValue === null
                                        ? ' Chưa đặt'
                                        : props.endValue?.format('DD/MM/YYYY')}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack marginBottom="8px">
                            <Box
                                component="label"
                                sx={{
                                    alignSelf: 'flex-start',
                                    color: 'rgba(0, 0, 0, 0.6)',
                                }}
                            >
                                Người thực hiện
                            </Box>
                            <Stack
                                sx={{
                                    flexDirection: 'row',
                                    '& p': {
                                        fontSize: '0.9em',
                                    },
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginTop: '5px',
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
                                >
                                    <PersonAddAltOutlined />
                                </IconButton>
                                <AvatarGroup max={3}>
                                    {props.listUser.map((item: any, index) => {
                                        return (
                                            <Avatar key={index} src={'/images/' + item.avatar} />
                                        );
                                    })}
                                </AvatarGroup>
                            </Stack>
                        </Stack>
                        <Stack marginBottom="8px">
                            <Box
                                component="label"
                                sx={{
                                    alignSelf: 'flex-start',
                                    color: 'rgba(0, 0, 0, 0.6)',
                                }}
                            >
                                Người theo dõi
                            </Box>
                            <Stack
                                sx={{
                                    flexDirection: 'row',
                                    '& p': {
                                        fontSize: '0.9em',
                                    },
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginTop: '5px',
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
                                >
                                    <PeopleOutline />
                                </IconButton>
                                <AvatarGroup max={3}>
                                    {props.listFollower.map((item: any, index) => {
                                        return (
                                            <Avatar key={index} src={'/images/' + item.avatar} />
                                        );
                                    })}
                                </AvatarGroup>
                            </Stack>
                        </Stack>
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
                        <Button onClick={() => handleClick(fileRef)} sx={{ marginTop: '8px' }}>
                            Thêm tệp tin đính kèm
                        </Button>
                        <Button onClick={() => handleClick(wrapperRef)} sx={{ marginTop: '8px' }}>
                            Chọn ảnh bìa
                        </Button>
                        <Box
                            sx={{
                                appearance: 'none',
                                display: 'none',
                            }}
                            component={'input'}
                            type="file"
                            ref={wrapperRef}
                            onChange={(e: any) => {
                                fileSelectedHandler(e);
                            }}
                        />
                        <Stack
                            sx={{
                                width: '100%',
                                height: '400px',
                                border: '1px dashed #fff',
                                borderRadius: '8px',
                                marginTop: '16px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '20px',
                                position: 'relative',
                                '&::after': {
                                    content: "''",
                                    position: 'absolute',
                                    left: '0',
                                    top: '0',
                                    zIndex: '2',
                                    width: '100%',
                                    height: '100%',
                                    backgroundSize: 'cover',
                                    backgroundImage: `url(${backgroundUrl})`,
                                },
                            }}
                        >
                            <Typography sx={{ color: '#8b8b8b', fontSize: '0.8em' }}>
                                Xem trước ảnh bìa
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}
