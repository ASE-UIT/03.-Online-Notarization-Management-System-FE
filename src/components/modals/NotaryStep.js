import React from 'react';
import { Stepper, Step, StepLabel, Typography, Box, StepConnector, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/system';
import { primary, black, gray, white } from '../../config/theme/themePrimitives';

const steps = [
  { label: 'Chờ xử lý' },
  { label: 'Đang xử lý' },
  { label: 'Đang xác minh' },
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

const NotaryStep = ({ currentStep }) => {
  const handleStepClick = (index) => {
    console.log('index', index);
  };

  return (
    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
      <Stepper activeStep={currentStep} orientation="vertical" connector={<CustomConnector />}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              icon={
                <IconButton
                  onClick={() => handleStepClick(index)}
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
                  textWrap: 'nowrap',
                }}
              >
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default NotaryStep;
