import React from 'react';
import { Box, Typography } from '@mui/material';
import { black, red, yellow } from '../../config/theme/themePrimitives';
import { PictureAsPdf, Photo, OpenInNew } from '@mui/icons-material';

const FileField = ({ type, name, size }) => {
    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', padding: 1, border: `1px solid ${black[50]}`, borderRadius: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 1,
                    bgcolor: type === 'pdf' ? red[50] : yellow[50],
                    color: type === 'pdf' ? red[500] : yellow[500],
                    borderRadius: 100
                }}
            >
                {type === 'pdf' ? <PictureAsPdf /> : <Photo />}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 500, color: black[900], textTransform: 'none' }}>
                        {name}
                    </Typography>
                    <OpenInNew sx={{ height: 14, width: 14 }} />
                </Box>

                <Typography sx={{ fontSize: 10, fontWeight: 400, color: black[500], textTransform: 'capitalize' }}>
                    {size}
                </Typography>
            </Box>
        </Box>
    );
};

export default FileField;
