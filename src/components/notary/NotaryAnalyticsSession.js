import React from 'react';
import NotaryAnalyticsCard from './NotaryAnalyticsCard';
import { Box } from '@mui/material';

const NotaryAnalyticsSession = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '', sm: 'repeat(2, minmax(250px, 1fr))' },
      }}
    >
      <NotaryAnalyticsCard title={'Tổng Số yêu Cầu chờ Xử lý'} value={'60'} growth={100} />
      <NotaryAnalyticsCard title={'Tổng số yêu cầu chờ ký số'} value={'60'} growth={100} />
      <NotaryAnalyticsCard title={'Tổng số yêu cầu đã xử lý'} value={'1,892'} growth={100} />
      <NotaryAnalyticsCard title={'Tỉ lệ xác minh thành công'} value={'98.7%'} growth={100} />
    </Box>
  );
};

export default NotaryAnalyticsSession;
