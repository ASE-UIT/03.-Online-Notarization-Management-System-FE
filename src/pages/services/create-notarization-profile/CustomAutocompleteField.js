import React from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { black, white } from '../../../config/theme/themePrimitives';

const CustomAutocompleteField = ({ title, options, selectedOption, setSelectedOption, fetchOptions, loadingOptions }) => {
  return (
    <Box>
      <Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: 'capitalize', color: black[900], mb: 1 }}>
        {title}
      </Typography>
      <Autocomplete
        loading={loadingOptions}
        options={options}
        getOptionLabel={(option) => option.name}
        onChange={(e, value) => setSelectedOption(value)}
        sx={{
          backgroundColor: white[50],
          fontSize: '0.875rem',
          border: `1.2px solid ${black[100]}`,
          borderRadius: 1,
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              '& fieldset': { border: 'none' },
            }}
            placeholder={`Chọn ${title}`}
            inputProps={{ ...params.inputProps, readOnly: true, style: { fontSize: '0.875rem' } }}
          />
        )}
        value={selectedOption}
        onOpen={fetchOptions}
      />
    </Box>
  );
};

export default CustomAutocompleteField;
