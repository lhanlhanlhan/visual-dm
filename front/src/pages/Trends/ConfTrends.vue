<template>
  <div>
    <h1 class="page-title">
      趋势分析 - <b>确诊</b>
    </h1>
    <p>Trends - <b>Confirmed Cases</b></p>
    <b-row>
      <b-col xs="12" lg="8">
        <Widget
          collapse
        >
          <div class="d-flex align-items-center">
            <div class="mr-5">
              <h4>新冠肺炎确诊个案数趋势 (全国)</h4>
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
        <b-row>
          <Widget
            collapse
          >
            <h4>分析 - <b>确诊趋势</b></h4>
            <p>Analysis - <b>Confirmed Trend</b></p>
            <div class="">
              <p class="fw-normal">
                可以看到，确诊人数的第一次爆发点在 <mark><strong>2020年2月-3月期间</strong></mark>，
                在这个时间段内，累计确诊人数由0激增到了8万，
                随后进入确诊人数平稳期，人数上升到 <mark><strong>8.5万</strong></mark>。
                <mark><strong>2020年2月12日当天</strong></mark>
                ，确诊人数更是增加超过1万人。
              </p>
              <p class="fw-normal">
                在此之后的相当长的一段时间内，由于我国<mark><strong>疫情控制良好</strong></mark>，
                确诊人数仅在部分时候有零星增加，总体趋势平稳发展。
                在
                <mark><strong>2020年7月到8月</strong></mark>，
                我国新疆地区迎来一次新的爆发期，因此确诊人数有小幅提升。
              </p>
              <p>(陈品臻)</p>

              <p class="fw-normal">
                总体来说，<mark><strong>2020年1月末至三月初</strong></mark>
                为国内疫情<mark><strong>最严重</strong></mark>的时期。重要事件节点包括：<br />
                <mark><strong>1月23日</strong></mark>，武汉封城，核酸检测试剂盒开始量产。<br />
                <mark><strong>2月12日</strong></mark>，湖北地区新增病例个数异常升高，斜率<mark><strong>相当大</strong></mark>，原因是湖北地区更改诊断标准，使得确诊更加容易。<br />
                <mark><strong>3月初</strong></mark>，政府采取有力措施，疫情拐点出现。确诊人数在三月初斜率基本水平，即感染新增人数逐渐的减少。<br />
              </p>
              <p>(单晓妍)</p>
            </div>
          </Widget>
        </b-row>
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
          let dayRecord = [day.datetime, day.confirmed_count];
          series.push(dayRecord);
        }
        that.trendData = makeTrend(series, "全国确诊个案数", null, "#9DC7F1");
        that.ready = true;
      }
    },
    function(err) {
      console.log('err', err);
    })
  }
};
</script>
