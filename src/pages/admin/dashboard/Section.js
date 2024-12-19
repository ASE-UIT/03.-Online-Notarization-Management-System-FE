import React from 'react';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { white, black } from '../../../config/theme/themePrimitives';

const Section = ({ title, period, setPeriod, children }) => (
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
      <Typography sx={{ flex: 1, color: black[900], fontSize: 16, fontWeight: 600 }}>{title}</Typography>
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
        onChange={(event, newValue) => newValue && setPeriod(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{ ...params.inputProps, readOnly: true }}
            sx={{ '& .MuiInputBase-input': { fontSize: 14 } }}
            placeholder="Chọn thời gian"
          />
        )}
        sx={{ width: { xs: '100%', md: '10%' }, flex: 1 }}
      />
    </Box>
    <Box sx={{ height: '100%', flex: 1 }}>{children}</Box>
  </Box>
);

export default Section;
