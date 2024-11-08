import React, { useEffect, useState } from 'react';
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
  {
    id: 'salary',
    disablePadding: true,
    label: 'Lương',
  },
];

// const rows = [
//   createData(1, '#0001', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(2, '#0002', 'Name', 'Thư ký', 'Trực tuyến', '10.000.000'),
//   createData(3, '#0003', 'Name', 'Trợ lý VPCC', 'Ngoại tuyến', '10.000.000'),
//   createData(4, '#0004', 'Name', 'Chuyên viên pháp lý', 'Trực tuyến', '10.000.000'),
//   createData(5, '#0005', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(6, '#0006', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(7, '#0007', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(8, '#0008', 'Name', 'Thư ký', 'Trực tuyến', '10.000.000'),
//   createData(9, '#0009', 'Name', 'Trợ lý VPCC', 'Ngoại tuyến', '10.000.000'),
//   createData(10, '#0010', 'Name', 'Chuyên viên pháp lý', 'Trực tuyến', '10.000.000'),
//   createData(11, '#0011', 'Name', 'Công chứng viên', 'Bị cấm', '10.000.000'),
//   createData(12, '#0012', 'Name', 'Công chứng viên', 'Đã bị xóa', '10.000.000'),
//   createData(13, '#0013', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(14, '#0014', 'Name', 'Thư ký', 'Trực tuyến', '10.000.000'),
//   createData(15, '#0015', 'Name', 'Trợ lý VPCC', 'Ngoại tuyến', '10.000.000'),
//   createData(16, '#0016', 'Name', 'Chuyên viên pháp lý', 'Trực tuyến', '10.000.000'),
//   createData(17, '#0017', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(18, '#0018', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(19, '#0019', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(20, '#0020', 'Name', 'Thư ký', 'Trực tuyến', '10.000.000'),
//   createData(21, '#0021', 'Name', 'Trợ lý VPCC', 'Ngoại tuyến', '10.000.000'),
//   createData(22, '#0022', 'Name', 'Chuyên viên pháp lý', 'Trực tuyến', '10.000.000'),
//   createData(23, '#0023', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(24, '#0024', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(25, '#0025', 'Name', 'Công chứng viên', 'Trực tuyến', '10.000.000'),
//   createData(26, '#0026', 'Name', 'Thư ký', 'Ngoại tuyến', '10.000.000'),
//   createData(27, '#0027', 'Name', 'Trợ lý VPCC', 'Trực tuyến', '10.000.000'),
//   createData(28, '#0028', 'Name', 'Chuyên viên pháp lý', 'Ngoại tuyến', '10.000.000'),
//   createData(29, '#0029', 'Name', 'Công chứng viên', 'Trực tuyến', '10.000.000'),
//   createData(30, '#0030', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(31, '#0031', 'Name', 'Thư ký', 'Ngoại tuyến', '10.000.000'),
//   createData(32, '#0032', 'Name', 'Trợ lý VPCC', 'Trực tuyến', '10.000.000'),
//   createData(33, '#0033', 'Name', 'Chuyên viên pháp lý', 'Ngoại tuyến', '10.000.000'),
//   createData(34, '#0034', 'Name', 'Công chứng viên', 'Trực tuyến', '10.000.000'),
//   createData(35, '#0035', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(36, '#0036', 'Name', 'Thư ký', 'Trực tuyến', '10.000.000'),
//   createData(37, '#0037', 'Name', 'Trợ lý VPCC', 'Ngoại tuyến', '10.000.000'),
//   createData(38, '#0038', 'Name', 'Chuyên viên pháp lý', 'Trực tuyến', '10.000.000'),
//   createData(39, '#0039', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(40, '#0040', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(41, '#0041', 'Name', 'Thư ký', 'Trực tuyến', '10.000.000'),
//   createData(42, '#0042', 'Name', 'Trợ lý VPCC', 'Ngoại tuyến', '10.000.000'),
//   createData(43, '#0043', 'Name', 'Chuyên viên pháp lý', 'Trực tuyến', '10.000.000'),
//   createData(44, '#0044', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(45, '#0045', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(46, '#0046', 'Name', 'Thư ký', 'Trực tuyến', '10.000.000'),
//   createData(47, '#0047', 'Name', 'Trợ lý VPCC', 'Ngoại tuyến', '10.000.000'),
//   createData(48, '#0048', 'Name', 'Chuyên viên pháp lý', 'Trực tuyến', '10.000.000'),
//   createData(49, '#0049', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(50, '#0050', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(51, '#0051', 'Name', 'Thư ký', 'Trực tuyến', '10.000.000'),
//   createData(52, '#0052', 'Name', 'Trợ lý VPCC', 'Ngoại tuyến', '10.000.000'),
//   createData(53, '#0053', 'Name', 'Chuyên viên pháp lý', 'Trực tuyến', '10.000.000'),
//   createData(54, '#0054', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(55, '#0055', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(56, '#0056', 'Name', 'Thư ký', 'Trực tuyến', '10.000.000'),
//   createData(57, '#0057', 'Name', 'Trợ lý VPCC', 'Ngoại tuyến', '10.000.000'),
//   createData(58, '#0058', 'Name', 'Chuyên viên pháp lý', 'Trực tuyến', '10.000.000'),
//   createData(59, '#0059', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
//   createData(60, '#0060', 'Name', 'Công chứng viên', 'Ngoại tuyến', '10.000.000'),
// ];

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

function createData(id, ordinalNumber, name, position, status, salary) {
  return {
    id,
    ordinalNumber,
    name,
    position,
    status,
    salary,
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

  const getEmployeesList = async () => {
    setLoadingStatus(true);
    try{
      const {page, pageSize} = paginationModel;
      const response = await AdminService.getEmployeesMetrics('',pageSize, page);      
      
      const rows = await Promise.all(
        response.map(async (item, index) => {
          let role, status;

          if(item.role === 'notary') role = 'Công chứng viên';
          if(item.role === 'secretary') role ='Thư ký';

          if(item.status === 'inactive') status = 'Ngoại tuyến';
          if(item.status === 'active') status = 'Trực tuyến';
          if(item.status === 'suspended') status = 'Bị cấm';
          if(item.status === 'deleted') status = 'Đã bị xóa ';

          return createData(index+1,index+1,item.name,role,status,'');
        })
      )
      setData(rows);

    }
    finally{
      setLoadingStatus(false);
    }
  }

  useEffect(() => {
    getEmployeesList();
  }, [paginationModel])

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', background: '#F9FAFB', gap: '16px' }}
    >
      <Header />

      <Box sx={{ p: '0px 16px' }}>
        <Overview />
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
            borderRadius: '8px',
            background: white[50],
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
          ></DataTable>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeManagement;
