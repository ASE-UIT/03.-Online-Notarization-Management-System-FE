import { Paper, Typography } from '@mui/material';
import React from 'react';
import { black, gray, white } from '../../config/theme/themePrimitives';

const NotaryAnalyticsCard = ({ title, value, growth }) => {
    return (
        <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden', border: `1px solid ${gray[200]}`, padding: 2, gap: 2, borderRadius: 1, boxShadow: '0px 2px 4px -2px rgba(19, 25, 39, 0.12), 0px 4px 4px -2px rgba(19, 25, 39, 0.08)', bgcolor: white[50], minWidth: 200 }}>
            <Typography sx={{ fontSize: 14, color: black[900], fontWeight: 500, textTransform: 'capitalize' }}>{title}</Typography>
            <Typography sx={{ fontSize: 24, color: black[900], fontWeight: 500, textTransform: 'capitalize' }}>{value}</Typography>
            <Typography sx={{ fontSize: 12, color: black[400], fontWeight: 500, textTransform: 'none' }}>{growth > 0 ? `+${growth}%` : `${growth}%`} so với tháng trước</Typography>
        </Paper>
    );
};

export default NotaryAnalyticsCard;
