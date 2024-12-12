import React from 'react'
import { Box, Button, Divider, Typography } from '@mui/material'
import { black, gray, white } from '../../config/theme/themePrimitives'
import { Info } from '@mui/icons-material';

const BoxCard = ({ document }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                borderRadius: 1,
                backgroundColor: white[50],
                padding: 1,
                border: `1px solid ${gray[200]}`,
                alignItems: 'flex-start',
            }}
        >
            {/* Image Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: "100%"
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 1,
                        backgroundColor: gray[900],
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        color: white[50],
                        backgroundColor: black[900],
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 10,
                            color: white[50],
                        }}
                    >
                        {document.amount}
                    </Typography>
                </Box>
            </Box>
            {/* Document Name Section */}
            <Typography
                sx={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: black[900],
                    marginTop: 1
                }}
            >
                {document.name}
            </Typography>
            {/* Date Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 1
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: black[400],
                    }}
                >
                    Ngày nhận:{' '}
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: 14,
                            color: black[400],
                            marginLeft: 3,
                        }}
                        component={'span'}
                    >
                        {document.receiveDate}
                    </Typography>
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: black[400],
                    }}
                >
                    Ngày hết hạn:{' '}
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontSize: 14,
                            color: black[400],
                            marginLeft: 1,
                        }}
                        component={'span'}
                    >
                        {document.expireDate}
                    </Typography>
                </Typography>
            </Box>
            {/* Horizontal Divider */}
            <Divider orientation="horizontal" flexItem sx={{ marginY: 1 }} />
            {/* Button Section */}
            <Button
                sx={{
                    display: 'flex',
                    width: '100%',
                    backgroundColor: gray[900],
                    color: white[50],
                    borderRadius: 1,
                    paddingX: 2,
                    fontSize: 12,
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: gray[800],
                    },
                }}
                endIcon={<Info />}
            >
                Chi tiết tài liệu
            </Button>
        </Box>
    );
};

export default BoxCard