import React  from 'react';
import {  Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

const StatusFilterButton = ({ statusFilter, handleFilterByStatus, clickedButton, iconMap, }) => {

  const renderIconByStatus = (statusFilter) => iconMap[statusFilter] || null;

 function isClicked(statusFilter, clickedButton){
    if(statusFilter == clickedButton) return true;
    return false;
 }
  
  return (
    <Button
      startIcon={renderIconByStatus(statusFilter)}
      disableRipple
      sx={{
        color: isClicked(statusFilter,clickedButton) ? '#000' : '#9E9E9E',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: '12px',
        textTransform: 'none',
        borderRadius: '0px',
        p: '4px 8px',
        borderBottom: isClicked(statusFilter,clickedButton) ? '1px solid #000' : 'none',
      }}
      onClick={() => handleFilterByStatus(statusFilter)}
    >
      {statusFilter}
    </Button>
  );
};
export default StatusFilterButton;