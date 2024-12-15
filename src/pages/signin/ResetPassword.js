import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Card, CircularProgress } from '@mui/material'
import { dark, gray, primary, white } from '../../config/theme/themePrimitives'
import { FiberManualRecord } from '@mui/icons-material'
import AuthService from '../../services/auth.service'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const token = Cookies.get('resetPasswordToken');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (password === '') {
            alert('Vui lòng nhập mật khẩu mới');
            return;
        } else if (password.length < 8) {
            alert('Mật khẩu phải chứa ít nhất 8 ký tự');
            return;
        } else if (password !== confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }

        try {
            setLoading(true);
            await AuthService.resetPassword(token, password);
            toast.success('Mật khẩu đã được cập nhật');
            setLoading(false);
            setTimeout(() => {
                window.location.href = '/signin';
            }, 2000);
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems={'center'}
            gap={20}
            padding={2}
        >
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
                        objectFit: 'cover'
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
                variant='outlined'
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                >
                    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={'8px'}>
                        <Typography
                            sx={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: dark[900]
                            }}
                        >
                            Đặt lại mật khẩu mới
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 16,
                                fontWeight: 400,
                                color: dark[600]
                            }}
                        >
                            Tạo một mật khẩu mới. Đảm bảo mật khẩu mới khác với mật khẩu cũ cho vấn đề bảo mật
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={1}
                    >
                        <Typography variant="body2" color="textSecondary">
                            Mật khẩu mới
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Nhập mật khẩu mới"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={1}
                    >
                        <Typography variant="body2" color="textSecondary">
                            Xác nhận mật khẩu
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Nhập lại mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        justifyContent: 'flex-start'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 12,
                                fontWeight: 400,
                                color: gray[400]
                            }}
                        >
                            <FiberManualRecord sx={{ height: 8, width: 8, marginRight: 1 }} /> Mật khẩu nhiều hơn 8 ký tự
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 12,
                                fontWeight: 400,
                                color: gray[400]
                            }}
                        >
                            <FiberManualRecord sx={{ height: 8, width: 8, marginRight: 1 }} /> Ít nhất một ký tự viết thường
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 12,
                                fontWeight: 400,
                                color: gray[400]
                            }}
                        >
                            <FiberManualRecord sx={{ height: 8, width: 8, marginRight: 1 }} /> Mật khẩu nhiều hơn 8 ký tự
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 12,
                                fontWeight: 400,
                                color: gray[400]
                            }}
                        >
                            <FiberManualRecord sx={{ height: 8, width: 8, marginRight: 1 }} /> Ít nhất một ký tự viết thường
                        </Typography>
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
                            backgroundColor: primary[600]
                        }
                    }}
                    onClick={handleResetPassword}
                    disabled={password === '' || confirmPassword === ''}
                >
                    {loading ?
                        <CircularProgress
                            size={30}
                            thickness={4}
                            color="inherit"
                        />
                        :
                        'Đặt lại mật khẩu'
                    }
                </Button>
            </Card>
        </Box>
    )
}

export default ResetPassword