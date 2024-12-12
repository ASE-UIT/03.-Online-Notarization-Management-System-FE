import React, { useEffect, useState } from 'react';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { black, gray, white } from '../../config/theme/themePrimitives';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import NotarizationService from '../../services/notarization.service';
import NotaryDocumentCard from '../../components/notary/NotaryDocumentCard';
import NotaryDocumentCardSkeleton from '../../components/notary/NotaryDocumentCardSkeleton';

const IconStyle = {
    fontSize: 20,
    padding: 1,
    margin: 0
};

const IconButtonStyle = {
    padding: '2px',
    margin: 0,
    color: black[900],
    bgcolor: white[50],
    '&:hover': {
        bgcolor: black[900],
        color: white[50]
    },
    border: `1px solid ${gray[200]}`,
    borderRadius: 1
};

const ProcessingNotarizationDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);

    const fetchProcessingDocuments = async (page) => {
        setLoading(true);
        const response = await NotarizationService.getNotarizationByRole({
            status: 'processing',
            page,
            limit: 5
        });
        setDocuments(response.documents);
        setLoading(false);
    };

    useEffect(() => {
        fetchProcessingDocuments(pageIndex);
    }, [pageIndex]);

    const handleNextPage = () => {
        setPageIndex((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (pageIndex > 1) {
            setPageIndex((prev) => prev - 1);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '90vh',
                padding: 4
            }}
        >
            <Paper
                sx={{
                    flex: 1,
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
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        width: '100%'
                    }}
                >
                    {loading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <NotaryDocumentCardSkeleton key={index} />
                        ))
                        : documents.map((document, index) => (
                            <NotaryDocumentCard key={index} document={document} />
                        ))}
                </Box>
            </Paper>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                    marginTop: 2
                }}
            >
                <IconButton
                    disableRipple
                    sx={IconButtonStyle}
                    onClick={handlePreviousPage}
                    disabled={pageIndex === 1}
                >
                    <ArrowBackIos sx={IconStyle} />
                </IconButton>
                <IconButton
                    disableRipple
                    sx={IconButtonStyle}
                    onClick={handleNextPage}
                >
                    <ArrowForwardIos sx={IconStyle} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ProcessingNotarizationDocuments;
