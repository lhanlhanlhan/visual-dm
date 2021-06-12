<template>
  <div>
    <h1 class="page-title">
      趋势分析 - <b>病亡</b>
    </h1>
    <p>Trends - <b>Demised</b></p>
    <b-row>
      <b-col xs="12" lg="8">
        <Widget
          collapse
        >
          <div class="d-flex align-items-center">
            <div class="mr-5">
              <h4>因新型冠状病毒引发的肺炎死亡个案数 (全国汇总)</h4>
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
          <h4>分析 - <b>病亡人数趋势</b></h4>
          <p>Analysis - <b>Demised Trend</b></p>
          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <p class="fw-normal">
              在<mark><strong>第一次疫情爆发后一个月 (2020年3月-4月)</strong></mark>，
              死亡个案数达到最高峰，这是中国疫情最严重的一个月，也是最难熬的一个月；
            </p>
            <p class="fw-normal">
              而在
              <mark><strong>下一次疫情爆发的时候（2021年7月、2021年1月）</strong></mark>，
              死亡人数虽然有激增，但是数据温和得多，其
              <mark><strong>最高点比第一次大幅降低</strong></mark>，
              且死亡人数在比例上呈递减趋势。
            </p>
            <p class="fw-normal">
              我们通过分析还得知，
              人数在全体人数比例在<mark><strong>2020年4月17日</strong></mark>达到顶峰，随后一直呈递减趋势：
            </p>
            <img 
               :src="require('../../assets/figs/dead-rate.png')" 
               width="100%" 
               class="mt-2"/>
            <p>(陈品臻)</p>

            <p class="fw-normal">
              从<mark><strong>1月23日</strong></mark>开始，死亡人数急剧攀升，
              可能原因是重症病患人群增加。
              曲线在三月下旬<mark><strong>趋于平缓</strong></mark>，晚于确诊个数曲线平缓的时间点近20天，
              说明此时各项措施发挥效用，疫情已被初步控制住。
              此后死亡病例数增加幅度不显著。
              值得注意的是，<mark><strong>4月17日武汉市对新冠肺炎各项数据进行修正</strong></mark>，
              导致病亡人数的突变。
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
          let dayRecord = [day.datetime, day.dead_count];
          series.push(dayRecord);
        }
        that.trendData = makeTrend(series, "全国因新型冠状病毒引发的肺炎死亡个案数", null, "#C45252");
        that.ready = true;
      }
    },
    function(err) {
      console.log('err', err);
    })
  }
};
</script>
