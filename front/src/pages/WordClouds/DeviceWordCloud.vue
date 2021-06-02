<template>
  <div>
    <h1 class="page-title">
      <b>谁在讨论“内卷”</b>
    </h1>
<!--    <p>Trends - <b>Confirmed Cases</b></p>-->
    <b-row>
      <b-col xs="12" lg="8">
        <Widget
          close collapse
        >
<!--          <h4>新冠肺炎确诊个案数趋势 (全国)</h4>-->
          <p>数据来源：微博；时间跨度：22/1/2020 - 22/1/2021</p>
<!--          <highcharts :options="trendData"></highcharts>-->
          <div id="DeviceWordCloud" style="width:100%;height:100%;"></div>

        </Widget>
      </b-col>
      <b-col xs="12" lg="4">
        <Widget
          close collapse
        >
          <h4>分析 - <b>发布设备</b></h4>
<!--          <p>Analysis - <b>Confirmed Trend</b></p>-->
          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <p class="fw-normal">
              可以看到，确诊个案数的两次爆发点分别在
              <mark><strong>2020年1月-2月期间</strong></mark>，
              以及
              <mark><strong>2021年1月左右</strong></mark>，
              这也正是我国疫情在所研究的时间范围内最严重的两次。
            </p>
            <p class="fw-normal">在这两次爆发点只间，也零星分布一些小的爆发。</p>
            <p>(张悦)</p>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import { Chart } from 'highcharts-vue';
// import { makeTrend } from '../trends';
import { fetchOnline } from '../fetch';
// 引入词云图需要的包
import Highcharts from "highcharts/highcharts";
import wordcloud from "highcharts/modules/wordcloud";
wordcloud(Highcharts);

export default {
  components: { Widget, highcharts: Chart },
  data: function() {
    return {
      trendData: {}
    }
  },
  methods: {
    initHighCharts(graphTitle,data){
      Highcharts.chart(graphTitle, {
        colors: ["#0dbd20", "#f6ea0b", "rgba(246,149,1,0.73)", "rgba(43,102,205,0.71)"],
        tooltip: {
          // enabled: true
          // headerFormat: '<b>{data.name}</b><br>',
          // pointFormat: '{pointer.name},{pointer.value}'
        },
        chart: {
          plotBackgroundColor: null,
          backgroundColor: null
        },
        title: {
          text: null
        },
        credits: {
          enabled: false // 禁用版权信息
        },
        exporting:{enabled:false},
        series: [
          {
            type: "wordcloud",
            data: data,
            cursor: "pointer",
            rotation: {
              from: 0,
              to: 0,
              orientations: 5
            },
            maxFontSize: 10,//最大字体
            minFontSize: 2,//最小字体
            //点击事件
            events: {
              click: function(e) {}
            }
          }
        ]
      });
    }
  },
  mounted: function() {
    let operation = 'covid/national/numbers/summary?start=2020-01-22&end=2021-01-22';
    let that = this;
    // var data=[('华为', 52899), ('超话', 496693), ('微博国际版', 35574), ('android', 92), ('小米', 5745), ('vivo', 2472), ('oppo', 5703), ('iPhone', 543627), ('微博网页版', 473772)]
    var data =  [
      {name: "华为",value: "5329"},
      {name:"超话",value:"496693"},
      {name:"微博国际版",value:"35574"},
      {name:"android",value:"92"},
      {name:"小米",value:"5745"},
      {name:"vivo",value:"2472"},
      {name:"oppo",value:"5703"},
      {name:"iPhone",value:"543627"},
      {name:"微博网页版",value:"473772"}
    ]
    this.initHighCharts("DeviceWordCloud",data);

    fetchOnline(operation, 
    function(res) {
      if (res.code === 200) {
        let data = res.data;
        let series = [];
        for (let ii in data) {
          let day = data[ii];
          let dayRecord = [day.datetime, day.confirmed_count];
          series.push(dayRecord);
        }
        that.trendData = makeTrend(series, "微博热度趋势图", null, "#9DC7F1");
      }
    },
    function(err) {
      console.log('err', err);
    })
  }
};
</script>
