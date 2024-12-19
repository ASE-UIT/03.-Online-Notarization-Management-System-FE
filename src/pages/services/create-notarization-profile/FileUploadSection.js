import React, { useRef, useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import { black, green, primary, gray } from '../../../config/theme/themePrimitives';
import { TaskAltRounded, CloseRounded, OpenInNewRounded, DevicesRounded, Wallet } from '@mui/icons-material';
import { VALID_FORMATS } from '../../../utils/constants';
import UserWalletModal from '../../../components/services/UserWalletModal';

const FileUploadSection = ({
  title,
  currentFiles,
  handleCurrentFileChange,
  handleRemoveCurrentFile,
  uploadedFiles,
  handleRemoveUploadedFile,
  documentWalletFiles,
  handleDocumentWalletFileChange,
  handleRemoveDocumentWalletFile,
  confirmed = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);
  const open = Boolean(anchorEl);
  const [openWalletModal, setOpenWalletModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChooseFromDevice = () => {
    inputRef.current.click();
    handleClose();
  };

  const handleCloseUserWalletModal = () => {
    setOpenWalletModal(false);
    handleClose();
  };

  const totalFiles = (currentFiles?.length || 0) + (uploadedFiles?.length || 0) + (documentWalletFiles?.length || 0);

  return (
    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 14, color: black[500], fontWeight: 500 }}>{title}</Typography>
        {!confirmed ? (
          <Box
            sx={{
              display: 'flex',
              p: 1,
              gap: 2,
              alignItems: 'center',
              border: `1px solid ${black[50]}`,
              borderRadius: 1,
            }}
          >
            <Button
              sx={{
                backgroundColor: primary[50],
                px: 2,
                py: '4px',
                borderRadius: 100,
                cursor: 'pointer',
                ':hover': { transform: 'scale(1.02)' },
                transition: 'all 0.3s',
              }}
              component="label"
              onClick={handleClick}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'capitalize', color: primary[500] }}>
                Chọn tài liệu
              </Typography>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: `drop-shadow(0px 2px 8px ${black[100]})`,
                  mt: 1.5,
                  '& .MuiMenu-list': { padding: 1 },
                  '& .MuiMenuItem-root': {
                    fontSize: 12,
                    fontWeight: 400,
                    textTransform: 'none',
                    width: 160,
                    color: black[900],
                    borderRadius: 1,
                    '&:hover': {
                      color: primary[500],
                      backgroundColor: primary[50],
                      fontWeight: 500,
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={handleChooseFromDevice} sx={{ gap: 1 }}>
                <DevicesRounded sx={{ fontSize: 14 }} />
                Chọn từ máy
              </MenuItem>
              <MenuItem sx={{ gap: 1 }} onClick={() => setOpenWalletModal(true)}>
                <Wallet sx={{ fontSize: 14 }} />
                Chọn từ ví tài liệu
              </MenuItem>
            </Menu>
            <input type="file" hidden multiple ref={inputRef} onChange={handleCurrentFileChange} accept="image/*,application/pdf" />
            <Typography sx={{ fontSize: 12, textTransform: 'capitalize', color: black[900] }}>
              ({totalFiles} files đã đăng tải)
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ fontSize: 14, textTransform: 'capitalize', color: black[900] }}>
            ({totalFiles} files đã đăng tải)
          </Typography>
        )}
      </Box>
      {uploadedFiles?.map((file, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              cursor: 'pointer',
              ':hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => window.open(file.file.url || file.file.firebaseUrl || URL.createObjectURL(file.file), '_blank')}
          >
            <Typography sx={{ display: 'list-item', ml: '1rem', fontSize: 14, color: black[500] }}>
              {file.file.name || file.file.filename}
            </Typography>
            <OpenInNewRounded sx={{ fontSize: 14, color: black[500] }} />
          </Box>
          {!confirmed && (
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ p: 1 }}>
                <TaskAltRounded sx={{ color: green[500], fontSize: 18 }} />
              </Box>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  transition: 'all 0.3s',
                  ':hover': { backgroundColor: gray[100] },
                  cursor: 'pointer',
                }}
                onClick={() => handleRemoveUploadedFile(file)}
              >
                <CloseRounded sx={{ fontSize: 18 }} />
              </Box>
            </Box>
          )}
        </Box>
      ))}

      {currentFiles?.map((file, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              cursor: 'pointer',
              ':hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => window.open(file.file.url || file.file.firebaseUrl || URL.createObjectURL(file.file), '_blank')}
          >
            <Typography sx={{ display: 'list-item', ml: '1rem', fontSize: 14, color: black[500] }}>
              {file.file.name || file.file.filename}
            </Typography>
            <OpenInNewRounded sx={{ fontSize: 14, color: black[500] }} />
          </Box>
          {!confirmed && (
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ p: 1 }}>
                <TaskAltRounded sx={{ color: green[500], fontSize: 18 }} />
              </Box>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  transition: 'all 0.3s',
                  ':hover': { backgroundColor: gray[100] },
                  cursor: 'pointer',
                }}
                onClick={() => handleRemoveCurrentFile(file)}
              >
                <CloseRounded sx={{ fontSize: 18 }} />
              </Box>
            </Box>
          )}
        </Box>
      ))}

      {documentWalletFiles?.map((file, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              cursor: 'pointer',
              ':hover': {
                textDecoration: 'underline',
              },
            }}
            onClick={() => window.open(file.document.tokenURI, '_blank')}
          >
            <Typography sx={{ display: 'list-item', ml: '1rem', fontSize: 14, color: black[500] }}>
              {file.document.filename}
            </Typography>
            <OpenInNewRounded sx={{ fontSize: 14, color: black[500] }} />
          </Box>
          {!confirmed && (
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ p: 1 }}>
                <TaskAltRounded sx={{ color: green[500], fontSize: 18 }} />
              </Box>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  transition: 'all 0.3s',
                  ':hover': { backgroundColor: gray[100] },
                  cursor: 'pointer',
                }}
                onClick={() => handleRemoveDocumentWalletFile(file)}
              >
                <CloseRounded sx={{ fontSize: 18 }} />
              </Box>
            </Box>
          )}
        </Box>
      ))}
      {openWalletModal && (
        <UserWalletModal
          open={openWalletModal}
          onClose={handleCloseUserWalletModal}
          handleDocumentWalletFileChange={handleDocumentWalletFileChange}
        />
      )}
    </Box>
  );
};

export default FileUploadSection;
