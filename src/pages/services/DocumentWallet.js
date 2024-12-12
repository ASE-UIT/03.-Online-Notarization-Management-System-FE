import React from 'react';
import { Box, Typography } from '@mui/material';
import HorizontalCard from '../../components/services/HorizontalCard';
import BoxCard from '../../components/services/BoxCard';

const documentWalletData = [
    {
        name: 'Hồ sơ 1',
        receiveDate: '01/01/2021',
        expireDate: '01/01/2022',
        amount: 10,
    },
    {
        name: 'Hồ sơ 2',
        receiveDate: '02/02/2022',
        expireDate: '02/02/2023',
        amount: 5,
    },
    {
        name: 'Hồ sơ 3',
        receiveDate: '03/03/2023',
        expireDate: '03/03/2024',
        amount: 15,
    },
];

const DocumentWallet = () => {
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100vh', flexDirection: 'column', gap: 1 }}>
            <Box padding={3}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Ví tài liệu
                </Typography>
                <Typography variant="caption">Tài liệu đã được công chứng</Typography>
            </Box>
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    gap: 2,
                    padding: 3,
                }}
            >
                {documentWalletData.map((document, index) => (
                    <HorizontalCard key={index} document={document} />
                ))}
            </Box>

            <Box
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    flexDirection: 'column',
                    gap: 2,
                    padding: 3,
                }}
            >
                {documentWalletData.map((document, index) => (
                    <BoxCard key={index} document={document} />
                ))}
            </Box>
        </Box>
    );
};

export default DocumentWallet;
