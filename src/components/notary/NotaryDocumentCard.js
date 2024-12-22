import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { black, gray, white } from '../../config/theme/themePrimitives';
import { CalendarToday, Info, Schedule } from '@mui/icons-material';
import DetailDocumentModal from './DetailDocumentModal';
import DetailHistoryDocumentModal from './DetailHistoryDocumentModal';

const NotaryDocumentCard = ({ document }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const time = new Date(document?.documentId?.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const date = new Date(document?.documentId?.createdAt).toLocaleDateString('vi-VN');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 1,
        padding: 1,
        border: `1px solid ${black[50]}`,
        borderRadius: 1,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px 16px',
          minWidth: 120,
        }}
      >
        <Avatar sx={{ height: 40, width: 40 }} />
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 500,
            color: black[900],
            textTransform: 'capitalize',
          }}
        >
          {document?.documentId?.requesterInfo?.fullName}
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'column' },
          gap: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '0px 16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            color: black[300],
            gap: 1,
          }}
        >
          <Schedule sx={{ fontSize: 18 }} />
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {time}
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            color: black[300],
            gap: 1,
          }}
        >
          <CalendarToday sx={{ fontSize: 18 }} />
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {date}
          </Typography>
        </Box>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '0px 16px',
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 700,
            color: black[900],
            textTransform: 'uppercase',
          }}
        >
          GHI CHÚ
        </Typography>
        <Typography
          sx={{
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': 1,
            overflow: 'hidden',
            color: white[900],
            textOverflow: 'ellipsis',
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {document?.documentId?.notarizationField.name}
          <br />
          {document?.documentId?.notarizationService.name}
        </Typography>
      </Box>

      <Button
        sx={{
          width: { xs: '100%', sm: 'fit-content' },
          display: 'flex',
          padding: '4px 8px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '4px',
          bgcolor: gray[100],
          textTransform: 'none',
          height: 'fit-content',
          fontSize: 10,
          fontWeight: 500,
          color: black[900],
          ':hover': {
            color: white[50],
            bgcolor: black[900],
          },
        }}
        endIcon={<Info />}
        onClick={handleOpen}
      >
        Xem chi tiết
      </Button>
      {document?.status === 'processing' ? (
        <DetailDocumentModal open={open} onClose={handleClose} document={document} />
      ) : (
        <DetailHistoryDocumentModal open={open} onClose={handleClose} document={document} />
      )}
    </Box>
  );
};

export default NotaryDocumentCard;
