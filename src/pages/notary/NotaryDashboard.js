import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { black, blue, gray, green } from '../../config/theme/themePrimitives'
import { Check, HourglassEmpty } from '@mui/icons-material'
import NotarizationCard from '../../components/notary/NotarizationCard'
import AnalysisCard from '../../components/notary/AnalysisCard'
import AnalysisCardSkeleton from '../../components/notary/AnalysisCardSkeleton'
import NotarizationService from '../../services/notarization.service'
import NotarizationCardSkeleton from '../../components/notary/NotarizationCardSkeleton'

const NotaryDashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotarizations = async () => {
            try {
                const response = await NotarizationService.getNotarizationByRole();
                setDocuments(Array.isArray(response) ? response : []);
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
            flexDirection={'row'}
            justifyContent="center"
            alignItems="flex-start"
            padding={2}
            gap={2}
        >
            <Box display="flex" flexDirection={'column'} width={'30%'} gap={2}>
                {isLoading ? (
                    <>
                        <AnalysisCardSkeleton />
                        <AnalysisCardSkeleton />
                    </>
                ) : (
                    <>
                        <AnalysisCard
                            icon={<Check />}
                            title="Đã hoàn tất"
                            mainText="600"
                            deltaText="+5"
                            deltaDescription="so với hôm qua"
                            iconBgColor={green[50]}
                            iconColor={green[500]}
                            deltaColor={green[500]}
                        />
                        <AnalysisCard
                            icon={<HourglassEmpty />}
                            title="Chờ phê duyệt"
                            mainText="100"
                            deltaText="+10"
                            deltaDescription="so với hôm qua"
                            iconBgColor={blue[50]}
                            iconColor={blue[500]}
                            deltaColor={green[500]}
                        />
                    </>
                )}
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                width={'70%'}
                border={'2px solid ' + gray[200]}
                paddingY={2}
                borderRadius={1}
            >
                <Typography sx={{ fontSize: 24, fontWeight: 600, width: '100%', marginLeft: 8, color: black[900] }}>Danh sách chờ phê duyệt</Typography>
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
                        documents.map((document, index) =>
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
