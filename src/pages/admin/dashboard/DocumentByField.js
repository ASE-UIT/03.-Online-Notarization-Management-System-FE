import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { gray, green } from '../../../config/theme/themePrimitives';
import Section from './Section';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    renderCell: ({ value }) => <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{value}</Box>,
  },
  {
    field: 'category',
    headerName: 'Lĩnh vực',
    flex: 1,
    renderCell: ({ value }) => <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{value}</Box>,
  },
  {
    field: 'ratio',
    headerName: 'Tỉ lệ',
    flex: 1,
    renderCell: ({ value }) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
        <LinearProgress
          variant="determinate"
          value={value}
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
    renderCell: ({ value }) => <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>{value}</Box>,
  },
];

const DocumentByField = ({ period, setPeriod, paginationModel, setPaginationModel, documentFieldData }) => (
  <Section title="Tài liệu theo lĩnh vực" period={period} setPeriod={setPeriod}>
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
  </Section>
);

export default DocumentByField;
