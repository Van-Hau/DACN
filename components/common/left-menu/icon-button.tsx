import { Stack, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
const CustomIcon = styled(Stack)({
    borderRadius: '10px',
    cursor: 'pointer',
    padding: '10px',
    border: '1px solid #fff',
    ':hover': {
        background: 'hsl(0 0% 90%)',
    },
});

export interface IIconButtonProps {
    title: string;
    Icon: any;
    mt: string;
    isActivate?: boolean;
}

export default function IconButtonHome({ title, Icon, mt, isActivate }: IIconButtonProps) {
    return (
        <Stack
            sx={{
                color: isActivate ? 'rgba(0, 113, 188)' : '#595959',
                borderRadius: '5px',
                cursor: 'pointer',
                mt: `${mt} !important`,
            }}
        >
            <Tooltip title={title} placement="right-start">
                <CustomIcon>
                    <Icon />
                </CustomIcon>
            </Tooltip>
        </Stack>
    );
}
