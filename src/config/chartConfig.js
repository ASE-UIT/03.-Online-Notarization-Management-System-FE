import { blue, gray, green } from './theme/themePrimitives';

export const lineChartData = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  datasets: [
    {
      label: 'Doanh thu tháng 11',
      data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
      borderColor: green[400],
      backgroundColor: 'rgba(67, 183, 93, 0.2)',
      fill: true,
      tension: 0.2,
    },
    {
      label: 'Doanh thu tháng 12',
      data: [3, 4, 4.5, 7.5, 2.5, 6, 2, 5, 4, 7],
      borderColor: blue[400],
      backgroundColor: 'rgba(0, 149, 255, 0.2)',
      fill: true,
      tension: 0.2,
    },
  ],
};

export const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
    },
  },
};

export const barChartData = {
  labels: ['Lĩnh vực A', 'Lĩnh vực B', 'Lĩnh vực C', 'Lĩnh vực D'],
  datasets: [
    {
      label: 'Tháng trước',
      data: [120, 150, 80, 200],
      backgroundColor: 'rgba(0, 149, 255, 0.5)',
      borderColor: blue[400],
      borderWidth: 1,
    },
    {
      label: 'Tháng hiện tại',
      data: [180, 130, 120, 210],
      backgroundColor: 'rgba(67, 183, 93, 0.5)',
      borderColor: green[400],
      borderWidth: 1,
    },
  ],
};

export const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.raw} triệu đồng`;
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Lĩnh vực',
        color: gray[500],
        font: {
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: '(triệu đồng)',
        color: gray[500],
        font: {
          size: 12,
        },
      },
      ticks: {
        callback: (value) => `${value} triệu`,
      },
    },
  },
};
