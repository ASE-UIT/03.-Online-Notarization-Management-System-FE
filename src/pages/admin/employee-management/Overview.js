import React from 'react';
import { Box, Avatar,  Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import HailRoundedIcon from '@mui/icons-material/HailRounded';
import { Pie } from 'react-chartjs-2';
import { adminPieChartOptions, } from '../../../config/chartConfig';
import { white, red, yellow, green, blue } from '../../../config/theme/themePrimitives';

ChartJS.register(ArcElement, Tooltip, Legend);

const Overview = ({count , notaryCount, secretaryCount}) => {
  const adminPieChartData = {
    labels: ['Công chứng viên', 
             'Thư ký', 
             'Trợ lý VPCC', 
             'Chuyên viên pháp lý'],
    datasets: [
      {
        data: [notaryCount, secretaryCount, 0, 0],
        backgroundColor: [red[300], blue[300], green[300], yellow[300]],
        borderColor: white[50],
        borderWidth: 2,
      },
    ],
  };
  return (
    <Box
        sx={{
          display: 'flex',
          padding: '24px',
          alignItems: 'flex-start',
          gap: '16px',
          borderRadius: '20px',
          border: '1px solid #F8F9FA',
          background: '#FFF',
          boxShadow: '0px 4px 20px 0px rgba(238, 238, 238, 0.50)',
          height: 'fit-content',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 32px',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '30px',
            background: '#E6F4FF',
            borderRadius: '16px',
          }}
        >
          <Box sx={{ p: '6px' }}>
            <Avatar sx={{ height: '60px', width: '60px', backgroundColor: '#0095FF' }}>
              <HailRoundedIcon sx={{ height: '50px', width: '40px' }}></HailRoundedIcon>
            </Avatar>
          </Box>

          <Typography
            sx={{
              color: '#000',
              fontFamily: 'Be Vietnam Pro',
              fontSize: '50px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
            }}
          >
            {count}
          </Typography>

          <Typography
            sx={{
              color: '#000',
              fontFamily: 'Be Vietnam Pro',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '20px',
            }}
          >
            Số lượng nhân viên
          </Typography>
        </Box>
        <Box flex={0.5}/>
        <Box sx={{width: '60%', height: '100%'}}>
          <Pie data={adminPieChartData} options={adminPieChartOptions} height={247}/>
        </Box>
        <Box flex={0.5}/>
      </Box>
  );
};
export default Overview;
