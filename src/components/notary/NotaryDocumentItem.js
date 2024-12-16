import { Box, Typography } from '@mui/material';
import React from 'react';
import { black, blue, green, red, yellow } from '../../config/theme/themePrimitives';
import DetailHistoryDocumentModal from './DetailHistoryDocumentModal';

const NotaryDocumentItem = ({ document }) => {
  const [open, setOpen] = React.useState(false);

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

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          width: '100%',
          gap: 2,
          cursor: 'pointer',
        }}
        onClick={() => setOpen(true)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: black[900] }}>
            {document?.documentId?.requesterInfo?.fullName}
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: black[400] }}>
            {document?.documentId?.notarizationField?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'block',
            borderRadius: 100,
            fontSize: 12,
            fontWeight: 500,
            padding: '4px 8px',
            ...setStyleBaseOnStatus(document.status),
          }}
        >
          {setTextBaseOnStatus(document.status)}
        </Box>
      </Box>
      <DetailHistoryDocumentModal open={open} onClose={() => setOpen(false)} document={document} />
    </>
  );
};

export default NotaryDocumentItem;
