<template>
  <div>
    <h1 class="page-title">
      <b>“内卷”到底是怎么火起来的？</b>
    </h1>
    <b-row>
      <b-col xs="12" lg="8">
        <Widget
          close collapse
        >
          <p>数据来源：微博；时间跨度：22/1/2020 - 22/1/2021</p>
          <highcharts :options="trendData"></highcharts>
        </Widget>
      </b-col>
      <b-col xs="12" lg="4">
        <Widget
          close collapse
        >
          <h4>分析 - <b>热度趋势</b></h4>
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
import { makeTrend } from '../trends';
import { fetchOnline } from '../fetchlocal';

export default {
  components: { Widget, highcharts: Chart },
  data: function() {
    return {
      trendData: {}
    }
  },
  mounted: function() {
    let operation = 'social/num';
    let that = this;
    fetchOnline(operation, 
    function(res) {
      if (res.code === 200) {
        let data = res.data;
        let series = [];
        for (let ii in data) {
          let day = data[ii];
          let dayRecord = [day.datetime, day.num];
          series.push(dayRecord);
        }
        that.trendData = makeTrend(series, "微博热度趋势图", null, "#d84315");
      }
    },
    function(err) {
      console.log('err', err);
    })
  }
};
</script>
