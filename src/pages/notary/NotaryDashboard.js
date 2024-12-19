import React from 'react'
import NotaryAnalyticsSession from '../../components/notary/NotaryAnalyticsSession'
import RecentlyDocuments from '../../components/notary/RecentlyDocuments'
import { Box } from '@mui/material'

const NotaryDashboard = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4, gap: 3 }}>
            <NotaryAnalyticsSession />
            <RecentlyDocuments />
        </Box>
    )
}

export default NotaryDashboard