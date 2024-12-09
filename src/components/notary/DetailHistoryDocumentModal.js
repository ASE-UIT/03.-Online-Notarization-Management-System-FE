import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { ArrowBack, Cancel, CheckCircle, OpenInNew } from '@mui/icons-material'
import { blue, red, yellow, black, white, gray, green } from '../../config/theme/themePrimitives'
import InformationField from './InformationField'
import FileField from './FileField'
import NotarizationService from '../../services/notarization.service'

const responseDocument = [
    'Document 1',
    'Document 2',
    'Document 3',
    'Document 4',
    'Document 5',
];

const DetailHistoryDocumentModal = ({ open, onClose, document }) => {
    const [feedback, setFeedback] = useState('');
    const [isSending, setIsSending] = useState(false);
    const isDisabled = document?.status === 'completed' || document?.status === 'rejected';

    const setStyleBaseOnStatus = (status) => {
        switch (status) {
            case 'processing': return { color: yellow[500], backgroundColor: yellow[50] };
            case 'digitalSignature': return { color: blue[500], backgroundColor: blue[50] };
            case 'readyToSign': return { color: blue[500], backgroundColor: blue[50] };
            case 'completed': return { color: green[500], backgroundColor: green[50] };
            case 'rejected': return { color: red[500], backgroundColor: red[50] };
            default: return { color: black[500], backgroundColor: black[50] };
        }
    };

    const setTextBaseOnStatus = (status) => {
        switch (status) {
            case 'processing': return 'Đang xử lý';
            case 'digitalSignature': return 'Sẵn sàng ký số';
            case 'readyToSign': return 'Sẵn sàng ký số';
            case 'completed': return 'Hoàn thành';
            case 'rejected': return 'Không hợp lệ';
            default: return 'Không xác định';
        }
    };

    const handleAccept = () => {
        setIsSending(true);
        NotarizationService.forwardDocumentStatus(document.documentId.id, 'accept', feedback);
        setIsSending(false);
    }

    const handleReject = () => {
        setIsSending(true);
        NotarizationService.forwardDocumentStatus(document.documentId.id, 'reject', feedback);
        setIsSending(false);
    }

    console.log('document', document);

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
                    width: '90vw',
                    height: '90vh',
                    bgcolor: white[50],
                    p: '24px',
                    borderRadius: 2,
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        width: '100%',
                    }}
                >
                    <IconButton sx={{ padding: 0, margin: 0, color: black[900] }} onClick={onClose}>
                        <ArrowBack sx={{ height: 24, width: 24 }} />
                    </IconButton>

                    <Typography
                        sx={{
                            flex: 1,
                            fontSize: 16,
                            fontWeight: 600,
                            color: black[900]
                        }}
                    >
                        Chi tiết hồ sơ công chứng - Mã số: {document.documentId.id}
                    </Typography>

                    <Box sx={{ borderRadius: 100, fontSize: 12, fontWeight: 500, padding: '4px 8px', ...setStyleBaseOnStatus(document?.status) }}>
                        {setTextBaseOnStatus(document?.status)}
                    </Box>
                </Box>

                {/* Middle Content */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        gap: 8,
                    }}
                >
                    {/* Left Content */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Customer Information Section */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                padding: 2,
                                width: '100%',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: black[900],
                                    textTransform: 'uppercase'
                                }}
                            >
                                Thông tin khách hàng
                            </Typography>

                            <InformationField title="Họ và tên" value={document.documentId.requesterInfo.fullName} />
                            <InformationField title="Số CMND" value={document.documentId.requesterInfo.citizenId} />
                            <InformationField title="Số điện thoại" value={document.documentId.requesterInfo.phoneNumber} />
                            <InformationField title="Email" value={document.documentId.requesterInfo.email} />
                        </Box>

                        {/* Notarization Document Information */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                padding: 2,
                                width: '100%',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: black[900],
                                    textTransform: 'uppercase'
                                }}
                            >
                                Thông tin tài liệu công chứng
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    width: '100%',
                                }}
                            >
                                <InformationField title="Lĩnh vực công chứng" value={document.documentId.notarizationField.name} />
                                <InformationField title="Dịch vụ công chứng" value={document.documentId.notarizationService.name} />
                            </Box>
                        </Box>

                        {/* File Section */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                padding: 2,
                                width: '100%',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: black[900],
                                    textTransform: 'uppercase'
                                }}
                            >
                                Tệp
                            </Typography>

                            <FileField type="pdf" name="Hợp đồng mua bán đất.pdf" size="1.2 MB" />
                        </Box>

                        {/* Image Section */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                padding: 2,
                                width: '100%',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: black[900],
                                    textTransform: 'uppercase'
                                }}
                            >
                                Ảnh
                            </Typography>

                            <FileField type="img" name="Hợp đồng mua bán đất.img" size="1.2 MB" />
                        </Box>
                    </Box>

                    {/* Note Section */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: black[900],
                                textTransform: 'uppercase',
                            }}
                        >
                            Ghi chú
                        </Typography>

                        <TextField
                            multiline
                            fullWidth
                            rows={15}
                            placeholder="Nhập nội dung ghi chú"
                            variant="outlined"
                            sx={{
                                flex: 1,
                                '& .MuiInputBase-root': {
                                    fontSize: 14,
                                    color: black[900],
                                    padding: '8px 12px',
                                    '& fieldset': {
                                        borderColor: gray[200],
                                    },
                                    '&:hover fieldset': {
                                        borderColor: black[900],
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: black[900],
                                        borderWidth: 1,
                                    },
                                },
                            }}
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: black[900],
                                    textTransform: 'uppercase'
                                }}
                            >
                                Tài liệu phản hồi
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    columnGap: 2,
                                    rowGap: 1,
                                    flexWrap: 'wrap',
                                    paddingY: 2,
                                }}
                            >
                                {responseDocument.map((doc, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            padding: '4px 12px',
                                            borderRadius: '16px',
                                            backgroundColor: black[50],
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: black[100],
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: 12,
                                                fontWeight: 500,
                                                color: black[500],
                                                marginRight: 1,
                                                userSelect: 'none',
                                            }}
                                        >
                                            {doc}
                                        </Typography>
                                        <OpenInNew sx={{ color: black[500], fontSize: 16 }} />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {/* Bottom Content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        width: '100%',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: white[50],
                            bgcolor: red[500],
                            '&:hover': { bgcolor: red[600] },
                            textTransform: 'none',
                            padding: '8px 32px',
                            '&:disabled': {
                                bgcolor: black[200],
                                color: black[400],
                            }
                        }}
                        endIcon={<Cancel />}
                        onClick={handleReject}
                        disabled={isSending || isDisabled}
                    >
                        Từ chối
                    </Button>

                    <Button
                        sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: white[50],
                            bgcolor: black[900],
                            '&:hover': { bgcolor: black[800] },
                            textTransform: 'none',
                            padding: '8px 32px',
                            '&:disabled': {
                                bgcolor: black[200],
                                color: black[400],
                            }
                        }}
                        endIcon={<CheckCircle />}
                        onClick={handleAccept}
                        disabled={isSending || isDisabled}
                    >
                        Chấp nhận
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default DetailHistoryDocumentModal