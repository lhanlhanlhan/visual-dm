import { china } from './mapsData/china';
import { guangxi } from './mapsData/guangxi';
import { guangdong } from './mapsData/guangdong';
import { fujian } from './mapsData/fujian';
import { zhejiang } from './mapsData/zhejiang';
import { shanghai } from './mapsData/shanghai';
import { hainan } from './mapsData/hainan';
import { hubei } from './mapsData/hubei';
import { hebei } from './mapsData/hebei';

// 制作趋势图
let makeMap = function (data, graphTitle, mainColour, seriesName) {
  let mapChart = {
    title: {
      text: graphTitle
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    colorAxis: {
      dataClasses: [
      {
        from: 0,
        to: 1,
        color: mainColour + "00"
      }, {
        from: 1,
        to: 200,
        color: mainColour + "22"
      }, {
        from: 200,
        to: 500,
        color: mainColour + "55"
      }, {
        from: 500,
        to: 1000,
        color: mainColour + "88"
      }, {
        from: 1000,
        to: 5000,
        color: mainColour + "BB"
      }, {
        from: 5000,
        to: 10000,
        color: mainColour + "DD"
      }, {
        from: 10000,
        color: mainColour + "FF"
      }]
    },
    series: [{
      mapData: china,
      data: data,
      joinBy: 'name',
      name: seriesName,
      states: {
        hover: {
          color: '#efefef'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.properties.postal}'
      },
    }],
    // 去除水印
    credits: {
      enabled: false
    }
  };
  return mapChart;
}

// 制作趋势图 (省)
let makeProvinceMap = function (province, data, graphTitle, mainColour, seriesName) {
  let provinceMapData = {
    '广西': guangxi,
    '广东': guangdong,
    '福建': fujian,
    '浙江': zhejiang,
    '上海': shanghai,
    '海南': hainan,
    '湖北': hubei,
    '河北': hebei
  }
  let mapChart = {
    title: {
      text: graphTitle
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    colorAxis: {
      dataClasses: [
      {
        from: 0,
        to: 1,
        color: mainColour + "00"
      }, {
        from: 1,
        to: 200,
        color: mainColour + "22"
      }, {
        from: 200,
        to: 500,
        color: mainColour + "55"
      }, {
        from: 500,
        to: 1000,
        color: mainColour + "88"
      }, {
        from: 1000,
        to: 5000,
        color: mainColour + "BB"
      }, {
        from: 5000,
        to: 10000,
        color: mainColour + "DD"
      }, {
        from: 10000,
        color: mainColour + "FF"
      }]
    },
    series: [{
      mapData: provinceMapData[province],
      data: data,
      joinBy: 'name',
      name: seriesName,
      states: {
        hover: {
          color: '#efefef'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.properties.postal}'
      },
    }],
    // 去除水印
    credits: {
      enabled: false
    }
  };
  return mapChart;
}

export { makeMap, makeProvinceMap };