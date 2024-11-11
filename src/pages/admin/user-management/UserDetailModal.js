import { ArrowBack } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, Typography, Tabs, Tab, Avatar, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { black, gray, primary, white } from '../../../config/theme/themePrimitives';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import InfoField from './InfoField';
import DetailModalSkeleton from './DetailModalSkeleton';
import UserService from '../../../services/user.service';

const EditUserProfileModal = ({ open, handleClose, userId }) => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const [userData, setUserData] = useState({
    role: '',
    identification: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    street: '',
    isEmailVerified: false,
    name: '',
    email: '',
    id: '',
  });

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await UserService.getUserById(userId);
      setUserData({
        role: response?.role || '',
        isEmailVerified: response?.isEmailVerified || false,
        name: response?.name || '',
        email: response?.email || '',
        phone: response?.phone || '',
        identification: response?.identification || '',
        city: response?.city || '',
        district: response?.district || '',
        ward: response?.ward || '',
        street: response?.street || '',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchUserData();
    }
  }, [open]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div role="tabpanel" hidden={value !== index} {...other}>
        {value === index && (
          <Box sx={{ p: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function ProcessAddress(address) {
    const { city, district, ward, street } = userData;
    const addressParts = [street, ward, district, city].filter((part) => part);
    const fullAddress = addressParts.join(', ');
    return fullAddress;
  }

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
          background: '#FFF',
        }}
      >
        {/* Form Fields Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'left',
            gap: '10px',
            marginTop: '20px',
            borderRadius: '8px',
            padding: 1,
            columnGap: '16px',
          }}
        >
          {/* Avatar Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
            <Avatar src="/avatar.png" sx={{ width: 96, height: 96, borderRadius: '50%' }} />
            <Box flex={1} display="flex" flexDirection="column" gap={1}>
              <Typography variant="h5">{!loading ? userData.name : ''}</Typography>
              <Typography variant="caption" color="textSecondary">
                {!loading ? userData.email : ''}
              </Typography>
            </Box>
          </Box>
          {/* Tab Panel */}
          <Tabs
            value={tabValue}
            variant="subtitle2"
            onChange={handleTabChange}
            sx={{
              flex: '1',
              color: 'black[900]',
              justifyContent: 'flex-start',
              '& .MuiTabs-flexContainer': {
                justifyContent: 'flex-start',
              },
            }}
          >
            <Tab label="Thông tin cá nhân" />
            <Tab label="Tài liệu công chứng" />
          </Tabs>

          {/* Tab Information */}
          <TabPanel value={tabValue} index={0}>
            {loading ? (
              <DetailModalSkeleton></DetailModalSkeleton>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  p: 2,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '16px',
                  alignSelf: 'stretch',
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  background: '#FFF',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: '16px',
                    alignSelf: 'stretch',
                  }}
                >
                  <InfoField caption={'Họ và tên'} value={userData.name}></InfoField>
                  <InfoField caption={'CMND/CCCD'} value={userData.identification}></InfoField>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    gap: '16px',
                    alignSelf: 'stretch',
                  }}
                >
                  <InfoField caption={'Email'} value={userData.email}></InfoField>
                  <InfoField caption={'Số điện thoại'} value={userData.phone}></InfoField>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    gap: '16px',
                    alignSelf: 'stretch',
                  }}
                >
                  <InfoField caption={'Địa chỉ liên hệ'} value={ProcessAddress()}></InfoField>
                </Box>
              </Box>
            )}
          </TabPanel>

          {/* Tab Notary Docs */}
          <TabPanel value={tabValue} index={1}>
            <Typography>Danh sách tài liệu công chứng sẽ hiển thị ở đây.</Typography>
          </TabPanel>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserProfileModal;
