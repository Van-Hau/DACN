import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { enqueueSnackbar } from 'notistack';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ItemUser from './ItemUser';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import SearchUser from './SearchUser';
import { userApi, workApi } from '@/api/index';
import { useAppDispatch } from '@/hooks/useRedux';
import { setLoading } from '@/redux/loading';

export interface IAddMemberDialogProps {
    open: boolean;
    setOpen?: any;
    idWorkPage?: any;
}

export default function AddMemberDialog(props: IAddMemberDialogProps) {
    const { open, setOpen, idWorkPage } = props;
    const [listUser, setListUser] = React.useState<any>([]);
    const [listUserWork, setListUserWork] = React.useState<any>([]);
    const dispath = useAppDispatch();

    React.useEffect(() => {
        if (!open) return;
        dispath(setLoading(true));

        (async () => {
            Promise.all([workApi.getUserWorkPage(idWorkPage), userApi.getAllOfCompany()]).then(
                (res) => {
                    const { data: data2 } = res[0];

                    setListUserWork(data2);

                    const { data } = res[1];

                    //remove user in workpage
                    let listUser = data.filter((item: any) => {
                        let check = true;
                        data2.forEach((item2: any) => {
                            if (item.id == item2.id) check = false;
                        });
                        return check;
                    });

                    setListUser(listUser);
                    dispath(setLoading(false));
                }
            );
        })();
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const handleAddUser = async (index: number) => {
        const user: any = listUser[index];
        // console.log(user);
        const payload = {
            idUser: user.id,
            idWorkspace: idWorkPage,
        };
        try {
            dispath(setLoading(true));

            const { data } = await workApi.addUserToWorkSpace(payload);
            setListUser((prev: any) => {
                prev.splice(index, 1);
                return [...prev];
            });
            setListUserWork((prev: any) => [
                ...prev,
                {
                    ...data.user,
                    isAdmin: data.isAdmin,
                    isDefault: data.isDefault,
                    idUserManage: data.id,
                },
            ]);
            enqueueSnackbar('Thêm thành công', { variant: 'success' });
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Thêm thất bại', { variant: 'error' });
        } finally {
            dispath(setLoading(false));
        }
    };
    const handleDeleteUser = async (index: number) => {
        try {
            dispath(setLoading(true));
            const user: any = listUserWork[index];
            const { data } = await workApi.deleteUsersFromWorkSpace(user.idUserManage);
            setListUserWork((prev: any) => {
                prev.splice(index, 1);
                return [...prev];
            });
            setListUser((prev: any) => [...prev, user]);
            enqueueSnackbar('Xóa thành công', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Xóa thất bại', { variant: 'error' });
        } finally {
            dispath(setLoading(false));
        }
    };
    const handleAddAdmin = async (index: number) => {
        try {
            dispath(setLoading(true));
            const user: any = listUserWork[index];
            const payload = {
                id: user.idUserManage,
                isAdmin: true,
            };
            const { data } = await workApi.updateManage(payload);
            setListUserWork((prev: any) => {
                prev[index].isAdmin = true;
                return [...prev];
            });
            enqueueSnackbar('Thêm thành công', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Thêm thất bại', { variant: 'error' });
        } finally {
            dispath(setLoading(false));
        }
    };
    const handleDeleteAdmin = async (index: number) => {
        try {
            dispath(setLoading(true));
            const user: any = listUserWork[index];
            const payload = {
                id: user.idUserManage,
                isAdmin: false,
            };
            const { data } = await workApi.updateManage(payload);
            setListUserWork((prev: any) => {
                prev[index].isAdmin = false;
                return [...prev];
            });
            enqueueSnackbar('Thêm thành công', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Thêm thất bại', { variant: 'error' });
        } finally {
            dispath(setLoading(false));
        }
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="lg"
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center" p={2}>
                <Typography variant="body1" sx={{ p: 2, fontSize: '25px', fontWeight: '600' }}>
                    Thêm thành viên
                </Typography>
                <SearchUser />
            </Stack>
            <Divider />
            <Stack minHeight={'70vh'}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Thành viên " value="1" />
                            <Tab label="Thêm mới" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Grid container spacing={2}>
                            {listUserWork?.map((item: any, index: number) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <ItemUser
                                        data={item}
                                        index={index}
                                        onAddManage={handleAddAdmin}
                                        onRemoveManage={handleDeleteAdmin}
                                        onDelete={handleDeleteUser}
                                        title={'Xóa khỏi Workspace'}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        <Grid container spacing={2}>
                            {listUser?.map((item: any, index: number) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <ItemUser
                                        type="add"
                                        data={item}
                                        index={index}
                                        onclickAdd={handleAddUser}
                                        title={'Xóa khỏi  Workspace'}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>
                </TabContext>
            </Stack>

            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
}
