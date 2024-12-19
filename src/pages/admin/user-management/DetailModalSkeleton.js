import React from 'react';
import { Box, Typography, Divider, Skeleton } from '@mui/material';
import { gray, white } from '../../../config/theme/themePrimitives';

const DetailModalSkeleton = () => {
  return (
    <Box
      sx={{
        height: '50vh',
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
        <Skeleton variant="text" height={30} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  );
};

export default DetailModalSkeleton;
