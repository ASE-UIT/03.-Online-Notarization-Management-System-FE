import React from 'react'
import { Button, } from '@mui/material';

export default function FilterButton({option, handleFilter, clickedButton, iconMap}) {
    return (
    <Button
      startIcon={iconMap[option] || null}
      disableRipple
      sx={{
        color: (option === clickedButton) ? '#000' : '#9E9E9E' ,
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: '12px',
        textTransform: 'none',
        borderRadius: '0px',
        p: '4px 8px',
        borderBottom: (option === clickedButton) ? '1px solid #000' : 'none',
      }}
      onClick={() => handleFilter(option)}
    >
      {option}
    </Button>
  )
}