import React from 'react'
import { Box, Button, Divider, Typography } from '@mui/material'
import { black, gray, red, white, yellow } from '../../config/theme/themePrimitives'
import { Info } from '@mui/icons-material';
import { PictureAsPdf, Image } from '@mui/icons-material';

const HorizontalCard = ({ document }) => {
    const isPDF = document.filename.split('.').pop() === 'pdf';

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                borderRadius: 1,
                backgroundColor: white[50],
                padding: 1,
                border: `1px solid ${gray[200]}`,
                alignItems: 'center',
            }}
        >
            {/* Image Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 1,
                    backgroundColor: isPDF ? red[50] : yellow[50],
                    marginX: 2
                }}
            >
                {isPDF ? (
                    <PictureAsPdf
                        sx={{
                            fontSize: 30,
                            color: isPDF ? red[500] : yellow[500],
                        }}
                    />
                ) : (
                    <Image
                        sx={{
                            fontSize: 30,
                            color: isPDF ? red[500] : yellow[500],
                        }}
                    />
                )}
            </Box>
            {/* Vertical Divider */}
            <Divider orientation="vertical" flexItem />
            {/* Document Name Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    flex: 2,
                    alignItems: 'flex-start',
                    marginX: 2,
                    gap: 1
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 12,
                        color: black[300],
                    }}
                >
                    Tên tài liệu
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 500,
                        fontSize: 14,
                        color: black[500],
                    }}
                >
                    {document.filename}
                </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            {/* Date Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    flex: 1,
                    alignItems: 'flex-start',
                    marginX: 2,
                    gap: 1
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 12,
                        color: black[300],
                    }}
                >
                    Ngày nhận:{' '}
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: 14,
                            color: black[500],
                            marginLeft: 3,
                        }}
                        component={'span'}
                    >
                        {new Date(document.mintedAt).toLocaleDateString()}
                    </Typography>
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 12,
                        color: black[300],
                    }}
                >
                    Ngày hết hạn:{' '}
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: 14,
                            color: black[500],
                            marginLeft: 1,
                        }}
                        component={'span'}
                    >
                        {new Date(new Date(document.mintedAt).setMonth(new Date(document.mintedAt).getMonth() + 6)).toLocaleDateString()}
                    </Typography>
                </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            {/* Amount Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    flex: 0.5,
                    alignItems: 'flex-start',
                    marginX: 2,
                    gap: 1
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 12,
                        color: black[300],
                    }}
                >
                    Số lượng
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 500,
                        fontSize: 14,
                        color: black[500],
                    }}
                >
                    {document.amount}
                </Typography>
            </Box>
            {/* Button Section */}
            <Button
                sx={{
                    backgroundColor: gray[900],
                    color: white[50],
                    borderRadius: 1,
                    paddingX: 2,
                    fontSize: 12,
                    textTransform: 'none',
                    marginLeft: 'auto',
                    '&:hover': {
                        backgroundColor: gray[800],
                    },
                    marginX: 2
                }}
                endIcon={<Info />}
                onClick={() => { window.open(document.tokenURI) }}
            >
                Chi tiết tài liệu
            </Button>
        </Box>
    );
};

export default HorizontalCard