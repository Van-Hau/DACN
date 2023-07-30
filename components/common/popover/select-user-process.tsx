import { SelectEmail, SelectName, TextTitle } from '@/components/common/component-custom';
import { Avatar, IconButton, InputBase, Popover, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { BACK_END_URL } from '@/constants/global';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDebounce } from '@/hooks/useDebouce';
import { removeUTF8 } from '@/ultis/removeUTF8';
export interface IPopoverSelectUserProcessProps {
    anchorEl: any;
    handleClose: any;
    userProcess: any;
    handleAddUserProcess: any;
    listUser: any;
    setUserProcess: any;
}

export default function PopoverSelectUserProcess(props: IPopoverSelectUserProcessProps) {
    const { anchorEl, userProcess, handleClose, handleAddUserProcess, listUser, setUserProcess } =
        props;
    const [dataSearch, setDataSearch] = useState<string>('');

    const handleClosePopover = () => {
        handleClose();
        setDataSearch('');
    };
    // search
    const [serachList, setserachList] = useState<any[]>(listUser);

    const dataS = useDebounce(dataSearch, 300);
    useEffect(() => {
        if (dataS === '') {
            setserachList(listUser);
            return;
        }
        const newList = listUser.filter((item: any) => {
            return removeUTF8(item.fullName.toLowerCase()).includes(
                removeUTF8(dataS.toLowerCase())
            );
        });
        setserachList(newList);
    }, [dataS]);

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Stack sx={{ width: '400px', borderRadius: '10px', p: '10px' }} spacing={'5px'}>
                <Stack sx={{ p: '10px', width: '100%', height: '100%' }} spacing={'5px'}>
                    <TextTitle>Chọn người thực hiện</TextTitle>
                    <Stack
                        direction={'row'}
                        sx={{
                            background: 'hsl(0 0% 90%)',
                            borderRadius: '20px',
                            p: '5px 10px',
                        }}
                        alignItems={'center'}
                    >
                        <SearchIcon sx={{ opacity: 0.5 }} />
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Tìm kiếm thành viên..."
                            onChange={(e) => setDataSearch(e.target.value)}
                        />
                    </Stack>
                    <Stack
                        sx={{
                            height: '400px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            ' &::-webkit-scrollbar': {
                                width: '6px',
                            },
                            ' &::-webkit-scrollbar-thumb': {
                                width: '6px',
                                background: 'hsl(0 0% 80%)',
                                borderRadius: '6px',
                            },
                        }}
                        spacing={'2px'}
                    >
                        <Stack spacing={1}>
                            {serachList.map((item: any, index: number) => (
                                <Stack
                                    key={index}
                                    sx={{
                                        width: '100%',
                                        background: 'hsl(0 0% 95%)',
                                        p: '10px',
                                        justifyContent: 'space-between',
                                        borderRadius: '7px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Stack direction={'row'} alignItems={'center'} spacing={'4px'}>
                                        <Avatar
                                            sx={{
                                                objectFit: 'cover',
                                                width: '35px',
                                                height: '35px',
                                                border: '1px solid #fff',
                                            }}
                                            src={item.avatar ? BACK_END_URL + item.avatar : ''}
                                        />
                                        <Stack>
                                            <SelectName>{item.fullName}</SelectName>
                                            <SelectEmail>{item.email}</SelectEmail>
                                        </Stack>
                                    </Stack>
                                    <Stack>
                                        {userProcess?.id != item.id ? (
                                            <IconButton
                                                onClick={() => {
                                                    handleAddUserProcess(item);
                                                }}
                                            >
                                                <PersonAddIcon sx={{ color: 'rgb(0, 113, 188)' }} />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                onClick={() => {
                                                    setUserProcess(null);
                                                }}
                                            >
                                                <DeleteIcon sx={{ color: 'red' }} />
                                            </IconButton>
                                        )}
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Popover>
    );
}
