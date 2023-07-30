import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Stack, Tooltip, Typography } from '@mui/material';

export interface IStartEndDateTaskProps {
    endAt: string;
    startAt: string;
}

export default function StartEndDateTask({ endAt, startAt }: IStartEndDateTaskProps) {
    const convert = (date: string) => {
        let dateObject: Date = new Date(date);
        let dateString: string =
            dateObject.getDate() +
            '/' +
            (dateObject.getMonth() + 1) +
            '/' +
            +dateObject.getFullYear();
        return dateString;
    };
    return (
        <Stack direction={'row'} spacing={0.4} alignItems="center">
            <CalendarMonthOutlinedIcon
                sx={{
                    lineHeight: '18px',
                    fontSize: '12px',
                    textAlign: 'left',
                    color: 'rgba( 0, 113, 188 )',
                }}
            />
            <Tooltip title="Ngày bắt đầu">
                <Typography
                    sx={{
                        lineHeight: '18px',
                        fontSize: '12px',
                        textAlign: 'left',
                        color: 'black',
                    }}
                >
                    {convert(startAt)}
                </Typography>
            </Tooltip>

            <Typography
                sx={{
                    lineHeight: '18px',
                    fontSize: '12px',
                    textAlign: 'left',
                    display: 'flex',
                }}
            >
                -
            </Typography>

            <Tooltip title="Ngày kết thúc">
                <Typography
                    sx={{
                        lineHeight: '18px',
                        fontSize: '12px',
                        textAlign: 'left',
                        color: 'black',
                    }}
                >
                    {convert(endAt)}
                </Typography>
            </Tooltip>
        </Stack>
    );
}
