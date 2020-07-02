
import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

const BarChart = ({ statData, period }) => {
  const chartData = {
    series: [{
      name: 'my title',
      data: Object.values(statData)
    }],
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: period === 'weekly' ? '50%' : '60%',
        },
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        yaxis: {
          lines: {
            show: false,
          }
        },
      },
      xaxis: {
        categories: Object.keys(statData),
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          colorStops: [
            [
              {
                offset: 0.6,
                color: '#FAF33E',
                opacity: 50
              },
              {
                offset: 100,
                color: '#7D7A1F',
                opacity: 1
              }
            ]
          ]
        }
      },
      tooltip: {
        enabled: true,
        followCursor: true,
        intersect: true,
        inverseOrder: false,
        fillSeriesColor: false,
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: undefined,
          width: '10px'
        },
        x: {
          show: false,
          format: 'dd MMM',
          formatter: undefined,
        },
        y: {
          formatter(val) {
            return `${val}`;
          },
          title: {
            formatter(val, { dataPointIndex, w }) {
              return w.globals.labels[dataPointIndex];
            },
          },
        },
        z: {
          formatter: undefined,
          title: 'Size: '
        },
        marker: {
          show: false,
        },
        items: {
          display: 'flex',
        },
        fixed: {
          enabled: true,
          position: 'topLeft',
          offsetY: 1
        }
      }
    },
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      height="128"
      width={period === 'weekly' ? '200' : '260'}
      style={period === 'weekly' ? {} : { position: 'relative', right: '60px' }}
    />
  );
};

BarChart.propTypes = {
  statData: PropTypes.instanceOf(Object),
  period: PropTypes.instanceOf(String),
};

BarChart.defaultProps = {
  statData: {},
  period: '',
};

export default BarChart;
