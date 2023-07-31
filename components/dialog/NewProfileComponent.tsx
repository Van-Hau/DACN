import { AddAPhoto, CloseOutlined } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { userApi } from '@/api/user-api';
import { NewMemberPayload } from '@/models/user';
import { enqueueSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLoading } from '@/redux/loading';

export interface INewProfileComponentProps {
    isAdd: boolean;
    setIsAdd: any;
    setTrigger: any;
}
const handleClick = (ref: any) => {
    ref.current.click();
};
export default function NewProfileComponent(props: INewProfileComponentProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAdress] = useState('');
    const [position, setPosition] = useState('');
    const [district, setDistrict] = useState('');
    const [image, setImage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File>();
    const wrapperRef = useRef(null);

    const dispatch = useAppDispatch();

    const fileSelectedHandler = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
            setSelectedFile(event.target.files[0]);
        }
    };

    const ref = useRef(null);
    const adduserHandler = async () => {
        if (email === '') {
            // setToast({ open: true, message: 'Email không được để trống', severity: 'error' });
            enqueueSnackbar('Email không được để trống', { variant: 'error' });
            return;
        }
        if (name === '') {
            enqueueSnackbar('Họ và tên không được để trống', { variant: 'error' });
            return;
        }
        if (phone === '') {
            enqueueSnackbar('Số điện thoại không được để trống', { variant: 'error' });
            return;
        }
        if (position === '') {
            enqueueSnackbar('Vị trí công việc không được để trống', { variant: 'error' });
            return;
        }
        if (district === '') {
            enqueueSnackbar('Quận/Huyện không được để trống', { variant: 'error' });
            return;
        }

        const formData: any = new FormData();
        if (!(selectedFile == undefined)) {
            const file: any = selectedFile;
            const newFile: any = new File(
                [file],
                email +
                    '.' +
                    selectedFile?.name.substr(selectedFile.name.lastIndexOf('.') + 1) +
                    '',
                { type: selectedFile?.type }
            );
            formData.append('avatar', newFile);
        }
        // formData.append('frontendUrl', frontendUrl);
        const payload: NewMemberPayload = {
            fullName: name,
            email: email,
            phone: phone,
            address: address,
            position: position,
            district: district,
        };
        formData.append('user', JSON.stringify(payload));
        dispatch(setLoading(true));
        try {
            userApi.newMember(formData).then(function (response: any) {
                console.log(response);
                if (response && response.errors == null) {
                    props.setTrigger();
                    enqueueSnackbar('Thêm thành công', { variant: 'success' });
                    props.setIsAdd(false);
                    refestForm();
                } else if (response?.errors?.errorMessage) {
                    enqueueSnackbar(response?.errors?.errorMessage, { variant: 'error' });
                    // props.setIsAdd(false);
                }
            });
        } catch (error: any) {
            //get message error
            const { errors } = error.response.data;
            let message = '';
            for (const key in errors) {
                message += errors[key];
                break;
            }
            enqueueSnackbar(message, { variant: 'error' });
        } finally {
            dispatch(setLoading(false));
        }
    };
    const refestForm = () => {
        setEmail('');
        setName('');
        setPhone('');
        setAdress('');
        setPosition('');
        setDistrict('');
        setImage('');
        setSelectedFile(undefined);
    };
    return (
        <Stack
            sx={{
                position: 'fixed',
                top: '0',
                left: '0',
                height: '100vh',
                width: '100%',
                color: '#fff',
                overflowY: 'auto',
                zIndex: '12',
                display: props.isAdd == true ? 'flex' : 'none',
                justifyContent: 'center',
                alignItems: 'center',
                background: ' rgba(0,0,0,0.5)',
            }}
        >
            <Stack
                sx={{
                    alignItems: 'center',
                    maxHeight: '70%',
                    height: 'auto',
                    width: '70%',
                    justifyContent: 'unset',
                    background: 'rgb(33, 43, 54)',
                    borderRadius: '16px',
                    // boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    // backdropFilter: ' blur(5px)',
                    // border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
            >
                <Stack
                    sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 'calc(100%)',
                        background: 'rgb(33, 43, 54)',
                        justifyContent: 'space-between',
                        borderRadius: '15px',
                        padding: '10px 20px',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: '600',
                            fontSize: '1em',
                            flexGrow: '1',
                            color: '#fff',
                            textAlign: 'left',
                        }}
                        variant="h6"
                    >
                        Thêm thành viên
                    </Typography>
                    <IconButton
                        onClick={() => props.setIsAdd(false)}
                        sx={{ '&:hover': { background: 'rgba(145, 158, 171, 0.08)' } }}
                    >
                        <CloseOutlined sx={{ color: '#fff' }} />
                    </IconButton>
                </Stack>
                <Divider sx={{ borderColor: '#fff', width: '100%', opacity: '0.2' }} />
                <Grid
                    ref={ref}
                    sx={{
                        marginTop: '0',
                        marginBottom: '30px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        transform: 'translateX(15px)',
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
                    container
                    spacing={5}
                >
                    <Grid item lg={4} md={12} sx={{ marginLeft: '-16px', alignSelf: 'flex-start' }}>
                        <Grid container spacing={2} direction="column">
                            <Grid
                                sx={{
                                    // height: '100%',
                                    padding: '80px 24px 40px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: 'rgb(33, 43, 54)',
                                    borderRadius: '30px',
                                    textAlign: 'center',
                                }}
                            >
                                <Stack
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: '30px',
                                    }}
                                >
                                    <Stack
                                        sx={{
                                            width: '144px',
                                            height: '144px',
                                            border: '1px dashed rgba(0, 0, 0, 0.55)',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            borderRadius: '50%',
                                            '&:hover': {
                                                '&>div:last-of-type': {
                                                    opacity: '1',
                                                },
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
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
                                        <Avatar
                                            sx={{
                                                width: 'calc(100% - 16px)',
                                                height: 'calc(100% - 16px)',
                                            }}
                                            src={image}
                                        />
                                        <Stack
                                            onClick={() => handleClick(wrapperRef)}
                                            sx={{
                                                width: 'calc(100% - 16px)',
                                                height: 'calc(100% - 16px)',
                                                position: 'absolute',
                                                transition:
                                                    'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                                background: 'rgba(22, 28, 36, 0.64)',
                                                color: '#fff',
                                                zIndex: '9',
                                                borderRadius: '50%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                opacity: '0',
                                            }}
                                        >
                                            <AddAPhoto sx={{ marginBottom: '5px' }} />
                                            <Typography fontSize={'0.75em'}>Đổi ảnh</Typography>
                                        </Stack>
                                    </Stack>
                                    <Typography
                                        component="span"
                                        sx={{
                                            marginTop: '16px',
                                            color: 'rgb(145, 158, 171)',
                                            fontSize: '0.75rem',
                                            textAlignL: 'center',
                                        }}
                                    >
                                        Chỉ sử dụng ảnh loại *.jpeg, *.jpg, *.png, *.gif
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'rgb(145, 158, 171)',
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        Tối đa 3.1 MB
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item lg={8} md={12} sx={{ marginLeft: '-16px' }}>
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                flexDirection: 'row',
                                background: 'rgb(33, 43, 54)',
                                borderLeft: '1px dashed rgba(255,255,255,0.7)',
                                padding: '24px',
                                '& input': {
                                    fontWeight: '600',
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
                                },
                                '& .MuiOutlinedInput-root:hover': {
                                    '& fieldset': {
                                        borderColor: '#c4c4c4 !important',
                                        borderWidth: '1px',
                                    },
                                },
                            }}
                        >
                            <Grid item md={6} sm={12}>
                                <TextField
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    fullWidth
                                    label="Email"
                                />
                            </Grid>
                            <Grid item md={6} sm={12}>
                                <TextField
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    fullWidth
                                    label="Tên"
                                />
                            </Grid>
                            <Grid item md={12} sm={12}>
                                <TextField
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    fullWidth
                                    label="Số ĐT"
                                />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={12}
                                sx={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <TextField
                                    onChange={(e) => setAdress(e.target.value)}
                                    value={address}
                                    fullWidth
                                    label="Địa Chỉ"
                                />
                            </Grid>
                            <Grid
                                item
                                md={12}
                                sm={12}
                                sx={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <Box
                                    component="label"
                                    sx={{ alignSelf: 'flex-start', color: 'rgba(0, 0, 0, 0.6)' }}
                                >
                                    Vị trí công việc
                                </Box>
                                <Select
                                    value={position}
                                    onChange={(e: any) => setPosition(e.target.value)}
                                    sx={{
                                        fontWeight: '600',
                                        color: '#fff',
                                    }}
                                >
                                    <MenuItem value={'CEO/Founder/Chủ tịch'}>
                                        CEO/Founder/Chủ tịch
                                    </MenuItem>
                                    <MenuItem value="Giám đốc (CFO,CTO,GD nhân sự, VP)">
                                        Giám đốc (CFO,CTO,GD nhân sự, VP)
                                    </MenuItem>
                                    <MenuItem value={'Quản lý (Mangager)'}>
                                        Quản lý (Mangager)
                                    </MenuItem>
                                    <MenuItem value={'Nhân viên (Staff)'}>
                                        Nhân viên (Staff)
                                    </MenuItem>
                                    <MenuItem value={'Học sinh/sinh viên (Student)'}>
                                        Học sinh/sinh viên (Student)
                                    </MenuItem>
                                    <MenuItem value={'Vị trí khác (Other)'}>
                                        Vị trí khác (Other)
                                    </MenuItem>
                                </Select>
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={12}
                                sx={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <Box
                                    sx={{ alignSelf: 'flex-start', color: 'rgba(0, 0, 0, 0.6)' }}
                                    component="label"
                                >
                                    Tỉnh/Thành phố
                                </Box>
                                <Select
                                    value={district}
                                    sx={{
                                        fontWeight: '600',
                                        color: '#fff',
                                    }}
                                    onChange={(e) => setDistrict(e.target.value)}
                                >
                                    <MenuItem value={'Khu vực miền Bắc'}>Khu vực miền Bắc</MenuItem>
                                    <MenuItem value={'Khu vực miền Trung'}>
                                        Khu vực miền Trung
                                    </MenuItem>
                                    <MenuItem value={'Khu vực miền Nam'}>Khu vực miền Nam</MenuItem>
                                </Select>
                            </Grid>
                            <Grid
                                sm={12}
                                md={12}
                                item
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    sx={{
                                        background: '#00ab55',
                                        color: '#fff',
                                        padding: '6px 16px',
                                        minWidth: '64px',
                                        lineHeight: '1.71429',
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                        textTransform: 'none',
                                        borderRadius: '8px',
                                        width: 'fit-content',
                                        '&:hover': { background: 'rgba(0,171,85,0.6)' },
                                    }}
                                    onClick={adduserHandler}
                                >
                                    Tạo Mới
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
}
// export const getServerSideProps: GetServerSideProps = async () => {
//     const props = { dirs: [] };
//     try {
//         const dirs = await fs.readdir(path.join(process.cwd(), '/public/images'));
//         props.dirs = dirs as any;
//         return { props };
//     } catch (error) {
//         return { props };
//     }
// };
