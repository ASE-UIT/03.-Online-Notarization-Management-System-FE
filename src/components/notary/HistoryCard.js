import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { blue, green, red, yellow, black, gray, white } from '../../config/theme/themePrimitives'
import { purple } from '@mui/material/colors'

const customStyle = {
    fontSize: 12,
    fontWeight: 400,
    color: black[500]
};

const HistoryCard = ({ document }) => {
    const setStyleBaseOnStatus = (status) => {
        switch (status) {
            case 'pending': return { color: yellow[500], backgroundColor: yellow[50] };
            case 'processing': return { color: purple[500], backgroundColor: purple[50] };
            case 'digitalSignature': return { color: blue[500], backgroundColor: blue[50] };
            case 'completed': return { color: green[500], backgroundColor: green[50] };
            case 'rejected': return { color: red[500], backgroundColor: red[50] };
            default: return { color: black[500], backgroundColor: black[50] };
        }
    };

    const setTextBaseOnStatus = (status) => {
        switch (status) {
            case 'pending': return 'Đang xử lý';
            case 'processing': return 'Đang xác minh';
            case 'digitalSignature': return 'Sẵn sàng ký số';
            case 'completed': return 'Hoàn thành';
            case 'rejected': return 'Không hợp lệ';
            default: return 'Không xác định';
        }
    };

    return (
        <Box sx={{ flex: 1, minWidth: 300 }}>
            <Card variant="outlined" sx={{ borderRadius: 1, bgcolor: white[50], border: `1px solid ${gray[300]}` }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: gray[900],
                                    fontSize: 14,
                                    fontWeight: 600,
                                    textTransform: 'none'
                                }}
                            >
                                {document.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 400,
                                    color: black[400]
                                }}
                            >
                                {document.description}
                            </Typography>
                        </Box>
                        <Box sx={{ borderRadius: 100, fontSize: 12, fontWeight: 500, padding: '4px 8px', ...setStyleBaseOnStatus(document.status) }}>
                            {setTextBaseOnStatus(document.status)}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                            mt: 2
                        }}
                    >
                        <Typography sx={customStyle}>
                            Mã số:
                        </Typography>
                        <Typography sx={customStyle}>{document.id}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                            mt: 2
                        }}
                    >
                        <Typography sx={customStyle}>
                            Ngày công chứng:
                        </Typography>
                        <Typography sx={customStyle}>{document.date}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default HistoryCard