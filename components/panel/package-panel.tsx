import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { Fragment, useState } from 'react';

export interface IPackagePanelProps {
    setListPackage: Function;
    listPackage: Array<any>;
}

export default function PackagePanel(props: IPackagePanelProps) {
    const [packageName, setPackageName] = useState('');
    const [packageDescription, setPackageDes] = useState('');
    const handleAdd = async () => {
        if (packageName == '') return;
        await props.setListPackage([
            ...props.listPackage,
            {
                name: packageName,
                description: packageDescription,
            },
        ]);
        setPackageName('');
        setPackageDes('');
    };
    const handleRemove = (index: number) => {
        const copy = [...props.listPackage];
        copy.splice(index, 1);
        props.setListPackage(copy);
    };
    return (
        <Stack
            sx={{
                '& input': {
                    color: '#fff',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#696969 !important',
                        borderWidth: '1px !important',
                    },
                },
                '& .Mui-focused': {
                    color: '#fff',

                    '& fieldset': {
                        borderColor: '#c4c4c4 !important',
                        borderWidth: '1px !important',
                    },
                },

                '& label': {
                    color: '#8b8b8b',
                    marginBottom: '5px',
                },
                '& .MuiOutlinedInput-root:hover': {
                    '& fieldset': {
                        borderColor: '#c4c4c4 !important',
                        borderWidth: '1px',
                    },
                },
                height: '100%',
            }}
        >
            <Stack
                sx={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: '24px',
                }}
            >
                <Typography>Danh sách kế hoạch</Typography>
            </Stack>
            <Stack
                sx={{
                    background: 'rgb(33, 43, 54)',
                    padding: '0 16px 16px 16px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    height: '290px',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': { width: '15px' },
                    '&::-webkit-scrollbar-track': {
                        border: '1px solid #ddd',
                        borderRadius: '100vw',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: '15px',
                        background: 'linear-gradient(45deg,white,#c6c0b6)',
                    },
                    '& hr': {
                        borderColor: '#696969',
                    },
                }}
            >
                <Stack sx={{ height: '100%' }}>
                    {props.listPackage.map((item: any, index: number) => (
                        <Fragment key={index}>
                            <Stack
                                sx={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography>{item.name}</Typography>
                                <Button
                                    onClick={() => handleRemove(index)}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '1em',
                                        fontWeight: '600',
                                        color: '#e73c5d',
                                        '&:hover': {
                                            background: '#f1505033',
                                        },
                                    }}
                                >
                                    Xóa
                                </Button>
                            </Stack>
                            <Divider />
                        </Fragment>
                    ))}
                </Stack>
            </Stack>
            <Stack
                sx={{
                    background: 'rgb(33, 43, 54)',
                    padding: '16px',
                    borderRadius: '8px',
                    flexGrow: '1',
                }}
            >
                <Stack>
                    <Box
                        component="label"
                        sx={{
                            alignSelf: 'flex-start',
                            color: 'rgba(0, 0, 0, 0.6)',
                        }}
                    >
                        Tên kế hoạch
                    </Box>
                    <TextField
                        onChange={(e) => setPackageName(e.target.value)}
                        value={packageName}
                        fullWidth
                        sx={{
                            '&>div:first-of-type:hover': {
                                border: '1px #c4c4c4 solid',
                            },
                            '& input': {
                                padding: '10px 14px !important',
                            },
                        }}
                    />
                </Stack>
                <Stack sx={{ marginTop: '10px' }}>
                    <Box
                        component="label"
                        sx={{
                            alignSelf: 'flex-start',
                            color: 'rgba(0, 0, 0, 0.6)',
                        }}
                    >
                        Mô tả
                    </Box>
                    <TextField
                        onChange={(e) => setPackageDes(e.target.value)}
                        value={packageDescription}
                        sx={{
                            padding: '3px',
                            color: '#fff',
                            borderRadius: '5px',
                            marginBottom: '16px',
                            '& .Mui-focused': {
                                '& fieldset': {
                                    borderColor: '#c4c4c4 !important',
                                    borderWidth: '1px !important',
                                },
                            },
                            '& textarea': {
                                color: '#fff',
                            },
                            '& .MuiOutlinedInput-root:hover': {
                                '& fieldset': {
                                    borderColor: '#c4c4c4 !important',
                                    borderWidth: '1px',
                                },
                            },
                        }}
                        multiline
                        rows={2}
                    />
                </Stack>
                <Button
                    onClick={handleAdd}
                    sx={{
                        alignSelf: 'flex-end',
                        background: 'rgb(0, 171, 85)',
                        padding: '8px 20px',
                        borderRadius: '8px',
                        textTransform: 'none',
                        color: '#fff',
                        fontSize: '0.8rem',
                        maxWidth: '360px',
                        fontWeight: '600',
                        textAlign: 'center',
                        marginRight: '20px',
                        '&:hover': {
                            background: 'rgb(0, 123, 85)',
                        },
                    }}
                >
                    Thêm
                </Button>
            </Stack>
        </Stack>
    );
}
