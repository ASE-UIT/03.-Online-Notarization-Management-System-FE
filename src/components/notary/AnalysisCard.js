import React from 'react';
import { Box, Typography } from '@mui/material';
import { gray } from '../../config/theme/themePrimitives';

const AnalysisCard = ({ icon, title, mainText, deltaText, deltaDescription, iconBgColor, iconColor, deltaColor }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            border={`2px solid ${gray[200]}`}
            borderRadius={1}
            width={'100%'}
            gap={4}
            paddingY={2}
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                width={'100%'}
                gap={1}
                marginLeft={4}
            >
                {React.cloneElement(icon, { sx: { fontSize: 26, padding: 1, bgcolor: iconBgColor, color: iconColor, borderRadius: 1 } })}
                <Typography sx={{ fontSize: 18, fontWeight: 500 }}>{title}</Typography>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                width={'100%'}
                gap={1}
                marginLeft={4}
            >
                <Typography sx={{ fontSize: 26, fontWeight: 500 }}>{mainText}</Typography>
                <Typography sx={{ color: deltaColor }}>{deltaText}</Typography>
                <Typography sx={{ color: 'gray' }}>{deltaDescription}</Typography>
            </Box>
        </Box>
    );
}

export default AnalysisCard;
