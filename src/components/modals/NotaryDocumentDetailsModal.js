import { ArrowBack, PictureAsPdf, FileDownloadOutlined, Error, FiberManualRecord } from '@mui/icons-material';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import { dark, red, yellow, black, white, gray } from '../../config/theme/themePrimitives';
import NotaryStep from './NotaryStep';
import NotarizationService from '../../services/notarization.service';

const NotaryDocumentDetailsModal = ({ open, handleClose, notarizationData }) => {
  console.log('notarizationData', notarizationData);

  const [currentStep] = useState(0);

  const handleConfirm = async () => {
    try {
      const formData = new FormData();
      formData.append('notarizationService', JSON.stringify(notarizationData.notaryService));
      formData.append('notarizationField', JSON.stringify(notarizationData.notaryField));
      formData.append('requesterInfo', JSON.stringify(notarizationData.requesterInfo));

      notarizationData.files.forEach((file) => {
        if (file) {
          formData.append('files', file);
        }
      });

      const response = await NotarizationService.uploadNotarizationDocument(formData);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const renderStatusBox = (status) => {
    switch (status) {
      case undefined:
        return (
          <Box
            sx={{
              backgroundColor: dark[50],
              color: dark[500],
              borderRadius: '30px',
              py: 0.5,
              px: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>Chưa xác nhận</Typography>
          </Box>
        );

      case 'pending':
        return (
          <Box
            sx={{
              backgroundColor: dark[50],
              color: dark[500],
              borderRadius: '30px',
              py: 0.5,
              px: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>Chờ xử lý</Typography>
          </Box>
        );
      case 'processing':
        return (
          <Box
            sx={{
              backgroundColor: dark[50],
              color: dark[500],
              borderRadius: '30px',
              py: 0.5,
              px: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>Đang xử lý</Typography>
          </Box>
        );
      case 'receiving':
        return (
          <Box
            sx={{
              backgroundColor: dark[50],
              color: dark[500],
              borderRadius: '30px',
              py: 0.5,
              px: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>Tiếp nhận và sử lý</Typography>
          </Box>
        );
      case 'ready':
        return (
          <Box
            sx={{
              backgroundColor: dark[50],
              color: dark[500],
              borderRadius: '30px',
              py: 0.5,
              px: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>Sẵn sàng ký số</Typography>
          </Box>
        );
      case 'completed':
        return (
          <Box
            sx={{
              backgroundColor: dark[50],
              color: dark[500],
              borderRadius: '30px',
              py: 0.5,
              px: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>Hoàn tất</Typography>
          </Box>
        );
      default:
        return (
          <Box
            sx={{
              backgroundColor: dark[50],
              color: dark[500],
              borderRadius: '30px',
              py: 0.5,
              px: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>Không hợp lệ</Typography>
          </Box>
        );
    }
  };

  const renderFileBox = (file) => {
    return (
      <Box
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          borderRadius: 1,
          boxShadow: 1,
          border: `1px solid ${black[50]}`,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            borderRadius: 100,
            backgroundColor: red[50],
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            padding: 1,
          }}
        >
          <PictureAsPdf fontSize={'small'} sx={{ color: red[500] }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            minWidth: '100px',
            maxWidth: '100px',
            whiteSpace: 'nowrap',
            overflow: 'clip',
            textOverflow: 'ellipsis',
          }}
        >
          <Typography sx={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{file.name}</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }}>{file.size}</Typography>
        </Box>
        <Box
          sx={{
            borderRadius: 100,
            backgroundColor: dark[50],
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            padding: 1,
          }}
        >
          <FileDownloadOutlined fontSize={'small'} sx={{ color: black[900] }} />
        </Box>
      </Box>
    );
  };

  const renderFileIcon = (image) => {
    return (
      <Box
        padding={'8px'}
        display={'flex'}
        flexDirection={'row'}
        gap={'16px'}
        borderRadius={'8px'}
        border={'1px solid'}
        borderColor={dark[50]}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box
          borderRadius={'100px'}
          backgroundColor={yellow[50]}
          justifyContent={'center'}
          alignItems={'center'}
          display={'flex'}
          padding={'8px'}
        >
          <PictureAsPdf fontSize={'small'} sx={{ color: yellow[500] }} />
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
          <Typography variant={'body2'}>{image.name}</Typography>
          <Typography variant={'body3'}>{image.size}</Typography>
        </Box>
        <Box
          borderRadius={'100px'}
          backgroundColor={dark[50]}
          justifyContent={'center'}
          alignItems={'center'}
          display={'flex'}
          padding={'8px'}
        >
          <FileDownloadOutlined fontSize={'small'} sx={{ color: black[900] }} />
        </Box>
      </Box>
    );
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'fit-content',
          height: '90vh',
          backgroundColor: white[50],
          borderRadius: 2,
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 1,
          p: 2,
          gap: 2,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={handleClose}>
              <ArrowBack
                sx={{
                  color: black[900],
                }}
                fontSize="small"
              />
            </IconButton>
            <Typography variant="subtitle2" color={black[900]}>
              Chi tiết hồ sơ công chứng {notarizationData._id && `- Mã số: #${notarizationData._id}`}
            </Typography>
          </Box>
          {renderStatusBox(notarizationData.status)}
        </Box>
        {/* User Information Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 2,
            backgroundColor: gray[50],
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" color={black[900]}>
            Thông tin khách hàng
          </Typography>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant="body3" flex={1}>
              Họ và tên:
            </Typography>
            <Typography variant="body3">{notarizationData?.requesterInfo?.fullName}</Typography>
          </Box>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant="body3" flex={1} textAlign={'left'}>
              Số CMND/CCCD:
            </Typography>
            <Typography variant="body3" flex={1} textAlign={'right'}>
              {notarizationData?.requesterInfo?.citizenId}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant="body3" flex={1} textAlign={'left'}>
              Số điện thoại:
            </Typography>
            <Typography variant="body3" flex={1} textAlign={'right'}>
              {notarizationData?.requesterInfo?.phoneNumber}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant="body3" flex={1} textAlign={'left'}>
              Email:
            </Typography>
            <Typography variant="body3" flex={1} textAlign={'right'}>
              {notarizationData?.requesterInfo?.email}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 2,
            backgroundColor: gray[50],
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" color={black[900]}>
            Thông tin tài liệu công chứng
          </Typography>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant="body3" flex={1} textAlign={'left'}>
              Lĩnh vực công chứng:
            </Typography>
            <Typography variant="body3" flex={1} textAlign={'right'}>
              {notarizationData?.notaryField?.name}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant="body3" flex={1} textAlign={'left'}>
              Dịch vụ công chứng:
            </Typography>
            <Typography variant="body3" flex={1} textAlign={'right'}>
              {notarizationData?.notaryService?.name}
            </Typography>
          </Box>
        </Box>
        {/* Files Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: 1,
          }}
        >
          <Typography variant="subtitle2" color={black[900]}>
            Tệp
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            {notarizationData.files.map((file) => renderFileBox(file))}
          </Box>
        </Box>
        {/* Images Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            p: '16px',
          }}
        >
          <Typography variant="subtitle2" color={black[900]}>
            Ảnh
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
            }}
          ></Box>
        </Box>
        {notarizationData.status !== undefined && (
          <>
            {/* Steps Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '32px',
                p: '16px',
              }}
            >
              <NotaryStep currentStep={currentStep} />
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: white[50],
                  boxShadow: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  height: 'fit-content',
                  borderRadius: 1,
                  border: `1px solid ${black[50]}`,
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 600, textAlign: 'left' }}>Ghi chú</Typography>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    borderRadius: 1,
                    backgroundColor: red[50],
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: 'fit-content',
                    my: 2,
                  }}
                >
                  <Error fontSize={'small'} sx={{ color: red[400] }} />
                  <Typography sx={{ color: black[900], fontSize: 12, fontWeight: 500 }}>
                    Hồ sơ cần bổ sung thêm giấy tờ
                  </Typography>
                </Box>

                <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1, textAlign: 'left' }}>
                  Tài liệu cần bổ sung
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: 'fit-content',
                    p: 1,
                  }}
                >
                  <FiberManualRecord sx={{ color: black[900], width: '8px', height: '8px' }} />
                  <Typography sx={{ color: black[900], fontSize: 12, fontWeight: 400 }}>
                    Giấy tờ chứng minh nhân dân
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* Contact Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 1,
                width: 'fit-content',
                border: `1px solid ${black[50]}`,
                borderRadius: 1,
                backgroundColor: gray[50],
              }}
            >
              <Typography sx={{ color: black[900], fontSize: 14, fontWeight: 500, mb: 1 }}>Hỗ trợ khách hàng</Typography>
              <Typography sx={{ color: black[900], fontSize: 12, fontWeight: 400 }}>
                Liên hệ: 1900-123-456 hoặc email: support@notary.vn
              </Typography>
            </Box>
          </>
        )}

        {notarizationData.status === undefined && (
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default NotaryDocumentDetailsModal;
