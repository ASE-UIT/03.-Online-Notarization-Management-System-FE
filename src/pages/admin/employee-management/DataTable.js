import * as React from 'react';
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
  if(params === 'Trực tuyến') color = '#EE443F'; else color = '#FFAA00'
  return  color;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

const DataTable = ({ filterStatus, searchText, rows, headCells, filterList }) => {
  console.log(rows);
  
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('profile');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
            borderRadius: '8px',
          }}
        >
          <TableCell padding="checkbox" sx={{ borderRadius: '8px' }}>
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
              sx={{ borderRadius: '8px', width: '20%' , fontSize: '16px'}}
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
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() => {
    let filteredRows = rows;

    if (filterStatus !== filterList.All) {
      filteredRows = rows.filter((row) => row.position === filterStatus);
    }

    if (searchText) {
      filteredRows = filteredRows.filter(
        (row) =>
          row.ordinalNumber.toLowerCase().includes(searchText.toLowerCase()) ||
          row.name.toLowerCase().includes(searchText.toLowerCase()) ||
          row.position.toLowerCase().includes(searchText.toLowerCase()) ||
          row.status.toLowerCase().includes(searchText.toLowerCase()) ||
          row.salary.toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    setSelected([]);

    return filteredRows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filterStatus, searchText, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody
              sx={{
                backgroundColor: '#FFF',
              }}
            >
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
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
                      {row.position}
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
                      {row.salary}
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
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage={''}
          sx={{
            backgroundColor: '#FFF',
            borderRadius: '8px',
            '& .MuiSelect-icon': {
              display: 'none'
            }
          }}
          
        />

      </Paper>
    </Box>
  );
};
export default DataTable;