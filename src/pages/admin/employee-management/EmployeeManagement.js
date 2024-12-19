import React, { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import { Box, TextField, InputAdornment } from '@mui/material';
import { black, white } from '../../../config/theme/themePrimitives';
import Overview from './Overview';
import DataTable from './DataTable';
import FilterButton from './FilterButton';
import AppsIcon from '@mui/icons-material/Apps';
import DifferenceIcon from '@mui/icons-material/Difference';
import WorkIcon from '@mui/icons-material/Work';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RuleIcon from '@mui/icons-material/Rule';
import SearchIcon from '@mui/icons-material/Search';
import AdminService from '../../../services/admin.service';
import SkeletonHistoryDataTable from '../../../components/services/SkeletonHistoryDataTable';

const headCells = [
  {
    id: 'ordinalNumber',
    disablePadding: true,
    label: 'Số thứ tự',
  },
  {
    id: 'name',
    disablePadding: true,
    label: 'Tên nhân viên',
  },
  {
    id: 'position',
    disablePadding: true,
    label: 'Chức vụ',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Trạng thái',
  },
];

const filterList = {
  All: 'Tất cả',
  notary: 'Công chứng viên',
  secretary: 'Thư ký',
  NotaryOfficeAssistant: 'Trợ lý VPCC',
  LegalSpecialist: 'Chuyên viên pháp lý',
};

const iconMap = {
  [filterList.All]: <AppsIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.notary]: <DifferenceIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.secretary]: <WorkIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.NotaryOfficeAssistant]: <AssessmentIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.LegalSpecialist]: <RuleIcon sx={{ height: '18px', width: '18px' }} />,
};

function createData(id, ordinalNumber, name, position, status) {
  return {
    id,
    ordinalNumber,
    name,
    position,
    status,
  };
}

const EmployeeManagement = () => {
  const [filterOption, setFilterOption] = useState(filterList.All);
  const [filterClicked, setFilterClicked] = useState(filterList.All);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  })
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [notaryCount, setNotaryCount] = useState(0);
  const [secretaryCount, setSecretaryCount] = useState(0);

  const getEmployeesCount = async () => {
    setLoadingStatus(true);
    try{
      const response = await AdminService.getEmployeesCount ();
               
      setNotaryCount(response.notaryCount);
      setSecretaryCount(response.secretaryCount);
    }
    finally{
      setLoadingStatus(false);
    }
  }

  const getEmployeesList = useCallback(async () => {
    setLoadingStatus(true);
    try{
      const {page, pageSize} = paginationModel;
      const response = await AdminService.getEmployeesMetrics(null,pageSize,page-1);      
          
      const rows = await Promise.all(
        response.results.map(async (item, index) => {
          let role, status;

          if(item.role === 'notary') role = 'Công chứng viên';
          if(item.role === 'secretary') role ='Thư ký';

          if(item.status === 'inactive') status = 'Ngoại tuyến';
          if(item.status === 'active') status = 'Trực tuyến';
          if(item.status === 'suspended') status = 'Bị cấm';
          if(item.status === 'deleted') status = 'Đã bị xóa ';

          return createData(item.id,(index+1)+((page-1)*pageSize),item.name,role,status);
        })
      )
      setData(rows);
      setEmployeeCount(response.totalResults);
    }
    finally{
      setLoadingStatus(false);
    }
  }, [paginationModel]) 

  useEffect(() => {
    getEmployeesCount();
  }, [])

  useEffect(() => {
    getEmployeesList();
  }, [paginationModel, getEmployeesList])

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', background: '#F9FAFB', gap: '16px' }}
    >
      <Header />

      <Box sx={{ p: '0px 16px' }}>
        <Overview count={employeeCount} notaryCount={notaryCount} secretaryCount={secretaryCount}/>
      </Box>

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
                setFilterOption(filterList.notary);
                setFilterClicked(filterList.notary);
              }}
              option={filterList.notary}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.secretary);
                setFilterClicked(filterList.secretary);
              }}
              option={filterList.secretary}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.NotaryOfficeAssistant);
                setFilterClicked(filterList.NotaryOfficeAssistant);
              }}
              option={filterList.NotaryOfficeAssistant}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.LegalSpecialist);
                setFilterClicked(filterList.LegalSpecialist);
              }}
              option={filterList.LegalSpecialist}
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
            borderRadius: '24px',
            background: white[50],
            p: '8px',
            paddingBottom: '64px'
          }}
        >
          {loadingStatus ? (
            <SkeletonHistoryDataTable headCells={headCells}></SkeletonHistoryDataTable>
          ) : (
            <DataTable
            filterStatus={filterOption}
            searchText={searchText}
            rows={data}
            headCells={headCells}
            filterList={filterList}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            loading={loadingStatus}
            count={employeeCount}
          ></DataTable>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeManagement;
