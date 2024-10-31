import React, { useState } from 'react';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';

import { black, gray, primary, white } from '../../../config/theme/themePrimitives';
import CustomNotaryDataGridToolbar from './CustomNotaryDataGridToolbar';

const rows = [
  {
    id: 1,
    notaryId: '12345',
    createdAt: '2024-10-30',
    requesterInfo: 'Nguyễn Văn A',
    status: 'Hoàn tất',
    notaryService: 'Công chứng hợp đồng',
  },
  {
    id: 2,
    notaryId: '67890',
    createdAt: '2024-10-28',
    requesterInfo: 'Trần Thị B',
    status: 'Đang xử lý',
    notaryService: 'Công chứng thỏa thuận',
  },
  {
    id: 3,
    notaryId: '54321',
    createdAt: '2024-10-29',
    requesterInfo: 'Phạm Minh C',
    status: 'Chờ xử lý',
    notaryService: 'Chứng thực giấy tờ',
  },
  {
    id: 4,
    notaryId: '98765',
    createdAt: '2024-10-27',
    requesterInfo: 'Lê Thị D',
    status: 'Sẵn sàng ký số',
    notaryService: 'Công chứng giấy tờ',
  },
  {
    id: 5,
    notaryId: '98765',
    createdAt: '2024-10-27',
    requesterInfo: 'Lê Thị D',
    status: 'Sẵn sàng ký số',
    notaryService: 'Công chứng giấy tờ',
  },
  {
    id: 6,
    notaryId: '98765',
    createdAt: '2024-10-27',
    requesterInfo: 'Lê Thị D',
    status: 'Sẵn sàng ký số',
    notaryService: 'Công chứng giấy tờ',
  },
  {
    id: 7,
    notaryId: '98765',
    createdAt: '2024-10-27',
    requesterInfo: 'Lê Thị D',
    status: 'Sẵn sàng ký số',
    notaryService: 'Công chứng giấy tờ',
  },
];

const columns = [
  { field: 'notaryId', headerName: 'Số hồ sơ', width: 130 },
  { field: 'createdAt', headerName: 'Ngày công chứng', width: 200 },
  { field: 'requesterInfo', headerName: 'Người yêu cầu', width: 200 },
  { field: 'status', headerName: 'Tình trạng', width: 150 },
  { field: 'notaryService', headerName: 'Loại dịch vụ', width: 200 },
];

const NotaryDataGrid = ({ paginationModel, setPaginationModel }) => {
  const [filter, setFilter] = useState('Tất cả');
  const [searchText, setSearchText] = useState('');

  const filteredRows = rows.filter((row) => {
    const matchesStatus = filter === 'Tất cả' || row.status === filter;
    const matchesSearch =
      row.notaryId.toLowerCase().includes(searchText.toLowerCase()) ||
      row.requesterInfo.toLowerCase().includes(searchText.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <DataGrid
      rows={filteredRows}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      disableSelectionOnClick
      slots={{
        toolbar: () => (
          <CustomNotaryDataGridToolbar
            searchText={searchText}
            setSearchText={setSearchText}
            onFilterChange={setFilter}
            currentFilter={filter}
          />
        ),
      }}
      checkboxSelection
      disableRowSelectionOnClick
      disableColumnMenu
      disableColumnResize
    />
  );
};

export default NotaryDataGrid;
