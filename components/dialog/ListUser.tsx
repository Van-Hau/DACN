import { AddOutlined, Remove, SearchOutlined } from '@mui/icons-material';
import { Button, Divider, Grid, IconButton, OutlinedInput, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState, useContext } from 'react';
import Card from './UserCard';
import NewProfileComponent from './NewProfileComponent';
import { userApi } from '@/api/user-api';
import { useDebounce } from '@/hooks/useDebouce';
import { removeUTF8 } from '@/ultis/removeUTF8';
import { useAppSelector } from '@/hooks/useRedux';
import ProfileComponent from './ProfileComponent';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loading';
export interface IListUserProps {}

export default function ListUser(props: IListUserProps) {
    let [isAdd, setIsAdd] = useState(false);
    let [isShow, setIsShow] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [listUserSearch, setListUserSearch] = useState([]); // list user sau khi search
    const wrapperRef = useRef(null);
    const [valueSearch, setValueSearch] = useState('');
    const [trigger, setTrigger] = useState(0);
    const user = useAppSelector((state) => state.user);
    const [userSelect, setUserSelect] = useState<any>();
    const handlerTrigger = () => {
        setTrigger(trigger + 1);
    };
    useEffect(() => {
        async function fetchMyAPI() {
            const { data } = await userApi.getAllOfCompany();
            setListUser(data);
            setListUserSearch(data);
        }
        fetchMyAPI();
    }, [trigger]);

    const dataSearchDebounce = useDebounce(valueSearch, 500);
    useEffect(() => {
        if (dataSearchDebounce) {
            const newList = listUser.filter((user: any) => {
                return removeUTF8(user.fullName.toLowerCase()).includes(
                    removeUTF8(dataSearchDebounce.toLowerCase())
                );
            });
            setListUserSearch(newList);
        } else {
            setListUserSearch(listUser);
        }
    }, [dataSearchDebounce]);
    const dispatch = useDispatch();
    const deleteUser = async (item: any) => {
        try {
            dispatch(setLoading(true));
            userApi.deleteUser(item.id).then(function (response: any) {
                if (response && response.errors == null) {
                    enqueueSnackbar('Xóa thành công', { variant: 'success' });
                    const rest = listUser.filter((i: any) => i.id !== item.id);
                    setListUser(rest);
                    setListUserSearch(rest);
                } else if (response?.errors?.errorMessage) {
                    enqueueSnackbar(response?.errors?.errorMessage, { variant: 'error' });
                    // props.setIsAdd(false);
                }
            });
        } catch (error: any) {
            //get message error
            const { errors } = error.response.data;
            let message = '';
            for (const key in errors) {
                message += errors[key];
                break;
            }
            enqueueSnackbar(message, { variant: 'error' });
        } finally {
            dispatch(setLoading(false));
        }
    };
    return (
        <Stack
            sx={{
                position: 'relative',
                width: '100%',
            }}
        >
            {/* <ListItem isAdd={isAdd} setIsAdd={setIsAdd} /> */}
            <NewProfileComponent setTrigger={handlerTrigger} isAdd={isAdd} setIsAdd={setIsAdd} />
            <ProfileComponent isAdd={isShow} setIsAdd={setIsShow} user={userSelect} />
            <Stack
                ref={wrapperRef}
                sx={{
                    width: '100%',
                }}
                alignItems="center"
                pt={2}
                pb={2}
            >
                <Stack
                    sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Stack direction={'row'} spacing={2}>
                        <Typography
                            sx={{
                                fontWeight: '700',
                                marginBottom: '10px',
                                fontSize: '25px',
                                textAlign: 'left',
                                ml: 5,
                            }}
                            variant="body1"
                        >
                            Thành viên trong nhóm
                        </Typography>
                        <OutlinedInput
                            placeholder="Search ..."
                            value={valueSearch}
                            onChange={(e) => {
                                setValueSearch(e.target.value);
                            }}
                            startAdornment={
                                <IconButton
                                    sx={{
                                        borderRadius: '0',
                                        background: '#fff',
                                        position: 'relative',
                                        padding: '7px',

                                        '&:hover': {
                                            background: '#fff',
                                        },
                                    }}
                                >
                                    <SearchOutlined />
                                </IconButton>
                            }
                            sx={{
                                borderRadius: '10px',
                                overflow: 'hidden',
                                padding: '0',
                                width: '40%',
                                minWidth: '260px',
                                '& input': {
                                    padding: '8px 14px',
                                    background: '#fff',
                                },
                                '& fieldset': {
                                    borderColor: '#c4c4c4',
                                },
                            }}
                        ></OutlinedInput>
                    </Stack>
                    {user.userOwnerId === null && (
                        <Button
                            onClick={() => {
                                setIsAdd(true);
                            }}
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: '700',
                                textTransform: 'none',
                            }}
                            variant="outlined"
                            startIcon={<AddOutlined />}
                        >
                            {' '}
                            Mới
                        </Button>
                    )}
                </Stack>
                <Divider sx={{ width: '100%', height: '1px', bgcolor: 'rgba(0,0,0,0.5)', mt: 2 }} />
                <Stack
                    sx={{
                        width: '100%',
                        pr: 5,
                        mt: 2,
                        pl: 5,
                        overflow: 'auto',
                        maxHeight: 'calc(100vh - 100px)',
                        '&::-webkit-scrollbar': {
                            width: '5px',
                        },
                        '&::-webkit-scrollbar-track': {
                            width: '5px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#c4c4c4',
                            borderRadius: '24px',
                        },
                    }}
                >
                    <Grid container sx={{}} spacing={2}>
                        {listUserSearch.length != 0 &&
                            listUserSearch.map((item: any, index) => (
                                <Grid key={index} item md={4} lg={3} sm={6} xs={12}>
                                    <Card
                                        removeUser={() => {
                                            deleteUser(item);
                                        }}
                                        avatar={item.avatar}
                                        positionWork={item.positionWork}
                                        fullName={item.fullName}
                                        setUserSelect={() => setUserSelect(item)}
                                        setIsAdd={setIsShow}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </Stack>
            </Stack>
        </Stack>
    );
}
