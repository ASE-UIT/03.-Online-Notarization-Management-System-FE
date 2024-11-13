import { Box, Modal, Typography, Tabs, Tab, Avatar, Grid } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { black, gray, white } from '../../../config/theme/themePrimitives';
import 'react-toastify/dist/ReactToastify.css';
import InfoField from './InfoField';
import DetailModalSkeleton from './DetailModalSkeleton';
import UserService from '../../../services/user.service';
import NotaryDocumentCard from './NotaryDocumentCard';

const documents = [
  {
    docType: 'Công chứng hợp đồng mua bán nhà đất',
    documentId: '6722157ce89b01001f5ca296',
    date: '24/09/2024',
    status: 'Đang xử lý',
  },
  {
    docType: 'Công chứng hợp đồng mua bán nhà đất',
    documentId: '6722157ce89b01001f5ca297',
    date: '25/09/2024',
    status: 'Hoàn thành',
  },
  {
    docType: 'Công chứng hợp đồng mua bán nhà đất',
    documentId: '6722157ce89b01001f5ca298',
    date: '26/09/2024',
    status: 'Chờ xác nhận',
  },
  {
    docType: 'Công chứng hợp đồng mua bán nhà đất',
    documentId: '6722157ce89b01001f5ca299',
    date: '27/09/2024',
    status: 'Đang xử lý',
  },
  {
    docType: 'Công chứng hợp đồng mua bán nhà đất',
    documentId: '6722157ce89b01001f5ca300',
    date: '28/09/2024',
    status: 'Hoàn thành',
  },
  {
    docType: 'Công chứng hợp đồng mua bán nhà đất',
    documentId: '6722157ce89b01001f5ca301',
    date: '29/09/2024',
    status: 'Chờ xác nhận',
  },
  {
    docType: 'Công chứng hợp đồng mua bán nhà đất',
    documentId: '6722157ce89b01001f5ca302',
    date: '30/09/2024',
    status: 'Đang xử lý',
  },
  {
    docType: 'Công chứng hợp đồng mua bán nhà đất',
    documentId: '6722157ce89b01001f5ca303',
    date: '01/10/2024',
    status: 'Hoàn thành',
  },
];

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <Box role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};

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

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await UserService.getUserById(userId);
      setUserData({
        role: response?.role || '',
        isEmailVerified: response?.isEmailVerified || false,
        name: response?.name || '',
        email: response?.email || '',
        phone: response?.phoneNumber || '',
        identification: response?.citizenId || '',
        city: response.address?.province || '',
        district: response.address?.district || '',
        ward: response.address?.town || '',
        street: response.address?.street || '',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (open) {
      fetchUserData();
    }
  }, [open, fetchUserData]);

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
          borderRadius: 2,
          backgroundColor: white[50],
          p: 3,
        }}
      >
        {/* Form Fields Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: 1,
          }}
        >
          {/* Avatar Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3 }}>
            <Avatar src="/avatar.png" sx={{ width: 64, height: 64, borderRadius: '50%' }} />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{!loading ? userData.name : ''}</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 400, color: gray[500] }}>
                {!loading ? userData.email : ''}
              </Typography>
            </Box>
          </Box>
          {/* Tab Panel */}
          <Tabs sx={{ p: 1 }} value={tabValue} onChange={handleTabChange}>
            <Tab label="Thông tin cá nhân" sx={{ textTransform: 'none' }} />
            <Tab label="Tài liệu công chứng" sx={{ textTransform: 'none' }} />
          </Tabs>

          {/* Tab Information */}
          <TabPanel value={tabValue} index={0}>
            {loading ? (
              <DetailModalSkeleton></DetailModalSkeleton>
            ) : (
              <Box
                sx={{
                  height: '50vh',
                  display: 'flex',
                  p: 2,
                  flexDirection: 'column',
                  gap: 2,
                  borderRadius: 1,
                  border: `1px solid ${black[50]}`,
                  backgroundColor: white[50],
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignSelf: 'stretch',
                  }}
                >
                  <InfoField caption={'Họ và tên'} value={userData.name}></InfoField>
                  <InfoField caption={'CMND/CCCD'} value={userData.identification}></InfoField>
                </Box>

                <Box
                  sx={{
                    gap: 1,
                    display: 'flex',
                    alignSelf: 'stretch',
                  }}
                >
                  <InfoField caption={'Email'} value={userData.email}></InfoField>
                  <InfoField caption={'Số điện thoại'} value={userData.phone}></InfoField>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignSelf: 'stretch',
                  }}
                >
                  <InfoField caption={'Tỉnh/Thành phố'} value={userData.city}></InfoField>
                  <InfoField caption={'Quận/Huyện'} value={userData.district}></InfoField>
                  <InfoField caption={'Xã/Phường'} value={userData.ward}></InfoField>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignSelf: 'stretch',
                  }}
                >
                  <InfoField caption={'Số nhà, đường/phố'} value={userData.street}></InfoField>
                </Box>
              </Box>
            )}
          </TabPanel>

          {/* Tab Notary Docs */}
          <TabPanel value={tabValue} index={1}>
            <Box
              sx={{
                maxWidth: '100%',
                overflowY: 'auto',
                margin: 'center',
                justifyItems: 'center',
                justifyContent: 'space-between',
                height: '50vh',
                p: 2,
                backgroundColor: white[50],
                borderRadius: 1,
                border: `1px solid ${black[50]}`,
              }}
            >
              <Grid container spacing={3} alignItems="center">
                {documents.map((doc, index) => (
                  <Grid item xs={12} sm={12} md={6} key={index}>
                    <NotaryDocumentCard
                      docType={doc.docType}
                      documentId={doc.documentId}
                      date={doc.date}
                      status={doc.status}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserProfileModal;
