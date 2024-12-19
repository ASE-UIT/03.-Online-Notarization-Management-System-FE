import React from 'react';
import { Typography, Box } from '@mui/material';
import { black, primary, white } from '../../../config/theme/themePrimitives';

const NotaryDocumentCard = ({ docType, documentId, date, status, onClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        borderRadius: 1,
        backgroundColor: white[50],
        boxShadow: 1,
        ':hover': {
          transform: 'scale(1.02)',
        },
        transition: 'transform 0.2s',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 2,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: black[900] }}>{docType}</Typography>
        <Box
          sx={{
            backgroundColor: primary[50],
            borderRadius: 4,
            py: 0.5,
            px: 1,
            color: primary[500],
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: primary[500] }}>{documentId}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 400, color: black[900] }}>Ngày công chứng:</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: black[900] }}>{date}</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 400, color: black[900] }}>Tình trạng:</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: black[900] }}>{status}</Typography>
      </Box>
    </Box>
  );
};

export default NotaryDocumentCard;
