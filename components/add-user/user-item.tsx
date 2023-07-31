import { Box, Grid, Card, Button, Avatar, Typography } from '@mui/material'; // @types
import { useState } from 'react';

export interface IUserItemProps {
    name: string;
    country: string;
    avatarUrl: string;
    isFollowed: string;
}

export default function UserItem({ name, country, avatarUrl, isFollowed }: IUserItemProps) {
    const [toggle, setToogle] = useState(isFollowed);

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
            <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
                <Typography variant="subtitle2" noWrap>
                    {name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Iconify
                        icon={'eva:pin-fill'}
                        sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
                    /> */}
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {country}
                    </Typography>
                </Box>
            </Box>
            {/* <Button
                size="small"
                onClick={() => setToogle(!toggle)}
                variant={toggle ? 'text' : 'outlined'}
                color={toggle ? 'primary' : 'inherit'}
                startIcon={toggle && <Iconify icon={'eva:checkmark-fill'} />}
            >
                {toggle ? 'Followed' : 'Follow'}
            </Button> */}
        </Card>
    );
}
