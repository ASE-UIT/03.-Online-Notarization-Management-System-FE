import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import Section from './Section';
ChartJS.register(BarElement, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const RevenueByFieldSection = ({ period, setPeriod, notaryFieldBarChartData, notaryFieldBarChartOptions }) => {
  return (
    <Section title="Doanh thu theo lĩnh vực" period={period} setPeriod={setPeriod}>
      <Bar data={notaryFieldBarChartData} options={notaryFieldBarChartOptions} />
    </Section>
  );
};

export default RevenueByFieldSection;
