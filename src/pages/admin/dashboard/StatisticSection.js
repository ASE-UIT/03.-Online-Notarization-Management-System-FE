import { FileUploadRounded } from '@mui/icons-material';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import StatCardSection from './StatCardSection';
import { black, dark, primary, white } from '../../../config/theme/themePrimitives';

const StatisticSection = ({ period, setPeriod, documentMetrics, sessionMetrics, paymentMetrics }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        backgroundColor: white[50],
        p: 2,
        boxShadow: 1,
        borderRadius: 2.5,
        flex: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ color: black[900], fontSize: 16, fontWeight: 600 }}>Thống kê</Typography>
          <Typography sx={{ color: black[400], fontSize: 14, fontWeight: 400 }}>Thống kê hôm nay</Typography>
        </Box>
        <Button
          variant="outlined"
          sx={{
            padding: '8px 16px',
            backgroundColor: white[50],
            border: `2px solid ${dark[100]}`,
            color: dark[500],
            borderRadius: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: primary[500],
              color: primary[500],
            },
            '&:hover .MuiSvgIcon-root': {
              color: primary[500],
            },
          }}
          startIcon={<FileUploadRounded sx={{ color: dark[400], fontSize: '16px' }} />}
        >
          <Typography
            sx={{
              fontSize: 14,
              textTransform: 'capitalize',
              fontWeight: '500',
              lineHeight: 1,
            }}
          >
            Xuất
          </Typography>
        </Button>
      </Box>
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
        sx={{ width: '30%', flex: 1 }}
      />
      <StatCardSection documentData={documentMetrics} sessionData={sessionMetrics} paymentData={paymentMetrics} />
    </Box>
  );
};

export default StatisticSection;
