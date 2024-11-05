import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CustomNotaryDataGridToolbar from './CustomNotaryDataGridToolbar';
import { Box, Typography } from '@mui/material';
import { blue, dark, green, red, yellow } from '../../../config/theme/themePrimitives';
import dayjs from 'dayjs';

const NotaryDataGrid = ({ data, paginationModel, setPaginationModel }) => {
  const [filter, setFilter] = useState('Tất cả');
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      field: 'id',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14 }}>{params.value}</Typography>
        </Box>
      ),
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Số hồ sơ</Typography>
        </Box>
      ),
    },
    {
      field: 'createdAt',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14 }}>{params.value}</Typography>
        </Box>
      ),
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Ngày công chứng</Typography>
        </Box>
      ),
    },
    {
      field: 'fullName',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14 }}>{params.value}</Typography>
        </Box>
      ),
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Người yêu cầu</Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
              py: 0.5,
              backgroundColor: renderBackgroundStatus(params.value),
              borderRadius: 4,
            }}
          >
            <Typography sx={{ fontSize: 14, color: renderColorStatus(params.value) }}>{getStatus(params.value)}</Typography>
          </Box>
        </Box>
      ),
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Trạng thái</Typography>
        </Box>
      ),
    },
    {
      field: 'notaryService',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', textWrap: 'wrap' }}>
          <Typography sx={{ fontSize: 14 }}>{params.value}</Typography>
        </Box>
      ),
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>Loại dịch vụ</Typography>
        </Box>
      ),
    },
  ];

  const renderBackgroundStatus = (status) => {
    switch (status) {
      case 'pending':
        return dark[50];
      case 'processing':
        return yellow[50];
      case 'verification':
        return '#f3ebfa';
      case 'digitalSignature':
        return blue[50];
      case 'completed':
        return green[50];
      case 'invalid':
        return red[50];
    }
  };

  const renderColorStatus = (status) => {
    switch (status) {
      case 'pending':
        return dark[500];
      case 'processing':
        return yellow[500];
      case 'verification':
        return '#7007C1';
      case 'digitalSignature':
        return blue[500];
      case 'completed':
        return green[500];
      case 'invalid':
        return red[500];
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      case 'verification':
        return 'Đang xác minh';
      case 'digitalSignature':
        return 'Sẵn sàng ký số';
      case 'completed':
        return 'Hoàn tất';
      case 'invalid':
        return 'Không hợp lệ';
    }
  };

  const formattedData = data?.results?.map((record) => ({
    id: record._id,
    notaryId: record._id,
    createdAt: dayjs(record.createdAt).format('DD/MM/YYYY'),
    fullName: record.requesterInfo.fullName,
    status: record?.status?.status || null,
    notaryService: record.notarizationService.name,
  }));

  const filteredRows = formattedData?.filter((row) => {
    const matchesStatus = filter === 'Tất cả' || getStatus(row.status) === filter;
    const matchesSearch =
      row.notaryId.toLowerCase().includes(searchText.toLowerCase()) ||
      row.fullName.toLowerCase().includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        rowCount={data?.totalResults}
        rowHeight={80}
        autoPageSize
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
        disableSelectionOnClick
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnResize
      />
    </Box>
  );
};

export default NotaryDataGrid;
