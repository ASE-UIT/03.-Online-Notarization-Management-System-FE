import React from 'react';
import { Stepper, Step, StepLabel, Typography, StepConnector, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/system';
import { primary, black, gray, white } from '../../config/theme/themePrimitives';

const steps = [
  { label: 'Chọn loại công chứng' },
  { label: 'Cung cấp thông tin' },
  { label: 'Kiểm tra lại yêu cầu' },
];

const CustomConnector = styled(StepConnector)(({ lineColor }) => ({
  '& .MuiStepConnector-line': {
    minWidth: 120,
    color: black[200],
  },
}));

const CustomCircleIcon = styled('div')(({ bgColor, textColor, isFirstActive, isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: bgColor || black[200],
  color: textColor || white[50],
  fontSize: 12,
  transition: 'all 0.2s',
  fontWeight: isActive ? 600 : 400,
  transform: isFirstActive ? 'scale(1.2)' : isActive ? 'scale(1.2)' : 'scale(1)',
}));

const CreateNotarizationProfileStepper = ({ currentStep }) => {
  return (
    <Stepper activeStep={currentStep} orientation="horizontal" connector={<CustomConnector />}>
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel
            icon={
              <IconButton sx={{ width: 24, height: 24, padding: 0, cursor: 'pointer' }} disabled={index > currentStep}>
                {index === currentStep ? (
                  <CustomCircleIcon bgColor={primary[500]} textColor={white[50]} isFirstActive={index === 0} isActive>
                    {index + 1}
                  </CustomCircleIcon>
                ) : index < currentStep ? (
                  <CheckCircleIcon sx={{ color: primary[500] }} />
                ) : (
                  <CustomCircleIcon>{index + 1}</CustomCircleIcon>
                )}
              </IconButton>
            }
          >
            <Typography
              sx={{
                color: index === currentStep ? black[900] : gray[500],
                fontWeight: index === currentStep ? 500 : 400,
                fontSize: 14,
              }}
            >
              {step.label}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CreateNotarizationProfileStepper;
