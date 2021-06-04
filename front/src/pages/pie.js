let pieChart = function(data, seriesName, size) {
  let opt = {
    chart: {
      type: 'pie',
      height: size
    },
    credits: {
      enabled: false
    },
    title: {
      text:''
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false
        },
        borderColor: null,
        showInLegend: true,
        innerSize: 60,
        size: size - 10,
        states: {
          hover: {
            halo: {
              size: 1
            }
          }
        }
      }
    },
    colors: ['#E78C3B', '#D7AC4A', '#6C2922', '#348243', '#537385', '#2A8473', '#295AA2'],
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemStyle: {
        color: '#495057',
        fontWeight: 100,
        fontFamily: 'Montserrat'
      },
      itemMarginBottom: 5,
      symbolRadius: 0
    },
    exporting: {
      enabled: false
    },
    series: [{
      type: 'pie',
      innerSize: '80%',
      name: seriesName,
      data: data
    }]
  };
  return opt;
} 

export { pieChart };
