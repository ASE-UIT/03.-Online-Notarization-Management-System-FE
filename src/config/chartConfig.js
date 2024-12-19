import { blue, gray, green, red, white, yellow } from './theme/themePrimitives';

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

export const adminPieChartOptions = {
  responsive: true,
maintainAspectRatio: false,
layout: {
  padding: {
      right: 50,
  }
},
plugins: {
  legend: {
    position: 'right',
    labels: {
      font: {
          size: 16,
          family: 'Roboto',
          weight: 400,
          lineheight: 24
      },
      color: '#000',
      boxWidth: 20,
      padding: 24,
    }
  },
  tooltip: {
    callbacks: {
      label: (context) => {
        return `${context.label}: ${context.raw}`;
      },
    },
  },
},
}
