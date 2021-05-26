import Highcharts from 'highcharts';

let getScatter = function(dataDict) {
	let colours = [
		"rgba(223, 83, 83, .5)",
		"rgba(119, 152, 191, .5)",
		"rgba(101, 202, 113, 0.5)",
		"rgba(223, 83, 83, .5)",
		"rgba(119, 152, 191, .5)",
		"rgba(101, 202, 113, 0.5)",
		"rgba(223, 83, 83, .5)",
		"rgba(119, 152, 191, .5)",
		"rgba(101, 202, 113, 0.5)"
	]

	var levIdx = 0;
	let seriesOption = [];
	for (let lev in dataDict) {
		let dataList = dataDict[lev];
		seriesOption.push({
			name: lev,
			color: colours[levIdx],
			data: dataList
		})
		levIdx += 1;
	}

	let option = {
		chart: {
			type: 'scatter',
			zoomType: 'xy'
		},
		title: {
			text: '507 人按性别划分的身高和体重分布图'
		},
		subtitle: {
			text: '数据来源: Heinz  2003'
		},
		xAxis: {
			title: {
				enabled: true,
				text: '身高 (cm)'
			},
			startOnTick: true,
			endOnTick: true,
			showLastLabel: true
		},
		yAxis: {
			title: {
				text: '体重 (kg)'
			}
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			x: 100,
			y: 70,
			floating: true,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
			borderWidth: 1
		},
		plotOptions: {
			scatter: {
				marker: {
					radius: 3,
					symbol: 'o',
					states: {
						hover: {
							enabled: true,
							lineColor: 'rgb(100,100,100)'
						}
					}
				},
				states: {
					hover: {
						marker: {
							enabled: false
						}
					}
				},
				tooltip: {
					headerFormat: '<b>{series.name}</b><br>',
					pointFormat: '{point.x} cm, {point.y} kg'
				}
			}
		},
		series: seriesOption
	}
	return option;
}

export { getScatter };