import { taskApi } from '@/api/task-api';
import { userApi } from '@/api/user-api';
import { BACK_END_URL } from '@/constants/global';
import { setLoading } from '@/redux/loading';
import { Divider } from '@material-ui/core';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {
    Avatar,
    Button,
    IconButton,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import { setLoading } from '@/redux/loading';
import { useRouter } from 'next/router';
=======
>>>>>>> dev

export interface IStatistic3Props {}

export default function Statistic3(props: IStatistic3Props) {
    const [filter, setFilter] = useState('1');
    const [startTempValue, setStartTempValue] = useState<Dayjs>(
        dayjs().set('hour', 0).set('minute', 0).set('second', 0)
    );
    const [endTempValue, setEndTempValue] = useState<Dayjs>(
        startTempValue.add(7, 'day').set('hour', 23).set('minute', 59).set('second', 59)
    );

    const dateOfWeek = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];
    let temp = 0;
    let pivot = -1;
    const dateRange = (
        start: Dayjs,
        end: Dayjs,
        interval: 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year',
        asUnixTimestampsMS = false
    ): Dayjs[] => {
        const diffInUnits = end.diff(start, interval);
        const current = dayjs();
        return Array.from(Array(diffInUnits + 1).keys()).map((i) => {
            const afterAdd = start.add(i, interval);
            const result = asUnixTimestampsMS ? afterAdd : afterAdd;
            if (afterAdd.isSame(current, 'day')) {
                pivot = temp;
            }
            temp = temp + 1;
            return result;
        });
    };

    let rangeArr: any[] = [];

    if (startTempValue !== undefined && endTempValue !== undefined) {
        rangeArr = dateRange(startTempValue, endTempValue, 'day');
    }
    let overLenght =
        rangeArr.length % 7 > 0 ? Math.floor(rangeArr.length / 7) * 7 + 7 - rangeArr.length : 0;

    const renderDate = (item: any, sub: boolean) => {
        if (startTempValue === undefined || endTempValue === undefined) return;
        const startAt = dayjs(item.startAt).set('hour', 0).set('minute', 0).set('second', 0);
        const endAt = dayjs(item.endAt);
        let hours = endAt.diff(startAt, 'hours');
        //hourstart>0 ngay chon nho hon ngay bat dau
        let hoursStart = startAt.diff(startTempValue, 'hours');
        let isBound = startAt.diff(endTempValue, 'hours') < 0;
        let startCell = hoursStart > 0 ? Math.round(hoursStart / 24) : 0;
        let missCell = hoursStart < 0 ? Math.round(-hoursStart / 24) : 0;
        let days =
            Math.floor((hoursStart > 0 ? hours - hoursStart : hours) / 24) - missCell + startCell;

        const between =
            days < 0 ? (missCell > 0 ? temp : 0) : isBound ? temp - days - startCell - 1 : 0;

        return (
            <Fragment>
                {[...Array(startCell < temp ? startCell : temp)].map((item: any, index) => {
                    return (
                        <TableCell
                            key={index}
                            sx={{
                                padding: '0 !important',
                                position: 'relative',
                                height: '34px',
                            }}
                        >
                            {index === pivot && pivot != -1 && (
                                <Stack
                                    sx={{
                                        width: '1px',
                                        height: '100%',
                                        position: 'absolute',
                                        top: '0',
                                        left: '36px',
                                        background: '#ff0505',
                                    }}
                                ></Stack>
                            )}
                        </TableCell>
                    );
                })}
                {isBound &&
                    [...Array(days > 0 ? days + 1 : days === 0 ? 1 : 0)].map((item: any, index) => {
                        if (index + startCell >= temp + overLenght) return <Fragment />;
                        if (index + startCell >= temp) return <Fragment />;
                        return (
                            <TableCell
                                key={index + startCell}
                                sx={{
                                    padding: '0 !important',
                                    position: 'relative',
                                    height: '34px',
                                }}
                            >
                                <Stack
                                    sx={{
                                        width: '100%',
                                        height: sub ? '20px' : '20px',
                                        background: '#328ac4',
                                    }}
                                ></Stack>
                                {index + startCell === pivot && pivot != -1 && (
                                    <Stack
                                        sx={{
                                            width: '1px',
                                            height: '100%',
                                            position: 'absolute',
                                            top: '0',
                                            left: '36px',
                                            background: '#ff0505',
                                        }}
                                    ></Stack>
                                )}
                            </TableCell>
                        );
                    })}

                {[...Array(between >= 0 ? between + overLenght : overLenght)].map(
                    (item: any, index2) => {
                        return (
                            <TableCell
                                key={index2 + startCell + days}
                                sx={{
                                    padding: '0 !important',
                                    position: 'relative',
                                    height: '34px',
                                }}
                            >
                                {index2 +
                                    startCell +
                                    (days > 0 ? days : days < 0 && hoursStart <= 0 ? -1 : 0) +
                                    1 ===
                                    pivot &&
                                    pivot != -1 && (
                                        <Stack
                                            sx={{
                                                width: '1px',
                                                height: '100%',
                                                position: 'absolute',
                                                top: '0',
                                                left: '36px',
                                                background: '#ff0505',
                                            }}
                                        ></Stack>
                                    )}
                            </TableCell>
                        );
                    }
                )}
            </Fragment>
        );
    };
    const headerRender = () => {
        if (startTempValue === undefined || endTempValue === undefined) return;
        let start: Dayjs | null = null;
        let hours = endTempValue.diff(startTempValue, 'hours');
        const days = Math.floor(hours / 24 / 7);

        return (
            <Fragment>
                {[...Array(days + 1)].map((item: any, index) => {
                    start = start === null ? startTempValue : start.add(7, 'day');
                    return (
                        <TableCell
                            key={index}
                            colSpan={7}
                            sx={{
                                textAlign: 'center',
                                borderTop: '1px solid rgba(224, 224, 224, 1)',
                            }}
                        >
                            <Typography>
                                {dateOfWeek[start.day()] + ' ' + start.format('DD-MM-YYYY')}
                            </Typography>
                        </TableCell>
                    );
                })}
            </Fragment>
        );
    };
    const [listTask, setListTask] = useState([]);
    const [hiddens, setHiddens] = useState<any>([]);
    const dispatch = useDispatch();
    const loadTask = async (start: string, end: string) => {
        dispatch(setLoading(true));
        const { data: profile } = await userApi.getProfile();
        const { data } = await taskApi.getByUser(Number(profile.id), start, end);
        setListTask(data);
        setHiddens(Array(data.length).fill(false));
        dispatch(setLoading(false));
    };
    useEffect(() => {
        loadTask(startTempValue.format('YYYY-MM-DD'), endTempValue.format('YYYY-MM-DD'));
    }, []);
    const router = useRouter();
    const fowardPage = async (item: any) => {
        const { data } = await taskApi.getIdPackage(item.id);
        const link = `/class/${data}/?task=${item.id}`;
        router.push(link);
    };
    return (
        <Stack sx={{ height: '100vh' }}>
            <Stack sx={{ height: '100%', padding: '10px 0', flexDirection: 'row' }}>
                <Stack
                    sx={{
                        height: '100%',
                        width: '350px',
                        minWidth: '350px',
                        borderRight: '1px solid #000',
                    }}
                >
                    <Stack sx={{ alignItems: 'center', padding: '0 10px' }}>
                        <Select
                            value={filter}
                            onChange={(e: any) => setFilter(e.target.value)}
                            sx={{
                                color: '#000',

                                '& .MuiSelect-outlined': {
                                    padding: '7px 0 7px !important',
                                    marginLeft: '10px',
                                },
                                width: '100%',
                            }}
                        >
                            <MenuItem value={'1'}>Tất cả</MenuItem>
                        </Select>
                        <Stack sx={{ marginTop: '10px' }}>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    height: '34px',
                                }}
                            >
                                Công việc
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    height: '34px',
                                }}
                            >
                                (Danh sách công việc)
                            </Typography>
                        </Stack>
                    </Stack>
                    {hiddens.length !== 0 && (
                        <Stack sx={{ margin: '0 0 0 10px' }}>
                            {startTempValue !== undefined && endTempValue !== undefined ? (
                                listTask.map((item: any, index) => (
                                    <Fragment key={index}>
                                        <Stack
                                            onClick={() => {
                                                fowardPage(item.taskEntity);
                                            }}
                                            sx={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                minHeight: '34px',
                                                cursor: 'pointer',
                                                maxHeight: '34px',
                                            }}
                                        >
                                            <Stack
                                                sx={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {item.taskEntity.userAssign !== undefined && (
                                                    <Avatar
                                                        sx={{
                                                            width: '28px',
                                                            height: '28px',
                                                            border: 'none !important',
                                                        }}
                                                        key={index}
                                                        src={
                                                            item.taskEntity.userAssign.avatar !==
                                                            undefined
                                                                ? `${BACK_END_URL}${item.taskEntity.userAssign.avatar}`
                                                                : ''
                                                        }
                                                    />
                                                )}

                                                <Typography
                                                    sx={{
                                                        fontSize: '1em',
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    {item.taskEntity.name}
                                                </Typography>
                                            </Stack>
                                            {item.listSubTask.length > 0 && (
                                                <IconButton
                                                    onClick={() => {
                                                        let newArr = [...hiddens];
                                                        newArr[index] = !hiddens[index];

                                                        setHiddens(newArr);
                                                    }}
                                                >
                                                    <ArrowDropDownIcon sx={{ cursor: 'pointer' }} />
                                                </IconButton>
                                            )}
                                        </Stack>
                                        <Divider />
                                        {item.listSubTask.map((sub: any, index2: any) => (
                                            <Stack
<<<<<<< HEAD
                                                sx={{
                                                    display: hiddens[index] ? 'none' : 'flex',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    fowardPage(item.taskEntity);
                                                }}
=======
                                                key={index2}
                                                sx={{ display: hiddens[index] ? 'none' : 'flex' }}
>>>>>>> dev
                                            >
                                                <Stack
                                                    sx={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        paddingLeft: '30px !important',
                                                        minHeight: '34px',
                                                        maxHeight: '34px',
                                                    }}
                                                >
                                                    <Stack
                                                        sx={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        {sub.userAssign !== undefined && (
                                                            <Avatar
                                                                sx={{
                                                                    width: '28px',
                                                                    height: '28px',
                                                                    border: 'none !important',
                                                                }}
                                                                key={index}
                                                                src={
                                                                    sub.userAssign.avatar !==
                                                                    undefined
                                                                        ? `${BACK_END_URL}${sub.userAssign.avatar}`
                                                                        : ''
                                                                }
                                                            />
                                                        )}
                                                        <Typography
                                                            sx={{
                                                                fontSize: '1em',
                                                                marginLeft: '5px',
                                                            }}
                                                        >
                                                            {sub.name}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                                <Divider />
                                            </Stack>
                                        ))}
                                    </Fragment>
                                ))
                            ) : (
                                <Fragment />
                            )}
                        </Stack>
                    )}
                </Stack>
                <Stack
                    sx={{
                        margin: '0 10px 0 0',
                        '&::-webkit-scrollbar': { height: '15px', width: 'unset' },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#b8b8b8',
                        },

                        width: 'calc(100vw - 400px)',
                        overflow: 'auto',
                        flexGrow: '1',
                    }}
                >
                    <Stack sx={{ flexDirection: 'row', alignItems: 'center', marginLeft: '10px' }}>
                        <DatePicker
                            format="HH:mm DD/MM/YYYY"
                            value={startTempValue}
                            onChange={(newValue: any) => {
                                if (endTempValue.isBefore(dayjs(newValue))) {
                                    setEndTempValue(dayjs(newValue).add(7, 'day'));
                                    setStartTempValue(newValue);
                                    loadTask(
                                        newValue.format('YYYY-MM-DD'),
                                        dayjs(newValue).add(7, 'day').format('YYYY-MM-DD')
                                    );
                                    return;
                                }

                                setStartTempValue(newValue);
                                loadTask(
                                    newValue.format('YYYY-MM-DD'),
                                    endTempValue.format('YYYY-MM-DD')
                                );
                            }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    padding: '8px 0 8px !important',
                                    marginLeft: '10px',
                                },
                                maxWidth: '200px',
                                '& input': {
                                    fontSize: '0.9em',
                                },
                                '& button': {
                                    padding: '0',
                                },
                            }}
                        />
                        <KeyboardDoubleArrowRightIcon sx={{ color: '#8f8f8f' }} />
                        <DatePicker
                            format="HH:mm DD/MM/YYYY"
                            disabled={startTempValue === undefined}
                            value={endTempValue}
                            minDate={startTempValue}
                            onChange={(newValue: any) => {
                                newValue.$m = '59';
                                newValue.$H = '23';
                                setEndTempValue(newValue);
                                loadTask(
                                    startTempValue.format('YYYY-MM-DD'),
                                    newValue.format('YYYY-MM-DD')
                                );
                            }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    padding: '8px 0 8px !important',
                                    marginLeft: '10px',
                                },
                                maxWidth: '200px',
                                '& input': {
                                    fontSize: '0.9em',
                                },
                                '& button': {
                                    padding: '0',
                                },
                            }}
                        />
                        <Button
                            sx={{
                                border: '1px #8f8f8f solid',
                                textTransform: 'none',
                                fontSize: '0.85',
                                padding: '0 20px !important',
                                color: '#000',
                                fontWeight: '400',
                                marginLeft: '10px',
                            }}
                        >
                            Hôm nay
                        </Button>
                    </Stack>
                    {hiddens.length !== 0 && (
                        <Stack sx={{ marginTop: '10px' }}>
                            <Table
                                sx={{
                                    '& .MuiTableCell-root': {
                                        borderRight: '1px solid rgba(224, 224, 224, 1)',
                                        padding: '4px 16px',
                                        borderLeft: '1px solid rgba(224, 224, 224, 1)',
                                    },
                                    '& th': {
                                        height: '34px',
                                    },
                                    width:
                                        startTempValue === undefined || endTempValue === undefined
                                            ? '240px'
                                            : '100%',
                                }}
                            >
                                <TableHead>
                                    <TableRow>{headerRender()}</TableRow>
                                    <TableRow>
                                        {startTempValue !== undefined &&
                                        endTempValue !== undefined ? (
                                            <Fragment>
                                                {rangeArr.map((day: any, index: any) => (
<<<<<<< HEAD
                                                    <TableCell key={index} sx={{ width: '150px' }}>
=======
                                                    <TableCell sx={{ width: '150px' }} key={index}>
>>>>>>> dev
                                                        <Typography>
                                                            {day.format('DD/MM')}
                                                        </Typography>
                                                    </TableCell>
                                                ))}

                                                {rangeArr.length % 7 > 0 &&
                                                    [...Array(overLenght)].map(
                                                        (item: any, index) => {
                                                            return (
                                                                <TableCell
                                                                    key={index}
                                                                    sx={{ width: '150px' }}
                                                                />
                                                            );
                                                        }
                                                    )}
                                            </Fragment>
                                        ) : (
                                            <Fragment />
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {startTempValue !== undefined && endTempValue !== undefined ? (
                                        listTask.map((item: any, index) => (
                                            <Fragment key={index}>
                                                <TableRow sx={{}}>
                                                    {renderDate(item.taskEntity, false)}
                                                </TableRow>

                                                {!hiddens[index] &&
                                                    item.listSubTask.map(
                                                        (sub: any, index2: any) => {
                                                            return (
                                                                <TableRow key={index2}>
                                                                    {renderDate(sub, false)}
                                                                </TableRow>
                                                            );
                                                        }
                                                    )}
                                            </Fragment>
                                        ))
                                    ) : (
                                        <Fragment />
                                    )}
                                </TableBody>
                            </Table>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
}
