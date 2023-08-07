import { MainLayout } from '@/components/common';
import ListUser from '@/components/dialog/ListUser';
import { Stack } from '@mui/material';
export interface IAddUserProps {}

function AddUser(props: IAddUserProps) {
    return (
        <Stack sx={{ height: '100%', width: '100%', bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
            <ListUser />
        </Stack>
    );
}
AddUser.Layout = MainLayout;
export default AddUser;
