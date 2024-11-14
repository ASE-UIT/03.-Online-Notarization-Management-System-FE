import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Box, Modal, Skeleton , Tab, Tabs, Typography } from '@mui/material';
import InfoField from './InfoField';
import SkeletonDetailModal from './SkeletonDetailModal';
import UserService from '../../../services/user.service';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const EmployeeDetailModal = ({ open, handleClose, employeeId, }) => {
  
  const [tabValue, setTabValue] = useState(0);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    phone: '',
    name: '',
    email: '',
    id: '',
    createdAt: '',
    citizenId: '',
    address: {
      street: '',
      town: '',
      district: '',
      province: '',
    }
  });

  const getEmployeeInfo = useCallback(async () => {
    setLoadingInfo(true);
    try {
      const response = await UserService.getUserById(employeeId);
      const date = new Date(response.createdAt);
      const startDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
      const citizenId = (response.citizenId) ? response.citizenId : '';
      const street = (response.address) ? response.address.street : '';
      const town = (response.address) ? response.address.town : '';
      const district = (response.address) ? response.address.district : '';
      const province = (response.address) ? response.address.province : '';

      let  role;

      if (response.role === 'notary') role = 'Công chứng viên';
      if (response.role === 'secretary') role = 'Thư ký';

      setFormData({
        role: role || '',
        name: response.name || '',
        email: response.email || '',
        id: response.id || '',
        createdAt: startDate || '',
        phone: response.phoneNumber || '',
        citizenId: citizenId || '',
        address: {
          street: street || '',
          town: town || '',
          district: district || '',
          province: province || '',
        },
      });
    } finally {
      setLoadingInfo(false);
    }
  }, [employeeId]
)

  useEffect(() => {
    if (open) {
      setTabValue(0); 
      getEmployeeInfo();
    }
  }, [open, getEmployeeInfo]);

  const handleTabChange = (event, newIndex) => {
    setTabValue(newIndex);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          p: '24px',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            p: 3,
          }}
        >
          <Avatar
            sx={{
              width: '64px',
              height: '64px',
            }}
          ></Avatar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'left',
            }}
          >
            {loadingInfo ? (
              <Box flex={1} minWidth="250px">
                <Skeleton variant="text" height={30} />
              </Box>
            ) : (
              <Typography
                sx={{
                  color: '#000',
                  fontFamily: 'Be Vietnam Pro',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: 'normal',
                }}
              >
                {formData.name}
              </Typography>
            )}
            {loadingInfo ? (
              <Box flex={1} minWidth="250px">
                <Skeleton variant="text" height={30} />
              </Box>
            ) : (
              <Typography
                sx={{
                  color: '#000',
                  fontFamily: 'Be Vietnam Pro',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  opacity: '0.5',
                }}
              >
                {formData.email}
              </Typography>
            )}
          </Box>
        </Box>

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
          <Tab label="Thông tin nghề nghiệp" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
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
              {loadingInfo ? (
                <SkeletonDetailModal caption={'Họ và tên'}></SkeletonDetailModal>
              ) : (
                <InfoField caption={'Họ và tên'} value={formData.name}></InfoField>
              )}
              {loadingInfo ? (
                <SkeletonDetailModal caption={'CMND/CCCD'}></SkeletonDetailModal>
              ) : (
                <InfoField caption={'CMND/CCCD'} value={formData.citizenId}></InfoField>
              )}

              
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                alignSelf: 'stretch',
              }}
            >
              {loadingInfo ? (
                <SkeletonDetailModal caption={'Email'}></SkeletonDetailModal>
              ) : (
                <InfoField caption={'Email'} value={formData.email}></InfoField>
              )}

              {loadingInfo ? (
                <SkeletonDetailModal caption={'Số điện thoại'}></SkeletonDetailModal>
              ) : (
                <InfoField caption={'Số điện thoại'} value={formData.phone}></InfoField>
              )}

              
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                alignSelf: 'stretch',
              }}
            >
              {loadingInfo ? (
                <SkeletonDetailModal caption={'Tỉnh/Thành phố'}></SkeletonDetailModal>
              ) : (
                <InfoField caption={'Tỉnh/Thành phố'} value={formData.address.province}></InfoField>
              )}
              {loadingInfo ? (
                <SkeletonDetailModal caption={'Quận/Huyện'}></SkeletonDetailModal>
              ) : (
                <InfoField caption={'Quận/Huyện'} value={formData.address.district}></InfoField>
              )}
              {loadingInfo ? (
                <SkeletonDetailModal caption={'Xã/Phường'}></SkeletonDetailModal>
              ) : (
                <InfoField caption={'Xã/Phường'} value={formData.address.town}></InfoField>
              )}
            </Box>

            <Box
              sx={{
                alignSelf: 'stretch',
              }}
            >
              {loadingInfo ? (
                <SkeletonDetailModal caption={'Số nhà, đường/phố'}></SkeletonDetailModal>
              ) : (
                <InfoField caption={'Số nhà, đường/phố'} value={formData.address.street}></InfoField>
              )}
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
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
              {loadingInfo ? (
                <SkeletonDetailModal caption={'Mã số công chứng viên'}></SkeletonDetailModal>
              ) : (
                <InfoField caption={'Mã số công chứng viên'} value={formData.id}></InfoField>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                alignSelf: 'stretch',
              }}
            >
              {loadingInfo ? (
                <SkeletonDetailModal caption={'Vị trí công việc'}></SkeletonDetailModal>
              ) : (
                <InfoField caption={'Vị trí công việc'} value={formData.role}></InfoField>
              )}

              {loadingInfo ? (
                <SkeletonDetailModal caption={'Ngày bắt đầu'}></SkeletonDetailModal>
              ) : (
                <InfoField caption={'Ngày bắt đầu'} value={formData.createdAt}></InfoField>
              )} 
            </Box>
          </Box>
        </TabPanel>
      </Box>
    </Modal>
  );
};
export default EmployeeDetailModal;
