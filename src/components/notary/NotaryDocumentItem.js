import { Box, Typography } from '@mui/material';
import React from 'react';
import { black, blue, green, red, yellow } from '../../config/theme/themePrimitives';
import { purple } from '@mui/material/colors';

const NotaryDocumentItem = ({ item }) => {
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
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: black[900] }}>{item.name}</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 400, color: black[400] }}>{item.notarizationField}</Typography>
            </Box>
            <Box sx={{ borderRadius: 100, fontSize: 12, fontWeight: 500, padding: '4px 8px', ...setStyleBaseOnStatus(item.status) }}>
                {setTextBaseOnStatus(item.status)}
            </Box>
        </Box>
    );
};

export default NotaryDocumentItem;
