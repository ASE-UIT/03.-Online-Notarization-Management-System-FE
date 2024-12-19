import { BarChartRounded, DescriptionRounded, FileUploadRounded, LocalOfferRounded } from '@mui/icons-material';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { black, dark, green, primary, red, white, yellow } from '../../../config/theme/themePrimitives';
import StatCard from './StatCard';
import AdminService from '../../../services/admin.service';
import { toast } from 'react-toastify';

const StatisticSection = ({ period, setPeriod, documentMetrics, sessionMetrics, paymentMetrics }) => {
  const renderPercentageChange = (data) => {
    const periods = {
      today: 'hôm qua',
      current_week: 'tuần trước',
      current_month: 'tháng trước',
      current_year: 'năm trước',
    };
    const previousPeriod = periods[data?.currentPeriod?.period] || '';
    const percentageChange = data?.growthPercent || 0;

    return percentageChange > 0
      ? `+${percentageChange}% so với ${previousPeriod}`
      : `${percentageChange}% so với ${previousPeriod}`;
  };

  const handleExportExcel = async () => {
    try {
      const response = await AdminService.exportToExcel(period.id);

      if (response && response.data) {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        if (blob.size === 0) {
          toast.error('Tệp tin trống');
          return;
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${period.name}.xlsx`);
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        toast.success('Xuất file thành công');
      } else {
        toast.error('Không thể tải file');
      }
    } catch (error) {
      console.error('Excel export error:', error);
      toast.error('Lỗi xuất file');
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: white[50],
        p: 2,
        boxShadow: 1,
        borderRadius: 2.5,
        flex: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ color: black[900], fontSize: 16, fontWeight: 600 }}>Thống kê</Typography>
          <Typography sx={{ color: black[400], fontSize: 14 }}>Thống kê {period.name.toLowerCase()}</Typography>
        </Box>
        <Button
          variant="outlined"
          sx={{
            padding: '8px 16px',
            backgroundColor: white[50],
            border: `2px solid ${dark[100]}`,
            color: dark[500],
            borderRadius: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: primary[500],
              color: primary[500],
            },
            '&:hover .MuiSvgIcon-root': {
              color: primary[500],
            },
          }}
          startIcon={<FileUploadRounded sx={{ color: dark[400], fontSize: 16 }} />}
          onClick={handleExportExcel}
        >
          <Typography sx={{ fontSize: 14, textTransform: 'capitalize', fontWeight: 500 }}>Xuất</Typography>
        </Button>
      </Box>
      <Autocomplete
        size="small"
        options={[
          { id: 'today', name: 'Hôm nay' },
          { id: 'current_week', name: 'Tuần này' },
          { id: 'current_month', name: 'Tháng này' },
          { id: 'current_year', name: 'Năm nay' },
        ]}
        getOptionLabel={(option) => option.name}
        value={period}
        onChange={(event, newValue) => setPeriod(newValue || period)}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{ ...params.inputProps, readOnly: true }}
            sx={{ '& .MuiInputBase-input': { fontSize: 14 } }}
            placeholder="Chọn thời gian"
          />
        )}
        sx={{ width: '30%' }}
      />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1 }}>
        <StatCard
          title="Tổng doanh thu"
          value={paymentMetrics?.currentPeriod?.totalAmount || 0}
          percentageChange={renderPercentageChange(paymentMetrics)}
          color={red}
          icon={<BarChartRounded sx={{ fontSize: 20 }} />}
        />
        <StatCard
          title="Tổng tài liệu"
          value={documentMetrics?.currentPeriod?.documentCount || 0}
          percentageChange={renderPercentageChange(documentMetrics)}
          color={yellow}
          icon={<DescriptionRounded sx={{ fontSize: 20 }} />}
        />
        <StatCard
          title="Tổng phiên công chứng"
          value={sessionMetrics?.currentPeriod?.sessionCount || 0}
          percentageChange={renderPercentageChange(sessionMetrics)}
          color={green}
          icon={<LocalOfferRounded sx={{ fontSize: 20 }} />}
        />
      </Box>
    </Box>
  );
};

export default StatisticSection;
