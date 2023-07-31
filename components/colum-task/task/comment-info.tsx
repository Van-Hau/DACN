import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import ChatTask from '@/images/task/chat-task.svg';
export interface ICommentInfoTaskProps {}

export default function CommentInfoTask({}: ICommentInfoTaskProps) {
    return (
        <Stack direction={'row'} spacing={0.4} alignItems="center">
            <Image src={ChatTask} alt="chat-task" width={19} height={19} />
            <Typography
                sx={{
                    lineHeight: '18px',
                    fontSize: '12px',
                    fontWeight: 300,
                }}
            >
                1 Bình luận
            </Typography>
        </Stack>
    );
}
