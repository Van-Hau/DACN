import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from "@mui/styles";
const classes = {
  span:{
      position:'absolute',
      top:'30px',
      left:'110px',
      width:'100px',
      height:'100px',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      overflow:'hidden',
      "&::before":{
        content:"'Nổi Bật'",
        position:'absolute',
        width:'150%',
        height:'40px',
        background:'#62baea',
        transform:'rotate(-45deg) translateY(-20px)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        textTransform:'uppercase',
        fontWeight:'600',
        color:'#fff',
        zIndex:'2',
        letterSpacing:'0.1em',
        boxShadow:'0 5px 10px rgba(0,0,0,0.1)',

      },
      "&::after":{
        content:"''",
        position:'absolute',
        bottom:'0',
        left:'0',
        width:'10px',
        height:'10px',
        background:'#4a98bf',
        zIndex:'1',
        boxShadow:'90px -90px #4a98bf'
      }
  }
  ,
  tablet:{
      color:'#fff',
      flexDirection:'column',
      "&>div":{
          padding:'40px 120px',
          width:'100%'
      }
  },
  desktop:{
    flexDirection:'row',
    color:'#fff',
    "&>div":{
        width:'50%',
        padding:'40px 120px'
    }
  }

}as const;
function Product(props:any) {

  return (
    <Stack sx={props.lessDesktop?classes.tablet:classes.desktop} >
        <Stack >
            <Typography variant='h4' sx={{fontSize:'40px',lineHeight:'48px',fontWeight:'700'}}>
                {props.title}
            </Typography>
            <Typography sx={{mt:'16px',fontSize:'18px',lineHeight:'30px',fontWeight:'400'}}>
            
            {props.content}
            </Typography>
            <Button variant='contained' sx={{mt:'16px'}}>Xem Thêm</Button>
        </Stack>
        <Box sx={{position:'relative'}}>
            {props.isBest && <Box sx={classes.span} component='span'></Box>}
            <Box component='img' sx={{height:'100%',width:'100%',objectFit:'cover'}} src={props.image.src}/>
        
        </Box>
    </Stack>
  )
}

export default Product