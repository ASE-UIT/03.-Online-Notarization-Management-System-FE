import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { gray, white } from '../../config/theme/themePrimitives';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotarizationService from '../../services/notarization.service';
import CreateNotarizationProfileStepper from '../../components/modals/CreateNotarizationProfileStepper';
import NotarizationFormContent from './NotarizationFormContent';

const CreateNotarizationProfile = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notarizationData, setNotarizationData] = useState({
    requesterInfo: {},
    notaryField: null,
    notaryService: null,
    numberOfCopies: 1,
  });
  const [fieldsAndServices, setFieldsAndServices] = useState({
    notarizationField: [],
    notarizationService: [],
  });
  const [loadingNotarization, setLoadingNotarization] = useState(false);
  const [selectedService, setSelectedService] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  const handleFileChange = (e, documentType) => {
    const files = Array.from(e.target.files);
    const validFormats = ['.pdf', '.docx', '.png', '.jpg'];

    files.forEach((file) => {
      const isValid = validFormats.some((format) => file.name.toLowerCase().endsWith(format));
      if (!isValid) {
        toast.error(`${file.name}: Tài liệu được tải lên không có định dạng hợp lệ`);
        return;
      }

      setUploadedFiles((prev) => [...prev, { file, type: documentType }]);
    });
  };

  const handleInputChange = (event) => {
    setNotarizationData((prev) => ({
      ...prev,
      requesterInfo: { ...prev.requesterInfo, [event.target.name]: event.target.value },
    }));
  };

  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const fetchNotarizationField = async () => {
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
  };

  const fetchNotarizationService = async () => {
    if (fieldsAndServices.notarizationService.length > 0) return;
    setLoadingNotarization(true);
    try {
      const response = await NotarizationService.getNotarizationServiceByFieldId(selectedField.id);
      setFieldsAndServices((prev) => ({ ...prev, notarizationService: response }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingNotarization(false);
    }
  };

  const handleNext = () => {
    setNotarizationData((prev) => ({
      ...prev,
      notaryField: selectedField,
      notaryService: selectedService,
    }));

    if (currentStep === 3) {
      toast.success('Thanh toán thành công');
      setCurrentStep(0);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  useEffect(() => {
    setFieldsAndServices({ notarizationField: [], notarizationService: [] });
    setSelectedService(null);
  }, [selectedField]);

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
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateNotarizationProfile;
