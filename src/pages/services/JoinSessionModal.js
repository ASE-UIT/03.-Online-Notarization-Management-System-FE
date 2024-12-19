import { Box, Modal, Typography, Button } from '@mui/material';
import React from 'react';
import { gray, white } from '../../config/theme/themePrimitives';
import SessionService from '../../services/session.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JoinSessionModal = ({ sessionId, open, setOpen }) => {
  const handleOnClose = () => setOpen(false);

  const onAccept = async () => {
    const response = await SessionService.joinSession(sessionId, 'accept');

    if (response.message === 'User already accepted') {
      toast.info('Bạn đã tham gia phiên công chứng này');
      handleOnClose();
      return;
    } else if (response.message === 'User already rejected') {
      toast.info('Bạn đã từ chối tham gia phiên công chứng này');
      handleOnClose();
      return;
    }

    toast.success('Tham gia phiên công chứng thành công');
    handleOnClose();
  };

  const onReject = async () => {
    const response = await SessionService.joinSession(sessionId, 'reject');

    if (response.message === 'User already accepted') {
      toast.info('Bạn đã tham gia phiên công chứng này');
      handleOnClose();
      return;
    } else if (response.message === 'User already rejected') {
      toast.info('Bạn đã từ chối tham gia phiên công chứng này');
      handleOnClose();
      return;
    }

    toast.success('Tham gia phiên công chứng thành công');
    handleOnClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleOnClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.3s',
      }}
    >
      <Box
        sx={{
          backgroundImage: `linear-gradient(to right top , ${white[50]}, ${white[100]}, ${white[200]})`,
          borderRadius: 2,
          boxShadow: 3,
          width: { xs: '90%', sm: 400 },
          p: 3,
          textAlign: 'center',
          border: `1px solid ${gray[100]}`,
          animation: 'fadeIn 0.5s ease-in-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={1} color="primary">
          Tham gia phiên công chứng
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, fontSize: 14, fontWeight: 400 }}>
          Bạn đã được mời vào một phiên công chứng.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              onReject();
            }}
            sx={{ textTransform: 'none', fontWeight: 600, minWidth: 100 }}
          >
            Từ chối
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onAccept();
            }}
            sx={{ textTransform: 'none', fontWeight: 600, minWidth: 100 }}
          >
            Chấp nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default JoinSessionModal;
