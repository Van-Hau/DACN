import { IconButton, Stack, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface IHeaderColumnTaskComponentProps {
    title: string;
    onclickAdd?: any;
}

export default function HeaderColumnTaskComponent(props: IHeaderColumnTaskComponentProps) {
    const { title, onclickAdd } = props;
    return (
        <Stack
            direction={'row'}
            sx={{
                cursor: 'pointer',
                height: '20px',
                alignItems: 'center',
                gap: '10px',
                // pl: '10px',
            }}
            justifyContent={'space-between'}
        >
            <Stack direction={'row'}>
                <Stack
                    sx={{
                        height: '30px',
                        width: '30px',
                        bgcolor: '#fff',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <IconButton onClick={onclickAdd}>
                        <AddIcon
                            sx={{
                                textAlign: 'center',
                                height: '20px',
                                width: '20px',
                                color: 'blue',
                            }}
                        />
                    </IconButton>
                </Stack>

                <Typography
                    variant={'body2'}
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: '18px',
                        ml: '10px',
                    }}
                >
                    {title}
                </Typography>
            </Stack>
            <Stack direction={'row'}>
                <InfoIcon />
                <MoreVertIcon />
            </Stack>
        </Stack>
    );
}
