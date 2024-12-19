import React from 'react'
import { Box, Typography, TextField, Button, Card } from '@mui/material'
import { black, dark, primary, white } from '../../config/theme/themePrimitives'

const OTP = () => {
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
                    gap={4}
                >
                    <Box display="flex" flexDirection="column" alignItems="center" gap={'8px'}>
                        <Typography
                            sx={{
                                fontSize: 28,
                                fontWeight: 'bold',
                                color: dark[900]
                            }}
                        >
                            Xác nhận OTP
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 16,
                                fontWeight: 400,
                                color: dark[900]
                            }}
                        >
                            Mã xác nhận sẽ được gửi qua địa chỉ email của bạn.
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        alignItems={'center'}
                    >
                        <Typography
                            sx={{
                                fontSize: 16,
                                fontWeight: 400,
                                color: dark[900]
                            }}
                        >
                            Mã xác thực có hiệu lực trong vòng 5 phút.
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap={2}
                        >
                            <TextField
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: 16,
                                        py: 1.5,
                                        textAlign: 'center'
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        fontSize: 16,
                                        opacity: 1,
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        '&:hover fieldset': {
                                            borderColor: 'black',
                                            borderWidth: 1,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black',
                                            borderWidth: 1,
                                        }
                                    },
                                    width: 50
                                }}
                            />
                            <TextField
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: 16,
                                        py: 1.5,
                                        textAlign: 'center'
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        fontSize: 16,
                                        opacity: 1,
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        '&:hover fieldset': {
                                            borderColor: 'black',
                                            borderWidth: 1,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black',
                                            borderWidth: 1,
                                        }
                                    },
                                    width: 50
                                }}
                            />
                            <TextField
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: 16,
                                        py: 1.5,
                                        textAlign: 'center'
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        fontSize: 16,
                                        opacity: 1,
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        '&:hover fieldset': {
                                            borderColor: 'black',
                                            borderWidth: 1,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black',
                                            borderWidth: 1,
                                        }
                                    },
                                    width: 50
                                }}
                            />
                            <TextField
                                sx={{
                                    '& .MuiInputBase-input': {
                                        fontSize: 16,
                                        py: 1.5,
                                        textAlign: 'center'
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        fontSize: 16,
                                        opacity: 1,
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        '&:hover fieldset': {
                                            borderColor: 'black',
                                            borderWidth: 1,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black',
                                            borderWidth: 1,
                                        }
                                    },
                                    width: 50
                                }}
                            />
                        </Box>
                        <Typography
                            sx={{
                                fontSize: 16,
                                fontWeight: 400,
                                color: dark[900]
                            }}
                        >
                            Bạn đã nhận được mã xác nhận chưa? <a href="#" style={{ color: primary[500] }}>Gửi lại mã</a>
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
                >
                    Đặt lại mật khẩu
                </Button>
            </Card>
        </Box>
    )
}

export default OTP