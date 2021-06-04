<template>
  <div>
    <h1 class="page-title">
      <b>“内卷”到底是怎么火起来的？</b>
    </h1>
    <b-row>
      <b-col xs="12" lg="7">
        <Widget collapse>
          <highcharts :options="trendData" style="height: 300px;"></highcharts>
        </Widget>
        <Widget collapse>
          <highcharts :options="hotDistChart" style="height: 300px;"></highcharts>
        </Widget>
      </b-col>
      <b-col xs="12" lg="5">
        <Widget collapse>
          <h4>分析 - <b>热度趋势</b></h4>
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
import { makeBar } from "../bar";
import { fetchOnline } from '../fetchlocal';

export default {
  components: { Widget, highcharts: Chart },
  data: function() {
    return {
      trendData: {},
      hotDistChart: {}
    }
  },
  methods: {
    makeTrendChart() {
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
    },
    makeTimeDist() {
      let operation = 'social/time-freq';
      let that = this;
      fetchOnline(operation, 
      function(res) {
        if (res.code === 200) {
          let data = res.data;
          let series = [];
          let times = [];
          for (let ii in data) {
            let day = data[ii];
            series.push([day.day_time, day.frequency]);
            times.push(day.day_time);
          }
          that.hotDistChart = makeBar(series, "一天内热度分布", '', times, "该时间段内的微博数", "#537385");
        }
      },
      function(err) {
        console.log('err', err);
      })
    }
  },
  mounted: function() {
    this.makeTrendChart();
    this.makeTimeDist();
  }
};
</script>
