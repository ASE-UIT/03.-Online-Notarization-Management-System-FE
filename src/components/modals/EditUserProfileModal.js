import { ArrowBack } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { black, primary } from '../../config/theme/themePrimitives';
import LabeledTextField from './LabeledTextField';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../stores/actions/userAction';
import 'react-toastify/dist/ReactToastify.css';
import ProvinceSelector from '../profile/ProvinceSelector';

const EditUserProfileModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [tempForm, setTempForm] = useState({
    role: '',
    citizenId: '',
    phoneNumber: '',
    province: '',
    district: '',
    town: '',
    street: '',
    isEmailVerified: false,
    name: '',
    email: '',
    id: '',
  });

  useEffect(() => {
    if (open && user) {
      const updatedFormData = {
        role: user?.role || '',
        isEmailVerified: user?.isEmailVerified || false,
        name: user?.name || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        citizenId: user?.citizenId || '',
        province: user.address?.province || '',
        district: user.address?.district || '',
        town: user.address?.town || '',
        street: user.address?.street || '',
      };
      setTempForm(updatedFormData);
    }
  }, [open, user]);

  const handleInputChange = (field, value) => {
    setTempForm((prev) => {
      const updatedForm = { ...prev, [field]: value };

      if (field === 'province') {
        updatedForm.district = '';
        updatedForm.town = '';
      }
      if (field === 'district') {
        updatedForm.town = '';
      }

      return updatedForm;
    });
  };

  const isFormDataValid = ({ name, citizenId, email, phoneNumber, province, district, town, street }) => {
    if (!name || !/^[A-Za-zÀ-ỹ\s]+$/.test(name)) {
      toast.error('Vui lòng nhập Họ tên hợp lệ');
      return false;
    }

    if (!email || !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(email)) {
      toast.error('Vui lòng nhập email hợp lệ');
      return false;
    }
    if (citizenId && !/^[0-9]{9}$|^[0-9]{12}$/.test(citizenId)) {
      toast.error('Vui lòng nhập đúng số CCCD');
      return false;
    }

    if (phoneNumber && !/^\+?[0-9]{10,15}$/.test(phoneNumber)) {
      toast.error('Vui lòng nhập đúng Số điện thoại');
      return false;
    }

    return true;
  };

  const handleSaveChanges = async () => {
    if (!isFormDataValid(tempForm)) {
    } else {
      const updateBody = {};

      Object.entries(tempForm).forEach(([key, value]) => {
        if (
          key !== 'isEmailVerified' &&
          key !== 'id' &&
          key !== 'role' &&
          key !== 'province' &&
          key !== 'district' &&
          key !== 'town' &&
          key !== 'street'
        ) {
          if (value !== '') {
            updateBody[key] = value;
          }
        }
      });

      const address = {};
      if (tempForm.province !== '') address.province = tempForm.province || null;
      if (tempForm.district !== '') address.district = tempForm.district || null;
      if (tempForm.town !== '') address.town = tempForm.town || null;
      if (tempForm.street !== '') address.street = tempForm.street || null;

      if (Object.values(address).some((field) => field !== null)) {
        updateBody.address = address;
      }

      dispatch(updateUser({ id: user.id, updatedUserInfo: updateBody }))
        .unwrap()
        .then(() => {
          toast.success('Cập nhật thông tin thành công');
          handleClose();
        })
        .catch(() => {
          toast.error('Cập nhật thông tin thất bại');
        });
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          bgcolor: 'background.paper',
          p: '24px',
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <IconButton sx={{ padding: 0 }} disableRipple onClick={handleClose}>
            <ArrowBack sx={{ width: '24px', height: '24px', color: black[900] }} />
          </IconButton>
          <Typography variant="h6" flex={1} color={black[900]}>
            Cập nhật hồ sơ
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: black[50],
              color: black[900],
              border: `1px solid transparent`,
              '&:hover': {
                border: `1px solid ${primary[500]}`,
                color: primary[500],
              },
              textTransform: 'none',
            }}
            onClick={handleSaveChanges}
          >
            Lưu thay đổi
          </Button>
        </Box>

        {/* Form Fields Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'left',
            gap: '10px',
            marginTop: '20px',
            border: `1px solid ${black[50]}`,
            borderRadius: '8px',
            padding: '16px',
            columnGap: '16px',
          }}
        >
          <Typography variant="subtitle2" flex={1} color={black[900]}>
            Cập nhật hồ sơ
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <LabeledTextField
              label="Họ và tên"
              value={tempForm.name}
              onChange={(value) => handleInputChange('name', value)}
            />
            <LabeledTextField
              label="CMND/CCCD"
              value={tempForm.citizenId}
              onChange={(value) => handleInputChange('citizenId', value)}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <LabeledTextField
              label="Email"
              value={tempForm.email}
              onChange={(value) => handleInputChange('email', value)}
              disabled={tempForm.isEmailVerified}
            />
            <LabeledTextField
              label="Số điện thoại"
              value={tempForm.phoneNumber}
              onChange={(value) => handleInputChange('phoneNumber', value)}
            />
          </Box>
        </Box>

        {/* Address Section - ProvinceSelector Component */}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'left',
            gap: '10px',
            marginTop: '20px',
            border: `1px solid ${black[50]}`,
            borderRadius: '8px',
            padding: '16px',
            columnGap: '16px',
          }}
        >
          <Typography variant="subtitle2" color={black[900]}>
            Địa chỉ liên hệ
          </Typography>

          <ProvinceSelector
            city={tempForm.province}
            district={tempForm.district}
            ward={tempForm.town}
            onCityChange={(value) => handleInputChange('province', value)}
            onDistrictChange={(value) => handleInputChange('district', value)}
            onWardChange={(value) => handleInputChange('town', value)}
          />

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <LabeledTextField
              label="Số nhà, đường/phố"
              value={tempForm?.street || ''}
              onChange={(value) => handleInputChange('street', value)}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserProfileModal;
