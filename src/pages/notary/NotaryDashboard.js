import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { black, blue, gray, green } from '../../config/theme/themePrimitives'
import { Check, HourglassEmpty } from '@mui/icons-material'
import NotarizationCard from '../../components/notary/NotarizationCard'
import AnalysisCard from '../../components/notary/AnalysisCard'
import NotarizationService from '../../services/notarization.service'
import UserService from '../../services/user.service'

const NotaryDashboard = () => {
    const [documents, setDocuments] = useState([]);

    const notatizations = [
        {
            id: 1,
            name: 'Phuc Truong Le Vinh',
            date: '8/10/2024',
            time: '09:00 - 09:30',
            note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nullam nec nunc nec nunc.',
        },
        {
            id: 2,
            name: 'Phuc Truong Le Vinh',
            date: '8/10/2024',
            time: '09:00 - 09:30',
            note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nullam nec nunc nec nunc.',
        },
        {
            id: 3,
            name: 'Phuc Truong Le Vinh',
            date: '8/10/2024',
            time: '09:00 - 09:30',
            note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nullam nec nunc nec nunc.',
        },
        {
            id: 4,
            name: 'Phuc Truong Le Vinh',
            date: '8/10/2024',
            time: '09:00 - 09:30',
            note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nullam nec nunc nec nunc.',
        },
        {
            id: 5,
            name: 'Phuc Truong Le Vinh',
            date: '8/10/2024',
            time: '09:00 - 09:30',
            note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nullam nec nunc nec nunc.',
        },
    ];

    useEffect(() => {
        const fetchNotarizations = async () => {
            try {
                const response = await NotarizationService.getNotarizationByRole();
                // const enrichedDocuments = await Promise.all(
                //     response.map(async (doc) => {
                //         const user = await UserService.getUserById(doc.userId);
                //         return { ...doc, user };
                //     })
                // );
                setDocuments(response);
            } catch (error) {
                console.error("Error fetching notarizations:", error);
            }
        };

        fetchNotarizations();
    }, []);

    console.log('documents', documents);

    return (
        <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            padding={2}
            gap={2}
        >
            <Box display="flex" flexDirection="column" width={'30%'} gap={2}>
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
                    {notatizations.map((notarization) =>
                        <NotarizationCard key={notarization.id} notarization={notarization} />
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
                    {notatizations.map((notarization) =>
                        <NotarizationCard key={notarization.id} notarization={notarization} />
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default NotaryDashboard