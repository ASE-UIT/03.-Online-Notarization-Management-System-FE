import React from 'react';
import { Box, Typography } from '@mui/material';

const DocumentUploadSection = () => {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 14, color: black[500], fontWeight: 500 }}>Giấy chứng nhận quyền sở hữu</Typography>
        <Box
          sx={{
            display: 'flex',
            p: 1,
            gap: 2,
            alignItems: 'center',
            p: 1,
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
              ':hover': {
                transform: 'scale(1.02)',
              },
              transition: 'all 0.3s',
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 600, textTransform: 'capitalize', color: primary[500] }}>
              Chọn tài liệu
            </Typography>
            <input type="file" hidden multiple onChange={handleFileChange} accept=".pdf,.docx,.png,.jpg" />
          </Button>

          <Typography sx={{ fontSize: 12, textTransform: 'capitalize', color: black[900] }}>
            (3 files đã đăng tải)
          </Typography>
        </Box>
      </Box>
      {Array.from({ length: 3 }).map((_, index) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, color: black[400] }}>Ten file.pdf</Typography>
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                p: 1,
              }}
            >
              <TaskAltRounded sx={{ color: green[500], fontSize: 18 }} />
            </Box>
            <Box
              sx={{
                p: 1,
                borderRadius: 1,
                transition: 'all 0.3s',
                ':hover': {
                  backgroundColor: gray[100],
                },
                cursor: 'pointer',
              }}
            >
              <CloseRounded sx={{ fontSize: 18 }} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default DocumentUploadSection;
