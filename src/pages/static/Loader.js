import { Container, Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { black } from '../../config/theme/themePrimitives';

const loadingAnimation = keyframes`
  0% {
    inset: 0 100% 0 0;
  }
  100% {
    inset: 0;
  }
`;

const Loader = () => {
  return (
    <Container
      sx={{
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '95vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
          boxShadow: 1,
          border: `1px solid ${black[50]}`,
          borderRadius: 2,
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: black[900] }}>
          Third-party login
        </Typography>
        <Typography variant="body1" sx={{ color: black[500] }}>
          Please wait while we redirect you to the third-party login page
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 550,
            height: 16,
            borderRadius: '20px',
            border: `2px solid #aa1d39`,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: '0 100% 0 0',
              borderRadius: 'inherit',
              background: '#aa1d39',
              animation: `${loadingAnimation} 2s infinite`,
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default Loader;
