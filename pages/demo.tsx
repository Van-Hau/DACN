import * as React from 'react';
import { MainLayout } from '@/components/common';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { NextPageWithLayout } from '../models';
import styles from '../styles/Home.module.css';
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    IconButton,
    Link,
    List,
    ListItem,
    Typography,
    Stack,
    CardMedia,
    StyledEngineProvider,
} from '@mui/material';
import { Fragment, useState, useEffect, useRef } from 'react';
import Man from '@/images/home/man.png';
import Curve from '@/images/home/curve.png';
import { useMediaQuery } from 'react-responsive';
import { makeStyles } from '@mui/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ListReason from '@/components/home/ListReason';

import SwiperMulti from '@/components/home/SwiperMulti';
import Product from '@/components/home/Product';
import OryzaTeam from '@/images/home/OryzaTeam.jpg';
import Alarm from '@/images/home/alarm.png';
import Parking from '@/images/home/parking.png';
import { listMenu } from 'mocks';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import { style } from '@mui/system';
import Footer from '@/components/home/Footer';
import { useRouter } from 'next/router';
const classes = {
    sticky: {
        '&.sticky': {
            padding: '10px 50px',
            background: '#fff',
            height: 'auto',
        },
        '&.sticky a': {
            color: '#000',
        },
        '&.sticky button:first-of-type': {
            border: '1px solid rgba(0,0,0,0.5)',
            color: '#000',
        },
        '&.sticky button:last-of-type': {
            color: '#fff',
            background: '#000',
        },
    },
} as const;
const classesTablet = {
    section: {
        '&': { maxWidth: '100%' },
        '&>div:last-child img': {
            marginTop: '0',
        },
        '&>div:first-of-type': {
            maxWidth: '100%',
        },
    },
} as const;

const classesMobile = {
    header: {
        padding: '20px 50px',
    },
    section: {
        flexDirection: 'column',
        padding: '150px 50px 100px',
        height: 'auto',
        '&': { maxWidth: '100%' },
        '&>div:first-of-type': {
            maxWidth: '100%',
        },
        '&>div:first-of-type h2': {
            fontSize: '40px',
            color: '#fff',
        },
        '&>div:first-of-type p': {
            fontSize: '16px',
        },
        '&>div:first-of-type a': {
            position: 'relative',
            marginTop: '10px',
            display: 'inline-block',
            fontSize: '16px',
            letterSpacing: '2px',
            padding: '10px 25px',
            borderRadius: '40px',
        },
    },
} as const;
const generateClassName = createGenerateClassName({
    productionPrefix: 'c',
});
export interface IDemoPAgeProps {}
const listProduct = [
    {
        title: 'ORYZA Team',
        content: `Phần mềm giúp theo dõi các công việc một cách trực quan, 
      chuyên nghiệp. Số hóa, hệ thống hóa các giấy tờ, 
      quy trình của công ty một cách đơn giản, 
      trực quan trên hệ thống giúp nâng cao hiệu quả công việc.`,
        image: OryzaTeam,
        best: true,
    },
    {
        title: 'SMART PARKING',
        content: `Dựa trên công nghệ AI và thiết bị phần cứng tiên tiến.
       Oryza phát triển bộ giải pháp tổng thể quản lý bãi xe thông minh
        với thiết kế đơn giản về thiết bị, tối ưu về chi phí, áp dụng giải pháp Cloud để quản lý thiết bị nhằm tối ưu hóa việc sử dụng, giúp khách hàng 
        dễ dàng sử dụng và lắp đặt với kết nối Plug and Play (cắm và chạy)
      `,
        image: Parking,
        best: false,
    },
    {
        title: 'OBox Alarms',
        content: `Alarm Box là thiết bị báo động thông minh do Oryza phát 
      triển nhằm đáp ứng nhu cầu cảnh báo, báo động khi được kích hoạt,
       giúp người sử dụng thực hiện thao tác gọi điện thoại báo tin hoặc
        truyền tải hình ảnh một cách nhanh nhất của mình đến người nhận.`,
        image: Alarm,
        best: false,
    },
];

export default function DemoPAge(props: IDemoPAgeProps) {
    const [active, setActive] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const router = useRouter();
    const handleClickShowLogin = () => {
        router.push('/login');
    };
    const [showSignUp, setShowSignUp] = useState(false);
    const handleClickShowSignUp = () => {
        router.push('/login');
    };
    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)',
    });
    const isTablet = useMediaQuery({
        query: '(max-width: 1224px)',
    });

    const isMobile = useMediaQuery({
        query: '(max-width: 786px)',
    });
    useEffect(() => {
        window.addEventListener('scroll', () => {
            var header = document.querySelector('.header');
            header?.classList.toggle('sticky', window.scrollY > 0);
        });
    }, []);

    return (
        <StylesProvider generateClassName={generateClassName} injectFirst>
            <Stack
                sx={{
                    fontFamily: 'Roboto,sans-serif',
                    position: 'relative',
                    bgcolor: '#111',
                    '& *': { boxSizing: 'border-box' },
                    '& .MuiTypography-root': {
                        fontFamily: 'Roboto,sans-serif',
                    },
                }}
            >
                <Stack sx={{ position: 'relative' }}>
                    <Stack
                        sx={{
                            // position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                        }}
                    >
                        {
                            <CardMedia
                                component="video"
                                src={'./preview.mp4'}
                                autoPlay
                                muted
                                loop
                            ></CardMedia>
                        }
                    </Stack>
                    <Stack
                        sx={[
                            {
                                position: 'absolute',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                padding: '0 100px',
                                maxWidth: '60%',

                                flexDirection: 'row',
                                minHeight: '100%',
                                '&:before': {
                                    content: "''",
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    width: '100%',
                                    height: '100%',
                                    backdropFilter: 'blur(8px)',
                                    boxShadow: '10px 0 15px rgba(0,0,0,0.05)',
                                },
                            },
                            isMobile
                                ? classesMobile.section
                                : isTablet
                                ? classesTablet.section
                                : {},
                        ]}
                    >
                        <Stack
                            sx={{
                                position: 'relative',

                                zIndex: '1000',
                            }}
                        >
                            <Typography
                                variant="h2"
                                gutterBottom
                                sx={{
                                    fontSize: '40px',
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                }}
                            >
                                Nền tảng quản trị doanh nghiệp toàn diện
                            </Typography>
                            <Typography
                                gutterBottom
                                sx={{
                                    fontSize: '18px',
                                    color: '#fff',
                                    m: '20px 0',
                                }}
                            >
                                Quản lý tập trung tất cả các dữ liệu và thông tin liên quan đến hoạt
                                động của doanh nghiệp.
                            </Typography>
                            <Stack flexDirection="row" justifyContent="flex-start" gap={2}>
                                <Link
                                    sx={{
                                        width: 'fit-content',
                                        mt: '10px',
                                        display: 'inline-block',
                                        background: '#ff0083',
                                        color: '#fff',
                                        fontSize: '20px',
                                        letterSpacing: '2px',
                                        p: '10px 25px',
                                        borderRadius: '40px',
                                        textAlign: 'center',
                                    }}
                                    variant="body2"
                                    href="#"
                                    underline="none"
                                >
                                    Đăng Ký
                                </Link>
                                <Link
                                    sx={{
                                        width: 'fit-content',
                                        mt: '10px',
                                        display: 'inline-block',
                                        background: '#fff',
                                        color: '#ff0083',
                                        fontSize: '20px',
                                        letterSpacing: '2px',
                                        p: '10px 25px',
                                        borderRadius: '40px',
                                        textAlign: 'center',
                                    }}
                                    variant="body2"
                                    href="#"
                                    underline="none"
                                >
                                    Liên Hệ
                                </Link>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    className="header"
                    sx={[
                        {
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100px',
                            p: '40px 50px',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            zIndex: '1001',
                            transition: '0.6s',

                            // background:'rgba(0,0,0,0.5)',
                        },
                        isMobile && classesMobile.header,
                        classes.sticky,
                    ]}
                >
                    <Link
                        href="#"
                        underline="none"
                        sx={{
                            position: 'relative',
                            color: '#fff',
                            fontSize: '28px',
                            fontWeight: '500',
                        }}
                    >
                        HOLO
                    </Link>
                    {/* menu */}
                    <Stack sx={{ position: 'relative', justifySelf: 'center' }}>
                        <List sx={{ position: 'relative', display: 'flex', gap: '10px' }}>
                            {listMenu.map((item, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        className={active == item ? 'active' : ''}
                                        onClick={() => setActive(item)}
                                        component="a"
                                        href="#"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            color: '#fff',
                                            fontSize: '18px',
                                            minWidth: '120px',
                                            justifyContent: 'center',
                                            padding: '8px 2%',
                                            transition: '0.6s',
                                            '&:hover': { color: '#111', background: '#fff' },
                                            '&.active': { color: '#111', background: '#fff' },
                                        }}
                                    >
                                        {item}
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Stack>
                    <Stack flexDirection="row" justifyContent="space-between">
                        <Button
                            onClick={handleClickShowLogin}
                            variant="outlined"
                            sx={{
                                mr: '10px',
                                border: '1px solid rgba(255,255,255,0.5)',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                color: '#fff',
                            }}
                        >
                            Đăng Nhập
                        </Button>
                        <Button
                            onClick={handleClickShowSignUp}
                            variant="contained"
                            sx={{
                                mr: '10px',
                                background: '#fff',
                                padding: '5px 10px',
                                border: '8px',
                                color: '#000',
                                '&:hover': {
                                    background: '#717171',
                                    color: '#fff',
                                },
                            }}
                        >
                            {' '}
                            Đăng Ký
                        </Button>
                    </Stack>
                </Stack>

                <ListReason />
                <SwiperMulti />
                <Stack>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: '2em',
                            textAlign: 'center',
                            fontWeight: '500',
                            color: '#fff',
                            paddingTop: '30px',
                            m: '0 20px',
                        }}
                    >
                        Sản Phẩm
                        <Divider
                            sx={{
                                '&::before,&::after': {
                                    borderTop: 'thin solid rgba(255, 255, 255, 0.7)',
                                },
                            }}
                        >
                            <Chip label="MORE" color="primary" />
                        </Divider>
                    </Typography>
                    {listProduct.map((item, i) => {
                        if (i != listProduct.length - 1)
                            return (
                                <Fragment key={i}>
                                    <Product
                                        lessDesktop={isTablet}
                                        title={item.title}
                                        isBest={item.best}
                                        content={item.content}
                                        image={item.image}
                                    />
                                    <Divider
                                        sx={{
                                            border: 'thin solid rgba(255, 255, 255, 0.2)',
                                        }}
                                    ></Divider>
                                </Fragment>
                            );
                        return (
                            <Product
                                key={i}
                                lessDesktop={isTablet}
                                title={item.title}
                                isBest={item.best}
                                content={item.content}
                                image={item.image}
                            />
                        );
                    })}
                </Stack>
                <Footer />
            </Stack>
        </StylesProvider>
    );
}
