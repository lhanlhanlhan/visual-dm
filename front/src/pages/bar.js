let makeBar = function(dataArr, chartName, chartBrief, xName, yName, colour) {
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
        series: [{
            name: [yName],
            data: dataArr,
            color: colour
        }],
        credits: {
            enabled: false
        }
    };

    return option;
}

export { makeBar };