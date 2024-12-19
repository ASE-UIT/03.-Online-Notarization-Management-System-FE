import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import HorizontalCard from '../../components/services/HorizontalCard';
import BoxCard from '../../components/services/BoxCard';
import UserWalletService from '../../services/userwallet.service';

const DocumentWallet = () => {
    const [documentWallet, setDocumentWallet] = useState([]);

    useEffect(() => {
        const fetchDocumentWallet = async () => {
            try {
                const response = await UserWalletService.getUserWallet();
                if (response.status === 200) {
                    setDocumentWallet(response.data.nftItems);
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchDocumentWallet();
    }, []);

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
                {documentWallet.map((document, index) => (
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
                {documentWallet.map((document, index) => (
                    <BoxCard key={index} document={document} />
                ))}
            </Box>
        </Box>
    );
};

export default DocumentWallet;
