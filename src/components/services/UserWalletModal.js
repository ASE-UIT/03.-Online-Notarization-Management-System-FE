import { Modal, Box, Typography, Skeleton, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { white, black, gray, red, yellow } from '../../config/theme/themePrimitives'
import UserWalletService from '../../services/userwallet.service'
import { Divider } from '@mui/material'
import { PictureAsPdf, Image } from '@mui/icons-material'


const UserWalletModal = ({ open, onClose, handleDocumentWalletChange }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDocumentWallet = async () => {
            try {
                setLoading(true);
                const response = await UserWalletService.getUserWallet();
                if (response.status === 200) {
                    setDocuments(response.data.nftItems);
                } else {
                    console.log(response);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDocumentWallet();
    }, []);

    const handleSelectDocument = (document) => {
        handleDocumentWalletChange(document);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { sx: '90%', sm: '80%' },
                    height: '80vh',
                    bgcolor: white[50],
                    boxShadow: 24,
                    borderRadius: 1,
                    paddingX: 4,
                    paddingY: 2,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    Ví tài liệu
                </Typography>
                <Typography variant="caption">Tài liệu đã được công chứng</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
                    {loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
                        ))
                        : documents.map((document, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    borderRadius: 1,
                                    backgroundColor: white[50],
                                    padding: 1,
                                    border: `1px solid ${gray[200]}`,
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: 'transform 0.4s',
                                    gap: 1,
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                    },
                                }}
                                onClick={() => handleSelectDocument(document)}
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
                                        backgroundColor: document.filename.endsWith('pdf') ? red[50] : yellow[50],
                                        marginX: 2
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(document.tokenURI);
                                    }}
                                >
                                    {document.filename.endsWith('pdf') ? (
                                        <PictureAsPdf
                                            sx={{
                                                fontSize: 30,
                                                color: document.filename.endsWith('pdf') ? red[500] : yellow[500],
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            sx={{
                                                fontSize: 30,
                                                color: document.filename.endsWith('pdf') ? red[500] : yellow[500],
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
                                        flex: 1.5,
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
                                {/* Date Section */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        flex: 0.6,
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
                            </Box>
                        ))}
                </Box>
            </Box>
        </Modal>
    );
};

export default UserWalletModal