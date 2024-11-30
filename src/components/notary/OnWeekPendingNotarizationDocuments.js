import React from 'react'
import { black } from '../../config/theme/themePrimitives'
import { Box, Typography } from '@mui/material';
import NotaryDocumentCard from './NotaryDocumentCard';

const OnWeekPendingNotarizationDocuments = ({ documents }) => {
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
                Trong tuần
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    width: '100%'
                }}
            >
                {documents.map((document, index) =>
                    <NotaryDocumentCard key={index} document={document} />
                )}
            </Box>
        </Box>
    )
}

export default OnWeekPendingNotarizationDocuments