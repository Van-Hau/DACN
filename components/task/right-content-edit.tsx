import { BACK_END_URL } from '@/constants/global';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PixIcon from '@mui/icons-material/Pix';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Avatar, AvatarGroup, Stack, Typography } from '@mui/material';
import moment from 'moment';
import BackgroungAddTask from './background';
import { CustomCheckBox, TextTitle } from '../common/component-custom';
export interface IRightContentProps {
    isEdit: boolean;
    setAnchorElSelectTime: any;
    startDate: any;
    endDate: any;
    setAnchorElSelectUserProcess: any;
    userProcess: any;
    listUser: any;
    background: any;
    setbackground: any;
    backgroundUrl: any;
    setBackgroundUrl: any;
    onclickAddSubTask: any;
}

export default function RightContent(props: IRightContentProps) {
    const {
        isEdit,
        setAnchorElSelectTime,
        startDate,
        endDate,
        setAnchorElSelectUserProcess,
        userProcess,
        listUser,
        background,
        setbackground,
        backgroundUrl,
        setBackgroundUrl,
        onclickAddSubTask,
    } = props;
    return (
        <Stack
            bgcolor={'rgb(247, 249, 253)'}
            width={'260px'}
            pl={2}
            justifyContent={'space-between'}
        >
            <Stack spacing={1.5}>
                <Stack direction={'row'} spacing={2}>
                    <CustomCheckBox
                        sx={{
                            cursor: 'pointer',
                        }}
                    />
                    <TextTitle>Hoàn thành</TextTitle>{' '}
                </Stack>

                <Stack spacing={'5px'} mt={2}>
                    {/* time */}
                    <TextTitle>Ngày thực hiện</TextTitle>
                    <Stack direction="row" spacing={1}>
                        <Stack
                            onClick={(e: any) => {
                                if (isEdit) setAnchorElSelectTime(e.currentTarget);
                            }}
                            sx={{
                                width: '35px',
                                height: '35px',
                                border: '1px dashed #0071BC',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                '&> svg': {
                                    transform: 'scale(0.8)',
                                },
                            }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <CalendarMonthIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography sx={{ fontWeight: '400', fontSize: '14px' }}>
                                {startDate ? moment(startDate).format('DD/MM/yyyy') : 'Chưa đặt'}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                }}
                            >
                                -
                            </Typography>
                            <Typography sx={{ fontWeight: '400', fontSize: '14px' }}>
                                {endDate ? moment(endDate).format('DD/MM/yyyy') : 'Chưa đặt'}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={'5px'} mt={2}>
                    <TextTitle>Người thực hiện</TextTitle>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Stack
                            onClick={(e: any) => {
                                if (isEdit) setAnchorElSelectUserProcess(e.currentTarget);
                            }}
                            sx={{
                                width: '35px',
                                height: '35px',
                                border: '1px dashed #0071BC',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                '&> svg': {
                                    transform: 'scale(0.8)',
                                },
                            }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PermIdentityIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                        </Stack>

                        <Avatar
                            sx={{ width: '35px', height: '35px' }}
                            src={userProcess?.avatar ? BACK_END_URL + userProcess?.avatar : ''}
                        />

                        <Stack justifyContent="center">
                            <Typography sx={{ fontWeight: '700', fontSize: '12px' }}>
                                {userProcess?.fullName || 'Chưa đặt'}
                            </Typography>
                            <Typography
                                sx={{
                                    maxWidth: '150px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                fontWeight={300}
                                fontStyle="italic"
                                fontSize={'11px'}
                            >
                                {userProcess?.email || ''}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={'5px'} mt={2}>
                    <TextTitle>Người theo dõi</TextTitle>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Stack
                            onClick={(e: any) => {
                                // setAnchorElSelectUserProcess(e.currentTarget);
                            }}
                            sx={{
                                width: '35px',
                                height: '35px',
                                border: '1px dashed #0071BC',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                '&> svg': {
                                    transform: 'scale(0.8)',
                                },
                            }}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PermIdentityIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                        </Stack>

                        <AvatarGroup max={5}>
                            {listUser?.map((item: any, index: number) => (
                                <Avatar
                                    alt={item?.name}
                                    src={item?.avatar ? BACK_END_URL + item?.avatar : ''}
                                    key={index}
                                />
                            ))}
                        </AvatarGroup>
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        width: '230px',
                        backgroundColor: '#fff',
                        boxShadow: ' 0px 1px 1px rgba(0, 0, 0, 0.25)',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        padding: '10px 5px',
                    }}
                    direction="row"
                    alignItems="center"
                    onClick={onclickAddSubTask}
                >
                    <PostAddIcon sx={{ opacity: 0.4 }} />
                    <Typography fontSize={'13px'} ml={2}>
                        Tạo công việc con
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        width: '230px',
                        backgroundColor: '#fff',
                        boxShadow: ' 0px 1px 1px rgba(0, 0, 0, 0.25)',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        padding: '10px 5px',
                    }}
                    direction="row"
                    alignItems="center"
                >
                    <ColorLensIcon sx={{ opacity: 0.4 }} />
                    <Typography fontSize={'13px'} ml={2}>
                        Thêm nhãn màu
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        width: '230px',
                        backgroundColor: '#fff',
                        boxShadow: ' 0px 1px 1px rgba(0, 0, 0, 0.25)',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        padding: '10px 5px',
                    }}
                    direction="row"
                    alignItems="center"
                >
                    <AttachFileIcon sx={{ opacity: 0.4 }} />
                    <Typography fontSize={'13px'} ml={2}>
                        Thêm tệp đính kèm
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        width: '230px',
                        backgroundColor: '#fff',
                        boxShadow: ' 0px 1px 1px rgba(0, 0, 0, 0.25)',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        padding: '10px 5px',
                    }}
                    direction="row"
                    alignItems="center"
                >
                    <PixIcon sx={{ opacity: 0.4 }} />
                    <Typography fontSize={'13px'} ml={2}>
                        Độ ưu tiên
                    </Typography>
                </Stack>
                <BackgroungAddTask
                    background={background}
                    setbackground={setbackground}
                    backgroundDefault={backgroundUrl}
                    setbackgroundDefault={setBackgroundUrl}
                    isEdit={isEdit}
                />
            </Stack>
        </Stack>
    );
}
