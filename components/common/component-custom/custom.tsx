import styled from '@emotion/styled';
import { Checkbox, Stack, Typography } from '@mui/material';

export const MAIN_COLOR = 'rgba( 0, 113, 188 )';
export const MAIN_COLOR_HOVER = 'rgba( 0, 113, 188, 0.9)';
export const CustomCheckBox = styled(Checkbox)({
    color: '#dfe1e6',
    backgroundColor: '#dfe1e6',
    fontSize: '15px',
    borderRadius: '3px',
    width: '15px',
    height: '15px',
    '&.Mui-checked': {
        color: 'rgba( 0, 113, 188 )',
        fontSize: '14px',
    },
    '&:hover': {
        backgroundColor: '#dfe1e6',
    },
    '&.Mui-disabled': {
        color: '#dfe1e6',
        backgroundColor: '#dfe1e6',
        fontSize: '15px',
        borderRadius: '3px',
        width: '15px',
        height: '15px',
    },
});
export const TextTitle = styled(Typography)({
    fontSize: '15px',
    fontWeight: 700,
    lineHeight: '18px',
    color: '#000',
    transition: '0.05s linear',
});
export const TextInfo = styled(Typography)({
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: '#A0A0A0',
    fontStyle: 'italic',
});

export const CustomButton = styled(Stack)({
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'row',
    padding: '3px 13px',
    borderRadius: '8px',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background 0.2s linear',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '15px',
    fontWeight: 600,
});
export const SelectName = styled(Typography)({
    fontWeight: 700,
    fontSize: '13px',
    lineHeight: '15px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    ' -webkit-line-clamp': 1,
    WebkitBoxOrient: 'vertical',
    width: '100%',
    userSelect: 'none',
});
export const SelectEmail = styled(Typography)({
    fontWeight: 400,
    fontSize: '11px',
    lineHeight: '12px',
    fontStyle: 'italic',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    ' -webkit-line-clamp': 1,
    WebkitBoxOrient: 'vertical',
    userSelect: 'none',
    width: '100%',
});
