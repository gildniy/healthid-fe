import moment from 'moment';

const currency = localStorage.getItem('currency') || '₦';

const dashboard = {
  saleChartData: {
    series: [{
      name: 'data',
      data: []
    }],
    options: {
      chart: {
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 2,
          left: 2,
          blur: 1,
          color: '#424242',
          opacity: 0.1
        },
        toolbar: {
          show: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'square',
        width: 3
      },
      yaxis: {
        labels: {
          show: false
        },
        tickAmount: 6,
      },
      xaxis: {
        type: 'datetime',
        categories: [],
        labels: {
          datetimeUTC: false,
          maxHeight: 10,
          offsetY: -6,
          style: {
            colors: '#A3A3A3',
            fontSize: '8px',
            fontFamily: 'Avenir, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
        axisBorder: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        crosshairs: {
          show: true,
          width: 1,
          position: 'front',
          opacity: 0.9,
          stroke: {
            color: '#F6F041',
            width: 2,
            dashArray: 0,
          },
        }
      },
      tooltip: {
        custom({
          series, seriesIndex, dataPointIndex, w
        }) {
          const label = moment(w.config.xaxis.categories[dataPointIndex]).format('HH:mm');
          return (
            `${`${'<div class="tooltipBox">'
          + '<span class="tooltipTime">'}${label}</span></br>`
          + '<span>'}${currency} ${
              series[seriesIndex][dataPointIndex]
            }</span>`
          + '</div>'
          );
        }
      },
      colors: ['#F6F041', '#FFFCB0'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.5,
          stops: [0, 90, 100]
        }
      },
      grid: {
        position: 'back',
        borderColor: '#F9F9F3',
        xaxis: {
          lines: {
            show: true,
          }
        },
      }
    }
  },
  productChartData: {
    series: [{
      name: 'my title',
      // data: Object.values(statData)
      data: []
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
          // columnWidth: period === 'weekly' ? '50%' : '60%',
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
        type: 'datetime',
        // categories: Object.keys(statData),
        categories: [],
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
          title: {
            formatter(val, { dataPointIndex, w }) {
              return w.globals.labels[dataPointIndex];
            },
          }
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
  }
};

export default dashboard;
