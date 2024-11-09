import  React, { useCallback, useEffect, useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import UserOverview from './UserOverview';
import UserDataTable from './UserDataTable';
import Header from './Header';
import { gray,black, white } from '../../../config/theme/themePrimitives';
import FilterButton from './FilterButton';
import AppsIcon from '@mui/icons-material/Apps';

import SkeletonHistoryDataTable from '../../../components/services/SkeletonHistoryDataTable';

import FiberNewRoundedIcon from '@mui/icons-material/FiberNewRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import WaterfallChartRoundedIcon from '@mui/icons-material/WaterfallChartRounded';

import SearchIcon from '@mui/icons-material/Search';
import UserService from '../../../services/user.service';

const headCells = [
  {
    id: 'ordinalNumber',
    disablePadding: true,
    label: 'Số thứ tự',
  },
  {
    id: 'name',
    disablePadding: true,
    label: 'Tên người dùng',
  },
  {
    id: 'email',
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'notaryCount',
    disablePadding: true,
    label: 'Lịch sử công chứng',
  },
];




const filterList = {
  All: 'Tất cả',
  NewUser: 'Người dùng mới',
  LongTimeUser: 'Người dùng lâu năm',
  PotentialUser: 'Người dùng tiềm năng',
};

const iconMap = {
  [filterList.All]: <AppsIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.NewUser]: <FiberNewRoundedIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.LongTimeUser]: <AccessTimeFilledRoundedIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.PotentialUser]: <WaterfallChartRoundedIcon sx={{ height: '18px', width: '18px' }} />,
};

function createData(id, ordinalNumber, name, email, status, notaryCount, userType) {
  return {
    id,
    ordinalNumber,
    name,
    email,
    status,
    notaryCount,
    userType,
  };
}

const UserManagement = () => {
  const [filterOption, setFilterOption] = useState(filterList.All);
  const [filterClicked, setFilterClicked] = useState(filterList.All);
  const [searchText, setSearchText] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  });

 
  const fetchAllUsers = async () => {
    setLoadingStatus(true);
    try{
      const {page, pageSize} = paginationModel;
      const response = await UserService.getAllUsers();   
      
      const users = Array.isArray(response.results) ? response.results : [];


      const rows = await Promise.all(
        users.map(async (item, index) => {
          let status, userType, notaryCount;


          if(item.status === 'inactive') status = 'Ngoại tuyến';
          if(item.status === 'active') status = 'Trực tuyến';
          if(item.status === 'suspended') status = 'Bị cấm';
          if(item.status === 'deleted') status = 'Đã bị xóa ';

          return createData(
            index + 1, 
            index + 1, 
            item.name || '', 
            item.email || '', 
            status, 
            item.documentCount || '', 
            item.userType || ''
          );
        })
      )
      setData(rows);

    }
    finally{
      setLoadingStatus(false);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, [paginationModel])

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      flexDirection: 'column',
      backgroundColor: gray[50]
    }}>
      
      {/* Header Section */}
      <Header></Header>

      {/* User Overview Section */}
      <UserOverview userCount={data.length}></UserOverview>

      
      {/* User Data Table Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '10px',
          gap: '10px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 1,
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
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.All);
                setFilterClicked(filterList.All);
              }}
              option={filterList.All}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.NewUser);
                setFilterClicked(filterList.NewUser);
              }}
              option={filterList.NewUser}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.LongTimeUser);
                setFilterClicked(filterList.LongTimeUser);
              }}
              option={filterList.LongTimeUser}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.PotentialUser);
                setFilterClicked(filterList.PotentialUser);
              }}
              option={filterList.PotentialUser}
              iconMap={iconMap}
            />
          </Box>

          <Box flex={1} />

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
          />
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
            <UserDataTable
              filterStatus={filterOption}
              searchText={searchText}
              rows={data}
              headCells={headCells}
                filterList={filterList}
                paginationModel={paginationModel}
            ></UserDataTable>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagement;
