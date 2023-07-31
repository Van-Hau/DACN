import { BACK_END_URL } from '@/constants/global';
import { Avatar, AvatarGroup, Stack, Tooltip } from '@mui/material';
import { RootStateOrAny, useSelector } from 'react-redux';

export interface IAvatarTaskProps {
    userAssign: any;
    userCreate: any;
}

export default function AvatarTask({ userAssign, userCreate }: IAvatarTaskProps) {
    return (
        <Stack direction={'row'} spacing={0.5}>
            <AvatarGroup max={3}>
                <Avatar
                    sx={{
                        width: '30px',
                        height: '30px',
                    }}
                    src={userCreate.avatar ? BACK_END_URL + userCreate.avatar : ''}
                />
                <Avatar
                    sx={{
                        width: '30px',
                        height: '30px',
                    }}
                    src={userAssign.avatar ? BACK_END_URL + userAssign.avatar : ''}
                />
            </AvatarGroup>
        </Stack>
    );
}
