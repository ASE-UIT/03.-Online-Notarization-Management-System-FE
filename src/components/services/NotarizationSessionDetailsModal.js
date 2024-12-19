import React, { useState, useCallback, useEffect } from 'react';
import { white, gray, black, primary } from '../../config/theme/themePrimitives';
import { Close } from '@mui/icons-material';
import AvatarWithCloseButton from '../static/AvatarWithCloseButton';
import { Box, Button, IconButton, Modal, Typography, Autocomplete, TextField } from '@mui/material';
import SessionService from '../../services/session.service';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import FileUploadSection from '../../pages/services/create-notarization-profile/FileUploadSection';
import { getDocumentNameByCode, VALID_FORMATS } from '../../utils/constants';
import useWindowSize from '../../hooks/useWindowSize';
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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { width, height } = useWindowSize();
  const [isUploading, setIsUploading] = useState(false);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleRemoveGuest = (emailToRemove) => {
    setUsers((prev) => prev.filter((user) => user.email !== emailToRemove));
  };

  const handleInputChange = (event, newValue) => {
    setEmail(newValue);
    fetchEmails(newValue);
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

  const handleDeleteUser = async (email) => {
    setUsers((prev) => prev.filter((user) => user.email !== email));
    const response = await SessionService.deleteUserOutOfSession(session._id, email);
    return response;
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

  const handleUploadDocument = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('Vui lòng chọn tài liệu để tải lên');
      return;
    }

    setIsUploading(true);
    try {
      await SessionService.uploadSessionDocument(
        session._id,
        uploadedFiles.map((file) => file.file),
      );
    } catch (error) {
      toast.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const isCreator = user.email === session.creator.email;

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
          width: `calc(${width}px - 50%)`,
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Chi tiết phiên công chứng
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

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

        {session.creator._id === user.id && (
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

        {/* Guests */}
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
              onRemove={() => handleDeleteUser(guest.email)}
              onHideRemoveIcon={!isCreator}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: 'capitalize', color: black[900], mb: 1 }}>
            Danh sách tài liệu đã đăng tải
          </Typography>

          {session?.notaryService?.required_documents.map((document, index) => (
            <FileUploadSection
              key={index}
              uploadedFiles={uploadedFiles.filter((file) => file.type === document)}
              handleFileChange={(e) => handleFileChange(e, document)}
              handleRemoveFile={handleRemoveFile}
              title={getDocumentNameByCode(document)}
            />
          ))}
          <Button
            variant="contained"
            size="small"
            sx={{ p: 1.5, backgroundColor: primary[500], alignSelf: 'flex-end' }}
            onClick={handleUploadDocument}
            disabled={isUploading || uploadedFiles.length === 0}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', color: white[50] }}>
              {isUploading ? 'Đang tải lên...' : 'Gửi tài liệu'}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NotarizationSessionDetailsModal;
