import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { white, primary } from '../../../config/theme/themePrimitives';
import CreateNotaryAccountModal from './CreateNotaryAccountModal';

const Header = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          p: 2,
          gap: '8px',
          backgroundColor: white[50],
        }}
      >
        <Box sx={{ flex: 1, gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Quản lý nhân viên
          </Typography>
        </Box>
        <Button
          sx={{
            backgroundColor: primary[500],
            color: white[50],
            '&:hover': {
              backgroundColor: primary[700],
            },
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 500,
            padding: '4px 16px',
            borderRadius: 1,
          }}
          onClick={() => setOpen(true)}
        >
          Thêm nhân viên
        </Button>
      </Box>
      <CreateNotaryAccountModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
export default Header;
