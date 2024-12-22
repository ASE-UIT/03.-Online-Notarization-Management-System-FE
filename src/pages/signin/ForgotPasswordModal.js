import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPasswordModal({ open, handleClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    return email.trim() !== '' && /\S+@\S+\.\S+/.test(email);
  };

  const sendResetPassword = async () => {
    if (!validateInputs()) {
      toast.error('Địa chỉ email không hợp lệ.');
      return;
    }

    setLoading(true);
    try {
      const response = await AuthService.ForgotPasswordModal(email);
      if (response.status === 204) {
        toast.success('Vui lòng kiểm tra email của bạn để cài đặt lại mật khẩu');
        handleClose();
      }
    } catch (error) {
      console.error('Failed to send reset password', error);
      const errorMessage =
        error.status === 404 ? 'Email không tồn tại. Vui lòng nhập lại.' : 'Đã xảy ra lỗi. Vui lòng thử lại.';
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          sendResetPassword();
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 20 }}>Quên mật khẩu</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <DialogContentText sx={{ fontSize: 14 }}>
          Nhập địa chỉ email của tài khoản của bạn, chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.
        </DialogContentText>
        <TextField
          autoFocus
          id="email"
          name="email"
          label="Địa chỉ email"
          type="email"
          placeholder="Nhập địa chỉ email"
          fullWidth
          onChange={(event) => setEmail(event.target.value)}
          size="small"
          sx={{
            '& .MuiInputBase-input': {
              fontSize: 16,
              py: 1.5,
            },
            '& .MuiInputBase-input::placeholder': {
              fontSize: 16,
              opacity: 1,
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: 'none' }}>Huỷ</Typography>
        </Button>
        <Button disabled={loading || !validateInputs()} variant="contained" type="submit">
          <Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: 'none' }}>Tiếp tục</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ForgotPasswordModal;
