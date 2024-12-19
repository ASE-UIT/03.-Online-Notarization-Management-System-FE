import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import Section from './Section';

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);

const RevenuePerServiceSection = ({ period, setPeriod, notaryServiceBarChartData, notaryServiceBarChartOptions }) => {
  return (
    <Section title="Doanh thu theo dịch vụ" period={period} setPeriod={setPeriod}>
      <Bar data={notaryServiceBarChartData} options={notaryServiceBarChartOptions} />
    </Section>
  );
};

export default RevenuePerServiceSection;
