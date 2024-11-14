import { Box, Modal, Typography, Tabs, Tab, Avatar, Grid } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { black, gray, white } from '../../../config/theme/themePrimitives';
import 'react-toastify/dist/ReactToastify.css';
import InfoField from './InfoField';
import DetailModalSkeleton from './DetailModalSkeleton';
import UserService from '../../../services/user.service';
import NotarizationService from '../../../services/notarization.service';
import NotaryDocumentCard from './NotaryDocumentCard';

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
  const[documents, setDocuments] = useState([]);

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

  const statusMapping = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    verification: 'Đang xác minh',
    digitalSignature: 'Sẵn sàng ký số',
    completed: 'Hoàn tất',
    rejected: 'Không hợp lệ',
  };

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const userInfo = await UserService.getUserById(userId);
      const userNotaryHistory = await NotarizationService.getHistoryByUserId(userId);
      const transformedDocuments = userNotaryHistory.map(item => ({
        docType: item.notarizationService?.name || '',
        documentId: item._id,
        date: new Date(item.createdAt).toLocaleDateString('vi-VN'),
        status: statusMapping[item.status?.status] || 'Không xác định',
      }));

      setUserData({
        role: userInfo?.role || '',
        isEmailVerified: userInfo?.isEmailVerified || false,
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        phone: userInfo?.phoneNumber || '',
        identification: userInfo?.citizenId || '',
        city: userInfo.address?.province || '',
        district: userInfo.address?.district || '',
        ward: userInfo.address?.town || '',
        street: userInfo.address?.street || '',
      });
      setDocuments(transformedDocuments);
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

  useEffect(() => {
    if (open) {
      setTabValue(0);
    }
  }, [open]);

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
