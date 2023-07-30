import { Link, Stack, Typography } from '@mui/material'
import React from 'react'

function FooterChild(props:any) {
  return (
    <Stack sx={{padding:'24px 0 0 24px',
    
    }}>
        <Typography sx={{
            textTransform:'uppercase',
            margin: '0px 0px 15px',
            fontSize: '20px',
            color: '#000',
            fontWeight: '700',
            lineHeight: '30px',
            }}>
            {props.content}
        </Typography>
        {props.listDetail.map((item:any,i:any)=>
            <Link key={i} sx={{margin: '0',
                color: '#556cd6',
                textDecoration: 'none',
                fontSize: '14px',
                padding: '0px 0px 8px',
                lineHeight:' 22.12px',
                fontWeight:' 500',
                cursor: 'pointer',
            }}
            href={item.href}
            >{item.title}</Link>
        )}    

    </Stack>
  )
}

export default FooterChild