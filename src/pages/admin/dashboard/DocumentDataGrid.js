import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
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
    width: 200,
    renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{params.value}</Box>,
  },
  {
    field: 'ratio',
    headerName: 'Tỉ lệ',
    width: 150,
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
    width: 100,
    renderCell: (params) => <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{params.value}</Box>,
  },
];

const rows = [
  { id: 1, category: 'Lĩnh vực A', ratio: 75, data: '500' },
  { id: 2, category: 'Lĩnh vực B', ratio: 50, data: '300' },
  { id: 3, category: 'Lĩnh vực C', ratio: 25, data: '120' },
  { id: 4, category: 'Lĩnh vực D', ratio: 90, data: '800' },
  { id: 5, category: 'Lĩnh vực E', ratio: 60, data: '450' },
  { id: 6, category: 'Lĩnh vực E', ratio: 60, data: '450' },
  { id: 7, category: 'Lĩnh vực E', ratio: 60, data: '450' },
  { id: 8, category: 'Lĩnh vực E', ratio: 60, data: '450' },
];

const DocumentDataGrid = ({ paginationModel, setPaginationModel }) => {
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
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
        <Typography sx={{ color: black[900], fontSize: 16, fontWeight: 600 }}>Tài liệu theo từng lĩnh vực</Typography>
      </Box>
      <Box sx={{ height: '100%', flex: 1 }}>
        <DataGrid
          rows={rows}
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
