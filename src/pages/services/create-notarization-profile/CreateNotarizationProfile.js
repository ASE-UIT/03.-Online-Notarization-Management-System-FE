import React, { useCallback, useEffect, useState } from 'react';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { gray, white } from '../../../config/theme/themePrimitives';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotarizationService from '../../../services/notarization.service';
import CreateNotarizationProfileStepper from '../../../components/modals/CreateNotarizationProfileStepper';
import NotarizationFormContent from './NotarizationFormContent';
import { getDocumentNameByCode, VALID_FORMATS } from '../../../utils/constants';

const initialNotarizationData = {
  requesterInfo: {},
  notaryField: null,
  notaryService: null,
  amount: null,
  fileIds: [],
  customFileNames: [],
  files: [],
};

const initialFieldsAndServices = {
  notarizationField: [],
  notarizationService: [],
};

const CreateNotarizationProfile = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [documentWalletFiles, setDocumentWalletFiles] = useState([]);
  const [notarizationData, setNotarizationData] = useState(initialNotarizationData);
  const [fieldsAndServices, setFieldsAndServices] = useState(initialFieldsAndServices);
  const [loadingNotarization, setLoadingNotarization] = useState(false);
  const [selectedService, setSelectedService] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  const fetchNotarizationField = useCallback(async () => {
    if (fieldsAndServices.notarizationField.length > 0) return;
    setLoadingNotarization(true);
    try {
      const response = await NotarizationService.getAllNotarizationField();
      setFieldsAndServices((prev) => ({ ...prev, notarizationField: response }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingNotarization(false);
    }
  }, [fieldsAndServices]);

  const fetchNotarizationService = useCallback(async () => {
    if (fieldsAndServices.notarizationService.length > 0) return;
    setLoadingNotarization(true);
    try {
      const response = await NotarizationService.getNotarizationServiceByFieldId(selectedField.id);
      console.log(response);
      setFieldsAndServices((prev) => ({ ...prev, notarizationService: response }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingNotarization(false);
    }
  }, [fieldsAndServices, selectedField]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'amount') {
      setNotarizationData((prev) => ({
        ...prev,
        [name]: value === '' ? undefined : parseInt(value, 10),
      }));
      return;
    }

    setNotarizationData((prev) => ({
      ...prev,
      requesterInfo: { ...prev.requesterInfo, [name]: value },
    }));
  };

  const handleDocumentWalletChange = (document, documentType) => {
    if (!document || !document.filename || !document._id) {
      toast.error('Tài liệu không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    if (notarizationData.fileIds.includes(document._id)) {
      toast.error('Tài liệu đã được chọn trước đó.');
      return;
    }

    try {
      const timestamp = Date.now();
      const fileExtension = document.filename.includes('.') ? document.filename.split('.').pop() : '';
      const customFileName = `${documentType}_${timestamp}${fileExtension ? `.${fileExtension}` : ''}`;

      setNotarizationData((prevData) => ({
        ...prevData,
        fileIds: [...prevData.fileIds, document._id],
        customFileNames: [...prevData.customFileNames, customFileName],
      }));

      setDocumentWalletFiles((prevFiles) => [
        ...prevFiles,
        { document: { ...document, filename: customFileName }, type: documentType },
      ]);
    } catch (error) {
      console.error('Error handling document wallet change:', error);
      toast.error('Đã xảy ra lỗi khi đổi tên tài liệu.');
    }
  };

  const handleFileChange = (e, documentType) => {
    const files = Array.from(e.target.files);
    const timestamp = new Date().getTime();

    files.forEach((file) => {
      if (!VALID_FORMATS.some((format) => file.name.toLowerCase().endsWith(format))) {
        toast.error(`${file.name}: Tài liệu không hợp lệ`);
        return;
      }

      const fileExtension = file.name.split('.').pop();
      const newFileName = `${documentType}_${timestamp}.${fileExtension}`;
      const renamedFile = new File([file], newFileName, { type: file.type });

      setUploadedFiles((prev) => [...prev, { file: renamedFile, type: documentType }]);
    });
  };

  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleRemoveDocumentWalletFile = (document) => {
    setDocumentWalletFiles((prev) => prev.filter((file) => file.document._id !== document.document._id));

    setNotarizationData((prev) => ({
      ...prev,
      fileIds: prev.fileIds.filter((id) => id !== document.document._id),
      customFileNames: prev.customFileNames.filter((name) => name !== document.document.filename),
    }));
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('notarizationService', JSON.stringify(notarizationData.notaryService));
      formData.append('notarizationField', JSON.stringify(notarizationData.notaryField));
      formData.append('requesterInfo', JSON.stringify(notarizationData.requesterInfo));
      formData.append('amount', notarizationData.amount);

      notarizationData.files.forEach((file) => file && formData.append('files', file));

      formData.append('fileIds', JSON.stringify(notarizationData.fileIds));

      formData.append('customFileNames', JSON.stringify(notarizationData.customFileNames));

      const response = await NotarizationService.uploadNotarizationDocument(formData);

      if (response.status === 200) {
        toast.success('Tạo hồ sơ công chứng thành công');
      }

      setNotarizationData(initialNotarizationData);
      setUploadedFiles([]);
      setCurrentStep(0);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const handleNext = () => {
    if (currentStep === 0) {
      if (!selectedField) {
        toast.error('Vui lòng nhập thông tin lĩnh vực công chứng.');
        return;
      } else if (selectedService.length === 0) {
        toast.error('Vui lòng chọn dịch vụ công chứng.');
        return;
      }
    } else if (currentStep === 1) {
      const { requesterInfo, amount } = notarizationData;
      if (
        !requesterInfo.fullName ||
        !requesterInfo.phoneNumber ||
        !requesterInfo.citizenId ||
        !requesterInfo.email ||
        !amount
      ) {
        toast.error('Vui lòng nhập thông tin người yêu cầu.');
        return;
      }

      const requiredDocumentTypes = notarizationData?.notaryService?.required_documents || [];

      // Kết hợp tài liệu từ uploadedFiles và documentWalletFiles
      const allDocumentTypes = [...uploadedFiles.map((file) => file.type), ...documentWalletFiles.map((file) => file.type)];

      const missingDocumentTypes = requiredDocumentTypes.filter((type) => !allDocumentTypes.includes(type));

      if (missingDocumentTypes.length > 0) {
        toast.error(`Vui lòng tải lên đầy đủ các tài liệu: ${missingDocumentTypes.map(getDocumentNameByCode).join(', ')}`);
        return;
      }
    }

    setNotarizationData((prev) => ({
      ...prev,
      notaryField: selectedField,
      notaryService: selectedService,
      files: uploadedFiles.map((file) => file.file),
    }));

    if (currentStep === 2) {
      handleConfirm();
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  useEffect(() => {
    setFieldsAndServices({ notarizationField: [], notarizationService: [] });
    setSelectedService(null);
  }, [selectedField]);

  console.log(notarizationData);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: gray[50],
        gap: 3,
        height: '100vh',
        overflowY: 'auto',
        scrollBehavior: 'smooth',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 3,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          backgroundColor: white[50],
          boxShadow: 1,
        }}
      >
        <CreateNotarizationProfileStepper currentStep={currentStep} />
      </Box>

      <Box sx={{ py: 5 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '48rem',
            backgroundColor: white[50],
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 600, textTransform: 'capitalize' }}>Tạo hồ sơ công chứng</Typography>
          </Box>

          <NotarizationFormContent
            currentStep={currentStep}
            uploadedFiles={uploadedFiles}
            fieldsAndServices={fieldsAndServices}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            fetchNotarizationField={fetchNotarizationField}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            fetchNotarizationService={fetchNotarizationService}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handleFileChange={handleFileChange}
            handleInputChange={handleInputChange}
            handleRemoveFile={handleRemoveFile}
            loadingNotarization={loadingNotarization}
            notarizationData={notarizationData}
            handleDocumentWalletChange={handleDocumentWalletChange}
            documentWalletFiles={documentWalletFiles}
            handleRemoveDocumentWalletFile={handleRemoveDocumentWalletFile}
          />
        </Box>
      </Box>
      <Backdrop
        sx={{
          color: white[50],
          zIndex: (theme) => theme.zIndex.modal + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default CreateNotarizationProfile;
