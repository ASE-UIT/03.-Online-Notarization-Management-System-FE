import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import CustomSessionDataGridToolbar from './CustomSessionDataGridToolbar';
import dayjs from 'dayjs';
const SessionDataGrid = ({ data, paginationModel, setPaginationModel }) => {
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
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Mã phiên</Typography>
        </Box>
      ),
    },
    {
      field: 'requesterInfo',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14 }}>{params.value}</Typography>
        </Box>
      ),
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Tên người tạo</Typography>
        </Box>
      ),
    },
    {
      field: 'sessionName',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14 }}>{params.value}</Typography>
        </Box>
      ),
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Tên phiên</Typography>
        </Box>
      ),
    },
    {
      field: 'sessionDuration',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14 }}>{params.value}</Typography>
        </Box>
      ),
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Thời lượng</Typography>
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
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        rowCount={data?.rows?.totalResults}
        rowHeight={80}
        autoPageSize
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
        disableSelectionOnClick
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnResize
      />
    </Box>
  );
};

export default SessionDataGrid;
