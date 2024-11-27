import React from 'react';
import CustomAutocompleteField from './CustomAutocompleteField';
import { Box, Button, Typography } from '@mui/material';
import { black, gray, green, white, red } from '../../config/theme/themePrimitives';
import CustomTextField from './CustomTextField';
import FileUploadSection from './FileUploadSection';
import { TaskAltRounded } from '@mui/icons-material';

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
}) => {
  const stepTitles = [
    'Chọn lĩnh vực và dịch vụ công chứng bạn cần',
    'Điền đầy đủ thông tin yêu cầu công chứng',
    'Kiểm tra lại thông tin của bạn',
  ];

  const renderStep = () => {
    if (currentStep === 0) {
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
    }

    if (currentStep === 1) {
      return (
        <>
          <CustomTextField
            label={'Số bản sao'}
            name={'numberOfCopies'}
            value={notarizationData.numberOfCopies}
            placeholder={'Nhập số lượng bản sao'}
            onChange={handleInputChange}
            required
          />
          <CustomTextField
            label={'Họ và tên'}
            name={'fullName'}
            value={notarizationData.requesterInfo.fullName}
            placeholder={'Nhập họ và tên'}
            onChange={handleInputChange}
            required
          />

          <CustomTextField
            label={'Số điện thoại'}
            name={'phoneNumber'}
            value={notarizationData.requesterInfo.phoneNumber}
            placeholder={'Nhập số điện thoại'}
            onChange={handleInputChange}
            required
          />

          <CustomTextField
            label={'Số CMND/CCCD/Hộ chiếu'}
            name={'citizenId'}
            value={notarizationData.requesterInfo.citizenId}
            placeholder={'Nhập số CMND/CCCD/Hộ chiếu'}
            onChange={handleInputChange}
            required
          />

          <CustomTextField
            label={'Email'}
            name={'email'}
            value={notarizationData.requesterInfo.email}
            placeholder={'Nhập địa chỉ email'}
            onChange={handleInputChange}
            required
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: 'capitalize', color: black[900], mb: 1 }}>
              Đăng tải các tài liệu cần thiết <span style={{ color: red[500] }}>*</span>
            </Typography>

            <FileUploadSection
              uploadedFiles={uploadedFiles.filter((file) => file.type === 'giayChungNhanQuyenSohuu')}
              handleFileChange={(e) => handleFileChange(e, 'giayChungNhanQuyenSohuu')}
              handleRemoveFile={handleRemoveFile}
              title="Giấy chứng nhận quyền sở hữu"
            />
            <FileUploadSection
              uploadedFiles={uploadedFiles.filter((file) => file.type === 'hoChieuHoacCMND')}
              handleFileChange={(e) => handleFileChange(e, 'hoChieuHoacCMND')}
              handleRemoveFile={handleRemoveFile}
              title="Hộ chiếu hoặc chứng minh nhân dân"
            />
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
    }

    if (currentStep === 2) {
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

            <FileUploadSection
              uploadedFiles={uploadedFiles.filter((file) => file.type === 'giayChungNhanQuyenSohuu')}
              handleFileChange={(e) => handleFileChange(e, 'giayChungNhanQuyenSohuu')}
              handleRemoveFile={handleRemoveFile}
              title="Giấy chứng nhận quyền sở hữu"
              confirmed={true}
            />
            <FileUploadSection
              uploadedFiles={uploadedFiles.filter((file) => file.type === 'hoChieuHoacCMND')}
              handleFileChange={(e) => handleFileChange(e, 'hoChieuHoacCMND')}
              handleRemoveFile={handleRemoveFile}
              title="Hộ chiếu hoặc chứng minh nhân dân"
              confirmed={true}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="contained" size="small" sx={{ p: 1.5, backgroundColor: white[200] }} onClick={handlePrevious}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', color: black[900] }}>
                Trở lại
              </Typography>
            </Button>
            <Button variant="contained" size="small" sx={{ p: 1.5, backgroundColor: black[900] }} onClick={handleNext}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', color: white[50] }}>
                Tiến hành thanh toán
              </Typography>
            </Button>
          </Box>
        </>
      );
    }

    if (currentStep === 3) {
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
