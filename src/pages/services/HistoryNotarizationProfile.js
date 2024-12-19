import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import { white, black } from '../../config/theme/themePrimitives';
import StatusFilterButton from '../../components/services/StatusFilterButton';
import HistoryDataTable from '../../components/services/HistoryDataTable';
import NotarizationService from '../../services/notarization.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkeletonHistoryDataTable from '../../components/services/SkeletonHistoryDataTable';
import {
  AppsRounded,
  CheckCircleRounded,
  EditNoteRounded,
  ErrorRounded,
  HourglassTopRounded,
  LoopRounded,
  SearchRounded,
} from '@mui/icons-material';
import { STATUS_TYPES } from '../../utils/constants';

const ICON_MAP = {
  [STATUS_TYPES.All]: <AppsRounded sx={{ height: '18px', width: '18px' }} />,
  [STATUS_TYPES.Pending]: <HourglassTopRounded sx={{ height: '18px', width: '18px' }} />,
  [STATUS_TYPES.Processing]: <LoopRounded sx={{ height: '18px', width: '18px' }} />,
  [STATUS_TYPES.DigitalSignature]: <EditNoteRounded sx={{ height: '18px', width: '18px' }} />,
  [STATUS_TYPES.Completed]: <CheckCircleRounded sx={{ height: '18px', width: '18px' }} />,
  [STATUS_TYPES.Rejected]: <ErrorRounded sx={{ height: '18px', width: '18px' }} />,
};

const HEAD_CELLS = [
  { id: 'profile', disablePadding: true, label: 'Số hồ sơ' },
  { id: 'date', disablePadding: false, label: 'Ngày công chứng' },
  { id: 'name', disablePadding: false, label: 'Người yêu cầu' },
  { id: 'status', disablePadding: false, label: 'Tình trạng' },
  { id: 'service', disablePadding: false, label: 'Loại dịch vụ' },
];

const createData = (id, profile, date, name, status, service) => ({
  id,
  profile,
  date,
  name,
  status,
  service,
});

const HistoryNotarizationProfile = () => {
  const [statusFilter, setStatusFilter] = useState(STATUS_TYPES.All);
  const [statusClicked, setStatusClicked] = useState(STATUS_TYPES.All);
  const [searchText, setSearchText] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [rows, setRows] = useState([]);
  const [fullData, setFullData] = useState([]);

  const fetchHistory = useCallback(async () => {
    try {
      setLoadingStatus(true);
      const response = await NotarizationService.getHistory();
      setFullData(response);

      const formattedData = response.map((item, index) => {
        const date = new Date(item.createdAt);
        const notaryDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const statusMap = {
          pending: 'Chờ xử lý',
          processing: 'Đang xử lý',
          verification: 'Đang xác minh',
          digitalSignature: 'Sẵn sàng ký số',
          completed: 'Hoàn tất',
          rejected: 'Không hợp lệ',
        };
        return createData(
          index + 1,
          item._id,
          notaryDate,
          item.requesterInfo.fullName,
          statusMap[item.status.status],
          item.notarizationService.name,
        );
      });

      setRows(formattedData);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Vui lòng đăng nhập');
      }
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setStatusClicked(status);
  };

  const getStatusStyles = (status) => {
    const styles = {
      'Chờ xử lý': { color: '#324155', backgroundColor: '#EBEDEF' },
      'Đang xử lý': { color: '#FFAA00', backgroundColor: '#FFF7E6' },
      'Đang xác minh': { color: '#7007C1', backgroundColor: '#F9F0FF' },
      'Sẵn sàng ký số': { color: '#0095FF', backgroundColor: '#E6F4FF' },
      'Hoàn tất': { color: '#43B75D', backgroundColor: '#ECF8EF' },
      'Không hợp lệ': { color: '#EE443F', backgroundColor: '#FDECEC' },
    };
    return styles[status] || {};
  };

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          p: 3,
          gap: '8px',
          backgroundColor: white[50],
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box sx={{ flex: 1, gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Lịch sử công chứng
          </Typography>

          <Typography variant="caption">Toàn bộ lịch sử công chứng của bạn sẽ hiển thị ở đây</Typography>
        </Box>
      </Box>

      {/* Main */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '12px 24px',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 1,
            height: '100%',
            gap: '50px',
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' },
              gap: '8px',
              alignSelf: 'stretch',
              borderBottom: '1px solid #C0C0C0',
            }}
          >
            {Object.keys(STATUS_TYPES).map((key) => (
              <StatusFilterButton
                key={key}
                statusFilter={STATUS_TYPES[key]}
                handleFilterByStatus={() => handleFilterChange(STATUS_TYPES[key])}
                clickedButton={statusClicked}
                iconMap={ICON_MAP}
              />
            ))}
          </Box>

          <Box sx={{ flex: 1, display: { xs: 'none', sm: 'none', md: 'flex' } }}></Box>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Tìm kiếm"
            autoFocus
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              borderRadius: 1,
              width: { xs: '100%', sm: '100%', md: '20%' },
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
          ></TextField>
        </Box>
        <Box sx={{ border: !loadingStatus ? '1px solid #E0E0E0' : 'none', borderRadius: '8px', background: white[50] }}>
          {loadingStatus ? (
            <SkeletonHistoryDataTable headCells={HEAD_CELLS} />
          ) : (
            <HistoryDataTable
              filterStatus={statusFilter}
              searchText={searchText}
              rows={rows}
              headCells={HEAD_CELLS}
              statusTypes={STATUS_TYPES}
              setStatusColor={getStatusStyles}
              data={fullData}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default HistoryNotarizationProfile;
