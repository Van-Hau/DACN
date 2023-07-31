import { Button, Stack, Typography } from '@mui/material';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import CloudIcon from '@mui/icons-material/Cloud';
import SearchIcon from '@mui/icons-material/Search';
import BathroomIcon from '@mui/icons-material/Bathroom';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { BACK_END_URL } from '@/constants/global';
export interface IHeaderTaskComponentProps {
    listUser: any[];
    treePackage: any;
}

export default function HeaderTaskComponent(props: IHeaderTaskComponentProps) {
    const { listUser, treePackage } = props;
    return (
        <Stack
            sx={{
                width: '100%',
                color: '#ffffff',
                height: '40px',
                position: 'relative',
                p: '20px 0px 20px 10px',
                justifyContent: 'space-between',
                mt: '10px',
            }}
            direction="row"
            alignItems={'center'}
        >
            <Stack direction="row" alignItems={'center'} spacing={2}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '26px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '250px',
                    }}
                >
                    {treePackage?.namePackage}
                </Typography>
                <AvatarGroup max={4}>
                    {listUser.map((item, index) => {
                        return (
                            <Avatar
                                key={index}
                                alt={item.name}
                                src={item.avatar ? BACK_END_URL + item.avatar : ''}
                                sx={{ width: 32, height: 32 }}
                            />
                        );
                    })}
                </AvatarGroup>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} spacing={2} mr={2}>
                <Paper
                    component="form"
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 250,
                        height: 40,
                    }}
                >
                    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Tìm kiếm công việc..." />
                    <IconButton type="button" sx={{ p: '10px' }}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: 'rgb(53, 146, 208)',
                        textTransform: 'none',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#fff',
                        height: 40,
                    }}
                    startIcon={<BathroomIcon />}
                >
                    Kanban
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: 'rgb(53, 146, 208)',
                        textTransform: 'none',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#fff',
                        height: 40,
                    }}
                    startIcon={<CloudIcon />}
                >
                    Lưu trữ
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: 'rgb(53, 146, 208)',
                        textTransform: 'none',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#fff',
                        height: 40,
                    }}
                    startIcon={<FilterAltIcon />}
                >
                    Bộ lọc
                </Button>
            </Stack>
        </Stack>
    );
}
