import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import FooterChild from './FooterChild'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import Holo from '@/images/home/download.png'
const listContent=[
    {
        content:"THÔNG TIN",
        listDetail:[
            {
                title:"Giới thiệu",
                href:"#"
            },
            {
                title:"Khách hàng",
                href:"#"
            },
            {
                title:"Liên hệ",
                href:"#"
            },
            {
                title:"Đối tác",
                href:"#"
            },
            {
                title:"Tuyển dụng",
                href:"#"
            },
            {
                title:"Tin tức",
                href:"#"
            },
        ]
    },
    {
        content:"Liên kết",
        listDetail:[
            {
                title:"Cập nhật",
                href:"#"
            },
            {
                title:"Hướng dẫn",
                href:"#"
            },
            {
                title:"Youtube",
                href:"#"
            },
            {
                title:"Zalo",
                href:"#"
            },
            
        ]
    },
    {
        content:"Hỗ trợ",
        listDetail:[
            {
                title:"Hỗ trợ",
                href:"#"
            },
            {
                title:"Điều khoản",
                href:"#"
            },
            {
                title:"Chính sách bảo mật",
                href:"#"
            },
            
        ]
    },
 
]
function Footer() {
  return (
    <Stack sx={{background:'#ede7ff'}} p='60px' flexDirection='row' justifyContent='space-around'>
        <Stack>
            <Box component='img' src={Holo.src} sx={{
                    objectFit: 'contain',
                    height: '90px',
                    width: '300px',  
            }}/>
            <Typography sx={{
                    color: '#55595d',
                    margin: '0px 0px 5px',
                    fontSize: '24px',
                    textTransform: 'uppercase',
                    padding: '0px 0px 8px',
                    lineHeight: '22.12px',
                    fontWeight: '700',
            }}>CÔNG TY CỔ PHẦN CÔNG NGHỆ HOLO SYSTEMS
            </Typography>
            <Stack>
                <Box sx={{display:'flex',mr:'2px'}}>
                    <LocationOnIcon/>
                    <Typography ml='5px'>420/3A Quốc lộ 13, Khu phố Thạnh Bình, 
                        Phường An Thạnh, Thành Phố Thuận An, Tỉnh Bình Dương.
                    </Typography>
                </Box>
                <Box sx={{display:'flex'}}>
                    <EmailIcon/>
                    <Typography ml='5px'>
                    info@oryza.vn
                    </Typography>
                </Box>
                <Box sx={{display:'flex'}}>
                    <LocalPhoneIcon/>
                    <Typography ml='5px'>
                    0909 246 111
                    </Typography>
                </Box>
                <Box sx={{display:'flex'}}>
                    <FacebookIcon />
                    <Typography ml='5px'>
                        Oryza Systems
                    </Typography>
                </Box>
            </Stack>
        </Stack>
        {listContent.map((item,i)=>{
           return <FooterChild key={i} content={item.content} listDetail={item.listDetail}/>
        })}
    </Stack>
  )
}

export default Footer