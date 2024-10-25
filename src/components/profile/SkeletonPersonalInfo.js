import React from 'react';
import { Box, Typography, Button, Divider, Skeleton } from '@mui/material';
import { EditSharp } from '@mui/icons-material';
import { black, gray, primary, white } from '../../config/theme/themePrimitives';

const PersonalInformationSkeleton = () => {
  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        p: 2.5,
        border: `0.1rem solid ${gray[200]}`,
        borderRadius: 1,
        backgroundColor: `${white[50]}`,
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="caption" fontWeight="bold" flex={1} sx={{ textTransform: 'uppercase' }}>
          Thông tin cá nhân
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, maxHeight: '34.5px' }}>
          <Button
            startIcon={<EditSharp />}
            variant="contained"
            color="white"
            sx={{
              border: `1px solid ${black[50]}`,
              '&:hover': {
                border: `1px solid ${primary[500]}`,
                color: primary[500],
              },
            }}
            size="small"
            disabled
          >
            <Skeleton variant="text" width={60} />
          </Button>
        </Box>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} flexWrap="wrap" gap={2}>
        <Box flex={1} minWidth="250px">
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={20} />
        </Box>
        <Box flex={1} minWidth="250px">
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={20} />
        </Box>
        <Box flex={1} minWidth="250px">
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={20} />
        </Box>
        <Box flex={1} minWidth="250px">
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={20} />
        </Box>
      </Box>

      <Divider />

      <Box display="flex" flexDirection="column">
        <Typography variant="caption" fontWeight="bold" flex={1} sx={{ textTransform: 'uppercase' }}>
          Địa chỉ liên hệ
        </Typography>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} my={2}>
          <Box flex={1} minWidth="250px">
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={20} />
          </Box>
          <Box flex={1} minWidth="250px">
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={20} />
          </Box>
          <Box flex={1} minWidth="250px">
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={20} />
          </Box>
        </Box>
        <Skeleton variant="text" height={30} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  );
};

export default PersonalInformationSkeleton;
