import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    Snackbar,
    Stack,
    Typography,
} from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { authApi } from '@/api/auth-api';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loading';
export interface ISignUpComponentProps {
    setSignUp2: any;
    setSingUp: any;
}

export default function SignUpComponent({ setSignUp2, setSingUp }: ISignUpComponentProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [password, setPassword] = useState('');
    const [comfirmPassword, setComfirmPassword] = useState('');
    const [positionWork, setPositionWork] = useState('');
    const [district, setDistrict] = useState('');
    const [scaleWork, setScaleWork] = useState('');
    const [frontendUrl, setUrl] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();
    const handleSingin2 = () => {
        setSignUp2('');
    };
    useEffect(() => {
        setUrl(window.location.origin);
    }, []);

    const handleRegister = async () => {
        if (email === '') {
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
        if (company === '') {
            enqueueSnackbar('Tên công ty không được để trống', { variant: 'error' });
            return;
        }
        if (password === '') {
            enqueueSnackbar('Mật khẩu không được để trống', { variant: 'error' });
            return;
        }
        if (comfirmPassword === '') {
            enqueueSnackbar('Xác nhận mật khẩu không được để trống', { variant: 'error' });
            return;
        }
        if (positionWork === '') {
            enqueueSnackbar('Vị trí công việc không được để trống', { variant: 'error' });
            return;
        }
        if (district === '') {
            enqueueSnackbar('Quận/Huyện không được để trống', { variant: 'error' });
            return;
        }
        if (scaleWork === '') {
            enqueueSnackbar('Quy mô công ty không được để trống', { variant: 'error' });
            return;
        }

        if (password !== comfirmPassword) {
            enqueueSnackbar('Mật khẩu không khớp', { variant: 'error' });
            return;
        }
        dispatch(setLoading(true));

        const payload: any = {
            company: company,
            district: district,
            email: email,
            password: password,
            phone: phone,
            positionWork: positionWork,
            scaleWork: parseInt(scaleWork),
            fullName: name,
            frontendUrl: frontendUrl,
        };
        try {
            const { data } = await authApi.signUp(payload);
            if (data && data?.token) {
                // setSingUp('');
                enqueueSnackbar('Đăng ký thành công', { variant: 'success' });
                router.push('/verify');
            } else {
                enqueueSnackbar(data?.errors?.errorMessage, { variant: 'error' });
            }
        } catch (error: any) {
            //get message error
            const { errors } = error?.response?.data;
            console.log(errors);
            let message = '';
            for (const key in errors) {
                message += errors[key];
                break;
            }
            if (errors) enqueueSnackbar(message, { variant: 'error' });
            else if (error?.response?.data?.message)
                enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
            else enqueueSnackbar('Đăng ký thất bại', { variant: 'error' });
        } finally {
            dispatch(setLoading(false));
        }
    };
    return (
        <Box component="form">
            <Typography variant="h2">Đăng Ký</Typography>
            <Stack flexDirection="row" gap="10px" width="100%">
                <OutlinedInput
                    placeholder="Email"
                    sx={{ flexGrow: '1' }}
                    onChange={(e: any) => setEmail(e.target.value)}
                    value={email}
                />
                <OutlinedInput
                    placeholder="Họ và tên"
                    onChange={(e: any) => setName(e.target.value)}
                    value={name}
                    sx={{ flexGrow: '1' }}
                />
            </Stack>
            <Stack flexDirection="row" gap="10px" width="100%">
                <OutlinedInput
                    placeholder="Số điện thoại"
                    onChange={(e: any) => setPhone(e.target.value)}
                    value={phone}
                    sx={{ flexGrow: '1' }}
                />
                <OutlinedInput
                    placeholder="Tên Công Ty"
                    onChange={(e: any) => setCompany(e.target.value)}
                    value={company}
                    sx={{ flexGrow: '1' }}
                />
            </Stack>
            <Stack flexDirection="row" gap="10px" width="100%">
                <OutlinedInput
                    placeholder="Mật khẩu"
                    onChange={(e: any) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    sx={{ flexGrow: '1' }}
                />
                <OutlinedInput
                    placeholder="Nhập lại mật khẩu"
                    onChange={(e: any) => setComfirmPassword(e.target.value)}
                    value={comfirmPassword}
                    type="password"
                    sx={{ flexGrow: '1' }}
                />
            </Stack>
            <FormControl required fullWidth sx={{ marginBottom: '30px' }}>
                <Box component="label">Vị trí công việc</Box>
                <Select
                    labelId="select-product-label"
                    id="select-product"
                    value={positionWork}
                    onChange={(e: any) => setPositionWork(e.target.value)}
                >
                    <MenuItem value={'CEO/Founder/Chủ tịch'}>CEO/Founder/Chủ tịch</MenuItem>
                    <MenuItem value="Giám đốc (CFO,CTO,GD nhân sự, VP)">
                        Giám đốc (CFO,CTO,GD nhân sự, VP)
                    </MenuItem>
                    <MenuItem value={'Quản lý (Mangager)'}>Quản lý (Mangager)</MenuItem>
                    <MenuItem value={'Nhân viên (Staff)'}>Nhân viên (Staff)</MenuItem>
                    <MenuItem value={'Học sinh/sinh viên (Student)'}>
                        Học sinh/sinh viên (Student)
                    </MenuItem>
                    <MenuItem value={'Vị trí khác (Other)'}>Vị trí khác (Other)</MenuItem>
                </Select>
            </FormControl>
            <Stack sx={{ flexDirection: 'row', gap: '10px', width: '100%' }}>
                <FormControl required fullWidth sx={{ flexGrow: '1' }}>
                    <Box component="label">Tỉnh/Thành phố</Box>
                    <Select
                        labelId="select-product-label"
                        id="select-product"
                        value={district}
                        onChange={(e: any) => setDistrict(e.target.value)}
                    >
                        <MenuItem value={'Khu vực miền Bắc'}>Khu vực miền Bắc</MenuItem>
                        <MenuItem value={'Khu vực miền Trung'}>Khu vực miền Trung</MenuItem>
                        <MenuItem value={'Khu vực miền Nam'}>Khu vực miền Nam</MenuItem>
                    </Select>
                </FormControl>
                <FormControl required fullWidth sx={{ flexGrow: '1' }}>
                    <Box component="label">Quy mô nhân sự</Box>
                    <Select
                        labelId="select-product-label"
                        id="select-product"
                        value={scaleWork}
                        onChange={(e: any) => setScaleWork(e.target.value)}
                    >
                        <MenuItem value={15}>1-15 nhân sự</MenuItem>
                        <MenuItem value={30}>16-30 nhân sự</MenuItem>
                        <MenuItem value={60}>31-60 nhân sự</MenuItem>
                        <MenuItem value={100}>61-100 nhân sự</MenuItem>
                        <MenuItem value={200}>101-200 nhân sự</MenuItem>
                        <MenuItem value={500}>201-500</MenuItem>
                        <MenuItem value={1000}>501-1000</MenuItem>
                        <MenuItem value={999999}>Hơn 1000 nhân sự</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Button
                sx={{ color: '#fff', background: '#000' }}
                variant="outlined"
                onClick={handleRegister}
            >
                Đăng Ký
            </Button>
            <Stack flexDirection="row" className="account-text">
                Đã có tài khoản ?{' '}
                <Typography
                    sx={{
                        color: '#002dff',
                        cursor: 'pointer',
                        '&:hover': { color: '#ff0000' },
                    }}
                    onClick={handleSingin2}
                >
                    {' '}
                    Đăng nhập
                </Typography>
            </Stack>
        </Box>
    );
}
