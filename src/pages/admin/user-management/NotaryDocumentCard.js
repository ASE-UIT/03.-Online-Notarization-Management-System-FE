import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { primary } from '../../../config/theme/themePrimitives';

const NotaryDocumentCard = ({ docType, documentId, date, status }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
        alignSelf: 'stretch',
        borderRadius: '8px',
        height: '100%',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {docType}
          </Typography>
          <Box
            sx={{
              backgroundColor: primary[50],
              borderRadius: '30px',
              padding: '4px 8px',
              color: primary[500],
            }}
          >
            <Typography variant="body3" sx={{ color: primary[500] }}>
              {documentId}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography variant="body2">Ngày công chứng:</Typography>
          <Typography variant="body2">{date}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2">Tình trạng:</Typography>
          <Typography variant="body2">{status}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotaryDocumentCard;
