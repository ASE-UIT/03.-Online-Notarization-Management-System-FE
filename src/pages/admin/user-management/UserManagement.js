import  React, { useState } from 'react';
import { Box } from '@mui/material';
import UserOverview from './UserOverview';
import UserDataTable from './UserDataTable';
import Header from './Header';
import { gray } from '../../../config/theme/themePrimitives';

const UserManagement = () => {
  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: gray[50]
    }}>
      <Header></Header>
      <UserOverview></UserOverview>
      <UserDataTable></UserDataTable>
    </Box>
  );
};

export default UserManagement;
