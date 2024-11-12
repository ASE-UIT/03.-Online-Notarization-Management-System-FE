import { ArrowBack } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, Typography, Tabs, Tab, Avatar, TextField, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { black, gray, primary, white } from '../../../config/theme/themePrimitives';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import InfoField from './InfoField';
import DetailModalSkeleton from './DetailModalSkeleton';
import UserService from '../../../services/user.service';
import NotaryDocumentCard from './NotaryDocumentCard';

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

  const fetchUserData = async () => {
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
          p: 1,
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
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
                    <InfoField caption={'Tỉnh/Thành phố'} value={userData.city}></InfoField>
                    <InfoField caption={'Quận/Huyện'} value={userData.district}></InfoField>
                    <InfoField caption={'Xã/Phường'} value={userData.ward}></InfoField>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    gap: '16px',
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
                maxHeight: '40vh',
                overflowY: 'auto',
                margin: 'center',
                justifyItems: 'center',
                justifyContent: 'space-between',

                p: 1,
                backgroundColor: '#fff',
                borderRadius: '8px',
              }}
            >
              <Grid container spacing={3} alignItems="center">
                {documents.map((doc, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    key={index}
                    onClick={() => alert(`Clicked on document ID: ${doc.documentId}`)}
                  >
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
