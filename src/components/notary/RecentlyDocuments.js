import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { black, gray, white } from '../../config/theme/themePrimitives';
import NotaryDocumentItem from './NotaryDocumentItem';

const RecentlyDocuments = () => {
    const data = [
        { id: 1, name: 'Jonh Doe', notarizationField: 'Công chứng hợp đồng mua bán đất', status: 'pending' },
        { id: 2, name: 'Jonh Doe', notarizationField: 'Công chứng hợp đồng mua bán đất', status: 'processing' },
        { id: 3, name: 'Jonh Doe', notarizationField: 'Công chứng hợp đồng mua bán đất', status: 'digitalSignature' },
        { id: 4, name: 'Jonh Doe', notarizationField: 'Công chứng hợp đồng mua bán đất', status: 'completed' },
        { id: 5, name: 'Jonh Doe', notarizationField: 'Công chứng hợp đồng mua bán đất', status: 'rejected' },
        { id: 6, name: 'Jonh Doe', notarizationField: 'Công chứng hợp đồng mua bán đất', status: 'completed' }
    ];

    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden', border: `1px solid ${gray[200]}`, padding: 3, gap: 4, borderRadius: 1, boxShadow: '0px 2px 4px -2px rgba(19, 25, 39, 0.12), 0px 4px 4px -2px rgba(19, 25, 39, 0.08)', bgcolor: white[50] }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Typography sx={{ color: black[900], fontSize: 16, fontWeight: 600 }}>Xác minh gần đây</Typography>
                <Button sx={{ padding: '8px 16px', textTransform: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 1, border: `1px solid ${gray[200]}`, color: black[900], fontSize: 14, fontWeight: 600, textTransform: 'capitalize' }}>Xem tất cả</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 4 }}>
                {data.map((item, index) => <NotaryDocumentItem key={index} item={item} />)}
            </Box>
        </Paper>
    );
};

export default RecentlyDocuments;
