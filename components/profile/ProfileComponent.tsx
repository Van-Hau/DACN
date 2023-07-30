import { AddAPhoto } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';

export interface IProfileComponentProps {}
const handleClick = (ref: any) => {
    ref.current.click();
};
export default function ProfileComponent(props: IProfileComponentProps) {
    const [email, setEmail] = useState('htnb@gmail.com');
    const [name, setName] = useState('Nguyễn Văn Hậu');
    const [phone, setPhone] = useState('0895331242');
    const [company, setCompany] = useState('DirectX');
    const [address, setAdress] = useState('Khu Phố 5, Phường Ninh Phú, Tỉnh An Huy, Việt Nam');
    const [position, setPosition] = useState('Nhân viên chính thức');
    const [department, setDepartment] = useState('Phòng phát triển');
    const [district, setDistrict] = useState('Khu vực miền Bắc');
    const [image, setImage] = useState('');
    const wrapperRef = useRef(null);
    const fileSelectedHandler = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };
    return (
        <Stack sx={{ height: '100vh', width: '100%', overflowY: 'auto' }}>
            <Stack
                sx={{
                    width: '100%',
                    color: '#ffffff',
                    height: '40px',
                    position: 'relative',
                    p: '20px 0px 20px 10px',
                    bgcolor: '#3f51b5',
                    flexGrow: '0',
                }}
                direction="row"
                alignItems={'center'}
            >
                <Stack direction="row" alignItems={'center'} spacing={2}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '22px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '250px',
                        }}
                    >
                        Thông Tin Cá Nhân
                    </Typography>

                    {/* <FilterUserProcess userFollowerProject={UserFollowerProject} /> */}
                </Stack>
            </Stack>
            <Grid
                sx={{ paddingLeft: '44px', marginTop: '0', paddingRight: '24px' }}
                container
                spacing={5}
            >
                <Grid item md={3} sm={12} sx={{}}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            height: '100%',
                        }}
                    >
                        <Grid
                            sm={12}
                            xs={12}
                            sx={{
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '24px',
                                background: 'rgb(235, 236, 240)',
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
                <Grid item md={9} sm={12} sx={{}}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            width: '100%',
                            flexDirection: 'row',
                            background: 'rgb(235, 236, 240)',
                            borderRadius: '30px',
                            padding: '24px',
                            '& input': {
                                fontWeight: '600',
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
                        <Grid item md={6} sm={12}>
                            <TextField
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                fullWidth
                                label="Số ĐT"
                            />
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <TextField
                                onChange={(e) => setCompany(e.target.value)}
                                value={company}
                                fullWidth
                                label="Công Ty"
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
                        <Grid item md={6} sm={12}>
                            <TextField
                                onChange={(e) => setPosition(e.target.value)}
                                value={position}
                                fullWidth
                                label="Vị trí"
                                disabled
                            />
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <TextField
                                onChange={(e) => setDepartment(e.target.value)}
                                value={department}
                                fullWidth
                                label="Phòng Ban"
                                disabled
                            />
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
                                id="select-product"
                                value={district}
                                sx={{
                                    fontWeight: '600',
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
                            >
                                Lưu Thay Đổi
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    );
}
