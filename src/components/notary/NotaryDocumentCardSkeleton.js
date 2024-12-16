import React from 'react';
import { Box, Divider, Skeleton } from '@mui/material';
import { black, gray } from '../../config/theme/themePrimitives';

const NotaryDocumentCardSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 1,
        padding: 1,
        border: `1px solid ${black[50]}`,
        borderRadius: 1,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px 16px',
          minWidth: 120,
        }}
      >
        <Skeleton variant="circular" width={40} height={40} />
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '0px 16px',
        }}
      >
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="text" width={100} height={20} />
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '0px 16px',
        }}
      >
        <Skeleton variant="text" width={50} height={16} />
        <Skeleton variant="text" width="80%" height={20} />
      </Box>

      <Skeleton
        variant="rectangular"
        sx={{
          borderRadius: '4px',
          bgcolor: gray[100],
          height: 32,
          width: 80,
        }}
      />
    </Box>
  );
};

export default NotaryDocumentCardSkeleton;
