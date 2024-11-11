import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { Avatar, Typography, Button } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import UserDetailModal from './UserDetailModal';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function SetStatusColor(params) {
  let color = '';
  if (params === 'Trực tuyến') color = '#00ff00';
  if (params === 'Ngoại tuyến') color = '#666666';
  if (params === 'Bị cấm') color = '#FFAA00';
  if (params === 'Đã bị xóa') color = '#EE443F';
  return color;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

const UserDataTable = ({
  filterStatus,
  searchText,
  rows,
  count,
  headCells,
  filterList,
  paginationModel,
  setPaginationModel,
  loading,
}) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('profile');
  const [selected, setSelected] = React.useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState('');

  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow
          sx={{
            backgroundColor: '#F9FAFB',
            /* borderRadius: '8px', */
          }}
        >
          <TableCell
            padding="checkbox"
            sx={
              {
                /* borderRadius: '8px' */
              }
            }
          >
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ /* borderRadius: '8px', */ width: '20%', fontSize: '16px' }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    return;
  };

  const handleClick = (event, id, userId) => {
    let newSelected = [];
    newSelected = newSelected.concat(selected, id);
    setSelected(newSelected);
    setUserId(userId);

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelected([]);
  };
  const handlePageChange = (_, newPage) => {
    setPaginationModel((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleRowsPerPageChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };

  const emptyRows =
    paginationModel.page > 0 && paginationModel.pageSize === 5
      ? rows.length % paginationModel.pageSize === 0
        ? 0
        : paginationModel.pageSize - Math.max(rows.length % paginationModel.pageSize) + 1
      : 0;

  const visibleRows = React.useMemo(() => {
    let filteredRows = rows;

    if (filterStatus !== filterList.All) {
      filteredRows = rows.filter((row) => row.userType === filterStatus);
    }

    if (searchText) {
      filteredRows = filteredRows.filter(
        (row) =>
          row.ordinalNumber?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
          '' ||
          row.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          '' ||
          row.email?.toLowerCase().includes(searchText.toLowerCase()) ||
          '' ||
          row.status?.toLowerCase().includes(searchText.toLowerCase()) ||
          '' ||
          row.notaryCount?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
          '' ||
          row.userType?.toLowerCase().includes(searchText.toLowerCase()) ||
          '',
      );
    }
    setSelected([]);
    return filteredRows.sort(getComparator(order, orderBy));
  }, [filterStatus, searchText, order, orderBy, rows]);

  return (
    <Box sx={{ width: '100%', maxHeight: '45vh', borderRadius: '24px' }}>
      <Paper sx={{ width: '100%', maxHeight: '100%', borderRadius: '24px', boxShadow: 'none' }}>
        <TableContainer sx={{ maxHeight: '45vh', borderRadius: '24px 24px 0px 0px' }}>
          <Table stickyHeader loading={loading} sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={count}
            />
            <TableBody
              sx={{
                backgroundColor: '#FFF',
                maxHeight: '40vh',
                loading: loading,
              }}
            >
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.ordinalNumber, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      width={'20%'}
                      sx={{ fontSize: '14px' }}
                    >
                      {row.ordinalNumber}
                    </TableCell>
                    <TableCell align="left" width={'20%'} sx={{ fontSize: '14px' }} padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="left" width={'20%'} sx={{ fontSize: '14px' }} padding="none">
                      {row.email}
                    </TableCell>
                    <TableCell align="left" width={'20%'} padding="none">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: '10px 0px',
                        }}
                      >
                        <Avatar
                          sx={{
                            border: 'none',
                            backgroundColor: 'transparent',
                          }}
                        >
                          <CircleRoundedIcon
                            sx={{ width: '12px', height: '12px', fill: SetStatusColor(row.status) }}
                          ></CircleRoundedIcon>
                        </Avatar>
                        <Typography
                          sx={{
                            color: '#324155',
                            fontSize: '14px',
                            width: 'fit-content',
                            fontWeight: '500',
                          }}
                        >
                          {row.status}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left" width={'20%'} sx={{ fontSize: '14px' }} padding="none">
                      {row.notaryCount}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  sx={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={count || 0}
          paginationMode="server"
          rowsPerPage={paginationModel.pageSize}
          page={paginationModel.page - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          loading={loading}
          sx={{
            backgroundColor: '#FFF',
            borderRadius: '0 0 24px 24px',
            '& .MuiSelect-icon': {
              display: 'none',
            },
          }}
        />
      </Paper>
      <UserDetailModal open={openModal} handleClose={handleCloseModal} userId={userId}></UserDetailModal>
    </Box>
  );
};
export default UserDataTable;
