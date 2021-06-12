<template>
  <div>
    <h1 class="page-title">
      趋势分析 - <b>治愈</b>
    </h1>
    <p>Trends - <b>Cured Cases</b></p>
    <b-row>
      <b-col xs="12" lg="8">
        <Widget
          collapse
        >
          <div class="d-flex align-items-center">
            <div class="mr-5">
              <h4>新型冠状病毒治愈的个案数趋势 (全国)</h4>
              <p>数据来源：丁香园；时间跨度：22/1/2020 - 22/1/2021</p>
            </div>
            <!-- 旋转圈 -->
            <div class="spinner-border" role="status" v-if="!ready">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <highcharts v-if="ready" :options="trendData"></highcharts>
        </Widget>
      </b-col>
      <b-col xs="12" lg="4">
        <Widget
          collapse
        >
          <h4>分析 - <b>治愈趋势</b></h4>
          <p>Analysis - <b>Cured Trend</b></p>
          <div class="">
            <p class="fw-normal">
              在<mark><strong>第一次</strong></mark>疫情爆发后的 1~2 个月，增加了大量治愈的个案数，
              <mark><strong>治愈人数激增的时间和确诊人数激增的时间相差一个月左右</strong></mark>。
            </p>
            <p class="fw-normal">
              而在<mark><strong>第二次（2020年7-8月）、第三次（2021年1月）疫情爆发</strong></mark>的时候，
              治愈人数在确诊人数爆发的<mark><strong>同时显著增长</strong></mark>，
              这说明医疗技术的进步使得更多的确诊人员得到及时的治疗，被及时治愈。
            </p>
            <p>(陈品臻)</p>

            <p class="fw-normal">
              在<mark><strong>2月20日到23日</strong></mark>之间，治愈病例数基本成阶梯式上升，
              随后治愈病例数逐渐上升。
              治愈人数激增的时间和确诊人数激增的时间相差<mark><strong>一个月左右</strong></mark>。
              治愈病例数曲线在<mark><strong>4月初逐步平缓</strong></mark>，疫情逐步稳定。
            </p>
            <p>(单晓妍)</p>
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
import { fetchOnline } from '../fetch';

export default {
  components: { Widget, highcharts: Chart },
  data: function() {
    return {
      trendData: {},
      ready: false
    }
  },
  mounted: function() {
    let operation = 'covid/national/numbers/summary?start=2020-01-22&end=2021-01-22';
    let that = this;
    fetchOnline(operation, 
    function(res) {
      if (res.code === 200) {
        let data = res.data;
        let series = [];
        for (let ii in data) {
          let day = data[ii];
          let dayRecord = [day.datetime, day.cured_count];
          series.push(dayRecord);
        }
        that.trendData = makeTrend(series, "治愈的全国新型冠状病毒引发的肺炎个案数", null, "#05AAA1");
        that.ready = true;
      }
    },
    function(err) {
      console.log('err', err);
    })
  }
};
</script>
