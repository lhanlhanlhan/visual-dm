let makeMultiBar = function(dataArr, chartName, chartBrief, xName, yName) {
    let option = {
        chart: {
            type: 'column'
        },
        title: {
            text: chartName
        },
        subtitle: {
            text: chartBrief
        },
        xAxis: {
            categories: xName,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: yName
            }
        },
        plotOptions: {
            column: {
                borderWidth: 0
            }
        },
        series: dataArr,
        credits: {
            enabled: false
        }
    };

    return option;
}

export { makeMultiBar };