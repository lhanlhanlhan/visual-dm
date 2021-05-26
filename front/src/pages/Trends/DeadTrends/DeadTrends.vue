<template>
  <div>
    <h1 class="page-title">
      趋势分析 - <b>病亡</b>
    </h1>
    <p>Trends - <b>Demised</b></p>
    <b-row>
      <b-col xs="12" lg="8">
        <Widget
          close collapse
        >
          <h4>因新型冠状病毒引发的肺炎死亡个案数 (全国汇总)</h4>
          <p>数据来源：丁香园；时间跨度：22/1/2020 - 22/1/2021</p>
          <highcharts :options="trendData"></highcharts>
        </Widget>
      </b-col>
      <b-col xs="12" lg="4">
        <Widget
          close collapse
        >
          <h4>分析 - <b>死亡趋势</b></h4>
          <p>Analysis - <b>Demised Trend</b></p>
          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <p class="fw-normal">
              在<mark><strong>第一次疫情爆发后一个月</strong></mark>，
              死亡个案数达到最高峰，
              这是中国疫情最严重的一个月，也是最难熬的一个月；
            </p>
            <p class="fw-normal">
              而在
              <mark><strong>下一次疫情爆发的时候（2021年1月）</strong></mark>，
              死亡人数虽然有激增，但是数据较为温和，其
              <mark><strong>最高点比第一次大幅降低</strong></mark>，
              且死亡人数在比例上呈递减趋势。
            </p>
            <p>(陈品臻)</p>
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
import { fetchOnline } from '../../fetch';

export default {
  components: { Widget, highcharts: Chart },
  data: function() {
    return {
      trendData: {}
    }
  },
  mounted: function() {
    let operation = 'national/numbers/summary?start=2020-01-22&end=2021-01-22';
    let that = this;
    fetchOnline(operation, 
    function(res) {
      if (res.code === 200) {
        let data = res.data;
        let series = [];
        for (let ii in data) {
          let day = data[ii];
          let dayRecord = [day.datetime, day.dead_count];
          series.push(dayRecord);
        }
        that.trendData = makeTrend(series, "全国因新型冠状病毒引发的肺炎死亡个案数", null, "#C45252");
      }
    },
    function(err) {
      console.log('err', err);
    })
  }
};
</script>
