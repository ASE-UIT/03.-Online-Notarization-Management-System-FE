import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SearchIcon from '@mui/icons-material/Search';
import { white, black } from '../../config/theme/themePrimitives';
import StatusFilterButton from '../../components/services/StatusFilterButton';
import HistoryDataTable from '../../components/services/HistoryDataTable';
import NotarizationService from '../../services/notarization.service';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import SkeletonHistoryDataTable from '../../components/services/SkeletonHistoryDataTable';
import { useNavigate } from 'react-router-dom';

const headCells = [
  {
    id: 'profile',
    disablePadding: true,
    label: 'Số hồ sơ',
  },
  {
    id: 'date',
    disablePadding: false,
    label: 'Ngày công chứng',
  },
  {
    id: 'name',
    disablePadding: false,
    label: 'Người yêu cầu',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Tình trạng',
  },
  {
    id: 'service',
    disablePadding: false,
    label: 'Loại dịch vụ',
  },
];

function createData(id, profile, date, name, status, service) {
  return {
    id,
    profile,
    date,
    name,
    status,
    service,
  };
}
let rows = [];
const HistoryNotarizationProfile = () => {
  const StatusTypes = {
    All: 'Tất cả',
    Pending: 'Chờ xử lý',
    Processing: 'Đang xử lý',
    Verification: 'Đang xác minh',
    DigitalSignature: 'Sẵn sàng ký số',
    Completed: 'Hoàn tất',
    Rejected: 'Không hợp lệ',
  };

  const [statusFilter, setStatusFilter] = useState(StatusTypes.All);
  const [statusClicked, setStatusClicked] = useState(StatusTypes.All);
  const [searchText, setSearchText] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const navigate = useNavigate();

  async function getHistoryFromDB() {
    try {
      setLoadingStatus(true);
      const response = await NotarizationService.getHistory();

      rows = await Promise.all(
        response.map(async (item, index) => {
          const statusResponse = await NotarizationService.getStatusById(item.id);
          const userResponse = await UserService.getUserById(item.userId);
          const date = new Date(statusResponse.updatedAt);
          const notaryDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
          let status;

          if (statusResponse.status === 'pending') status = 'Chờ xử lý';
          if (statusResponse.status === 'processing') status = 'Đang xử lý';
          if (statusResponse.status === 'digitalSignature') status = 'Sẵn sàng ký số';
          if (statusResponse.status === 'completed') status = 'Hoàn tất';
          if (statusResponse.status === 'reject') status = 'Không hợp lệ';
          return createData(index + 1, item.id, notaryDate, userResponse.name, status, item.notarizationService.name);
        }),
      );
      setLoadingStatus(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Vui lòng đăng nhập');
      }
    }
  }

  useEffect(() => {
    getHistoryFromDB();
  }, []);

  const handleClick = () => {
    navigate('/lookup');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          p: 3,
          gap: '8px',
          backgroundColor: white[50],
        }}
      >
        <Box sx={{ flex: 1, gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Lịch sử công chứng
          </Typography>

          <Typography variant="caption">Toàn bộ lịch sử công chứng của bạn sẽ hiển thị ở đây</Typography>
        </Box>

        {/* Tra cứu hồ sơ */}
        <Button
          startIcon={<FindInPageIcon />}
          disableElevation
          onClick={handleClick}
          sx={{
            display: 'flex',
            p: '6px 12px',
            borderRadius: '8px',
            border: '1px solid #A91D3A',
            background: '#FFF',
            fontSize: '14px',
            height: 'fit-content',
            mt: {
              xs: 2,
              sm: 2,
              md: 0,
              lg: 0,
              xl: 0,
            },
          }}
          size="small"
        >
          <Typography variant="button" sx={{ textTransform: 'none', padding: 0 }}>
            Tra cứu hồ sơ
          </Typography>
        </Button>
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
              display: 'flex',
              gap: '8px',
              alignSelf: 'stretch',
              borderBottom: '1px solid #C0C0C0',
            }}
          >
            <StatusFilterButton
              statusFilter={StatusTypes.All}
              handleFilterByStatus={() => {
                setStatusFilter(StatusTypes.All);
                setStatusClicked(StatusTypes.All);
              }}
              clickedButton={statusClicked}
            ></StatusFilterButton>

            <StatusFilterButton
              statusFilter={StatusTypes.Pending}
              handleFilterByStatus={() => {
                setStatusFilter(StatusTypes.Pending);
                setStatusClicked(StatusTypes.Pending);
              }}
              clickedButton={statusClicked}
            />
            <StatusFilterButton
              statusFilter={StatusTypes.Processing}
              handleFilterByStatus={() => {
                setStatusFilter(StatusTypes.Processing);
                setStatusClicked(StatusTypes.Processing);
              }}
              clickedButton={statusClicked}
            />
            <StatusFilterButton
              statusFilter={StatusTypes.Verification}
              handleFilterByStatus={() => {
                setStatusFilter(StatusTypes.Verification);
                setStatusClicked(StatusTypes.Verification);
              }}
              clickedButton={statusClicked}
            />
            <StatusFilterButton
              statusFilter={StatusTypes.DigitalSignature}
              handleFilterByStatus={() => {
                setStatusFilter(StatusTypes.DigitalSignature);
                setStatusClicked(StatusTypes.DigitalSignature);
              }}
              clickedButton={statusClicked}
            />
            <StatusFilterButton
              statusFilter={StatusTypes.Completed}
              handleFilterByStatus={() => {
                setStatusFilter(StatusTypes.Completed);
                setStatusClicked(StatusTypes.Completed);
              }}
              clickedButton={statusClicked}
            />
            <StatusFilterButton
              statusFilter={StatusTypes.Rejected}
              handleFilterByStatus={() => {
                setStatusFilter(StatusTypes.Rejected);
                setStatusClicked(StatusTypes.Rejected);
              }}
              clickedButton={statusClicked}
            />
          </Box>

          <Box flex={1}></Box>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Tìm kiếm"
            autoFocus
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              borderRadius: 1,
              width: '20%',
              minWidth: '150px',
              '& .MuiInputBase-input': {
                fontSize: 14,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: black[300] }} />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Box>
        <Box
          sx={{
            border: !loadingStatus ? '1px solid var(--black-50, #E0E0E0)' : 'none',
            borderRadius: '8px',
            background: white[50],
          }}
        >
          {loadingStatus ? (
            <SkeletonHistoryDataTable headCells={headCells}></SkeletonHistoryDataTable>
          ) : (
            <HistoryDataTable
              filterStatus={statusFilter}
              searchText={searchText}
              rows={rows}
              headCells={headCells}
            ></HistoryDataTable>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default HistoryNotarizationProfile;
