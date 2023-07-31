import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import FileTask from '@/images/task/file-task.svg';

export interface IFileUploadInfoProps {
    attachment: number;
}

export default function FileUploadInfo({ attachment }: IFileUploadInfoProps) {
    return (
        <Stack direction={'row'} spacing={0.4} alignItems="center">
            <Image src={FileTask} alt="file-task" width={12} height={12} />
            <Typography
                sx={{
                    lineHeight: '18px',
                    fontSize: '12px',
                    fontWeight: 300,
                }}
            >
                {attachment} Tập tin
            </Typography>
        </Stack>
    );
}
