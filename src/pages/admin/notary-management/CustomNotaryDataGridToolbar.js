import { Box, Button, Typography, TextField, InputAdornment } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';
import {
  AppsRounded,
  EditNoteRounded,
  ErrorRounded,
  HourglassTopRounded,
  LoopRounded,
  PublishedWithChangesRounded,
  SearchRounded,
  VerifiedRounded,
} from '@mui/icons-material';
import { black, gray, primary } from '../../../config/theme/themePrimitives';

const CustomNotaryDataGridToolbar = ({ onFilterChange, currentFilter, searchText, setSearchText }) => {
  const filterOptions = ['Tất cả', 'Chờ xử lý', 'Đang xử lý', 'Đang xác minh', 'Sẵn sàng ký số', 'Hoàn tất', 'Không hợp lệ'];

  return (
    <GridToolbarContainer>
      <Box sx={{ flex: 1 }}>
        {filterOptions.map((status) => (
          <Button
            key={status}
            onClick={() => onFilterChange(status)}
            sx={{
              borderBottom: currentFilter === status ? `2px solid ${primary[500]}` : 'none',
              color: currentFilter === status ? primary[500] : black[200],
              borderRadius: 0,
              ':hover': {
                backgroundColor: gray[50],
              },
              mx: 0.5,
            }}
            startIcon={
              status === 'Tất cả' ? (
                <AppsRounded />
              ) : status === 'Chờ xử lý' ? (
                <HourglassTopRounded />
              ) : status === 'Đang xử lý' ? (
                <LoopRounded />
              ) : status === 'Đang xác minh' ? (
                <PublishedWithChangesRounded />
              ) : status === 'Sẵn sàng ký số' ? (
                <EditNoteRounded />
              ) : status === 'Hoàn tất' ? (
                <VerifiedRounded />
              ) : status === 'Không hợp lệ' ? (
                <ErrorRounded />
              ) : null
            }
          >
            <Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: 'none' }}>{status}</Typography>
          </Button>
        ))}
      </Box>
      <Box>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Tìm kiếm"
          autoFocus
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            borderRadius: 1,
            width: '100%',
            minWidth: '150px',
            '& .MuiInputBase-input': {
              fontSize: 14,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ color: black[300] }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </GridToolbarContainer>
  );
};

export default CustomNotaryDataGridToolbar;
