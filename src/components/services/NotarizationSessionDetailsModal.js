import React, { useState, useCallback, useEffect } from 'react';
import { white, gray, black, primary, green, blue, yellow, red } from '../../config/theme/themePrimitives';
import { Close } from '@mui/icons-material';
import AvatarWithCloseButton from '../static/AvatarWithCloseButton';
import { Box, Button, IconButton, Modal, Typography, Autocomplete, TextField } from '@mui/material';
import SessionService from '../../services/session.service';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import FileUploadSection from '../../pages/services/create-notarization-profile/FileUploadSection';
import { getDocumentNameByCode, STATUS_TYPES, VALID_FORMATS } from '../../utils/constants';
import useWindowSize from '../../hooks/useWindowSize';
import { uploadFileSuccess } from '../../stores/slices/sessionSlice';
import NotaryFeedback from './NotaryFeedback';
import SessionFeedback from './SessionFeedback';
const AddGuest = ({ value, options, handleInputChange, handleAddGuest, loading }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2">Thêm khách mời</Typography>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 1,
        backgroundColor: gray[50],
        borderRadius: 1,
      }}
    >
      {/* Guest Autocomplete */}
      <Autocomplete
        value={value}
        loading={loading}
        options={options}
        getOptionLabel={(option) => option?.email || option}
        onInputChange={handleInputChange}
        sx={{ flexGrow: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Nhập email khách mời"
            sx={{
              flexGrow: 1,
              '& fieldset': { border: 'none' },
              '& .MuiInputBase-input': { fontSize: '14px' },
            }}
            onKeyDown={(event) => event.key === 'Enter' && handleAddGuest()}
          />
        )}
        renderOption={(props, option) => (
          <li
            {...props}
            key={typeof option === 'string' ? option : option.id}
            style={{ fontSize: '14px', fontWeight: 'regular' }}
          >
            {typeof option === 'string' ? option : option.email}
          </li>
        )}
        loadingText={<Typography sx={{ fontSize: '14px', fontWeight: 'regular', color: gray[600] }}>Đang tải...</Typography>}
        noOptionsText={
          <Typography sx={{ fontSize: '14px', fontWeight: 'regular', color: gray[600] }}>Không tìm thấy kết quả</Typography>
        }
      />

      <Button
        size="small"
        variant="contained"
        onClick={handleAddGuest}
        sx={{ fontSize: 14, backgroundColor: white[50], color: black[900], textTransform: 'none', mr: 1 }}
      >
        Thêm
      </Button>
    </Box>
  </Box>
);

const NotarizationSessionDetailsModal = ({ open, onClose, session }) => {
  const [email, setEmail] = useState([]);
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState(session.users);
  const [loading, setLoading] = useState(false);
  const [currentFiles, setCurrentFiles] = useState([]);
  const [documentWalletFiles, setDocumentWalletFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notarizationData, setNotarizationData] = useState({ files: [], fileIds: [], customFileNames: [] });
  const [isUploading, setIsUploading] = useState(false);
  const [loadingSignature, setLoadingSignature] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { width, height } = useWindowSize();

  const dispatch = useDispatch();

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const fetchEmails = useCallback(
    debounce(async (value) => {
      setLoading(true);
      try {
        const trimmedValue = value.trim();
        if (!trimmedValue) {
          setOptions([]);
          return;
        }

        const response = await UserService.searchUserByEmail(trimmedValue);
        if (response.length === 0) {
          setOptions([]);
          toast.error('Không tìm thấy người dùng.');
        } else {
          setOptions(response);
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
        setOptions([]);
        toast.error('Không tìm thấy người dùng.');
      } finally {
        setLoading(false);
      }
    }, 1500),
    [],
  );

  const handleRemoveGuest = (emailToRemove) => {
    setUsers((prev) => prev.filter((user) => user.email !== emailToRemove));
  };

  const handleInputChange = (event, newValue) => {
    setEmail(newValue);
    fetchEmails(newValue);
  };

  const handleAddGuest = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const existingUser = options.find((option) => option.email === email);

    if (!email) {
      toast.error('Vui lòng nhập địa chỉ email.');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Địa chỉ email không hợp lệ.');
      return;
    }

    if (!existingUser) {
      toast.error('Không tìm thấy người dùng.');
      return;
    }

    if (users.find((user) => user.email === email)) {
      toast.error('Người dùng này đã được thêm.');
      return;
    }

    const response = SessionService.addUser(session._id, [email]);
    if (response) {
      toast.success('Thêm người dùng thành công');
    } else if (response.code === 403) {
      toast.error('Bạn không phải là người tạo phiên công chứng');
    }
    setUsers((prev) => [...prev, existingUser]);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
  };

  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDeleteGuest = async (email) => {
    setUsers((prev) => prev.filter((user) => user.email !== email));
    const response = await SessionService.deleteUserOutOfSession(session._id, email);
    return response;
  };

  const handleDocumentWalletChange = (document, documentType) => {
    if (!document || !document.filename || !document._id) {
      toast.error('Tài liệu không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    if (documentWalletFiles.find((file) => file.document._id === document._id)) {
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

      setCurrentFiles((prev) => [...prev, { file: renamedFile, type: documentType }]);
    });
  };

  const handleUploadDocument = async () => {
    if (currentFiles.length === 0 && documentWalletFiles.length === 0) {
      toast.error('Vui lòng chọn tài liệu để tải lên');
      return;
    }

    setIsUploading(true);
    try {
      const sessionId = session._id;

      const formData = new FormData();

      currentFiles.forEach((file) => {
        formData.append('files', file.file);
      });

      formData.append('fileIds', JSON.stringify(notarizationData.fileIds));
      formData.append('customFileNames', JSON.stringify(notarizationData.customFileNames));

      const response = await SessionService.uploadSessionDocument(sessionId, formData);
      if (response.status === undefined) {
        toast.success('Tải lên tài liệu thành công');
        dispatch(uploadFileSuccess(true));
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (fileToRemove) => {
    setCurrentFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleRemoveDocumentWalletFile = (document) => {
    setDocumentWalletFiles((prev) => prev.filter((file) => file.document._id !== document.document._id));
  };

  const handleRemoveUploadedFile = async (document) => {
    const response = await SessionService.deleteSessionFile(session._id, document.file._id);
    console.log(response);

    if (response.status === 404) {
      toast.error('Tài liệu không tồn tại');
      return;
    }

    toast.success('Xóa tài liệu thành công');
    setUploadedFiles((prev) => prev.filter((file) => file.file._id !== document.file._id));
  };

  const isCreator = user.email === session.creator.email;

  const renderSessionStatus = () => {
    switch (session.status.status) {
      case 'completed':
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              mb: 2,
              backgroundColor: green[50],
              py: 1,
              px: 2,
              borderRadius: 100,
            }}
          >
            <Typography variant="body3" sx={{ flexGrow: 1, fontWeight: 600, color: green[500] }}>
              Đã hoàn thành
            </Typography>
          </Box>
        );
      case 'digitalSignature':
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              mb: 2,
              backgroundColor: blue[50],
              py: 1,
              px: 2,
              borderRadius: 100,
            }}
          >
            <Typography variant="body3" sx={{ flexGrow: 1, fontWeight: 600, color: blue[500] }}>
              Sẵn sàng ký số
            </Typography>
          </Box>
        );
      case 'pending':
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              mb: 2,
              backgroundColor: gray[50],
              py: 1,
              px: 2,
              borderRadius: 100,
            }}
          >
            <Typography variant="body3" sx={{ flexGrow: 1, fontWeight: 600, color: gray[500] }}>
              Chờ xác nhận
            </Typography>
          </Box>
        );
      case 'processing':
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              mb: 2,
              backgroundColor: yellow[50],
              py: 1,
              px: 2,
              borderRadius: 100,
            }}
          >
            <Typography variant="body3" sx={{ flexGrow: 1, fontWeight: 600, color: yellow[500] }}>
              Đang xử lý
            </Typography>
          </Box>
        );
      case 'rejected':
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              mb: 2,
              backgroundColor: red[50],
              py: 1,
              px: 2,
              borderRadius: 100,
            }}
          >
            <Typography variant="body3" sx={{ flexGrow: 1, fontWeight: 600, color: red[500] }}>
              Đã từ chối
            </Typography>
          </Box>
        );
      default:
        return (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              mb: 2,
              backgroundColor: gray[50],
              py: 1,
              px: 2,
              borderRadius: 100,
            }}
          >
            <Typography variant="body3" sx={{ flexGrow: 1, fontWeight: 600, color: gray[500] }}>
              Chưa xác định
            </Typography>
          </Box>
        );
    }
  };

  const handleSignatureSave = async (signatureImageUrl) => {
    const signatureImageFile = new File([signatureImageUrl], user._id + '.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('signatureImage', signatureImageFile);
    formData.append('sessionId', session._id);
    setLoadingSignature(true);
    try {
      const response = await SessionService.approveSignatureSessionByUser(formData);
      if (response.status === 400) {
        toast.error('Tài liệu này đã được ký số');
        return;
      }
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

  useEffect(() => {
    let uploadedFiles = [];
    session.files.forEach((file) => {
      const parts = file.filename.split('_');

      const fileType = parts[0] + '_' + parts[1];

      uploadedFiles.push({ file: file, type: fileType });
    });

    setUploadedFiles(uploadedFiles);
    console.log(uploadedFiles);
  }, [session.files]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        sx={{
          width: `calc(${width}px - 20%)`,
          maxHeight: `calc(${height}px - 20%)`,
          p: 4,
          backgroundColor: white[50],
          borderRadius: 3,
          overflowY: 'auto',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',
          '&::-webkit-scrollbar': {
            width: '4px',
            backgroundColor: gray[100],
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: gray[300],
            borderRadius: '2px',
          },
          scrollbarWidth: 'thin',
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Chi tiết phiên công chứng
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {renderSessionStatus()}

        {/* Notary Session Name */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
          <Box sx={{ flex: '1 1 30%', mr: { xs: 0, sm: 2 }, mb: 2 }}>
            <Typography variant="body2" sx={{ color: black[900], mb: 2 }}>
              Tên phiên công chứng
            </Typography>
            <Typography
              sx={{
                borderRadius: 1,
                backgroundColor: gray[50],
                padding: 2,
                fontSize: 15,
                fontWeight: 500,
                color: black[900],
                border: `1px solid ${gray[200]}`,
              }}
            >
              {session.sessionName}
            </Typography>
          </Box>
          <Box sx={{ flex: '1 1 30%', mr: { xs: 0, sm: 2 }, mb: 2 }}>
            <Typography variant="body2" sx={{ color: black[900], mb: 2 }}>
              Số lượng bản sao
            </Typography>
            <Typography
              sx={{
                borderRadius: 1,
                backgroundColor: gray[50],
                padding: 2,
                fontSize: 15,
                fontWeight: 500,
                color: black[900],
                border: `1px solid ${gray[200]}`,
              }}
            >
              {session.amount}
            </Typography>
          </Box>
        </Box>

        {/* Details Section */}
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <Box sx={{ flex: '1' }}>
            <Typography variant="body2" sx={{ color: black[900], mb: 2 }}>
              Lĩnh vực công chứng
            </Typography>
            <Typography
              sx={{
                borderRadius: 1,
                backgroundColor: gray[50],
                padding: 2,
                fontSize: 15,
                fontWeight: 500,
                color: black[900],
                border: `1px solid ${gray[200]}`,
              }}
            >
              {session.notaryField.name}
            </Typography>
          </Box>

          <Box sx={{ flex: '1' }}>
            <Typography variant="body2" sx={{ color: black[900], mb: 2 }}>
              Dịch vụ công chứng
            </Typography>
            <Typography
              sx={{
                borderRadius: 1,
                backgroundColor: gray[50],
                padding: 2,
                fontSize: 15,
                fontWeight: 500,
                color: black[900],
                border: `1px solid ${gray[200]}`,
              }}
            >
              {session.notaryService.name}
            </Typography>
          </Box>
        </Box>

        {/* Duration */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: black[900], mb: 2 }}>
            Thời gian diễn ra phiên công chứng
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  borderRadius: 1,
                  backgroundColor: gray[50],
                  padding: 2,
                  fontSize: 15,
                  fontWeight: 500,
                  color: black[900],
                  border: `1px solid ${gray[200]}`,
                }}
              >
                {formatDate(session.startDate)} - {formatTime(session.startDate)}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  borderRadius: 1,
                  backgroundColor: gray[50],
                  padding: 2,
                  fontSize: 15,
                  fontWeight: 500,
                  color: black[900],
                  border: `1px solid ${gray[200]}`,
                }}
              >
                {formatDate(session.endDate)} - {formatTime(session.endDate)}
              </Typography>
            </Box>
          </Box>
        </Box>
        {session.creator._id === user.id && session.status.status === 'unknown' && (
          <AddGuest
            value={email}
            options={options}
            handleInputChange={handleInputChange}
            handleAddGuest={handleAddGuest}
            users={users}
            handleRemoveGuest={handleRemoveGuest}
            loading={loading}
          />
        )}

        {session.status.status === 'unknown' && (
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <AvatarWithCloseButton
              key={session.creator.email}
              email={session.creator.email}
              onHideRemoveIcon={true}
              name={session.creator.name}
              isCreator={true}
            />
            {users.map((guest, index) => (
              <AvatarWithCloseButton
                key={index}
                email={guest.email}
                onRemove={() => handleDeleteGuest(guest.email)}
                onHideRemoveIcon={!isCreator}
              />
            ))}
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: 'capitalize', color: black[900], mb: 1 }}>
              Danh sách tài liệu đã đăng tải
            </Typography>

            {session?.notaryService?.required_documents.map((document, index) => (
              <FileUploadSection
                key={index}
                title={getDocumentNameByCode(document)}
                currentFiles={currentFiles.filter((file) => file.type === document)}
                handleCurrentFileChange={(e) => handleFileChange(e, document)}
                handleRemoveCurrentFile={handleRemoveFile}
                uploadedFiles={uploadedFiles.filter((file) => file.type === document)}
                handleRemoveUploadedFile={handleRemoveUploadedFile}
                documentWalletFiles={documentWalletFiles.filter((file) => file.type === document)}
                handleDocumentWalletFileChange={(file) => handleDocumentWalletChange(file, document)}
                handleRemoveDocumentWalletFile={handleRemoveDocumentWalletFile}
                confirmed={session.status.status !== 'unknown'}
              />
            ))}
            <Button
              variant="contained"
              size="small"
              sx={{
                p: 1.5,
                backgroundColor: primary[500],
                alignSelf: 'flex-end',
                display: session.status.status === 'unknown' ? 'block' : 'none',
              }}
              onClick={handleUploadDocument}
              disabled={isUploading || session.status.status !== 'unknown'}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', color: white[50] }}>
                {isUploading ? 'Đang tải lên...' : 'Gửi tài liệu'}
              </Typography>
            </Button>
          </Box>
          <SessionFeedback
            signature={session.signature}
            output={session.output}
            feedback={session.status.feedback}
            onSignatureSave={handleSignatureSave}
            loading={loadingSignature}
            createdBy={session.createdBy}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default NotarizationSessionDetailsModal;
