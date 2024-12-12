import React from 'react'
import { Box, Typography, TextField, Button, Card } from '@mui/material'
import { dark, gray, primary, white } from '../../config/theme/themePrimitives'

const ForgotPassword = () => {
    const handleForgotPassword = () => {
        console.log('Forgot password')
        window.location.href = '/reset-password'
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
                    <Box display="flex" flexDirection="column" alignItems="center" gap={'8px'}>
                        <Typography
                            sx={{
                                fontSize: 28,
                                fontWeight: 'bold',
                                color: dark[900]
                            }}
                        >
                            Quên mật khẩu?
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 14,
                                fontWeight: 400,
                                color: dark[600]
                            }}
                        >
                            Chúng tôi sẽ hỗ trợ bạn cài đặt lại mật khẩu.
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={1}
                    >
                        <Typography variant="body2" color="textSecondary">
                            Email
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Nhập địa chỉ email của bạn"
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
                            backgroundColor: primary[600]
                        }
                    }}
                    onClick={handleForgotPassword}
                >
                    Đặt lại mật khẩu
                </Button>
            </Card>
        </Box>
    )
}

export default ForgotPassword
