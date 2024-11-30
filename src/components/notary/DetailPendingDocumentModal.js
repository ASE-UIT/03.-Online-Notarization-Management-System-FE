import { Autocomplete, Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import { ArrowBack, Cancel, CheckCircle } from '@mui/icons-material'
import { blue, green, red, yellow, black, white, gray } from '../../config/theme/themePrimitives'
import { purple } from '@mui/material/colors'
import InformationField from './InformationField'
import FileField from './FileField'
import ImplementDocumentField from './ImplementDocumentField'

const DetailPendingDocumentModal = ({ open, onClose, document }) => {
    const data = {
        id: 1,
        user: {
            name: 'Nguyễn Văn A',
            identify: '123456789',
            phone: '0123456789',
            email: 'nguyenvana@gmail.com',
        },
        notarizationField: 'Công chứng hợp đồng mua bán đất',
        notarizationService: 'Công chứng hợp đồng mua bán đất',
        status: 'pending',
    }

    const lackDocument = [
        'CCCD/CMND',
        'Hộ khẩu',
        'Giấy khai sinh',
        'Hộ chiếu',
    ];

    const setStyleBaseOnStatus = (status) => {
        switch (status) {
            case 'pending': return { color: yellow[500], backgroundColor: yellow[50] };
            case 'processing': return { color: purple[500], backgroundColor: purple[50] };
            case 'digitalSignature': return { color: blue[500], backgroundColor: blue[50] };
            case 'completed': return { color: green[500], backgroundColor: green[50] };
            case 'rejected': return { color: red[500], backgroundColor: red[50] };
            default: return { color: black[500], backgroundColor: black[50] };
        }
    };

    const setTextBaseOnStatus = (status) => {
        switch (status) {
            case 'pending': return 'Đang xử lý';
            case 'processing': return 'Đang xác minh';
            case 'digitalSignature': return 'Sẵn sàng ký số';
            case 'completed': return 'Hoàn thành';
            case 'rejected': return 'Không hợp lệ';
            default: return 'Không xác định';
        }
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
                    <IconButton sx={{ padding: 0, margin: 0, color: black[900] }}>
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
                        Chi tiết hồ sơ công chứng - Mã số: 6722157ce89b01001f5ca296
                    </Typography>

                    <Box sx={{ borderRadius: 100, fontSize: 12, fontWeight: 500, padding: '4px 8px', ...setStyleBaseOnStatus(data.status) }}>
                        {setTextBaseOnStatus(data.status)}
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

                            <InformationField title="Họ và tên" value={data.user.name} />
                            <InformationField title="Số CMND" value={data.user.identify} />
                            <InformationField title="Số điện thoại" value={data.user.phone} />
                            <InformationField title="Email" value={data.user.email} />
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
                                <InformationField title="Lĩnh vực công chứng" value={data.notarizationField} />
                                <InformationField title="Dịch vụ công chứng" value={data.notarizationService} />
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

                    {/* Right Content */}
                    <Box
                        sx={{
                            flex: 1,
                            gap: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50%',
                        }}
                    >
                        {/* Note Section */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '12px',
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
                                Ghi chú
                            </Typography>

                            <TextField
                                multiline
                                rows={10}
                                fullWidth
                                placeholder="Nhập nội dung ghi chú"
                                variant="outlined"
                                sx={{
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
                            />
                        </Box>

                        {/* Implement Document */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '12px',
                                padding: 2,
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
                                Tài liệu cần bổ sung
                            </Typography>

                            <ImplementDocumentField title="Lĩnh vực công chứng" value="Công chứng hợp đồng giao dịch bất động sản" />
                            <ImplementDocumentField title="Dịch vụ công chứng" value="Công chứng hợp đồng mua bán đất" />

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        color: black[900],
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    Tài liệu cần bổ sung
                                </Typography>
                                <Autocomplete
                                    multiple
                                    options={lackDocument}
                                    size="small"
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Chọn tài liệu cần bổ sung"
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    fontSize: 12,
                                                    '& fieldset': { borderColor: gray[200] },
                                                    '&:hover fieldset': { borderColor: black[900] },
                                                    '&.Mui-focused fieldset': { borderColor: black[900], borderWidth: 1 },
                                                },
                                                '& .MuiAutocomplete-tag': {
                                                    backgroundColor: gray[100],
                                                    color: black[900],
                                                    fontSize: 12,
                                                },
                                            }}
                                        />
                                    )}
                                />
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
                        }}
                        endIcon={<Cancel />}
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
                        }}
                        endIcon={<CheckCircle />}
                    >
                        Chấp nhận
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default DetailPendingDocumentModal