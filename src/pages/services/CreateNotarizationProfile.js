import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Autocomplete } from '@mui/material';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { black, dark, gray, primary, red, white } from '../../config/theme/themePrimitives';
import UploadedFileList from '../../components/services/UploadedFileList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotaryDocumentDetailsModal from '../../components/modals/NotaryDocumentDetailsModal';
import NotarizationService from '../../services/notarization.service';
import { ChevronRightRounded } from '@mui/icons-material';

const CreateNotarizationProfile = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notarizationData, setNotarizationData] = useState(null);
  const [notarizationField, setNotarizationField] = useState([]);
  const [notarizationService, setNotarizationService] = useState([]);
  const [loadingNotarization, setLoadingNotarization] = useState(false);
  const [selectedService, setSelectedService] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [requesterInfo, setRequesterInfo] = useState({});

  const [openModal, setOpenModal] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    const validFormats = ['.pdf', '.docx', '.png', '.jpg'];

    files.forEach((file) => {
      const isValid = validFormats.some((format) => file.name.toLowerCase().endsWith(format));
      if (!isValid) {
        toast.error(`${file.name}: Tài liệu được tải lên không có định dạng hợp lệ`);
        return;
      }

      setUploadedFiles((prev) => [...prev, file]);
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFormats = ['.pdf', '.docx', '.png', '.jpg'];

    files.forEach((file) => {
      const isValid = validFormats.some((format) => file.name.toLowerCase().endsWith(format));
      if (!isValid) {
        toast.error(`${file.name}: Tài liệu được tải lên không có định dạng hợp lệ`);
        return;
      }

      setUploadedFiles((prev) => [...prev, file]);
    });
  };

  const handleInputChange = (event) => {
    setRequesterInfo({ ...requesterInfo, [event.target.name]: event.target.value });
  };

  const handleRemove = (fileToRemove) => {
    setUploadedFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleOpenModal = () => {
    if (!selectedService) {
      toast.error('Vui lòng chọn dịch vụ công chứng.');
      return;
    }

    if (!selectedField) {
      toast.error('Vui lòng chọn lĩnh vực công chứng.');
      return;
    }

    if (!requesterInfo.fullName || !requesterInfo.citizenId || !requesterInfo.phoneNumber || !requesterInfo.email) {
      toast.error('Vui lòng điền đầy đủ thông tin người yêu cầu công chứng.');
      return;
    }

    if (uploadedFiles.length === 0) {
      toast.error('Vui lòng tải lên ít nhất một tài liệu.');
      return;
    }

    const data = {
      notaryService: selectedService,
      notaryField: selectedField,
      requesterInfo,
      files: uploadedFiles,
    };

    setNotarizationData(data);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fetchNotarizationField = async () => {
    if (notarizationField.length > 0) return;
    setLoadingNotarization(true);
    try {
      const response = await NotarizationService.getAllNotarizationField();
      setNotarizationField(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingNotarization(false);
    }
  };

  const fetchNotarizationService = async () => {
    if (notarizationService.length > 0) return;
    setLoadingNotarization(true);
    try {
      console.log('selectedField', selectedField);
      const response = await NotarizationService.getNotarizationServiceByFieldId(selectedField.id);
      console.log('response', response);
      setNotarizationService(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingNotarization(false);
    }
  };

  useEffect(() => {
    setNotarizationService([]);
    setSelectedService(null);
  }, [selectedField]);

  useEffect(() => {
    console.log('notarizationData', notarizationData);
  }, [notarizationData]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 6,
          backgroundColor: gray[50],
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 5, md: 10 } }}>
          <Typography variant="h3" textAlign="center" color={dark[500]} sx={{ maxWidth: 900, mx: 'auto', fontWeight: 700 }}>
            Tạo hồ sơ công chứng
          </Typography>
          <Typography variant="body2" textAlign="center" color={dark[500]} sx={{ mt: 2 }}>
            Chú ý: Những mục đánh dấu
            <span style={{ color: red[500] }}> * </span> là bắt buộc.
          </Typography>
        </Box>
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 4,
          backgroundColor: white[50],
        }}
      >
        {/* Autocomplete Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: black[900], mb: 1 }}>
              Lĩnh vực công chứng
            </Typography>
            <Autocomplete
              size="small"
              loading={loadingNotarization}
              options={notarizationField}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => setSelectedField(value)}
              sx={{ backgroundColor: white[50] }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Chọn lĩnh vực công chứng"
                  inputProps={{ ...params.inputProps, readOnly: true, style: { fontSize: '0.875rem' } }}
                />
              )}
              value={selectedField}
              onOpen={fetchNotarizationField}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: black[900], mb: 1 }}>
              Lĩnh vực công chứng
            </Typography>
            <Autocomplete
              size="small"
              loading={loadingNotarization}
              options={notarizationService}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => setSelectedService(value)}
              sx={{ backgroundColor: white[50], fontSize: '0.875rem' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Chọn dịch vụ công chứng"
                  inputProps={{ ...params.inputProps, readOnly: true, style: { fontSize: '0.875rem' } }}
                />
              )}
              value={selectedService}
              onOpen={fetchNotarizationService}
            />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" mt={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: black[900], mb: 1 }}>
                Họ và tên <span style={{ color: red[500] }}>*</span>
              </Typography>
              <TextField
                size="small"
                fullWidth
                name="fullName"
                variant="outlined"
                sx={{ backgroundColor: white[50] }}
                value={requesterInfo.fullName}
                onChange={handleInputChange}
                inputProps={{
                  style: { fontSize: '0.875rem' },
                  placeholder: 'Nhập họ và tên',
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: black[900], mb: 1 }}>
                Số điện thoại <span style={{ color: red[500] }}>*</span>
              </Typography>
              <TextField
                size="small"
                fullWidth
                name="phoneNumber"
                variant="outlined"
                sx={{ backgroundColor: white[50] }}
                value={requesterInfo.phoneNumber}
                onChange={handleInputChange}
                inputProps={{
                  style: { fontSize: '0.875rem' },
                  placeholder: 'Nhập số điện thoại',
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: black[900], mb: 1 }}>
                Số CMND/CCCD <span style={{ color: red[500] }}>*</span>
              </Typography>
              <TextField
                size="small"
                fullWidth
                name="citizenId"
                variant="outlined"
                sx={{ backgroundColor: white[50] }}
                value={requesterInfo.citizenId}
                onChange={handleInputChange}
                inputProps={{
                  style: { fontSize: '0.875rem' },
                  placeholder: 'Nhập số CMND/CCCD/Hộ chiếu',
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: black[900], mb: 1 }}>
                Email <span style={{ color: red[500] }}>*</span>
              </Typography>
              <TextField
                size="small"
                fullWidth
                name="email"
                variant="outlined"
                sx={{ backgroundColor: white[50] }}
                value={requesterInfo.email}
                onChange={handleInputChange}
                inputProps={{
                  style: { fontSize: '0.875rem' },
                  placeholder: 'Nhập địa chỉ email',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Upload Section */}
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          backgroundColor: gray[50],
          p: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            backgroundColor: white[50],
            p: isDragging ? 4 : 2,
            boxShadow: 1,
            borderRadius: 2,
            width: { xs: '90%', sm: '80%', md: '68%' },
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'padding 0.3s',
          }}
        >
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              p: 4,
              borderRadius: 1,
              backgroundColor: isDragging ? gray[200] : gray[50],
              borderStyle: 'dashed',
              borderColor: black[200],
              transition: 'background-color 0.3s',
            }}
          >
            <IconButton
              component="label"
              sx={{
                backgroundColor: primary[500],
                color: white[500],
                p: 2,
                borderRadius: '50%',
                boxShadow: 2,
                '&:hover': { backgroundColor: primary[600] },
              }}
            >
              <FileUploadRoundedIcon sx={{ color: white[50] }} />
              <input type="file" hidden multiple onChange={handleFileChange} accept=".pdf,.docx,.png,.jpg" />
            </IconButton>

            <Typography sx={{ fontSize: 14, fontWeight: 600, color: black[900], textAlign: 'center' }}>
              Kéo thả hoặc nhấn vào đây để thêm tài liệu
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 500, color: black[400], textAlign: 'center' }}>
              Tài liệu phải có định dạng .pdf, .docx, .png hoặc .jpg
            </Typography>
          </Box>
        </Box>

        {/* Uploaded File List */}
        {uploadedFiles.length > 0 && <UploadedFileList files={uploadedFiles} onRemove={handleRemove} />}

        {uploadedFiles.length > 0 && (
          <Button
            sx={{
              px: 4,
              textTransform: 'none',
              fontSize: 16,
              fontWeight: 600,
              ':hover': {
                transform: 'scale(1.05)',
                backgroundColor: primary[600],
              },
              transition: 'transform 0.3s',
            }}
            variant="contained"
            color="primary"
            endIcon={<ChevronRightRounded />}
            onClick={handleOpenModal}
          >
            Tiếp tục
          </Button>
        )}
      </Box>
      <ToastContainer />
      {notarizationData && (
        <NotaryDocumentDetailsModal open={openModal} handleClose={handleCloseModal} notarizationData={notarizationData} />
      )}
    </Box>
  );
};

export default CreateNotarizationProfile;
