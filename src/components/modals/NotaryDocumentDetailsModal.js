import { ArrowBack, PictureAsPdf, Error, FiberManualRecord, CheckCircleRounded, PhotoRounded } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { dark, red, black, white, gray, yellow, blue, green } from '../../config/theme/themePrimitives';
import NotaryStep from './NotaryStep';
import NotarizationService from '../../services/notarization.service';
import { toast } from 'react-toastify';

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <Typography sx={{ flex: 1, fontSize: 12, fontWeight: 600 }}>{label}</Typography>
    <Typography sx={{ fontSize: 12, fontWeight: 500 }}>{value}</Typography>
  </Box>
);

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

const NotaryDocumentDetailsModal = ({ open, handleClose, notarizationData }) => {
  console.log(notarizationData);
  const [currentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [documentFiles, setDocumentFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('notarizationService', JSON.stringify(notarizationData.notaryService));
      formData.append('notarizationField', JSON.stringify(notarizationData.notaryField));
      formData.append('requesterInfo', JSON.stringify(notarizationData.requesterInfo));

      notarizationData.files.forEach((file) => {
        if (file) {
          formData.append('files', file);
        }
      });

      const response = await NotarizationService.uploadNotarizationDocument(formData);
      toast.success('Tạo yêu cầu công chứng thành công!');
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const renderFileSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    }
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    }
    if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const renderStatusBox = (status) => {
    const statusConfig = {
      default: { text: 'Chưa xác nhận', backgroundColor: gray[50], color: gray[500] },
      pending: { text: 'Chờ xử lý', backgroundColor: dark[50], color: dark[500] },
      processing: { text: 'Đang xử lý', backgroundColor: yellow[50], color: yellow[500] },
      verification: { text: 'Đã xác nhận', backgroundColor: '#f3ebfa', color: '#7007C1' },
      digitalSignature: { text: 'Sẵn sàng ký số', backgroundColor: blue[50], color: blue[500] },
      completed: { text: 'Hoàn tất', backgroundColor: green[50], color: green[500] },
      invalid: { text: 'Không hợp lệ', backgroundColor: red[50], color: red[500] },
    };

    const { text, backgroundColor, color } = statusConfig[status] || statusConfig.default;

    return (
      <Box
        sx={{
          backgroundColor,
          color,
          borderRadius: '30px',
          py: 0.5,
          px: 2,
        }}
      >
        <Typography sx={{ fontSize: 12, fontWeight: 500 }}>{text}</Typography>
      </Box>
    );
  };

  const renderDocumentFiles = (file) => {
    return (
      <Box
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          borderRadius: 1,
          boxShadow: 1,
          border: `1px solid ${black[50]}`,
          alignItems: 'center',
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
          >
            {file.name}
          </Typography>
          <Typography sx={{ fontSize: 10, fontWeight: 400 }}>{renderFileSize(file.size)}</Typography>
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
          boxShadow: 1,
          border: `1px solid ${black[50]}`,
          alignItems: 'center',
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
          >
            {file.name}
          </Typography>
          <Typography sx={{ fontSize: 10, fontWeight: 400 }}>{renderFileSize(file.size)}</Typography>
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    if (notarizationData?.files) {
      const [docs, images] = notarizationData.files.reduce(
        ([docAcc, imgAcc], file) => {
          if (['.pdf', '.docx'].some((ext) => file.name.toLowerCase().endsWith(ext))) {
            docAcc.push(file);
          } else if (['.png', '.jpg', '.jpeg'].some((ext) => file.name.toLowerCase().endsWith(ext))) {
            imgAcc.push(file);
          }
          return [docAcc, imgAcc];
        },
        [[], []],
      );
      setDocumentFiles(docs);
      setImageFiles(images);
    }
  }, [notarizationData?.files]);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100vh',
            height: '90vh',
            backgroundColor: white[50],
            borderRadius: 2,
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 1,
            p: 2,
            gap: 1,
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={handleClose}>
                <ArrowBack
                  sx={{
                    color: black[900],
                  }}
                  fontSize="small"
                />
              </IconButton>
              <Typography sx={{ fontSize: 16, fontWeight: 600, color: black[900] }}>
                Chi tiết hồ sơ công chứng {notarizationData._id && `- Mã số: #${notarizationData._id}`}
              </Typography>
            </Box>
            {renderStatusBox(notarizationData.status)}
          </Box>
          {/* User Information Section */}
          <Section title="Thông tin khách hàng">
            <InfoRow label="Họ và tên:" value={notarizationData?.requesterInfo?.fullName} />
            <InfoRow label="Số CMND/CCCD:" value={notarizationData?.requesterInfo?.citizenId} />
            <InfoRow label="Số điện thoại:" value={notarizationData?.requesterInfo?.phoneNumber} />
            <InfoRow label="Email:" value={notarizationData?.requesterInfo?.email} />
          </Section>

          {/* Notarization Information Section */}
          <Section title="Thông tin công chứng">
            <InfoRow label="Lĩnh vực công chứng:" value={notarizationData?.notaryField?.name} />
            <InfoRow label="Dịch vụ công chứng:" value={notarizationData?.notaryService?.name} />
          </Section>

          {/* Files Section */}
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

          {/* Images Section */}
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
          {notarizationData.status !== undefined && (
            <>
              {/* Steps Section */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '32px',
                  p: '16px',
                }}
              >
                <NotaryStep currentStep={currentStep} />
                <Box
                  sx={{
                    flex: 1,
                    backgroundColor: white[50],
                    boxShadow: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                    height: 'fit-content',
                    borderRadius: 1,
                    border: `1px solid ${black[50]}`,
                  }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 600, textAlign: 'left' }}>Ghi chú</Typography>
                  <Box
                    sx={{
                      p: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 1,
                      borderRadius: 1,
                      backgroundColor: red[50],
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: 'fit-content',
                      my: 2,
                    }}
                  >
                    <Error fontSize={'small'} sx={{ color: red[400] }} />
                    <Typography sx={{ color: black[900], fontSize: 12, fontWeight: 500 }}>
                      Hồ sơ cần bổ sung thêm giấy tờ
                    </Typography>
                  </Box>

                  <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1, textAlign: 'left' }}>
                    Tài liệu cần bổ sung
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 1,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: 'fit-content',
                      p: 1,
                    }}
                  >
                    <FiberManualRecord sx={{ color: black[900], width: '8px', height: '8px' }} />
                    <Typography sx={{ color: black[900], fontSize: 12, fontWeight: 400 }}>
                      Giấy tờ chứng minh nhân dân
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {/* Contact Section */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  p: 1,
                  width: 'fit-content',
                  border: `1px solid ${black[50]}`,
                  borderRadius: 1,
                  backgroundColor: gray[50],
                }}
              >
                <Typography sx={{ color: black[900], fontSize: 14, fontWeight: 500, mb: 1 }}>Hỗ trợ khách hàng</Typography>
                <Typography sx={{ color: black[900], fontSize: 12, fontWeight: 400 }}>
                  Liên hệ: 1900-123-456 hoặc email: support@notary.vn
                </Typography>
              </Box>
            </>
          )}
        </Box>

        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.modal + 1,
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {notarizationData.status === undefined && (
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            endIcon={<CheckCircleRounded />}
            sx={{ py: 1, px: 4, alignSelf: 'flex-end', position: 'absolute', bottom: '3%', right: '5%' }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none' }}>Xác nhận</Typography>
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default NotaryDocumentDetailsModal;
