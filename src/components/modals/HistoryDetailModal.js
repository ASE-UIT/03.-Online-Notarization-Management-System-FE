import React, { useEffect, useState } from 'react';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import { ArrowBack, PictureAsPdf, PhotoRounded } from '@mui/icons-material';
import { dark, red, black, white, gray, yellow, blue, green } from '../../config/theme/themePrimitives';
import { toast } from 'react-toastify';
import NotaryStep from './NotaryStep';
import NotaryFeedback from '../services/NotaryFeedback.js';
import useWindowSize from '../../hooks/useWindowSize';
import NotarizationService from '../../services/notarization.service.js';

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

const HistoryDetailModal = ({ open, handleClose, data, notaryId }) => {
  const notarizationData = data.find((item) => item._id === notaryId);
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingSignature, setLoadingSignature] = useState(false);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const { width, height } = useWindowSize();

  const handleSignatureSave = async (signatureImageUrl) => {
    const signatureImageFile = new File([signatureImageUrl], notarizationData?.userId + '.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('signatureImage', signatureImageFile);
    formData.append('documentId', notarizationData._id);
    setLoadingSignature(true);
    try {
      await NotarizationService.approveSignatureByUser(formData);
      toast.success('Lưu chữ ký thành công');
    } catch (error) {
      setLoadingSignature(false);
      if (error.status === 409) {
        toast.error('Tài liệu này đã được ký số');
      } else {
        toast.error('Đã xảy ra lỗi khi lưu chữ ký');
      }
    } finally {
      setLoadingSignature(false);
    }
  };

  const renderStatusBox = (status) => {
    const statusConfig = {
      default: { text: 'Chưa xác nhận', backgroundColor: gray[50], color: gray[500] },
      pending: { text: 'Chờ xử lý', backgroundColor: dark[50], color: dark[500] },
      processing: { text: 'Đang xử lý', backgroundColor: yellow[50], color: yellow[500] },
      verification: { text: 'Đang xác minh', backgroundColor: '#f3ebfa', color: '#7007C1' },
      digitalSignature: { text: 'Sẵn sàng ký số', backgroundColor: blue[50], color: blue[500] },
      completed: { text: 'Hoàn tất', backgroundColor: green[50], color: green[500] },
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

  const renderFile = (file, isImage) => {
    const iconConfig = isImage
      ? { bgColor: yellow[50], color: yellow[500], Icon: PhotoRounded }
      : { bgColor: red[50], color: red[500], Icon: PictureAsPdf };

    return (
      <Box
        key={file.filename}
        sx={{
          display: 'flex',
          gap: 2,
          p: 1,
          borderRadius: 1,
          border: `1px solid ${black[50]}`,
          alignItems: 'center',
          boxShadow: 1,
          width: 'fit-content',
        }}
      >
        <Box
          sx={{
            backgroundColor: iconConfig.bgColor,
            color: iconConfig.color,
            borderRadius: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 1,
          }}
        >
          <iconConfig.Icon sx={{ fontSize: 14 }} />
        </Box>
        <Typography
          onClick={() => window.open(file.firebaseUrl)}
          sx={{
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            ':hover': { textDecoration: 'underline' },
          }}
        >
          {file.filename}
        </Typography>
      </Box>
    );
  };

  useEffect(() => {
    if (notarizationData?.files) {
      const [docs, images] = notarizationData.files.reduce(
        ([docAcc, imgAcc], file) => {
          const filename = file.filename?.toLowerCase();
          if (filename?.endsWith('.pdf') || filename?.endsWith('.docx')) docAcc.push(file);
          if (['.png', '.jpg', '.jpeg'].some((ext) => filename?.endsWith(ext))) imgAcc.push(file);
          return [docAcc, imgAcc];
        },
        [[], []],
      );
      setDocumentFiles(docs);
      setImageFiles(images);
    }

    const statusSteps = {
      pending: 0,
      processing: 1,
      verification: 2,
      digitalSignature: 3,
      completed: 4,
    };

    setCurrentStep(statusSteps[notarizationData?.status?.status] ?? 0);
  }, [notarizationData]);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box>
        <Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `calc(${width}px - 20%)`,
              height: `calc(${height}px - 20%)`,
              backgroundColor: white[50],
              borderRadius: 2,
              overflowY: 'scroll',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 1,
              p: 2,
              gap: 1,
              scrollbarWidth: { xs: 'none', sm: 'auto' },
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <IconButton onClick={handleClose}>
                  <ArrowBack
                    sx={{
                      color: black[900],
                    }}
                    fontSize="small"
                  />
                </IconButton>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 1,
                    width: '100%',
                  }}
                >
                  <Typography sx={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 600, color: black[900] }}>
                    Chi tiết hồ sơ công chứng {notarizationData._id && `- Mã số: #${notarizationData._id}`}
                  </Typography>
                  {renderStatusBox(notarizationData.status.status)}
                </Box>
              </Box>
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
              <InfoRow label="Lĩnh vực công chứng:" value={notarizationData?.notarizationField?.name} />
              <InfoRow label="Dịch vụ công chứng:" value={notarizationData?.notarizationService?.name} />
            </Section>

            {documentFiles.length > 0 && (
              <Section title="Tệp">{documentFiles.map((file) => renderFile(file, false))}</Section>
            )}
            {imageFiles.length > 0 && <Section title="Ảnh">{imageFiles.map((file) => renderFile(file, true))}</Section>}

            {notarizationData.status.status !== undefined && (
              <>
                {/* Steps Section */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    p: { xs: 0, sm: 2 },
                  }}
                >
                  <NotaryStep currentStep={currentStep} />
                  <NotaryFeedback
                    signature={notarizationData.signature}
                    output={notarizationData.output}
                    feedback={notarizationData.status.feedback}
                    onSignatureSave={handleSignatureSave}
                    loading={loadingSignature}
                  />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default HistoryDetailModal;
