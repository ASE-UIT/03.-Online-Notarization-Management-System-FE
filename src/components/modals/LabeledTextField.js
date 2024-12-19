import { Box, Typography, TextField, Autocomplete } from '@mui/material';
import React from 'react';
import { black } from '../../config/theme/themePrimitives';

const LabeledTextField = ({
  label,
  isAutoComplete = false,
  value = '',
  defaultValue = '',
  onChange,
  options = [],
  disabled = false,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
        gap: '10px',
      }}
    >
      <Typography variant="subtitle2" color={black[900]} fontWeight={500}>
        {label}
      </Typography>

      {isAutoComplete ? (
        <>
          <Autocomplete
            disabled={disabled}
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            options={options.map((option) => option.label)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                placeholder={defaultValue}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: black[200],
                    },
                    '&:hover fieldset': {
                      borderColor: black[200],
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: black[500],
                      borderWidth: 1,
                    },
                  },
                }}
              />
            )}
          />
        </>
      ) : (
        <TextField
          variant="outlined"
          size="small"
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: black[200],
              },
              '&:hover fieldset': {
                borderColor: black[200],
              },
              '&.Mui-focused fieldset': {
                borderColor: black[500],
                borderWidth: 1,
              },
            },
          }}
        />
      )}
    </Box>
  );
};

export default LabeledTextField;
