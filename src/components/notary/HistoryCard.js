import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { blue, green, red, yellow, black, gray, white } from '../../config/theme/themePrimitives';
import DetailHistoryDocumentModal from './DetailHistoryDocumentModal';

const customStyle = {
  fontSize: 12,
  fontWeight: 400,
  color: black[500],
};

const HistoryCard = ({ document }) => {
  const [open, setOpen] = useState(false);
  const setStyleBaseOnStatus = (status) => {
    switch (status) {
      case 'processing':
        return { color: yellow[500], backgroundColor: yellow[50] };
      case 'digitalSignature':
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
      case 'completed':
        return 'Hoàn thành';
      case 'rejected':
        return 'Không hợp lệ';
      default:
        return 'Không xác định';
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CardActionArea disableRipple sx={{ flex: 1, minWidth: { xs: 200, sm: 300 } }} onClick={handleOpen}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 1,
            bgcolor: white[50],
            border: `1px solid ${gray[300]}`,
            height: '100%',
            ':hover': {
              boxShadow: '0px 4px 8px rgba(19, 25, 39, 0.08)',
              border: `1px solid ${gray[900]}`,
            },
          }}
        >
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
                    textTransform: 'none',
                  }}
                >
                  {document.documentId.requesterInfo.fullName}
                </Typography>
              </Box>
              <Box
                sx={{
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
            <Box sx={{ mt: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: black[400],
                }}
              >
                {document.documentId.notarizationField.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                mt: 2,
              }}
            >
              <Typography sx={customStyle}>Mã số:</Typography>
              <Typography sx={{ ...customStyle, wordWrap: 'break-word', overflow: 'hidden' }}>
                {document.documentId.id}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                mt: 2,
              }}
            >
              <Typography sx={customStyle}>Ngày công chứng:</Typography>
              <Typography sx={customStyle}>{new Date(document.documentId.createdAt).toLocaleDateString('vi-VN')}</Typography>
            </Box>
          </CardContent>
        </Card>
      </CardActionArea>
      <DetailHistoryDocumentModal open={open} onClose={handleClose} document={document} />
    </>
  );
};

export default HistoryCard;
