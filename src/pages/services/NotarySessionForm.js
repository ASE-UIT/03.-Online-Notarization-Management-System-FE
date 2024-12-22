import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, TextField, IconButton, Button, Autocomplete, Modal, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { black, gray, white } from '../../config/theme/themePrimitives';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import AvatarWithCloseButton from '../../components/static/AvatarWithCloseButton';
import NotarizationService from '../../services/notarization.service';
import SessionService from '../../services/session.service';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomAutocomplete = ({ options, value, onChange, placeholder, loading, fetchOptions, isSubmitting }) => (
  <Autocomplete
    loading={loading}
    options={options}
    getOptionLabel={(option) => option.name}
    onChange={onChange}
    renderInput={(params) => (
      <TextField
        {...params}
        inputProps={{ ...params.inputProps, readOnly: true }}
        sx={{
          '& fieldset': { border: 'none' },
          mt: 1,
          backgroundColor: gray[50],
          borderRadius: 1,
          '& .MuiInputBase-input': {
            fontSize: 14,
          },
        }}
        placeholder={placeholder}
      />
    )}
    renderOption={(props, option) => (
      <li
        {...props}
        key={option.id}
        style={{
          fontSize: '14px',
          fontWeight: 'regular',
        }}
      >
        {option.name}
      </li>
    )}
    value={value}
    onOpen={fetchOptions}
    disabled={isSubmitting}
    loadingText={<Typography sx={{ fontSize: '14px', fontWeight: 'regular', color: gray[600] }}>Đang tải...</Typography>}
    noOptionsText={
      <Typography sx={{ fontSize: '14px', fontWeight: 'regular', color: gray[600] }}>Không tìm thấy kết quả</Typography>
    }
  />
);

const DateTimePickerSection = ({ startDate, setStartDate, startTime, setStartTime, isSubmitting }) => (
  <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2, gap: 2 }}>
    {/* Date Picker */}
    <DatePicker
      value={startDate}
      onChange={(newValue) => setStartDate(newValue)}
      slotProps={{
        textField: {
          variant: 'outlined',
          fullWidth: true,
          sx: {
            '& fieldset': { border: 'none' },
            mt: 1,
            backgroundColor: gray[50],
            borderRadius: 1,
            '& .MuiInputBase-input': { fontSize: 14 },
          },
        },
      }}
      format="DD/MM/YYYY"
      disabled={isSubmitting}
    />
    {/* Time Picker */}
    <TimePicker
      value={startTime}
      onChange={(newValue) => setStartTime(newValue)}
      ampm={false}
      slotProps={{
        textField: {
          variant: 'outlined',
          fullWidth: true,
          sx: {
            '& fieldset': { border: 'none' },
            mt: 1,
            backgroundColor: gray[50],
            borderRadius: 1,
            '& .MuiInputBase-input': { fontSize: 14 },
          },
        },
      }}
      format="HH:mm"
      disabled={isSubmitting}
    />
  </Box>
);

const GuestSection = ({
  value,
  options,
  handleInputChange,
  handleAddGuest,
  users,
  handleRemoveGuest,
  loading,
  isSubmitting,
}) => (
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
        disabled={isSubmitting}
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
        disabled={isSubmitting}
      >
        Thêm
      </Button>
    </Box>

    {/* Added Guests */}
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
      {users.map((guest, index) => (
        <AvatarWithCloseButton key={index} email={guest.email} onRemove={() => handleRemoveGuest(guest.email)} />
      ))}
    </Box>
  </Box>
);

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& fieldset': { border: 'none' },
  marginTop: theme.spacing(1),
  backgroundColor: gray[50],
  borderRadius: theme.shape.borderRadius,
  '& .MuiInputBase-input': {
    fontSize: 14,
  },
}));

const NotarySessionForm = ({ open, setOpen, handleSuccess }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());

  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([]);

  const [notarizationFields, setNotarizationFields] = useState([]);
  const [notarizationServices, setNotarizationServices] = useState([]);

  const [notaryField, setNotaryField] = useState(null);
  const [notaryService, setNotaryService] = useState(null);
  const [sessionName, setSessionName] = useState('');
  const [amount, setAmount] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (event, newValue) => {
    setEmail(newValue);
    fetchEmails(newValue);
  };

  const handleSessionNameChange = (event) => {
    setSessionName(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleRemoveGuest = (emailToRemove) => {
    setUsers((prev) => prev.filter((user) => user.email !== emailToRemove));
  };

  const fetchNotarizationField = async () => {
    if (notarizationFields.length > 0) return;
    setLoading(true);
    try {
      const response = await NotarizationService.getAllNotarizationField();
      setNotarizationFields(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotarizationService = async () => {
    if (notaryField && notarizationServices.length === 0) {
      setLoading(true);
      try {
        const response = await NotarizationService.getNotarizationServiceByFieldId(notaryField.id);
        setNotarizationServices(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setNotarizationServices([]);
    setNotaryService(null);
  }, [notaryField]);

  const handleCreateSession = async () => {
    if (!sessionName || !notaryField || !notaryService || !startDate || !startTime) {
      toast.error('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (users.length === 0) {
      toast.error('Vui lòng thêm khách mời.');
      return;
    }

    const session = {
      amount,
      sessionName,
      notaryField,
      notaryService,
      startTime: startTime.format('HH:mm'),
      startDate: startDate.format('YYYY-MM-DD'),
      endTime: endTime.format('HH:mm'),
      endDate: endDate.format('YYYY-MM-DD'),
      users,
    };

    setIsSubmitting(true);

    try {
      const response = await SessionService.createSession(session);
      if (response) {
        toast.success('Tạo phiên công chứng thành công.');
        handleSuccess();
        handleOnClose();
      }
    } catch (error) {
      console.error('Error creating session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStartDate(dayjs());
    setStartTime(dayjs());
    setEndDate(null);
    setEndTime(null);
    setEmail('');
    setUsers([]);
    setOptions([]);
    setNotaryField(null);
    setNotaryService(null);
    setSessionName('');
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

    setUsers((prev) => [...prev, { email }]);
    setEmail('');
  };

  const handleOnClose = () => {
    if (isSubmitting) {
      return;
    }
    resetForm();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleOnClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{
          width: { xs: '90vw', sm: '80vw', md: '70vw' },
          p: 4,
          backgroundColor: white[50],
          borderRadius: 2,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Tạo Phiên Công Chứng
            </Typography>
            <IconButton onClick={handleOnClose} disabled={isSubmitting}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Notary Session Name */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
            <Box sx={{ flex: '1 1 30%', mr: { xs: 0, sm: 2 }, mb: 2 }}>
              <Typography variant="body2">Tên phiên công chứng</Typography>
              <CustomTextField
                placeholder="Nhập tên phiên công chứng"
                fullWidth
                onChange={handleSessionNameChange}
                disabled={isSubmitting}
              />
            </Box>
            <Box sx={{ flex: '1 1 30%', mr: { xs: 0, sm: 2 }, mb: 2 }}>
              <Typography variant="body2">Số lượng bản sao</Typography>
              <CustomTextField
                placeholder="Nhập số lượng bản sao"
                fullWidth
                onChange={handleAmountChange}
                disabled={isSubmitting}
              />
            </Box>
          </Box>

          {/* Notary Service and Field */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
            <Box sx={{ flex: '1 1 30%', mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }}>
              <Typography variant="body2">Lĩnh vực công chứng</Typography>
              <CustomAutocomplete
                options={notarizationFields}
                value={notaryField}
                onChange={(e, value) => setNotaryField(value)}
                placeholder="Chọn lĩnh vực công chứng"
                loading={loading}
                fetchOptions={fetchNotarizationField}
                isSubmitting={isSubmitting}
              />
            </Box>
            <Box sx={{ flex: '1 1 30%', mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }}>
              <Typography variant="body2">Dịch vụ công chứng</Typography>
              <CustomAutocomplete
                options={notarizationServices}
                value={notaryService}
                onChange={(e, value) => setNotaryService(value)}
                placeholder="Chọn dịch vụ công chứng"
                loading={loading}
                fetchOptions={fetchNotarizationService}
                isSubmitting={isSubmitting}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
            <Box sx={{ flex: '1 1 30%', mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }}>
              <Typography variant="body2">Thời gian bắt đầu</Typography>
              <DateTimePickerSection
                startDate={startDate}
                setStartDate={setStartDate}
                startTime={startTime}
                setStartTime={setStartTime}
                isSubmitting={isSubmitting}
              />
            </Box>

            <Box sx={{ flex: '1 1 30%', mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }}>
              <Typography variant="body2">Thời gian kết thúc</Typography>
              <DateTimePickerSection
                startDate={endDate}
                setStartDate={setEndDate}
                startTime={endTime}
                setStartTime={setEndTime}
                isSubmitting={isSubmitting}
              />
            </Box>
          </Box>

          {/* Duration */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: black[400] }}>
              Sự kiện này sẽ diễn ra từ {startDate.format('DD/MM/YYYY')} - {startTime.format('HH:mm')} đến{' '}
              {endDate ? endDate.format('DD/MM/YYYY') : '.. / .. / ..'} - {endTime ? endTime.format('HH:mm') : '.. : ..'}
            </Typography>
          </Box>

          {/* Guests */}
          <GuestSection
            value={email}
            options={options}
            handleInputChange={handleInputChange}
            handleAddGuest={handleAddGuest}
            users={users}
            handleRemoveGuest={handleRemoveGuest}
            loading={loading}
            isSubmitting={isSubmitting}
          />

          {/* Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              sx={{
                minWidth: 100,
                mr: 2,
                fontSize: 14,
                fontWeight: 700,
                textTransform: 'none',
                border: `1px solid ${black[50]}`,
                color: black[400],
              }}
              onClick={handleOnClose}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ minWidth: 100, fontSize: 14, fontWeight: 700, textTransform: 'none' }}
              onClick={handleCreateSession}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
            </Button>
          </Box>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
};

export default NotarySessionForm;
