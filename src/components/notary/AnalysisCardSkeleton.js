import React from 'react';
import { Box, Skeleton } from '@mui/material';

const AnalysisCardSkeleton = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            border="2px solid #e0e0e0"
            borderRadius={1}
            width="100%"
            gap={4}
            paddingY={2}
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                width="100%"
                gap={1}
                marginLeft={4}
            >
                <Skeleton variant="circular" width={32} height={32} />
                <Skeleton variant="text" width={80} height={26} />
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                width="100%"
                gap={1}
                marginLeft={4}
            >
                <Skeleton variant="text" width={50} height={26} />
                <Skeleton variant="text" width={30} height={26} />
                <Skeleton variant="text" width={100} height={26} />
            </Box>
        </Box>
    );
}

export default AnalysisCardSkeleton;
