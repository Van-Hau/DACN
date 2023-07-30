import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { ClickAwayListener, IconButton, Stack, Tooltip } from '@mui/material';
import Image from 'next/image';
import Priority from './priority';

export interface ILeftMenuEditProps {
    setOpen: any;
    resetForm: any;
    setOpenPriority: any;
    isEdit: boolean;
    openPriority: boolean;
    priority: any;
    setPriority: any;
}

export default function LeftMenuEdit(props: ILeftMenuEditProps) {
    const { setOpen, resetForm, setOpenPriority, isEdit, openPriority, priority, setPriority } =
        props;
    return (
        <Stack
            justifyContent={'space-between'}
            bgcolor={'rgba(221, 221, 221, 0.25)'}
            sx={{ width: '60px', mb: 2 }}
        >
            <Stack>
                <IconButton
                    onClick={() => {
                        setOpen(false);
                        resetForm();
                    }}
                >
                    <CloseIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                </IconButton>
                <IconButton>
                    <InfoIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                </IconButton>
                <IconButton>
                    <AttachFileIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                </IconButton>
            </Stack>
            <Stack>
                <ClickAwayListener
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                    onClickAway={() => setOpenPriority(false)}
                >
                    <Tooltip title="Độ ưu tiên">
                        <Stack sx={{ position: 'relative' }}>
                            <IconButton
                                onClick={() => {
                                    if (isEdit) setOpenPriority(!openPriority);
                                }}
                            >
                                <Image
                                    src={priority.url}
                                    alt="Picture of the author"
                                    width={30}
                                    height={30}
                                />
                            </IconButton>
                            {openPriority ? <Priority setPriority={setPriority} /> : null}
                        </Stack>
                    </Tooltip>
                </ClickAwayListener>{' '}
                <IconButton>
                    <ArrowCircleUpIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                </IconButton>
            </Stack>
        </Stack>
    );
}
