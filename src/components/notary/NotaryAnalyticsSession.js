import React from 'react';
import NotaryAnalyticsCard from './NotaryAnalyticsCard';
import { Box } from '@mui/material';

const NotaryAnalyticsSession = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 3,
            }}
        >
            <NotaryAnalyticsCard title={'Tổng số xác minh'} value={'60'} growth={100} />
            <NotaryAnalyticsCard title={'Tổng số Yêu cầu chờ xử lý'} value={'60'} growth={100} />
            <NotaryAnalyticsCard title={'Tổng số yêu cầu đang xử lý'} value={'1,892'} growth={100} />
            <NotaryAnalyticsCard title={'Tỉ lệ xác minh thành công'} value={'98.7%'} growth={100} />
        </Box>
    );
};

export default NotaryAnalyticsSession;
