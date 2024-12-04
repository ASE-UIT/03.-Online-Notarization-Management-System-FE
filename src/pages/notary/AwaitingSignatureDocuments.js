import { Box, Paper, Skeleton, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { black, gray, white } from '../../config/theme/themePrimitives'
import TodayNotarizationDocuments from '../../components/notary/TodayNotarizationDocuments'
import OnWeekNotarizationDocuments from '../../components/notary/OnWeekNotarizationDocuments'
import NotarizationService from '../../services/notarization.service'

const AwaitingSignatureDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [todayDocuments, setTodayDocuments] = useState([]);
    const [onWeekDocuments, setOnWeekDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProcessingDocuments = async () => {
            setLoading(true);
            const response = await NotarizationService.getNotarizationByRole(
                {
                    status: 'readyToSign',
                    page: 1,
                    limit: 10
                }
            );
            setDocuments(response.documents);
            setLoading(false);
        }

        fetchProcessingDocuments();
    }, []);

    useEffect(() => {
        const today = new Date().getDate();
        const onWeek = new Date().getDate() + 7;

        const todayDocuments = documents.filter(document => {
            const date = new Date(document?.documentId?.createdAt).getDate();
            return date === today;
        });

        const onWeekDocuments = documents.filter(document => {
            const date = new Date(document?.documentId?.createdAt).getDate();
            return date > today && date <= onWeek;
        });

        setTodayDocuments(todayDocuments);
        setOnWeekDocuments(onWeekDocuments);
    }, [documents]);

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
                        Danh sách chờ Ký số
                    </Typography>

                    <Typography
                        sx={{
                            color: black[300],
                            fontSize: 14,
                            fontWeight: 500,
                        }}
                    >
                        Các yêu cầu chờ ký số sẽ hiển thị ở đây
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
                    <TodayNotarizationDocuments documents={todayDocuments} isLoading={loading} />
                    <OnWeekNotarizationDocuments documents={onWeekDocuments} isLoading={loading} />
                </Box>
            </Paper>
        </Box>
    )
}

export default AwaitingSignatureDocuments