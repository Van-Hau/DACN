import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Stack, Typography, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import { RootStateOrAny, useSelector } from 'react-redux';

export interface ProjectItemProps {}

export default function ProjectItem(props: ProjectItemProps) {
    return (
        <Stack
            direction="row"
            sx={{
                p: '2px 5px 2px 5px',
                cursor: 'pointer',
                ':hover': {
                    bgcolor: '#00000010',
                    '& .show-icon-setting-child': {
                        opacity: 1,
                    },
                    borderRadius: '4px',
                },
                '&.Mui-selected': {
                    bgcolor: '#428bca40',
                },

                '&:hover': {
                    backgroundColor: '#EEEEEE',
                    color: 'black',
                },
                background: 'linear-gradient(to left, #9cecfb, #65c7f7, #0052d4)',
                // : '#fff',
                borderRadius: '4px',
            }}
            alignItems={'center'}
            justifyItems={'center'}
        >
            <Stack
                sx={{
                    width: '100%',
                    flexDirection: 'row',
                    ml: 1,
                }}
            >
                <StarIcon
                    sx={{
                        fontSize: '20px',
                        mr: 1,
                        color: '#ffcd40',
                        zIndex: 1,
                    }}
                />

                {/* <StarBorderOutlinedIcon
                        sx={{
                            fontSize: '20px',
                            mr: 1,
                            zIndex: 1,
                        }}
                        onClick={() => handleSetFavorite(!project.IsFavorite)}
                    /> */}

                <Typography
                    sx={{
                        fontSize: '15px',
                        color: '#fff',
                        //  '#0f2244',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        ' -webkit-line-clamp': 1,
                        WebkitBoxOrient: 'vertical',
                        width: '100%',
                        fontWeight: 600,
                        // : 400,
                    }}
                >
                    Project Name
                </Typography>
            </Stack>
            <Stack spacing={'2px'} sx={{ ml: 'auto', alignItems: 'center' }} direction={'row'}>
                <SettingsIcon
                    className="show-icon-setting-child"
                    sx={{
                        color: 'silver',
                        fontSize: '16px',
                        opacity: 0,
                        ':hover': { color: '#428bca' },
                    }}
                />

                <Tooltip title="Công việc chưa xem" placement="right">
                    <Stack
                        sx={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '3px',
                            backgroundColor: 'transparent',
                            border: '1px solid #56595D80',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // opacity: 0,
                            ml: '5px',
                        }}
                        // className="show-icon-setting-child"
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                color: '#56595D80',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                ' -webkit-line-clamp': 1,
                                WebkitBoxOrient: 'vertical',
                                fontWeight: 600,
                            }}
                        >
                            99+
                        </Typography>
                    </Stack>
                </Tooltip>
            </Stack>
            {/* <PopoverSettingProject
                project={props.project}
                idProject={idProject}
                openProject={openProject}
                anchorElProject={anchorElProject}
                handleCloseProject={handleCloseProject}
                menu={props.menu}
                userCreateProject={project.UserCreate}
            /> */}
        </Stack>
    );
}
