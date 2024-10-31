import React from 'react';
import { Box, Grid2 as Grid } from '@mui/material';
import { BarChartRounded, DescriptionRounded, LocalOfferRounded } from '@mui/icons-material';
import { red, yellow, green } from '../../../config/theme/themePrimitives';
import StatCard from '../../../components/static/StatCard';

const StatCardSection = ({ documentData, sessionData, paymentData }) => {
  const renderPercentageChange = (data) => {
    let previous_period = '';
    let percentageChange = data?.growthPercent || 0;
    if (data?.currentPeriod?.period === 'today') {
      previous_period = 'hôm qua';
    } else if (data?.currentPeriod?.period === 'current_week') {
      previous_period = 'tuần trước';
    } else if (data?.currentPeriod?.period === 'current_month') {
      previous_period = 'tháng trước';
    } else if (data?.currentPeriod?.period === 'current_year') {
      previous_period = 'năm trước';
    }

    if (percentageChange > 0) {
      return `+${percentageChange}% so với ${previous_period}`;
    }
    return `${percentageChange}% so với ${previous_period}`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1 }}>
      <StatCard
        title="Tổng doanh thu"
        value={paymentData?.currentPeriod?.totalAmount || 0}
        percentageChange={renderPercentageChange(paymentData)}
        color={red}
        icon={<BarChartRounded sx={{ fontSize: 20 }} />}
      />
      <StatCard
        title="Tổng tài liệu"
        value={documentData?.currentPeriod?.documentCount || 0}
        percentageChange={renderPercentageChange(documentData)}
        color={yellow}
        icon={<DescriptionRounded sx={{ fontSize: 20 }} />}
      />
      <StatCard
        title="Tổng phiên công chứng"
        value={sessionData?.currentPeriod?.sessionCount || 0}
        percentageChange={renderPercentageChange(sessionData)}
        color={green}
        icon={<LocalOfferRounded sx={{ fontSize: 20 }} />}
      />
    </Box>
  );
};

export default StatCardSection;
