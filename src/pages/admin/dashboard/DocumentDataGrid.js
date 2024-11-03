import React from 'react';
import { Autocomplete, Box, LinearProgress, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { gray, green, white, black } from '../../../config/theme/themePrimitives';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{params.value}</Box>,
  },
  {
    field: 'category',
    headerName: 'Lĩnh vực',
    width: 500,
    renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{params.value}</Box>,
  },
  {
    field: 'ratio',
    headerName: 'Tỉ lệ',
    width: 300,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
        <LinearProgress
          variant="determinate"
          value={params.value}
          sx={{
            width: '100%',
            height: 4,
            borderRadius: 5,
            backgroundColor: gray[300],
            '& .MuiLinearProgress-bar': {
              backgroundColor: green[500],
            },
          }}
        />
      </Box>
    ),
  },
  {
    field: 'data',
    headerName: 'Số liệu',
    width: 250,
    renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{params.value}</Box>,
  },
];

const DocumentDataGrid = ({ period, setPeriod, paginationModel, setPaginationModel, documentFieldData }) => {
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
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, mb: 2 }}>
        <Typography sx={{ flex: 1, color: black[900], fontSize: 16, fontWeight: 600 }}>
          Tài liệu theo từng lĩnh vực
        </Typography>
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
        <DataGrid
          rows={documentFieldData}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnResize
          disableColumnSorting
        />
      </Box>
    </Box>
  );
};

export default DocumentDataGrid;
