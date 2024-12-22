import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Pagination } from '@mui/material';
import { black, gray, white } from '../../config/theme/themePrimitives';
import NotarizationService from '../../services/notarization.service';
import NotaryDocumentCard from '../../components/notary/NotaryDocumentCard';
import NotaryDocumentCardSkeleton from '../../components/notary/NotaryDocumentCardSkeleton';

const ProcessingNotarizationDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);

  const fetchProcessingDocuments = async (page) => {
    setLoading(true);
    const response = await NotarizationService.getNotarizationByRole({
      status: 'processing',
      page,
      limit: 6,
    });
    setDocuments(response.documents);
    setLoading(false);
  };

  useEffect(() => {
    fetchProcessingDocuments(pageIndex);
  }, [pageIndex]);

  const handlePageChange = (event, value) => {
    setPageIndex(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          overflow: 'hidden',
          border: `1px solid ${gray[200]}`,
          padding: 2,
          gap: 2,
          borderRadius: 1,
          boxShadow: '0px 2px 4px -2px rgba(19, 25, 39, 0.12), 0px 4px 4px -2px rgba(19, 25, 39, 0.08)',
          bgcolor: white[50],
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              color: black[900],
              fontSize: 16,
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            Danh sách chờ phê duyệt
          </Typography>

          <Typography
            sx={{
              color: black[300],
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Các yêu cầu chờ phê duyệt sẽ hiển thị ở đây
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: '100%',
            overflowY: 'auto',
            scrollbarWidth: { xs: 'none', sm: 'auto' },
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <NotaryDocumentCardSkeleton key={index} />)
            : documents.map((document, index) => <NotaryDocumentCard key={index} document={document} />)}
        </Box>
      </Paper>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Pagination count={10} page={pageIndex} onChange={handlePageChange} color="primary" shape="rounded" />
      </Box>
    </Box>
  );
};

export default ProcessingNotarizationDocuments;
