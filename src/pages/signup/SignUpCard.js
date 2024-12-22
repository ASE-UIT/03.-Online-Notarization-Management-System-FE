import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { GoogleIcon } from './CustomIcons';
import AuthService from '../../services/auth.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignUpCard() {
  const [emailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });

    try {
      const response = await AuthService.register(data.get('name'), data.get('email'), data.get('password'));
      console.log(response);
      if (response.status === 201) {
        toast.success('Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.');
        navigate('/signin/');
      }
    } catch (error) {
      if (error === 400) {
        toast.error('Email đã tồn tại');
      }
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: '100%',
          fontSize: 'clamp(2rem, 10vw, 2.15rem)',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        Đăng ký
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Họ và tên</FormLabel>
          <TextField
            error={nameError}
            helperText={nameErrorMessage}
            id="name"
            type="text"
            name="name"
            placeholder="Nguyễn Văn A"
            autoComplete="name"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={nameError ? 'error' : 'primary'}
            onChange={(e) => setNameErrorMessage('')}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
            onChange={(e) => setEmailErrorMessage('')}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Mật khẩu</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
            onChange={(e) => setPasswordErrorMessage('')}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Đăng ký
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Đã có tài khoản?{' '}
          <span>
            <Link href="/signin/" variant="body2" sx={{ alignSelf: 'center' }}>
              Đăng nhập
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider>hoặc</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button type="submit" fullWidth variant="outlined" startIcon={<GoogleIcon />}>
          Đăng ký với Google
        </Button>
      </Box>
    </Card>
  );
}
