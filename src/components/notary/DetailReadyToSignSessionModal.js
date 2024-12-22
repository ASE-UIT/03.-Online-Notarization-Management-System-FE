import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ArrowBack, CheckCircle, OpenInNew, PhotoRounded, PictureAsPdf } from '@mui/icons-material';
import { blue, red, yellow, black, white, gray, green } from '../../config/theme/themePrimitives';
import InformationField from './InformationField';
import { toast } from 'react-toastify';
import useWindowSize from '../../hooks/useWindowSize';
import SessionService from '../../services/session.service';

const renderDocumentFiles = (file) => {
    return (
        <Box
            sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                borderRadius: 1,
                border: `1px solid ${gray[200]}`,
                alignItems: 'center',
                backgroundColor: white[50],
            }}
        >
            <Box
                sx={{
                    borderRadius: 100,
                    backgroundColor: red[50],
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    p: 1,
                }}
            >
                <PictureAsPdf sx={{ fontSize: 14, color: red[500] }} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '100px',
                    overflow: 'clip',
                    textOverflow: 'ellipsis',
                }}
            >
                <Typography
                    sx={{
                        flex: 1,
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: 'pointer',
                        ':hover': {
                            textDecoration: 'underline',
                        },
                    }}
                    onClick={() => window.open(file.firebaseUrl)}
                >
                    {file.filename}
                </Typography>
            </Box>
        </Box>
    );
};

const renderImageFiles = (file) => {
    return (
        <Box
            sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                borderRadius: 1,
                border: `1px solid ${gray[200]}`,
                alignItems: 'center',
                width: 'fit-content',
            }}
        >
            <Box
                sx={{
                    borderRadius: 100,
                    backgroundColor: yellow[50],
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    p: 1,
                }}
            >
                <PhotoRounded sx={{ fontSize: 14, color: yellow[500] }} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '100px',
                    overflow: 'clip',
                    textOverflow: 'ellipsis',
                }}
            >
                <Typography
                    sx={{
                        flex: 1,
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: 'pointer',
                        ':hover': {
                            textDecoration: 'underline',
                        },
                    }}
                    onClick={() => window.open(file.firebaseUrl)}
                >
                    {file.filename}
                </Typography>
            </Box>
        </Box>
    );
};

const Section = ({ title, children }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 2,
            backgroundColor: gray[50],
            borderRadius: 1,
        }}
    >
        <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: black[900] }}>{title}</Typography>
        {children}
    </Box>
);

const DetailReadyToSignSessionModal = ({ open, onClose, session }) => {
    const { width, height } = useWindowSize();
    const [isSending, setIsSending] = useState(false);
    const isDisabled = session?.status === 'completed' || session?.status === 'rejected';
    const [documentFiles, setDocumentFiles] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

    const setStyleBaseOnStatus = (status) => {
        switch (status) {
            case 'processing':
                return { color: yellow[500], backgroundColor: yellow[50] };
            case 'digitalSignature':
                return { color: blue[500], backgroundColor: blue[50] };
            case 'readyToSign':
                return { color: blue[500], backgroundColor: blue[50] };
            case 'completed':
                return { color: green[500], backgroundColor: green[50] };
            case 'rejected':
                return { color: red[500], backgroundColor: red[50] };
            default:
                return { color: black[500], backgroundColor: black[50] };
        }
    };

    const setTextBaseOnStatus = (status) => {
        switch (status) {
            case 'processing':
                return 'Đang xử lý';
            case 'digitalSignature':
                return 'Sẵn sàng ký số';
            case 'readyToSign':
                return 'Sẵn sàng ký số';
            case 'completed':
                return 'Hoàn thành';
            case 'rejected':
                return 'Không hợp lệ';
            default:
                return 'Không xác định';
        }
    };

    const handleAccept = async () => {
        setIsSending(true);
        try {
            const response = await SessionService.approveSignatureSessionByNotary(session.sessionId.id);
            if (response.status === 200) {
                toast.success('Chấp nhận thành công!');
                onClose();
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        if (session?.sessionId?.files) {
            const [docs, images] = session?.sessionId?.files.reduce(
                ([docAcc, imgAcc], file) => {
                    if (['.pdf', '.docx'].some((ext) => file.filename?.toString().toLowerCase().endsWith(ext))) {
                        docAcc.push(file);
                    } else if (['.png', '.jpg', '.jpeg'].some((ext) => file.filename?.toString().toLowerCase().endsWith(ext))) {
                        imgAcc.push(file);
                    }
                    return [docAcc, imgAcc];
                },
                [[], []],
            );

            setDocumentFiles(docs);
            setImageFiles(images);
        }
    }, [session]);

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `calc(${width}px - 20%)`,
                    height: `calc(${height}px - 20%)`,
                    bgcolor: white[50],
                    p: '24px',
                    borderRadius: 2,
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        gap: 2,
                    }}
                >
                    <IconButton sx={{ padding: 0, margin: 0, color: black[900] }} onClick={onClose}>
                        <ArrowBack sx={{ height: 24, width: 24 }} />
                    </IconButton>

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', sm: 'row' },
                        }}
                    >
                        <Typography
                            sx={{
                                flex: 1,
                                fontSize: 'clamp(14px, 2vw, 16px)',
                                fontWeight: 600,
                                color: black[900],
                            }}
                        >
                            Chi tiết hồ sơ công chứng - Mã số: {session.sessionId.id}
                        </Typography>

                        <Box
                            sx={{
                                display: 'inline-flex',
                                borderRadius: 100,
                                fontSize: 12,
                                fontWeight: 500,
                                padding: '4px 8px',
                                mt: { xs: 1, sm: 0 },
                                ...setStyleBaseOnStatus(session?.status),
                            }}
                        >
                            {setTextBaseOnStatus(session?.status)}
                        </Box>
                    </Box>
                </Box>

                {/* Middle Content */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        width: '100%',
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
                                Thông tin khách hàng
                            </Typography>

                            <InformationField title="Họ và tên" value={session?.sessionId?.createdBy.name} />
                            <InformationField title="Số CMND" value={session?.sessionId?.createdBy.citizenId} />
                            <InformationField title="Số điện thoại" value={session?.sessionId?.createdBy.phoneNumber} />
                            <InformationField title="Email" value={session?.sessionId?.createdBy.email} />
                        </Box>

                        {/* Notarization Document Information */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                padding: 2,
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
                                <InformationField title="Lĩnh vực công chứng" value={session?.sessionId?.notaryField.name} />
                                <InformationField title="Dịch vụ công chứng" value={session?.sessionId?.notaryService.name} />
                            </Box>
                        </Box>

                        {documentFiles.length > 0 && (
                            <Section title={'Tệp'}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        gap: 1,
                                        flex: 1,
                                    }}
                                >
                                    {documentFiles.map((file) => renderDocumentFiles(file))}
                                </Box>
                            </Section>
                        )}

                        {/* Image Section */}
                        {imageFiles.length > 0 && (
                            <Section title={'Ảnh'}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        gap: 1,
                                        flex: 1,
                                    }}
                                >
                                    {imageFiles.map((file) => renderImageFiles(file))}
                                </Box>
                            </Section>
                        )}
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: black[900],
                                textTransform: 'uppercase',
                                marginTop: 2,
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
                            {session?.sessionId?.output?.map((output, index) => (
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
                                            underlinecursor: 'pointer',
                                            ':hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                        onClick={() => window.open(output.firebaseUrl)}
                                    >
                                        {output?.filename}
                                    </Typography>
                                    <OpenInNew sx={{ color: black[500], fontSize: 16 }} />
                                </Box>
                            ))}
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
                            bgcolor: black[900],
                            '&:hover': { bgcolor: black[800] },
                            textTransform: 'none',
                            padding: '8px 32px',
                            '&:disabled': {
                                bgcolor: black[200],
                                color: black[400],
                            },
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
    );
};

export default DetailReadyToSignSessionModal;
