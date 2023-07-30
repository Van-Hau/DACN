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
import { BACK_END_URL } from '@/constants/index';
import { userApi } from '@/api/user-api';
import { NewMemberPayload, UpdatePayload } from '@/models/user';
import { enqueueSnackbar } from 'notistack';
import { useRef, useState, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLoading } from '@/redux/loading';
import { UserModel } from '@/models/user';
import { useDispatch } from 'react-redux';

export interface IInfomationComponentProps {
    user: UserModel;
    setUser: Function;
}
const handleClick = (ref: any) => {
    ref.current.click();
};
export default function InfomationComponent(props: IInfomationComponentProps) {
    const [email, setEmail] = useState(props.user.email);
    const [name, setName] = useState(props.user.fullName);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [phone, setPhone] = useState(props.user.phone);
    const [address, setAdress] = useState(props.user.address);
    const [position, setPosition] = useState(props.user.positionWork);
    const [district, setDistrict] = useState(props.user.district);
    const [image, setImage] = useState(props.user.avatar ? BACK_END_URL + props.user.avatar : '');
    const [selectedFile, setSelectedFile] = useState<File>();
    const wrapperRef = useRef(null);
    useEffect(() => {});
    const fileSelectedHandler = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
            setSelectedFile(event.target.files[0]);
        }
    };
    const dispatch = useDispatch();
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
            console.log(newFile);
            formData.append('avatar', newFile);
        }

        // formData.append('frontendUrl', frontendUrl);
        const payload: UpdatePayload = {
            district: district,
            email: email,
            fullName: name,
            phone: phone,
            position: position,
            address: address,
            password: password,
            rePassword: rePassword,
        };
        formData.append('user', JSON.stringify(payload));
        dispatch(setLoading(true));
        try {
            userApi.updateInfo(formData).then(function (response: any) {
                console.log(response);
                if (response && response.errors == null) {
                    enqueueSnackbar('Sửa thành công', { variant: 'success' });
                    props.setUser(response);
                    setSelectedFile(undefined);
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
    const commonCss = {
        generalColor: 'rgba(0,0,0,0.1)',
    };
    return (
        <Stack
            sx={{
                alignItems: 'center',
                maxHeight: '100%',
                height: 'auto',
                width: '100%',
                justifyContent: 'unset',
                background: 'inherit',
            }}
        >
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
                                background: commonCss.generalColor,
                                borderRadius: '24px',
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
                            background: commonCss.generalColor,
                            borderLeft: '1px dashed rgba(255,255,255,0.7)',
                            padding: '24px',
                            borderRadius: '24px',
                            '& input': {
                                fontWeight: '600',
                                color: '#000',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#999595 !important',
                                    borderWidth: '1px !important',
                                },
                            },
                            '& .Mui-focused': {
                                color: '#000',
                                '& fieldset': {
                                    borderColor: '#000 !important',
                                    borderWidth: '1px !important',
                                },
                            },

                            '& label': {
                                color: '#8b8b8b',
                            },
                            '& .MuiOutlinedInput-root:hover': {
                                '& fieldset': {
                                    borderColor: '#000 !important',
                                    borderWidth: '1px',
                                },
                            },
                        }}
                    >
                        <Grid item md={6} sm={12} sx={{ borderRadius: '24px' }}>
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
                        <Grid item md={6} sm={12}>
                            <TextField
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                fullWidth
                                type="password"
                                label="Mật khẩu"
                            />
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <TextField
                                onChange={(e) => setRePassword(e.target.value)}
                                value={rePassword}
                                fullWidth
                                label="Nhập lại mật khẩu"
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
                                    color: '#000',
                                }}
                            >
                                <MenuItem value={'CEO/Founder/Chủ tịch'}>
                                    CEO/Founder/Chủ tịch
                                </MenuItem>
                                <MenuItem value="Giám đốc (CFO,CTO,GD nhân sự, VP)">
                                    Giám đốc (CFO,CTO,GD nhân sự, VP)
                                </MenuItem>
                                <MenuItem value={'Quản lý (Mangager)'}>Quản lý (Mangager)</MenuItem>
                                <MenuItem value={'Nhân viên (Staff)'}>Nhân viên (Staff)</MenuItem>
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
                                    color: '#000',
                                }}
                                onChange={(e) => setDistrict(e.target.value)}
                            >
                                <MenuItem value={'Khu vực miền Bắc'}>Khu vực miền Bắc</MenuItem>
                                <MenuItem value={'Khu vực miền Trung'}>Khu vực miền Trung</MenuItem>
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
                                Cập Nhật
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    );
}
