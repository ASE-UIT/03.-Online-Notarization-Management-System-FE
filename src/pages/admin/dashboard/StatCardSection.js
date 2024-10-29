import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { BarChartRounded, DescriptionRounded, LocalOfferRounded } from '@mui/icons-material';
import { red, yellow, green } from '../../../config/theme/themePrimitives';
import StatCard from '../../../components/static/StatCard';

const StatCardSection = () => {
  return (
    <Grid container direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Grid sx={{ flex: 1 }} item xs={12} md={4}>
        <StatCard
          title="Tổng doanh thu"
          value="$1K"
          percentageChange="+8% so với hôm qua"
          color={red}
          icon={<BarChartRounded sx={{ fontSize: 20 }} />}
        />
      </Grid>
      <Grid sx={{ flex: 1 }} item xs={12} md={4}>
        <StatCard
          title="Tổng tài liệu"
          value="300"
          percentageChange="+8% so với hôm qua"
          color={yellow}
          icon={<DescriptionRounded sx={{ fontSize: 20 }} />}
        />
      </Grid>
      <Grid sx={{ flex: 1 }} item xs={12} md={4}>
        <StatCard
          title="Tổng phiên công chứng"
          value="5"
          percentageChange="+8% so với hôm qua"
          color={green}
          icon={<LocalOfferRounded sx={{ fontSize: 20 }} />}
        />
      </Grid>
    </Grid>
  );
};

export default StatCardSection;
