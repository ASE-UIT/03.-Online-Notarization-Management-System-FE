import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { black, gray, white } from '../../config/theme/themePrimitives'
import TodayPendingNotarizationDocuments from '../../components/notary/TodayPendingNotarizationDocuments'
import OnWeekPendingNotarizationDocuments from '../../components/notary/OnWeekPendingNotarizationDocuments'

const PendingNotarizationDocuments = () => {
    const documents = [
        {
            id: 1,
            username: 'Nguyễn Văn A',
            timeRanges: '13:00 - 14:00',
            date: '2021-10-15',
            note: 'Chưa có thông báo',
            status: 'pending'
        },
        {
            id: 2,
            username: 'Nguyễn Văn B',
            timeRanges: '13:00 - 14:00',
            date: '2021-10-15',
            note: 'Chưa có thông báo',
            status: 'pending'
        },
        {
            id: 3,
            username: 'Nguyễn Văn C',
            timeRanges: '13:00 - 14:00',
            date: '2021-10-15',
            note: 'Chưa có thông báo',
            status: 'pending'
        }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4, gap: 3 }}>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    overflow: 'hidden',
                    border: `1px solid ${gray[200]}`,
                    padding: 2,
                    gap: 2,
                    borderRadius: 1,
                    boxShadow: '0px 2px 4px -2px rgba(19, 25, 39, 0.12), 0px 4px 4px -2px rgba(19, 25, 39, 0.08)',
                    bgcolor: white[50]
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 1
                    }}
                >
                    <Typography
                        sx={{
                            color: black[900],
                            fontSize: 16,
                            fontWeight: 600,
                            textTransform: 'capitalize'
                        }}
                    >
                        Danh sách chờ phê duyệt
                    </Typography>

                    <Typography
                        sx={{
                            color: black[300],
                            fontSize: 14,
                            fontWeight: 500,
                        }}
                    >
                        Các yêu cầu chờ phê duyệt sẽ hiển thị ở đây
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '100%'
                    }}
                >
                    <TodayPendingNotarizationDocuments documents={documents} />
                    <OnWeekPendingNotarizationDocuments documents={documents} />
                </Box>
            </Paper>
        </Box>
    )
}

export default PendingNotarizationDocuments