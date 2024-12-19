import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import CustomSessionDataGridToolbar from './CustomSessionDataGridToolbar';
import dayjs from 'dayjs';
const SessionDataGrid = ({ data, paginationModel, setPaginationModel, loading }) => {
  const [filter, setFilter] = useState('Tất cả');
  const [searchText, setSearchText] = useState('');

  const renderTextCell = (value) => (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', textWrap: 'wrap' }}>
      <Typography sx={{ fontSize: 14 }}>{value}</Typography>
    </Box>
  );

  const renderTextHeader = (label) => (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
      <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{label}</Typography>
    </Box>
  );

  const columns = [
    {
      field: 'id',
      headerName: 'Mã phiên',
      flex: 1,
      renderCell: (params) => renderTextCell(params.value),
      renderHeader: () => renderTextHeader('Mã phiên'),
    },
    {
      field: 'requesterInfo',
      headerName: 'Tên người tạo',
      flex: 1,
      renderCell: (params) => renderTextCell(params.value),
      renderHeader: () => renderTextHeader('Tên người tạo'),
    },
    {
      field: 'sessionName',
      headerName: 'Tên phiên',
      flex: 1,
      renderCell: (params) => renderTextCell(params.value),
      renderHeader: () => renderTextHeader('Tên phiên'),
    },
    {
      field: 'sessionDuration',
      headerName: 'Thời lượng',
      flex: 1,
      renderCell: (params) => renderTextCell(params.value),
      renderHeader: () => renderTextHeader('Thời lượng'),
    },
    {
      field: 'notaryService',
      headerName: 'Loại dịch vụ',
      flex: 1,
      renderCell: (params) => renderTextCell(params.value),
      renderHeader: () => renderTextHeader('Loại dịch vụ'),
    },
  ];

  const calculateDurationAndStatus = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const durationInDays = end.diff(start, 'day', true);

    let status;
    if (durationInDays <= 10) {
      status = 'Phiên ngắn hạn';
    } else if (durationInDays <= 30) {
      status = 'Phiên trung hạn';
    } else {
      status = 'Phiên dài hạn';
    }

    const hours = Math.floor((durationInDays % 1) * 24);
    const minutes = Math.round((((durationInDays % 1) * 24) % 1) * 60);

    const durationText =
      durationInDays > 0
        ? `${Math.floor(durationInDays)} ngày ${hours} giờ ${minutes} phút`
        : `${hours} giờ ${minutes} phút`;

    return { durationText, status };
  };

  const formattedData = data?.results?.map((session) => {
    const { durationText, status } = calculateDurationAndStatus(session.startDate, session.endDate);

    return {
      id: session._id,
      requesterInfo: session?.creator?.name,
      sessionName: session.sessionName,
      sessionDuration: durationText,
      notaryService: session.notaryService.name,
      status,
    };
  });

  const filteredRows = formattedData?.filter((row) => {
    const matchesStatus = filter === 'Tất cả' || row.status === filter;
    const matchesSearch = row?.sessionName?.toLowerCase().includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Box sx={{ maxHeight: 500, width: '100%' }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        rowCount={data?.totalResults}
        rowHeight={70}
        pageSizeOptions={[25, 50, 100]}
        slots={{
          toolbar: () => (
            <CustomSessionDataGridToolbar
              searchText={searchText}
              setSearchText={setSearchText}
              onFilterChange={setFilter}
              currentFilter={filter}
            />
          ),
        }}
        loading={loading}
        disableSelectionOnClick
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnResize
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default SessionDataGrid;
