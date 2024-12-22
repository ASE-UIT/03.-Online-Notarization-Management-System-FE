import React from 'react';
import CustomAutocompleteField from './CustomAutocompleteField';
import { Box, Button, Typography } from '@mui/material';
import { black, gray, green, white, red } from '../../../config/theme/themePrimitives';
import CustomTextField from './CustomTextField';
import FileUploadSection from './FileUploadSection';
import { TaskAltRounded } from '@mui/icons-material';
import { getDocumentNameByCode } from '../../../utils/constants';

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    <Typography sx={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{label}</Typography>
    <Typography sx={{ fontSize: 14, fontWeight: 400 }}>{value}</Typography>
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
    <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'uppercase', color: black[900] }}>{title}</Typography>
    {children}
  </Box>
);

const requiredFields = [
  {
    label: 'Số bản sao',
    name: 'amount',
    placeholder: 'Nhập số lượng bản sao',
    type: 'number',
  },
  {
    label: 'Họ và tên',
    name: 'fullName',
    placeholder: 'Nhập họ và tên',
    type: 'text',
  },
  {
    label: 'Số điện thoại',
    name: 'phoneNumber',
    placeholder: 'Nhập số điện thoại',
    type: 'tel',
  },
  {
    label: 'Số CMND/CCCD/Hộ chiếu',
    name: 'citizenId',
    placeholder: 'Nhập số CMND/CCCD/Hộ chiếu',
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Nhập địa chỉ email',
    type: 'email',
  },
];

const NotarizationFormContent = ({
  currentStep,
  uploadedFiles,
  fieldsAndServices,
  selectedField,
  setSelectedField,
  fetchNotarizationField,
  selectedService,
  setSelectedService,
  fetchNotarizationService,
  handleNext,
  handlePrevious,
  handleFileChange,
  handleInputChange,
  handleRemoveFile,
  loadingNotarization,
  notarizationData,
  handleDocumentWalletChange,
  documentWalletFiles,
  handleRemoveDocumentWalletFile,
}) => {
  const stepTitles = [
    'Chọn lĩnh vực và dịch vụ công chứng bạn cần',
    'Điền đầy đủ thông tin yêu cầu công chứng',
    'Kiểm tra lại thông tin của bạn',
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <CustomAutocompleteField
              title={'Lĩnh vực công chứng'}
              options={fieldsAndServices.notarizationField}
              selectedOption={selectedField}
              setSelectedOption={setSelectedField}
              fetchOptions={fetchNotarizationField}
              loadingOptions={loadingNotarization}
            />

            <CustomAutocompleteField
              title={'Dịch vụ công chứng'}
              options={fieldsAndServices.notarizationService}
              selectedOption={selectedService}
              setSelectedOption={setSelectedService}
              fetchOptions={fetchNotarizationService}
              loadingOptions={loadingNotarization}
            />

            <Box>
              <Button variant="contained" size="small" sx={{ p: 1.5, backgroundColor: black[900] }} onClick={handleNext}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', color: white[50] }}>
                  Tiếp tục
                </Typography>
              </Button>
            </Box>
          </>
        );
      case 1:
        return (
          <>
            {requiredFields.map((field, index) => (
              <CustomTextField
                key={index}
                label={field.label}
                name={field.name}
                value={notarizationData[field.name]}
                placeholder={field.placeholder}
                onChange={handleInputChange}
                type={field.type}
                required
              />
            ))}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: 'capitalize', color: black[900], mb: 1 }}>
                Đăng tải các tài liệu cần thiết <span style={{ color: red[500] }}>*</span>
              </Typography>

              {notarizationData?.notaryService?.required_documents.map((document, index) => (
                <FileUploadSection
                  key={index}
                  title={getDocumentNameByCode(document)}
                  currentFiles={uploadedFiles.filter((file) => file.type === document)}
                  handleCurrentFileChange={(e) => handleFileChange(e, document)}
                  handleRemoveCurrentFile={handleRemoveFile}
                  documentWalletFiles={documentWalletFiles.filter((file) => file.type === document)}
                  handleDocumentWalletFileChange={(file) => handleDocumentWalletChange(file, document)}
                  handleRemoveDocumentWalletFile={handleRemoveDocumentWalletFile}
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button variant="contained" size="small" sx={{ p: 1.5, backgroundColor: white[200] }} onClick={handlePrevious}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', color: black[900] }}>
                  Trở lại
                </Typography>
              </Button>
              <Button variant="contained" size="small" sx={{ p: 1.5, backgroundColor: black[900] }} onClick={handleNext}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', color: white[50] }}>
                  Tiếp tục
                </Typography>
              </Button>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <Section title="Thông tin công chứng">
              <InfoRow label="Lĩnh vực công chứng:" value={notarizationData?.notaryField?.name} />
              <InfoRow label="Dịch vụ công chứng:" value={notarizationData?.notaryService?.name} />
            </Section>

            <Section title="Thông tin khách hàng">
              <InfoRow label="Họ và tên:" value={notarizationData?.requesterInfo?.fullName} />
              <InfoRow label="Số CMND/CCCD:" value={notarizationData?.requesterInfo?.citizenId} />
              <InfoRow label="Số điện thoại:" value={notarizationData?.requesterInfo?.phoneNumber} />
              <InfoRow label="Email:" value={notarizationData?.requesterInfo?.email} />
            </Section>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: 'capitalize', color: black[900], mb: 1 }}>
                Danh sách tài liệu đã đăng tải
              </Typography>

              {notarizationData?.notaryService?.required_documents.map((document, index) => (
                <FileUploadSection
                  key={index}
                  currentFiles={uploadedFiles.filter((file) => file.type === document)}
                  handleFileChange={(e) => handleFileChange(e, document)}
                  handleRemoveFile={handleRemoveFile}
                  title={getDocumentNameByCode(document)}
                  handleDocumentWalletChange={(file) => handleDocumentWalletChange(file, document)}
                  documentWalletFiles={documentWalletFiles.filter((file) => file.type === document)}
                  handleRemoveDocumentWalletFile={handleRemoveDocumentWalletFile}
                  confirmed
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button variant="contained" size="small" sx={{ p: 1.5, backgroundColor: white[200] }} onClick={handlePrevious}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', color: black[900] }}>
                  Trở lại
                </Typography>
              </Button>
              <Button variant="contained" size="small" sx={{ p: 1.5, backgroundColor: black[900] }} onClick={handleNext}>
                <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', color: white[50] }}>
                  Gửi yêu cầu
                </Typography>
              </Button>
            </Box>
          </>
        );
      case 3:
        return (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3,
                border: `1px solid ${black[50]}`,
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  py: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <TaskAltRounded sx={{ color: green[500], fontSize: 24 }} />
                  <Typography sx={{ fontSize: 24, fontWeight: 600, color: black[900] }}>Thanh toán thành công</Typography>
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 400, color: black[500] }}>
                  Yêu cầu công chứng của bạn đã được xử lý.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTop: `1px solid ${gray[100]}`,
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: black[900],
                  }}
                >
                  Cảm ơn bạn đã thanh toán
                </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 400, color: black[500], textAlign: 'center' }}>
                  Yêu cầu công chứng của bạn hiện đã hoàn tất. Bạn sẽ sớm nhận được email xác nhận kèm theo hướng dẫn thêm.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  sx={{ p: 1.5, backgroundColor: black[900] }}
                  onClick={handleNext}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', color: white[50] }}>
                    Trở về Trang chủ
                  </Typography>
                </Button>
              </Box>
            </Box>
          </>
        );
    }
  };

  return (
    <>
      <Box sx={{ px: 3, pb: 3 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{stepTitles[currentStep]}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          px: 3,
          pb: 3,
        }}
      >
        {renderStep()}
      </Box>
    </>
  );
};

export default NotarizationFormContent;
