import { ArrowBack, PictureAsPdf, PhotoRounded } from '@mui/icons-material';
import { Backdrop, Box, CircularProgress, IconButton, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { dark, red, black, white, gray, yellow, blue, green } from '../../config/theme/themePrimitives';
import NotaryStep from './NotaryStep';
import NotaryFeedback from '../services/NotaryFeedback.js';
import useWindowSize from '../../hooks/useWindowSize';

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

const HistoryDetailModal = ({ open, handleClose, data, notaryId, load }) => {
  let notarizationData;

  data.forEach((element) => {
    if (element._id === notaryId) notarizationData = element;
  });

  const [currentStep, setCurrentStep] = useState(0);
  const loading = false;
  const [documentFiles, setDocumentFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const { width, height } = useWindowSize();

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
          width: 'fit-content',
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
            onClick={() => window.open(file.firebaseUrl)}
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
          boxShadow: 1,
          border: `1px solid ${black[50]}`,
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
          >
            {file.filename}
          </Typography>
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    if (notarizationData?.files) {
      const [docs, images] = notarizationData.files.reduce(
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

    if (notarizationData.status.status === 'pending') setCurrentStep(0);
    if (notarizationData.status.status === 'processing') setCurrentStep(1);
    if (notarizationData.status.status === 'verification') setCurrentStep(2);
    if (notarizationData.status.status === 'digitalSignature') setCurrentStep(3);
    if (notarizationData.status.status === 'completed') setCurrentStep(4);
  }, [notarizationData]);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box>
        {load ? (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${width}px - 20%`,
              height: `${height}px - 50%`,
              backgroundColor: white[50],
              borderRadius: 2,
              overflowY: 'scroll',
              display: 'flex',
              boxShadow: 1,
              p: 2,
              gap: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress></CircularProgress>
          </Box>
        ) : (
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
                    <NotaryFeedback feedback={notarizationData.status.feedback}></NotaryFeedback>
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
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default HistoryDetailModal;
