import React from 'react';
import { Avatar, Box, Divider, Skeleton, Typography } from '@mui/material';
import { gray } from '../../config/theme/themePrimitives';

const NotarizationCardSkeleton = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="flex-start"
      width="90%"
      height="100px"
      border={`2px solid ${gray[200]}`}
      borderRadius={1}
      padding={2}
    >
      <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} height="100%">
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton variant="text" width={80} height={20} />
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          height: '80px',
          width: '1px',
          bgcolor: gray[200],
          alignSelf: 'center',
        }}
      />

      <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
        <Skeleton variant="text" width={60} height={20} />
        <Skeleton variant="text" width={60} height={20} />
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          height: '80px',
          width: '1px',
          bgcolor: gray[200],
          alignSelf: 'center',
        }}
      />

      <Box flex={2} display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="100%" gap={2}>
        <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" marginLeft={2}>
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: gray[800] }}>GHI CHÚ</Typography>
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="70%" height={20} />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Skeleton variant="rectangular" width={80} height={30} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default NotarizationCardSkeleton;
