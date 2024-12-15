import { Avatar, Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import { ArrowBack, Cancel, CheckCircle, DriveFolderUploadRounded, PictureAsPdf, PhotoRounded } from '@mui/icons-material'
import { blue, red, yellow, black, white, gray, green } from '../../config/theme/themePrimitives'
import InformationField from './InformationField'
import NotarizationService from '../../services/notarization.service'

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
                width: 'fit-content'
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
                width: 'fit-content'
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

const DetailDocumentModal = ({ open, onClose, document }) => {
    const [feedback, setFeedback] = useState('');
    const [sending, setSending] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const isDisabled = sending || files.length === 0 || feedback === '';
    const [documentFiles, setDocumentFiles] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

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

    const prepareFormData = (action, feedback, files) => {
        const formData = new FormData();
        formData.append('action', action);
        formData.append('feedback', feedback);

        files.forEach((file) => {
            formData.append(`files`, file);
        });

        return formData;
    };

    const handleAccept = async () => {
        setSending(true);
        const formData = prepareFormData('accept', feedback, files);

        try {
            await NotarizationService.forwardDocumentStatus(document.documentId.id, formData);
            setSending(false);
            onClose();
        } catch (error) {
            console.error('Error during accepting document:', error);
            setSending(false);
        }
    };

    const handleReject = async () => {
        setSending(true);
        const formData = prepareFormData('reject', feedback, files);

        try {
            await NotarizationService.forwardDocumentStatus(document.documentId.id, formData);
            setSending(false);
            onClose();
        } catch (error) {
            console.error('Error during rejecting document:', error);
            setSending(false);
        }
    };


    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const validFiles = selectedFiles.filter(file =>
            ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
        );

        if (validFiles) {
            setFiles((prevFiles) => [...prevFiles, ...validFiles]);
        }
        fileInputRef.current.value = null;
    };

    useEffect(() => {
        if (document?.documentId?.files) {
            const [docs, images] = document?.documentId?.files.reduce(
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
    }, [document]);

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
                        Chi tiết hồ sơ công chứng - Mã số: {document?.documentId?.id}
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

                            <InformationField title="Họ và tên" value={document?.documentId?.requesterInfo?.fullName} />
                            <InformationField title="Số CMND" value={document?.documentId?.requesterInfo?.citizenId} />
                            <InformationField title="Số điện thoại" value={document?.documentId?.requesterInfo?.phoneNumber} />
                            <InformationField title="Email" value={document?.documentId?.requesterInfo?.email} />
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
                                <InformationField title="Lĩnh vực công chứng" value={document?.documentId?.notarizationField?.name} />
                                <InformationField title="Dịch vụ công chứng" value={document?.documentId?.notarizationService?.name} />
                            </Box>
                        </Box>

                        {/* File Section */}
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
                            rows={12}
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
                                height: '100%',
                            }}
                        >
                            {/* Tiêu đề Tài liệu phản hồi */}
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: black[900],
                                    textTransform: 'uppercase',
                                }}
                            >
                                Tài liệu phản hồi
                            </Typography>

                            {/* Phần còn lại gồm nút upload và danh sách tài liệu */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexGrow: 1,
                                    justifyContent: 'space-between',
                                }}
                            >
                                {/* Nút Upload */}
                                <Button
                                    disableTouchRipple
                                    onClick={handleUploadClick}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        gap: 2,
                                        padding: 1,
                                        borderRadius: 2,
                                        border: `1px solid ${black[50]}`,
                                        marginTop: 2,
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            borderRadius: 100,
                                            border: `1px dashed ${black[900]}`,
                                            bgcolor: 'transparent',
                                            color: black[900],
                                        }}
                                    >
                                        <DriveFolderUploadRounded fontSize='small' />
                                    </Avatar>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: 12,
                                                fontWeight: 400,
                                                color: black[500],
                                                textTransform: 'none',
                                            }}
                                        >
                                            Kéo và thả hoặc chọn tệp
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: 10,
                                                fontWeight: 400,
                                                color: black[300],
                                                textTransform: 'none',
                                            }}
                                        >
                                            Định dạng: pdf, doc, docx
                                        </Typography>
                                    </Box>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx"
                                    />
                                </Button>

                                {/* Danh sách tài liệu */}
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
                                    {files.map((file, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                padding: '4px 12px',
                                                borderRadius: '16px',
                                                backgroundColor: black[50],
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    fontWeight: 400,
                                                    color: black[300],
                                                    marginRight: 1,
                                                    userSelect: 'none',
                                                }}
                                            >
                                                {file.name}
                                            </Typography>
                                            <IconButton sx={{ padding: 0, margin: 0 }}>
                                                <Cancel
                                                    sx={{
                                                        color: black[300],
                                                        fontSize: 16,
                                                        ":hover": { color: black[900] },
                                                    }}
                                                />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
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
                        disabled={isDisabled}
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
                        disabled={isDisabled}
                    >
                        Chấp nhận
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default DetailDocumentModal