import {Stack, Box, Grid, Typography, Divider, Chip } from "@mui/material";
import React from "react";
import ERP from "@/images/home/ERP.jpg"
import Intergate from "@/images/home/Intergate.jpg"
import Advice from "@/images/home/Advice.jpg"
import Save from "@/images/home/Save.jpg"
import { makeStyles } from "@mui/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const classes = {
  slide:{
    backgroundPosition: "center",
    backgroundSize: "cover",
    maxWidth: "400px !important",
    width:'calc(100% - 60px)',
    background:'#2a2b2f',
    borderRadius:'15px',
    boxShadow:'0 15px 50px rgba(0,0,0,0.3)',
    overflow:'hidden'
  },
  content:{
      position:'relative',
      width:'100%',
      color:'#fff',
      boxSizing:'border-box',
  },
  h6:{
    fontWeight:'bold',
        marginBottom:'20px',
        textAlign:'center',
        fontSize:'30px'
  }


}as const;
function SwiperMulti() {
  return (
    <Stack sx={{background:'#fff'}}
      >
      <Typography
        variant="h2"
        sx={{
          fontSize: '2em',
          textAlign: 'center',
          fontWeight: '500',
          color: '#000',
          paddingTop: '30px',
          m: '0 20px',
          
        }}
      >
        <Box component='span' sx={{
          fontSize:'1.5em',
          fontWeight:'bold',
          color:'#ff0083'
        }}>T</Box>ại sao nên sử dụng HoLo ERP ?
        <Divider sx={{"&::before,&::after":{
          borderTop: 'thin solid rgba(0, 0, 0, 0.5)'
        }}}>
            <Chip label='MORE' color="primary"/>
        </Divider>
      </Typography>
      
      <Swiper
        loop={false}
        effect={"coverflow"}
        grabCursor={true}
        initialSlide={1}
        speed={1000}
        autoplay= {{
          delay:2000
        }}
        pagination={{ clickable: true }}
        centeredSlides={true}
        slidesPerView='auto'
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2,
          slideShadows: false,
        }}
        
        modules={[EffectCoverflow, Pagination]}
        style={{
          width: "100%",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        <SwiperSlide
          
          style={classes.slide}
        >
          <Stack sx={classes.content}>
            <Box sx={{padding:'30px'}}>
            <Typography sx={classes.h6} variant="h6" >HoLo ERP</Typography>
            <Typography>
                  Là hệ thống quản lý chung cho doanh nghiệp. Quản lý tập trung tất
                  cả các dữ liệu và thông tin liên quan đến hoạt động của doanh
                  nghiệp.
                </Typography>
                </Box>
            <Stack>
                
                <Box sx={{width:'100%',overflow:'hidden',display:'flex',alignItems:'center',mt:'20px'}}>
                    <Box component='img' src={ERP.src} sx={{objectFit:'cover',width:'100%'}}/>
                </Box>
                
            </Stack>
          </Stack>
        </SwiperSlide>
        <SwiperSlide style={classes.slide}>
          <Stack  sx={classes.content}>
          <Box sx={{padding:'30px'}}>
            <Typography sx={classes.h6} variant="h6">Khả năng tích hợp</Typography>
            <Typography>
                Các phần mềm hoạt động độc lập và bổ trợ lẫn nhau
                 để tạo thành hệ thống quản trị tài nguyên doanh nghiệp 
                 một cách hiệu quả và chuyên nghiệp.
             </Typography>
             </Box>
            <Stack >
                
                <Box sx={{width:'100%',overflow:'hidden',display:'flex',alignItems:'center',mt:'20px'}}>
                    <Box component='img' src={Intergate.src} sx={{objectFit:'cover',width:'100%'}}/>
                </Box>
            </Stack>
          </Stack>
        </SwiperSlide>
        <SwiperSlide
          style={classes.slide}
        >
          <Stack sx={classes.content}>
          <Box sx={{padding:'30px'}}>
              <Typography sx={classes.h6} variant="h6" >Tiết kiệm chi phí</Typography>
              <Typography>
                  Với nhiều công nghệ hiện đại, chi phí sử dụng được 
                  đánh giá là tiết kiệm – phù hợp với doanh nghiệp Việt Nam
                </Typography>
            </Box>
            <Stack sx={{width:'100%'}}>
                
                <Box sx={{width:'100%',overflow:'hidden',display:'flex',alignItems:'center',mt:'20px'}}>
                    <Box component='img' src={Save.src} sx={{objectFit:'cover',width:'100%'}}/>
                </Box>
            </Stack>
          </Stack>
        </SwiperSlide>
        <SwiperSlide
          style={classes.slide}
        >
          <Stack sx={classes.content}>
          <Box sx={{padding:'30px'}}>
            <Typography sx={classes.h6} variant="h6" >Đội ngũ tư vấn</Typography>
            <Typography>
                Quy trình tư vấn – hợp tác – triển khai được đào tạo bài bản từ chuyên viên đã có nhiều kinh nghiệm.
                <br/>Thấu hiểu tâm lý khách hàng. Sẵn sàng hỗ trợ 24/7.
            </Typography>
            </Box>
            <Stack sx={{width:'100%'}}>
               
                <Box sx={{width:'100%',overflow:'hidden',display:'flex',alignItems:'center',mt:'20px'}}>
                    <Box component='img' src={Advice.src} sx={{objectFit:'cover',width:'100%'}}/>
                </Box>
            </Stack>
          </Stack>
        </SwiperSlide>
      </Swiper>
    </Stack>
  );
}

export default SwiperMulti;
