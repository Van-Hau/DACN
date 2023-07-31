import { workApi } from '@/api/work-api';
import NewProject from '@/components/dialog/NewProject';
import NewWorkspace from '@/components/dialog/NewWorkspace';
import AddMemberDialog from '@/components/work-spage/AddMemeberDialog';
import { useAppSelector } from '@/hooks/useRedux';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';
import {
    Box,
    ClickAwayListener,
    FormControl,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Select,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { ProjectItem } from './project-item';
import CreateProjectDialog from '@/components/project/create-project-dialog';
import CreateParketDialog from '@/components/packet/create-parket-dialog';
import { packageApi } from '@/api/package';
import { projectApi } from '@/api/project';
import AddMemberProjectDialog from '@/components/project/AddMemeberProjectDialog';
import AddMemberPackageDialog from '@/components/packet/AddMemeberPackageDialog';
import CreateClassDialog from '@/components/class/create-class-dialog';
export interface IDrawerHomeComponentProps {
    setExpand: Function;
    expand: string;
}

export default function DrawerHomeComponent(props: IDrawerHomeComponentProps) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpenWorkspaceDialog, setOpenWorkspaceDialog] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [openDilogAddMember, setOpenDilogAddMember] = useState(false);
    const [workPageChoose, setWorkPageChoose] = useState<any>(null);
    const profile = useAppSelector((state) => state.user);
    const [openCreateProjectDialog, setOpenCreateProjectDialog] = useState(false);

    const [formWorkspaceKey, setFormWorkspaceKey] = useState(0);
    const [selectWorkspace, setSelectWorkspace] = useState(-1);
    const [listWorkspace, setListWorkspace] = useState([]);

    const [projectChoose, setProjectChoose] = useState<string>('');
    const [openCreateParketDialog, setOpenCreateParketDialog] = useState(false);
    const [openAddProjectDialog, setOpenAddProjectDialog] = useState(false);
    const [idProjectChoose, setIdProjectChoose] = useState<string>('');

    const [openAddParketDialog, setOpenAddParketDialog] = useState(false);
    const [idParketChoose, setIdParketChoose] = useState<string>('');
    const [idProjectChooseAddMember, setIdProjectChooseAddMember] = useState<string>('');
    const [openCreateClassDialog, setOpenCreateClassDialog] = useState(false);

    const handleToggle = (e: any) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
        if (selectWorkspace != -1) {
            setOpen((prevOpen) => !prevOpen);
            return;
        }
        enqueueSnackbar('Hãy chọn Workspace trước tiên', { variant: 'warning' });
    };
    const anchorRef = useRef<HTMLButtonElement>(null);
    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };
    const handleOpenDialog = (event: Event | React.SyntheticEvent) => {
        setOpenCreateProjectDialog(true);
    };
    const handleOpenWorkspaceDialog = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setFormWorkspaceKey(formWorkspaceKey + 1);
        setOpenWorkspaceDialog(true);
    };

    useEffect(() => {
        if (!profile.id) return;
        const fetch = async () => {
            const { data } = await workApi.getWorkSpaceByUser(profile.id);
            setListWorkspace(data);
            if (data.length > 0) {
                setSelectWorkspace(data[0].id);
                setWorkPageChoose(data[0]);
            }
        };
        fetch();
    }, [profile.id, isOpenWorkspaceDialog]);

    useEffect(() => {
        if (selectWorkspace == -1 || !profile?.id) return;
        (async () => {
            const { data } = await projectApi.getByIdUser(profile?.id, selectWorkspace);
            setProjectList(data);
        })();
    }, [selectWorkspace, openCreateProjectDialog]);

    const handleAddMemberWorkSpage = async (id: any) => {
        setOpenDilogAddMember(true);
    };
    return (
        <Stack
            className={props.expand === 'expand' ? 'expand' : ''}
            sx={{
                position: 'fixed',
                width: '350px',
                transform: 'scaleX(0)',
                transition: '0.5s ease',
                transformOrigin: 'left',
                '&.expand': {
                    transform: 'scaleX(1)',
                },
                display: 'flex',
                ml: 1.3,
                borderRadius: '0px 5px 5px 0px',
                top: 0,
                left: '40px',
                zIndex: 2,
                p: 1,
                backgroundColor: '#fff',
                height: '100vh',
                minHeight: '100%',
            }}
        >
            {/* ---------------------- */}

            {/* ---------------------- */}
            <Stack direction="row" alignItems={'center'}>
                <Stack sx={{ width: '90%' }}>
                    <Typography sx={{ fontFamily: 'Noto Sans Display' }}>Workspace</Typography>
                </Stack>
                <Stack>
                    {profile?.role == 'ADMIN' && (
                        <Tooltip title="Thêm Workspace">
                            <IconButton onClick={handleOpenWorkspaceDialog}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            </Stack>
            <Stack direction="row" alignItems={'center'} spacing={1}>
                <Stack sx={{ width: '100%' }} flex={1}>
                    <NewWorkspace
                        key={formWorkspaceKey}
                        setOpenDialog={setOpenWorkspaceDialog}
                        isOpenDialog={isOpenWorkspaceDialog}
                    />
                    <FormControl fullWidth size="small" sx={{ flex: 1 }}>
                        <Select
                            sx={{ width: '100%' }}
                            value={selectWorkspace}
                            onChange={(e: any) => {
                                setSelectWorkspace(e.target.value);
                                setWorkPageChoose(
                                    listWorkspace.find((item: any) => item.id == e.target.value)
                                );
                            }}
                        >
                            {listWorkspace?.length <= 0 && (
                                <MenuItem value={-1}>
                                    <em>Hiện tại bạn chưa có Workspace</em>
                                </MenuItem>
                            )}

                            {listWorkspace.map((item: any, index) => (
                                <MenuItem key={index} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack
                    spacing={'2px'}
                    sx={{
                        p: 1,
                        cursor: 'pointer',
                        ml: 'auto',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                    direction={'row'}
                    // onClick={(event: any) => setAnchorEl(event.currentTarget)}
                >
                    {workPageChoose?.isAdmin && (
                        <Box onClick={(e: any) => handleToggle(e)} ref={anchorRef}>
                            <SettingsIcon />
                        </Box>
                    )}

                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '0',
                            transform: 'translateY(calc(100%))',
                            right: '10px',
                            zIndex: '10',
                            display: open ? 'block' : 'none',
                            boxShadow:
                                'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    autoFocusItem={open}
                                >
                                    <MenuItem onClick={handleOpenDialog}>Thêm dự án</MenuItem>
                                    <MenuItem onClick={handleAddMemberWorkSpage}>
                                        Quản lý thành viên
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Box>
                </Stack>
            </Stack>
            <Stack sx={{ p: '10px 0px 10px 0px' }}>
                <Stack direction="row" alignItems={'center'} position={'relative'}>
                    <Typography
                        component="input"
                        placeholder="Tìm kiếm team/kế hoạch"
                        sx={{
                            fontSize: '16px',
                            lineHeight: '28px',
                            padding: ' 8px 16px',
                            width: '100%',
                            minHeight: '40px',
                            maxHeight: '40px',
                            border: 'unset',
                            borderRadius: '5px',
                            outlineColor: '#dddddd50',
                            backgroundColor: ' rgb(255, 255, 255)',
                            autoComplete: 'off',
                            boxShadow:
                                ' rgba(0, 0, 0, 0) 0px 0px 0px 0px,rgba(0, 0, 0, 0) 0px 0px 0px 0px,rgba(0, 0, 0, 0) 0px 0px 0px 0px,rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
                        }}
                    />

                    <IconButton
                        sx={{
                            display: 'block',
                            position: 'absolute',
                            right: 0,
                            top: 5,
                            p: 1,
                        }}
                    >
                        <ClearIcon
                            sx={{
                                display: 'block',
                                fontSize: '15px',
                                '&:hover': {
                                    color: 'red',
                                },
                                height: '100%',
                            }}
                        />
                    </IconButton>
                </Stack>
            </Stack>

            <Stack
                sx={{
                    height: '90vh',
                    overflow: 'auto',
                    ' &::-webkit-scrollbar': {
                        width: '6px',
                    },
                    ' &::-webkit-scrollbar-thumb': {
                        width: '6px',
                        background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
                        borderRadius: '6px',
                    },
                }}
            >
                {/* <Stack display={'flex'}>
                    <Typography textAlign={'center'}>Không tìm thấy kết quả phù hợp!</Typography>
                </Stack> */}
                <Stack sx={{ justifyContent: 'space-between', mb: 2 }}>
                    <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 0 }}
                            component="nav"
                        >
                            <ListItemButton sx={{ p: '2px' }}>
                                <StarIcon
                                    sx={{
                                        fontSize: '20px',
                                        mr: 1,
                                    }}
                                />
                                <ListItemText>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: '12px', sm: '14px' },
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            color: '#10375e',
                                        }}
                                    >
                                        Favorite
                                    </Typography>
                                </ListItemText>

                                <ArrowDropDownIcon />
                            </ListItemButton>
                        </List>
                    </Stack>
                </Stack>
                {projectList.map((item: any, index) => (
                    <ProjectItem
                        key={index}
                        // listPackage={item.listPackage}
                        name={item.name}
                        idProject={item.id}
                        isAdmin={item.isAdmin}
                        handleAddpackage={(id: any) => {
                            setProjectChoose(id);
                            setOpenCreateParketDialog(true);
                        }}
                        handleAddMember={(id: any) => {
                            setOpenAddProjectDialog(true);
                            setIdProjectChoose(id);
                        }}
                        handleAddMemberPackage={(id: any, idProject: any) => {
                            setOpenAddParketDialog(true);
                            setIdParketChoose(id);
                            setIdProjectChooseAddMember(idProject);
                        }}
                        handleCreateClass={(id: any, idProject: any) => {
                            setOpenCreateClassDialog(true);
                            setIdParketChoose(id);
                            setIdProjectChooseAddMember(idProject);
                        }}
                    />
                ))}
            </Stack>
            <AddMemberDialog
                open={openDilogAddMember}
                setOpen={setOpenDilogAddMember}
                idWorkPage={selectWorkspace}
            />
            <CreateProjectDialog
                open={openCreateProjectDialog}
                setOpen={setOpenCreateProjectDialog}
                workspaceId={selectWorkspace}
            />
            <CreateParketDialog
                open={openCreateParketDialog}
                setOpen={setOpenCreateParketDialog}
                project={projectChoose}
            />
            <AddMemberProjectDialog
                open={openAddProjectDialog}
                setOpen={setOpenAddProjectDialog}
                idProject={idProjectChoose}
                workspaceId={selectWorkspace}
            />
            <AddMemberPackageDialog
                open={openAddParketDialog}
                setOpen={setOpenAddParketDialog}
                idPackage={idParketChoose}
                projectId={idProjectChooseAddMember}
            />
            <CreateClassDialog
                open={openCreateClassDialog}
                setOpen={setOpenCreateClassDialog}
                idPacket={idParketChoose}
            />
        </Stack>
    );
}
