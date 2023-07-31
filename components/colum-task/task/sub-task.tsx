import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Stack, Typography } from '@mui/material';

export interface ISubTaskProps {}

export default function SubTask({}: ISubTaskProps) {
    return (
        <Stack direction={'row'} spacing={0.4} alignItems="center">
            <FormatListBulletedIcon
                sx={{
                    lineHeight: '18px',
                    fontSize: '12px',
                    textAlign: 'left',
                    color: 'green',
                }}
            />
            <Typography
                sx={{
                    lineHeight: '18px',
                    fontSize: '12px',
                    textAlign: 'left',
                }}
            >
                1/2
            </Typography>
        </Stack>
    );
}
