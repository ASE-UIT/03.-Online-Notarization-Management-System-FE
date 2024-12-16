import { Box, Button, Paper, Typography, Skeleton, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { black, gray, white } from '../../config/theme/themePrimitives';
import NotaryDocumentItem from './NotaryDocumentItem';
import NotarizationService from '../../services/notarization.service';
import { NavigateNextRounded } from '@mui/icons-material';

const RecentlyDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await NotarizationService.getApproveHistory();
        if (Array.isArray(response)) {
          setDocuments(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflow: 'hidden',
        border: `1px solid ${gray[200]}`,
        padding: 3,
        gap: 4,
        borderRadius: 1,
        boxShadow: '0px 2px 4px -2px rgba(19, 25, 39, 0.12), 0px 4px 4px -2px rgba(19, 25, 39, 0.08)',
        bgcolor: white[50],
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            color: black[900],
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Xác minh gần đây
        </Typography>
        <Button
          sx={{
            padding: '8px 16px',
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 1,
            border: `1px solid ${gray[200]}`,
          }}
          href="/notary/notarization-history"
        >
          <Typography sx={{ color: black[900], fontSize: 14, fontWeight: 600, textTransform: 'capitalize' }}>
            Xem tất cả
          </Typography>
        </Button>
        <IconButton
          href="/notary/notarization-history"
          sx={{ display: { xs: 'flex', sm: 'none' }, border: `1px solid ${black[50]}` }}
        >
          <NavigateNextRounded />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 4 }}>
        {isLoading
          ? Array.from({ length: 2 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                  width: '100%',
                }}
              >
                <Skeleton variant="rectangular" width={60} height={60} sx={{ borderRadius: 1 }} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="60%" height={20} />
                </Box>
              </Box>
            ))
          : documents.slice(0, 5).map((document, index) => <NotaryDocumentItem key={index} document={document} />)}
      </Box>
    </Paper>
  );
};

export default RecentlyDocuments;
