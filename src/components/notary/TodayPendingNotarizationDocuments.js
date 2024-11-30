import { Box, Typography } from '@mui/material'
import React from 'react'
import { black } from '../../config/theme/themePrimitives'
import NotaryDocumentCard from './NotaryDocumentCard';

const TodayPendingNotarizationDocuments = () => {
    const data = [
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
            status: 'digitalSignature'
        }
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%'
            }}
        >
            <Typography
                sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: black[900]
                }}
            >
                Hôm nay
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    width: '100%'
                }}
            >
                {data.map((document, index) =>
                    <NotaryDocumentCard key={index} document={document} />
                )}
            </Box>
        </Box>
    )
}

export default TodayPendingNotarizationDocuments