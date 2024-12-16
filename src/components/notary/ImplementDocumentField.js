import React from 'react';
import { Box, Typography } from '@mui/material';
import { black, gray } from '../../config/theme/themePrimitives';

const ImplementDocumentField = ({ title, value }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            <Typography sx={{ fontSize: 12, fontWeight: 500, color: black[900], textTransform: 'capitalize' }}>
                {title}
            </Typography>
            <Typography
                sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: black[900],
                    textTransform: 'none',
                    padding: '8px 12px',
                    border: `1px solid ${gray[200]}`,
                    borderRadius: 1,
                }}
            >
                {value}
            </Typography>
        </Box>
    );
};

export default ImplementDocumentField;
