import React, { useState, useEffect } from 'react';
import { Box, Card, CardActionArea, CardContent, Divider, Typography } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AvatarIcon from '../static/AvatarIcon';
import { black, green, red, yellow, blue } from '../../config/theme/themePrimitives';
import DetailProcessingSessionModal from './DetailProcessingSessionModal';
import DetailReadyToSignSessionModal from './DetailReadyToSignSessionModal';

const NotarySessionCard = ({ session }) => {
    const [remainingTimeColor, setRemainingTimeColor] = useState({
        color: black[500],
        backgroundColor: black[50],
    });
    const [timeRemaining, setTimeRemaining] = useState('');
    const [openProcessingModal, setOpenProcessingModal] = useState(false);
    const [openReadyToSignModal, setOpenReadyToSignModal] = useState(false);

    const setStyleBaseOnStatus = (status) => {
        switch (status) {
            case 'processing':
                return { color: yellow[500], backgroundColor: yellow[50] };
            case 'digitalSignature':
                return { color: blue[500], backgroundColor: blue[50] };
            case 'readyToSign':
                return { color: blue[500], backgroundColor: blue[50] };
            case 'completed':
                return { color: green[500], backgroundColor: green[50] };
            case 'rejected':
                return { color: red[500], backgroundColor: red[50] };
            default:
                return { color: black[500], backgroundColor: black[50] };
        }
    };

    const setTextBaseOnStatus = (status) => {
        switch (status) {
            case 'processing':
                return 'Đang xử lý';
            case 'digitalSignature':
                return 'Sẵn sàng ký số';
            case 'readyToSign':
                return 'Sẵn sàng ký số';
            case 'completed':
                return 'Hoàn thành';
            case 'rejected':
                return 'Không hợp lệ';
            default:
                return 'Không xác định';
        }
    };

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const endDate = new Date(session.sessionId.endDate);
            const now = new Date();
            const durationRemaining = endDate - now;

            if (durationRemaining > 0) {
                const totalSecondsRemaining = Math.floor(durationRemaining / 1000);
                const daysRemaining = Math.floor(totalSecondsRemaining / (60 * 60 * 24));
                const hoursRemaining = Math.floor((totalSecondsRemaining % (60 * 60 * 24)) / (60 * 60));
                const minutesRemaining = Math.floor((totalSecondsRemaining % (60 * 60)) / 60);

                const timeStrings = [];
                if (daysRemaining > 0) {
                    timeStrings.push(`${daysRemaining} ngày ${hoursRemaining} giờ`);
                } else {
                    if (hoursRemaining > 0) {
                        timeStrings.push(`${hoursRemaining} giờ ${minutesRemaining} phút`);
                    } else {
                        timeStrings.push(`${minutesRemaining} phút`);
                    }
                }

                if (daysRemaining >= 5) {
                    setRemainingTimeColor({ color: green[500], backgroundColor: green[50] });
                } else if (daysRemaining >= 2) {
                    setRemainingTimeColor({ color: yellow[500], backgroundColor: yellow[50] });
                } else {
                    setRemainingTimeColor({ color: red[500], backgroundColor: red[50] });
                }

                setTimeRemaining('Còn ' + timeStrings.join(' '));
            } else {
                setRemainingTimeColor({ color: black[500], backgroundColor: black[50] });
                setTimeRemaining('Đã kết thúc');
            }
        };

        calculateTimeRemaining();
    }, [session]);

    return (
        <>
            <Card
                sx={{
                    flexBasis: {
                        xs: '100%',
                        sm: 'calc(70% - 24px)',
                        md: 'calc(50% - 24px)',
                    },
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardActionArea
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexGrow: 1,
                        p: 2,
                        backgroundColor: 'white',
                        boxShadow: '0px 4px 4px -2px rgba(19, 25, 39, 0.08)',
                        borderRadius: 1,
                        border: `1px solid #E0E0E0`,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                    onClick={() =>
                        session.status === 'processing'
                            ? setOpenProcessingModal(true)
                            : setOpenReadyToSignModal(true)
                    }
                >
                    <Box width={'100%'}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingX: 0, alignItems: 'flex-start', paddingTop: 0 }}>
                            <Box>
                                <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{session.sessionId.sessionName}</Typography>
                                <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#999' }}>tạo bởi {session.sessionId.createdBy.name}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    borderRadius: 100,
                                    fontSize: 12,
                                    fontWeight: 500,
                                    padding: '4px 8px',
                                    mt: { xs: 1, sm: 0 },
                                    ...setStyleBaseOnStatus(session.status),
                                }}
                            >
                                {setTextBaseOnStatus(session.status)}
                            </Box>
                        </CardContent>

                        <Divider />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Typography sx={{ flex: 1, fontSize: 12, fontWeight: 500 }}>Lĩnh vực:</Typography>
                            <Box sx={{ px: 1, py: 0.5, backgroundColor: '#F0F0F0', borderRadius: 1, alignItems: 'center', display: 'flex' }} >
                                <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#555' }}>{session.sessionId.notaryField.name}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Typography sx={{ flex: 1, fontSize: 12, fontWeight: 500 }}>Dịch vụ:</Typography>
                            <Box sx={{ px: 1, py: 0.5, backgroundColor: '#F0F0F0', borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#555' }}>
                                    {session.sessionId.notaryService.name}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" mt={2}>
                            <AvatarIcon email={session.sessionId.createdBy.email} />
                            {session.sessionId.users.map((user, index) => (
                                <AvatarIcon key={index} email={user.email} />
                            ))}
                        </Box>

                        <Box
                            sx={{
                                alignSelf: 'flex-start',
                                backgroundColor: remainingTimeColor.backgroundColor,
                                color: remainingTimeColor.color,
                                gap: 1,
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                mt: 2,
                                width: 'fit-content',
                            }}
                        >
                            <ScheduleIcon sx={{ width: 12, height: 12 }} />
                            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                                {timeRemaining}
                            </Typography>
                        </Box>
                    </Box>
                </CardActionArea>
            </Card>
            {session.status === 'processing' ? (
                <DetailProcessingSessionModal
                    open={openProcessingModal}
                    onClose={() => setOpenProcessingModal(false)}
                    session={session}
                />
            ) : (
                <DetailReadyToSignSessionModal
                    open={openReadyToSignModal}
                    onClose={() => setOpenReadyToSignModal(false)}
                    session={session}
                />
            )}
        </>
    );
};

export default NotarySessionCard;
