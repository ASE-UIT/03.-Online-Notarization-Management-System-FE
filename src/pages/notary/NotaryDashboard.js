import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { black, gray } from '../../config/theme/themePrimitives'
import NotarizationCard from '../../components/notary/NotarizationCard'
import NotarizationService from '../../services/notarization.service'
import NotarizationCardSkeleton from '../../components/notary/NotarizationCardSkeleton'

const NotaryDashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotarizations = async () => {
            try {
                const response = await NotarizationService.getNotarizationByRole();
                setDocuments(response || []);
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
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent="center"
            alignItems="flex-start"
            padding={2}
            gap={2}
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                width={{ xs: '100%', md: '95%' }}
                border={{ xs: 0, md: `1px solid ${gray[200]}` }}
                paddingY={2}
                borderRadius={1}
            >
                <Typography sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 600, width: '100%', marginLeft: { xs: 2, md: 8 }, color: black[900] }}>Danh sách chờ phê duyệt</Typography>
                <Typography sx={{ fontSize: { xs: 10, md: 12 }, fontWeight: 400, width: '100%', marginLeft: { xs: 2, md: 8 }, color: gray[400] }}>Các yêu cầu chờ phê duyệt sẽ hiển thị ở đây</Typography>

                <Typography sx={{ fontSize: { xs: 12, md: 14 }, fontWeight: 600, width: '100%', marginLeft: { xs: 2, md: 8 }, marginY: 4, color: black[900] }}>Hôm nay</Typography>
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
                        documents.map((document, index) =>
                            <NotarizationCard key={index} document={document} />
                        )
                    )}
                </Box>

                <Typography sx={{ fontSize: { xs: 12, md: 14 }, fontWeight: 600, width: '100%', marginLeft: { xs: 2, md: 8 }, marginY: 4, color: black[900] }}>Trong tuần</Typography>
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
                        documents.map((document, index) =>
                            <NotarizationCard key={index} document={document} />
                        )
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default NotaryDashboard
