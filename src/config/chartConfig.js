import { blue, gray, green, red, white, yellow } from './theme/themePrimitives';

export const notaryServiceBarChartData = {
  labels: ['Dịch vụ A', 'Dịch vụ B', 'Dịch vụ C', 'Dịch vụ D'],
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

export const notaryServiceBarChartOptions = {
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
        text: 'Dịch vụ',
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

export const notaryFieldBarChartData = {
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

export const notaryFieldBarChartOptions = {
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

export const notaryPieChartData = {
  labels: ['Chờ xử lý', 'Đang xử lý', 'Sẵn sàng ký số', 'Hoàn tất', 'Không hợp lệ'],
  datasets: [
    {
      data: [10, 20, 30, 25, 15],
      backgroundColor: [gray[300], yellow[300], blue[300], green[300], red[300]],
      borderColor: white[50],
      borderWidth: 2,
    },
  ],
};

export const notaryPieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.label}: ${context.raw}`;
        },
      },
    },
  },
  cutout: '30%',
};
