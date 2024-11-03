import React from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { black, white } from '../../../config/theme/themePrimitives';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
ChartJS.register(BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const RevenuePerFieldChart = ({ period, setPeriod, notaryFieldBarChartData, notaryFieldBarChartOptions }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: white[50],
        p: 2,
        boxShadow: 1,
        borderRadius: 2.5,
        flex: 1,
        minHeight: '400px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, mb: 2 }}>
        <Typography sx={{ flex: 1, color: black[900], fontSize: 16, fontWeight: 600 }}>Doanh thu theo lĩnh vực</Typography>
        <Autocomplete
          size="small"
          options={[
            { id: 'today', name: 'Hôm nay' },
            { id: 'current_week', name: 'Tuần này' },
            { id: 'current_month', name: 'Tháng này' },
            { id: 'current_year', name: 'Năm nay' },
          ]}
          getOptionLabel={(option) => option.name}
          value={period}
          onChange={(event, newValue) => {
            if (newValue) setPeriod(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{ ...params.inputProps, readOnly: true }}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: 14,
                },
              }}
              placeholder={'Chọn thời gian'}
            />
          )}
          sx={{ width: '10%', flex: 1 }}
        />
      </Box>
      <Box sx={{ height: '100%', flex: 1 }}>
        <Bar data={notaryFieldBarChartData} options={notaryFieldBarChartOptions} />
      </Box>
    </Box>
  );
};

export default RevenuePerFieldChart;
