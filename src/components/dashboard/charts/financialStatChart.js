
import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

const FinancialStatChart = () => {
  const chartData = {
    series: [{
      name: 'Revenue',
      data: [
        230000, 320000, 350000, 280000, 320000, 180000, 200000, 230000, 320000, 350000,
        230000, 320000, 350000, 280000, 320000, 180000, 200000, 280000, 320000, 180000,
        230000, 320000, 350000, 280000, 320000, 180000, 200000, 320000, 120000, 200000,
        210000
      ]
    }, {
      name: 'Gross Profit',
      data: [
        100000, 220000, 200000, 160000, 120000, 90000, 50000, 100000, 220000, 200000,
        100000, 220000, 200000, 160000, 120000, 90000, 50000, 160000, 120000, 90000,
        100000, 220000, 200000, 160000, 120000, 90000, 50000, 180000, 120000, 50000,
        80000
      ]
    }
    ],
    options: {
      colors: ['#A3A3A3', '#FAF33E'],
      chart: {
        type: 'bar',
        offsetY: 15,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '40%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false
      },
      grid: {
        position: 'back',
        borderColor: '#F9F9F3',
        xaxis: {
          lines: {
            show: true,
          }
        },
      },
      xaxis: {
        type: 'categories',
        categories: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 28, 30, 31
        ],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          offsetY: -5,
          style: {
            colors: '#B2B2B2'
          }
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        inverseOrder: true,
        labels: {
          colors: '#6F6F6F',
        },
        fontFamily: 'Avenir, medium, Arial, sans-serif',
        itemMargin: {
          horizontal: 50,
        },
        offsetX: -70,
        markers: {
          width: 15,
          height: 5,
          radius: 0,
        },
      },
      yaxis: [
        {
          seriesName: 'Gross Profit',
          axisTicks: {
            show: false
          },
          tickAmount: 5,
          labels: {
            show: true,
            offsetX: -10,
            formatter: value => (value !== 0 ? `${value / 1000}k` : value),
            style: {
              colors: '#B2B2B2'
            }
          }
        },
        {
          opposite: true,
          seriesName: 'Gross Profit',
          axisTicks: {
            show: false
          },
          tickAmount: 5,
          labels: {
            show: true,
            offsetX: -10,
            formatter: value => (value !== 0 ? `${value / 1000}k` : value),
            style: {
              colors: '#B2B2B2'
            }
          }
        }
      ],
      fill: {
        colors: ['#A3A3A3', '#FAF33E'],
        opacity: 1,
      }
    },
  };

  return (
    <Chart
      series={chartData.series}
      options={chartData.options}
      type="bar"
      height="270"
    />
  );
};

FinancialStatChart.propTypes = {
  statData: PropTypes.instanceOf(Object),
  period: PropTypes.instanceOf(String),
};

FinancialStatChart.defaultProps = {
  statData: {},
  period: '',
};

export default FinancialStatChart;
