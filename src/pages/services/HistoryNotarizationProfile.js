import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, Grid } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SearchIcon from '@mui/icons-material/Search';
import { white, black } from '../../config/theme/themePrimitives';
import StatusFilterButton from '../../components/services/StatusFilterButton';
import HistoryDataTable from '../../components/services/HistoryDataTable';
import NotarizationService from '../../services/notarization.service';
import { toast } from 'react-toastify';
import SkeletonHistoryDataTable from '../../components/services/SkeletonHistoryDataTable';
import { useNavigate } from 'react-router-dom';
import AppsIcon from '@mui/icons-material/Apps';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LoopIcon from '@mui/icons-material/Loop';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import VerifiedIcon from '@mui/icons-material/Verified';

const HistoryNotarizationProfile = () => {
  const statusTypes = {
    All: 'Tất cả',
    Pending: 'Chờ xử lý',
    Processing: 'Đang xử lý',
    DigitalSignature: 'Sẵn sàng ký số',
    Completed: 'Hoàn tất',
    Rejected: 'Không hợp lệ',
  };

  const iconMap = {
    [statusTypes.All]: <AppsIcon sx={{ height: '18px', width: '18px' }} />,
    [statusTypes.Pending]: <HourglassTopIcon sx={{ height: '18px', width: '18px' }} />,
    [statusTypes.Processing]: <LoopIcon sx={{ height: '18px', width: '18px' }} />,
    [statusTypes.DigitalSignature]: <EditNoteIcon sx={{ height: '18px', width: '18px' }} />,
    [statusTypes.Completed]: <CheckCircleIcon sx={{ height: '18px', width: '18px' }} />,
    [statusTypes.Rejected]: <ErrorIcon sx={{ height: '18px', width: '18px' }} />,
  };

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

  const [statusFilter, setStatusFilter] = useState(statusTypes.All);
  const [statusClicked, setStatusClicked] = useState(statusTypes.All);
  const [searchText, setSearchText] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [rows, setRows] = useState([]);
  const [fullData, setFullData] = useState([]);
  const navigate = useNavigate();

  async function getHistoryFromDB() {
    try {
      setLoadingStatus(true);
      const response = await NotarizationService.getHistory();
      setFullData(response);

      const data = await Promise.all(
        response.map(async (item, index) => {
          const date = new Date(item.createdAt);
          const notaryDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
          let status;

          if (item.status.status === 'pending') status = 'Chờ xử lý';
          if (item.status.status === 'processing') status = 'Đang xử lý';
          if (item.status.status === 'verification') status = 'Đang xác minh';
          if (item.status.status === 'digitalSignature') status = 'Sẵn sàng ký số';
          if (item.status.status === 'completed') status = 'Hoàn tất';
          if (item.status.status === 'rejected') status = 'Không hợp lệ';
          return createData(
            index + 1,
            item._id,
            notaryDate,
            item.requesterInfo.fullName,
            status,
            item.notarizationService.name,
          );
        }),
      );
      setRows(data);
      console.log(data);
      setLoadingStatus(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Vui lòng đăng nhập');
      }
    }
  }

  function setStatusColor(params) {
    let color = '';
    let backgroundColor = '';
    if (params === 'Chờ xử lý') {
      color = '#324155';
      backgroundColor = '#EBEDEF';
    } else if (params === 'Đang xử lý') {
      color = '#FFAA00';
      backgroundColor = '#FFF7E6';
    } else if (params === 'Đang xác minh') {
      color = '#7007C1';
      backgroundColor = '#F9F0FF';
    } else if (params === 'Sẵn sàng ký số') {
      color = '#0095FF';
      backgroundColor = '#E6F4FF';
    } else if (params === 'Hoàn tất') {
      color = '#43B75D';
      backgroundColor = '#ECF8EF';
    } else if (params === 'Không hợp lệ') {
      color = '#EE443F';
      backgroundColor = '#FDECEC';
    }
    return { color, backgroundColor };
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
            <StatusFilterButton
              statusFilter={statusTypes.All}
              handleFilterByStatus={() => {
                setStatusFilter(statusTypes.All);
                setStatusClicked(statusTypes.All);
              }}
              clickedButton={statusClicked}
              iconMap={iconMap}
            ></StatusFilterButton>

            <StatusFilterButton
              statusFilter={statusTypes.Pending}
              handleFilterByStatus={() => {
                setStatusFilter(statusTypes.Pending);
                setStatusClicked(statusTypes.Pending);
              }}
              clickedButton={statusClicked}
              iconMap={iconMap}
            />
            <StatusFilterButton
              statusFilter={statusTypes.Processing}
              handleFilterByStatus={() => {
                setStatusFilter(statusTypes.Processing);
                setStatusClicked(statusTypes.Processing);
              }}
              clickedButton={statusClicked}
              iconMap={iconMap}
            />
            <StatusFilterButton
              statusFilter={statusTypes.DigitalSignature}
              handleFilterByStatus={() => {
                setStatusFilter(statusTypes.DigitalSignature);
                setStatusClicked(statusTypes.DigitalSignature);
              }}
              clickedButton={statusClicked}
              iconMap={iconMap}
            />
            <StatusFilterButton
              statusFilter={statusTypes.Completed}
              handleFilterByStatus={() => {
                setStatusFilter(statusTypes.Completed);
                setStatusClicked(statusTypes.Completed);
              }}
              clickedButton={statusClicked}
              iconMap={iconMap}
            />
            <StatusFilterButton
              statusFilter={statusTypes.Rejected}
              handleFilterByStatus={() => {
                setStatusFilter(statusTypes.Rejected);
                setStatusClicked(statusTypes.Rejected);
              }}
              clickedButton={statusClicked}
              iconMap={iconMap}
            />
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
                  <SearchIcon sx={{ color: black[300] }} />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Box>
        <Box
          sx={{
            display: 'flex',
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
              statusTypes={statusTypes}
              setStatusColor={setStatusColor}
              data={fullData}
            ></HistoryDataTable>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default HistoryNotarizationProfile;
