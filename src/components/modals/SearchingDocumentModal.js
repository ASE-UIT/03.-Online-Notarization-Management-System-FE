import React from 'react'
import { Box, Modal, Typography, IconButton, styled } from '@mui/material'
import { white, black, dark, gray, yellow, green, red, blue, primary } from '../../config/theme/themePrimitives'
import { ArrowBack } from '@mui/icons-material'
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material'
import { Step, StepLabel, StepConnector, Stepper } from '@mui/material'

const steps = [
  { label: 'Chờ xử lý' },
  { label: 'Kiểm tra hồ sơ' },
  { label: 'Tiếp nhận và xử lý' },
  { label: 'Sẵn sàng ký số' },
  { label: 'Hoàn tất' },
];

const CustomConnector = styled(StepConnector)(({ lineColor }) => ({
  '& .MuiStepConnector-line': {
    minHeight: 80,
  },
}));

const CustomCircleIcon = styled('div')(({ bgColor, textColor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: bgColor || black[300],
  color: textColor || white[50],
  fontSize: 12,
  fontWeight: 'bold',
}));

const renderStatusBox = (status) => {
  const statusConfig = {
    pending: { text: 'Chờ xử lý', backgroundColor: dark[50], color: dark[500] },
    processing: { text: 'Đang xử lý', backgroundColor: yellow[50], color: yellow[500] },
    digitalSignature: { text: 'Sẵn sàng ký số', backgroundColor: blue[50], color: blue[500] },
    completed: { text: 'Hoàn tất', backgroundColor: green[50], color: green[500] },
    rejected: { text: 'Không hợp lệ', backgroundColor: red[50], color: red[500] },
    default: { text: 'Không xác định', backgroundColor: gray[50], color: gray[500] }
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

const setCurrentStep = (status) => {
  if (status === 'pending') return 0;
  if (status === 'processing') return 1;
  if (status === 'verification') return 2;
  if (status === 'digitalSignature') return 3;
  if (status === 'completed') return 4;
  if (status === 'rejected') return 5;
}

const SearchingDocumentModal = ({ open, handleClose, document }) => {
  const currentStep = setCurrentStep(document?.status);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          maxHeight: '90vh',
          backgroundColor: white[50],
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 1,
          gap: 2,
          paddingX: 4,
          paddingY: 2,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
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
              Chi tiết hồ sơ công chứng {document?._id && `- Mã số: #${document?._id}`}
            </Typography>
          </Box>
          {renderStatusBox(document?.status)}
        </Box>

        {document?.status !== undefined && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {/* Steps Section */}
            <Stepper activeStep={currentStep} orientation="vertical" connector={<CustomConnector />}>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    icon={
                      <IconButton
                        sx={{ width: 24, height: 24, padding: 0, cursor: 'pointer' }}
                        disabled={index > currentStep}
                      >
                        {index === currentStep ? (
                          <CheckCircleIcon sx={{ color: primary[500] }} />
                        ) : index < currentStep ? (
                          <CustomCircleIcon bgColor={primary[500]} textColor={white[50]}>
                            {index + 1}
                          </CustomCircleIcon>
                        ) : (
                          <CustomCircleIcon>{index + 1}</CustomCircleIcon>
                        )}
                      </IconButton>
                    }
                  >
                    <Typography
                      sx={{
                        color: index === currentStep ? primary[500] : index < currentStep ? primary[500] : gray[500],
                        fontWeight: index === currentStep ? 'bold' : 'normal',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      {step.label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: 2,
                ml: 2,
              }}
            >
              {/* Information Section */}
              <Box
                sx={{
                  flex: 2,
                  padding: 3,
                  backgroundColor: white[50],
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  border: `1px solid ${gray[200]}`,
                }}
              >
                {/* Ghi chú */}
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Ghi chú</Typography>
                <Typography sx={{ fontSize: 12 }}>{document?.feedback || 'Không có ghi chú'}</Typography>
              </Box>
              {/* Hỗ trợ khách hàng */}
              <Box
                sx={{
                  p: 2,
                  backgroundColor: gray[50],
                  borderRadius: 1,
                  border: `1px solid ${gray[200]}`,
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>Hỗ trợ khách hàng</Typography>
                <Typography sx={{ fontSize: 12 }}>Liên hệ: 1900-123-456 hoặc email: support@notary.vn</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default SearchingDocumentModal