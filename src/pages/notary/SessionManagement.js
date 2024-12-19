import { FilterList } from '@mui/icons-material'
import { Box, IconButton, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Pagination, Card, CardContent, Skeleton } from '@mui/material'
import { gray, white, black } from '../../config/theme/themePrimitives'
import React, { useEffect, useState } from 'react'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import SessionService from '../../services/session.service'
import NotarySessionCard from '../../components/notary/NotarySessionCard'

const SessionManagement = () => {
    const [sessions, setSessions] = useState([]);
    const [pagination, setPagination] = useState({});
    const [status, setStatus] = useState('processing');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true);
                const response = await SessionService.getSessionsByStatus({ status, page, limit: 6 });
                if (response.status === 200) {
                    setSessions(response.data.sessions);
                    setPagination(response.data.pagination);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSessions();
    }, [status, page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    return (
        <Box sx={{ padding: { xs: 2, sm: 4 } }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 4,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                    }}
                >
                    Quản lý phiên công chứng
                </Typography>

                <IconButton
                    size="small"
                    sx={{
                        bgcolor: white[50],
                        border: `1px solid ${gray[400]}`,
                        color: gray[400],
                        '&:hover': {
                            bgcolor: gray[400],
                            color: white[50],
                        },
                    }}
                >
                    <FilterList />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Tìm kiếm yêu cầu công chứng"
                    sx={{
                        flex: 1,
                        minWidth: { xs: 100, sm: 200 },
                        '& .MuiOutlinedInput-root': {
                            fontSize: 14,
                            padding: '0px 8px',
                            borderRadius: 1,
                            '& fieldset': {
                                borderColor: black[100],
                            },
                            '&:hover fieldset': {
                                borderColor: black[200],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: black[900],
                                borderWidth: 1,
                            },
                            '&:active fieldset': {
                                borderColor: black[900],
                            },
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: gray[500],
                            fontSize: 14,
                        },
                    }}
                />
                <FormControl
                    fullWidth
                    variant="outlined"
                    sx={{
                        width: 200,
                        '& .MuiOutlinedInput-root': {
                            fontSize: 14,
                            borderRadius: 1,
                            '& fieldset': {
                                borderColor: black[100],
                            },
                            '&:hover fieldset': {
                                borderColor: black[200],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: black[900],
                                borderWidth: 1,
                            },
                            '&:active fieldset': {
                                borderColor: black[900],
                            },
                        },
                        '& .MuiSelect-select': {
                            fontSize: 14,
                        },
                        '& .MuiInputLabel-root': {
                            color: gray[400],
                            fontSize: 14,
                        },
                    }}
                >
                    <InputLabel>Chọn trạng thái</InputLabel>
                    <Select
                        label="Chọn trạng thái"
                        IconComponent={ArrowDropDownIcon}
                        value={status}
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="processing">Chờ xác nhận</MenuItem>
                        <MenuItem value="readyToSign">Sẵn sàng ký số</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                    marginTop: 4,
                    justifyContent: 'center',
                }}
            >
                {loading ?
                    Array.from({ length: 4 }).map((_, index) => (
                        <Box key={index} sx={{ flex: 1, minWidth: { xs: 100, sm: 300 }, minHeight: 180, mb: 2 }}>
                            <Card
                                variant="outlined"
                                sx={{
                                    borderRadius: 1,
                                    bgcolor: white[50],
                                    border: `1px solid ${gray[300]}`,
                                    height: '100%',
                                }}
                            >
                                <CardContent>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="flex-start"
                                        gap={2}
                                        sx={{ marginBottom: 2 }}
                                    >
                                        <Skeleton variant="text" width="60%" height={20} />
                                        <Skeleton variant="rectangular" width={80} height={30} />
                                    </Box>
                                    <Skeleton variant="text" width="80%" height={20} sx={{ marginBottom: 1 }} />
                                    <Skeleton variant="text" width="70%" height={20} />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: 2,
                                            marginTop: 2,
                                        }}
                                    >
                                        <Skeleton variant="text" width="40%" height={20} />
                                        <Skeleton variant="text" width="50%" height={20} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    ))
                    :
                    sessions.map((session, index) => (<NotarySessionCard key={index} session={session} />))}
            </Box>

            <Box
                position={'absolute'}
                bottom={20}
                left={'90%'}
            >
                <Pagination count={pagination?.totalPages !== 0 ? pagination?.totalPages : 1} page={page} onChange={handlePageChange} color="primary" shape="rounded" />
            </Box>
        </Box>
    )
}

export default SessionManagement