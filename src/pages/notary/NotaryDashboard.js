import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { black, gray } from '../../config/theme/themePrimitives'
import NotarizationService from '../../services/notarization.service'
import NotarizationCard from '../../components/notary/NotarizationCard'
import NotarizationCardSkeleton from '../../components/notary/NotarizationCardSkeleton'

const NotaryDashboard = () => {
    const [todayDocuments, setTodayDocuments] = useState([]);
    const [weekDocuments, setWeekDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const filterTodayDocuments = (documents) => {
        const todayString = new Date().toDateString();
        return documents.filter(document => {
            const documentDateString = new Date(document.createdAt).toDateString();
            return documentDateString === todayString;
        });
    }

    const filterWeekDocuments = (documents) => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - 6);

        return documents.filter(document => {
            const documentDate = new Date(document.createdAt);
            return documentDate >= startOfWeek && documentDate <= today;
        });
    };

    useEffect(() => {
        const fetchNotarizations = async () => {
            try {
                const response = await NotarizationService.getNotarizationByRole();
                const docs = Array.isArray(response) ? response : [];
                setTodayDocuments(filterTodayDocuments(docs));
                setWeekDocuments(filterWeekDocuments(docs));
            } catch (error) {
                console.error("Error fetching notarizations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotarizations();
    }, []);


    return (
        <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
            sx={{ overflowX: 'hidden', width: '100%' }}
            paddingY={4}
        >
            <Typography sx={{ fontSize: 32, fontWeight: 600, width: '100%', marginLeft: 8, color: black[900] }}>Danh sách chờ phê duyệt</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 400, width: '100%', marginLeft: 8, color: gray[400] }}>Các yêu cầu chờ phê duyệt sẽ hiển thị ở đây</Typography>

            <Typography sx={{ fontSize: 18, fontWeight: 600, width: '100%', marginLeft: 8, marginY: 4, color: black[900] }}>Hôm nay</Typography>
            {/* Card */}
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
                gap={2}
            >
                {isLoading ? (
                    <NotarizationCardSkeleton />
                ) : (
                    todayDocuments.map((document, index) =>
                        <NotarizationCard key={index} document={document} />
                    )
                )}
            </Box>

            <Typography sx={{ fontSize: 18, fontWeight: 600, width: '100%', marginLeft: 8, marginY: 4, color: black[900] }}>Trong tuần</Typography>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
                gap={2}
            >
                {isLoading ? (
                    <NotarizationCardSkeleton />
                ) : (
                    weekDocuments.map((document, index) =>
                        <NotarizationCard key={index} document={document} />
                    )
                )}
            </Box>
        </Box>
    )
}

export default NotaryDashboard