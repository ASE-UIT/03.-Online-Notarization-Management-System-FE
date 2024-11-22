import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';

const DetailModalSkeleton = ({caption}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        alignSelf: 'stretch',
        flexDirection: 'column',
        flex: '1 0 0',
      }}
    >
      <Typography
        sx={{
          color: '#000',
          fontFeatureSettings: 'liga off, clig off',
          fontFamily: 'Be Vietnam Pro',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: 'normal',
        }}
      >
        {caption}
      </Typography>
      <Skeleton variant="text" height={50} />
    </Box>
  );
};

export default DetailModalSkeleton;