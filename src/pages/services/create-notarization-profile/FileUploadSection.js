import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { black, green, primary, gray } from '../../../config/theme/themePrimitives';
import { TaskAltRounded, CloseRounded, OpenInNewRounded } from '@mui/icons-material';
import { VALID_FORMATS } from '../../../utils/constants';

const FileUploadSection = ({ uploadedFiles, handleFileChange, handleRemoveFile, title, confirmed = false }) => {
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
            >
              <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'capitalize', color: primary[500] }}>
                Chọn tài liệu
              </Typography>
              <input type="file" hidden multiple onChange={handleFileChange} accept={VALID_FORMATS} />
            </Button>
            <Typography sx={{ fontSize: 12, textTransform: 'capitalize', color: black[900] }}>
              ({uploadedFiles.length} files đã đăng tải)
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ fontSize: 14, textTransform: 'capitalize', color: black[900] }}>
            ({uploadedFiles.length} files đã đăng tải)
          </Typography>
        )}
      </Box>
      {uploadedFiles.map((file, index) => (
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
                onClick={() => handleRemoveFile(file)}
              >
                <CloseRounded sx={{ fontSize: 18 }} />
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default FileUploadSection;
