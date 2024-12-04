import { Box, Typography, Skeleton } from '@mui/material';
import React from 'react';
import { black } from '../../config/theme/themePrimitives';
import NotaryDocumentCard from './NotaryDocumentCard';

const OnWeekNotarizationDocuments = ({ documents, isLoading }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
            }}
        >
            <Typography
                sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: black[900],
                }}
            >
                Trong tuần
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    width: '100%',
                }}
            >
                {isLoading
                    ? Array.from({ length: 2 }).map((_, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                            <Skeleton
                                variant="rectangular"
                                width={60}
                                height={60}
                                sx={{ borderRadius: 1 }}
                            />
                            <Box sx={{ flex: 1 }}>
                                <Skeleton width="100%" height={20} />
                                <Skeleton width="40%" height={20} />
                            </Box>
                        </Box>
                    ))
                    : documents.map((document, index) => (
                        <NotaryDocumentCard key={index} document={document} />
                    ))}
            </Box>
        </Box>
    );
};

export default OnWeekNotarizationDocuments;
