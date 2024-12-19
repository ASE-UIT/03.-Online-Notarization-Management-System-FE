import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CircularProgress } from '@mui/material';
import { dark, primary, white } from '../../config/theme/themePrimitives';
import AuthService from '../../services/auth.service';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleForgotPassword = async () => {
    if (email === '') {
      console.log('Vui lòng nhập email');
      toast.error('Vui lòng nhập email hợp lệ');
      return;
    }
    if (!validateEmail(email)) {
      console.log('Email không hợp lệ');
      toast.error('Email không hợp lệ');
      return;
    }

    try {
      setLoading(true);

      await AuthService.forgotPassword(email);
      toast.success('Vui lòng kiểm tra email của bạn để cài đặt lại mật khẩu');

      setLoading(false);
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);
    } catch (error) {
      toast.error('Email không tồn tại');
    }
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems={'center'} gap={20} padding={2}>
      {/* Image Section */}
      <Box
        display={{ xs: 'none', md: 'flex' }}
        maxWidth={300}
        width="100%"
        justifyContent={'center'}
        alignItems={{ xs: 'center', md: 'flex-start' }}
      >
        <img
          src={require('../../assets/images/map.png')}
          alt="map"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      {/* Card Section */}
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          padding: 4,
          width: 500,
          '&.MuiCard-root': {
            boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
          },
          backgroundColor: white[50],
        }}
        variant="outlined"
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={'8px'}>
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 'bold',
                color: dark[900],
              }}
            >
              Quên mật khẩu?
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="body2" color="textSecondary">
              Email
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Nhập địa chỉ email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'none',
            fontSize: 16,
            fontWeight: 'bold',
            backgroundColor: primary[500],
            color: white[50],
            '&:hover': {
              backgroundColor: primary[600],
            },
          }}
          onClick={handleForgotPassword}
        >
          {loading ? <CircularProgress size={30} thickness={4} color="inherit" /> : 'Gửi yêu cầu'}
        </Button>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
