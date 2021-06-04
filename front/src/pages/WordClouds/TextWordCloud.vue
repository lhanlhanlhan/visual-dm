<template>

  <div>
    <h1 class="page-title">
      <b>当我们在讨论“内卷”时，我们在讨论什么？</b>
    </h1>
<!--    <p>Trends - <b>Confirmed Cases</b></p>-->
    <b-row>
      <b-col xs="12" lg="3">
        <Widget
            close collapse class="mr-5"
        >
          <h4 style="text-align: center">主题一 词云图</h4>
<!--          &lt;!&ndash;          <h4>新冠肺炎确诊个案数趋势 (全国)</h4>&ndash;&gt;-->
<!--          <p>数据来源：微博；时间跨度：22/1/2020 - 22/1/2021</p>-->
<!--          <highcharts :options="trendData"></highcharts>-->
          <div id="highchartsWordcloud1" style="width:100%;height:20%"></div>
        </Widget>
      </b-col>

      <b-col xs="12" lg="3">
        <Widget
            close collapse class="mr-5"
        >
          <h4 style="text-align: center">主题二 词云图</h4>
          <!--          &lt;!&ndash;          <h4>新冠肺炎确诊个案数趋势 (全国)</h4>&ndash;&gt;-->
          <!--          <p>数据来源：微博；时间跨度：22/1/2020 - 22/1/2021</p>-->
          <!--          <highcharts :options="trendData"></highcharts>-->
          <div id="highchartsWordcloud2" style="width:100%;height:100%;"></div>

        </Widget>
      </b-col>

      <b-col xs="12" lg="3">
        <Widget
            close collapse class="mr-5"
        >
          <h4 style="text-align: center">主题三 词云图</h4>
          <!--          &lt;!&ndash;          <h4>新冠肺炎确诊个案数趋势 (全国)</h4>&ndash;&gt;-->
          <!--          <p>数据来源：微博；时间跨度：22/1/2020 - 22/1/2021</p>-->
          <!--          <highcharts :options="trendData"></highcharts>-->
          <div id="highchartsWordcloud3" style="width:100%;height:100%;"></div>

        </Widget>
      </b-col>

      <b-col xs="12" lg="3">
        <Widget
            close collapse class="mr-5"
        >
          <h4 style="text-align: center">主题四 词云图</h4>
          <!--          &lt;!&ndash;          <h4>新冠肺炎确诊个案数趋势 (全国)</h4>&ndash;&gt;-->
          <!--          <p>数据来源：微博；时间跨度：22/1/2020 - 22/1/2021</p>-->
          <!--          <highcharts :options="trendData"></highcharts>-->
          <div id="highchartsWordcloud4" style="width:100%;height:100%;"></div>

        </Widget>
      </b-col>

      <b-col xs="12" lg="4">
        <Widget close collapse >
          <h4 style="text-align: center"> 阶段一 聚类图</h4>
<!--          <p>阶段一 时间跨度：22/1/2020 - 22/1/2021</p>-->
<!--          <highcharts :options="trendData"></highcharts>-->
          <img :src="cluster_image_1" width="100%" />
        </Widget>
      </b-col>

      <b-col xs="12" lg="4">
      <Widget close collapse >
          <h4 style="text-align: center"> 阶段二 聚类图 </h4>
<!--          <p>阶段二 时间跨度：22/1/2020 - 22/1/2021</p>-->
<!--          <highcharts :options="trendData"></highcharts>-->
        <img :src="cluster_image_2" width="100%" />

      </Widget>
      </b-col>

      <b-col xs="12" lg="4">
        <Widget close collapse >
          <h4 style="text-align: center"> 阶段三 聚类图 </h4>
<!--          <p>阶段三 时间跨度：22/1/2020 - 22/1/2021</p>-->
<!--          <highcharts :options="trendData"></highcharts>-->
          <img :src="cluster_image_3" width="100%" />
        </Widget>
      </b-col>

    </b-row>

    <b-row>
      <b-col xs="12" lg="4">
        <Widget
          close collapse
        >
          <h4 style="text-align: center"><b>互联网：市场“内卷”</b></h4>
<!--          <p>Analysis - <b>Confirmed Trend</b></p>-->
          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <p class="fw-normal">
              5月12日，某自媒体号发布《腾讯的背水一战》中“市场内卷”一词引起了不少网民的注意，此事后“内卷”的热度整体略有提升。
<!--              <mark><strong>2020年1月-2月期间</strong></mark>，-->
<!--              以及-->
<!--              <mark><strong>2021年1月左右</strong></mark>，-->
<!--              这也正是我国疫情在所研究的时间范围内最严重的两次。-->
            </p>
<!--            <p class="fw-normal">在这两次爆发点只间，也零星分布一些小的爆发。</p>-->
            <p>(张悦)</p>
          </div>
        </Widget>
      </b-col>

      <b-col xs="12" lg="4">
        <Widget
            close collapse
        >
          <h4 style="text-align: center"><b>高考出分和开学季：教育“内卷”</b></h4>
          <!--          <p>Analysis - <b>Confirmed Trend</b></p>-->
          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <p class="fw-normal">
              知乎话题“如何看待河北高考一分一档线理科600分排到三万多名？” 将“教育内卷化”带入人们的视野。
              “教育内卷”被运用到从幼儿园到大学毕业生，多元的关注群体使此阶段“内卷”的整体热度略有提升。
              <!--              <mark><strong>2020年1月-2月期间</strong></mark>，-->
              <!--              以及-->
              <!--              <mark><strong>2021年1月左右</strong></mark>，-->
              <!--              这也正是我国疫情在所研究的时间范围内最严重的两次。-->
            </p>
            <!--            <p class="fw-normal">在这两次爆发点只间，也零星分布一些小的爆发。</p>-->
            <p>(张悦)</p>
          </div>
        </Widget>
      </b-col>

      <b-col xs="12" lg="4">
        <Widget
            close collapse
        >
          <h4 style="text-align: center"><b>“内卷”的应用场景持续扩张</b></h4>
          <!--          <p>Analysis - <b>Confirmed Trend</b></p>-->

          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <p class="fw-normal">
              10月以后，“教育内卷”带来的“出圈”效果扩张了“内卷”的应用场景，
              整体热度维持在较高水平，热度最高峰和次高峰分别在10月23日和11月6日。
              <!--              <mark><strong>2020年1月-2月期间</strong></mark>，-->
              <!--              以及-->
              <!--              <mark><strong>2021年1月左右</strong></mark>，-->
              <!--              这也正是我国疫情在所研究的时间范围内最严重的两次。-->
            </p>
            <!--            <p class="fw-normal">在这两次爆发点只间，也零星分布一些小的爆发。</p>-->
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
import { fetchOnline } from '../fetch';
// 引入词云图需要的包
import Highcharts from "highcharts/highcharts";
import wordcloud from "highcharts/modules/wordcloud";
wordcloud(Highcharts);

export default {
  components: { Widget, highcharts: Chart },
  data: function() {
    return {
      trendData: {},
      cluster_image_1: null,
      cluster_image_2: null,
      cluster_image_3: null,
    }
  },

  methods: {
    getData: function() {
      this.cluster_image_1 = require('../../assets/figs/cluster/' + 'cluster_image_1.svg');
      this.cluster_image_2 = require('../../assets/figs/cluster/' + 'cluster_image_2.svg');
      this.cluster_image_3 = require('../../assets/figs/cluster/' + 'cluster_image_3.svg');
    },

    initHighCharts(graphTitle,color,data){
      Highcharts.chart(graphTitle, {
        // colors: ["#6A7AFE", "#9DBBEC", "#FFDB35", "#FFFFFF"],
        colors: [color],
        tooltip: {
          enabled: true
          // value: data.value
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
            maxFontSize: 5,//最大字体
            minFontSize: 2,//最小字体
            //点击事件
            events: {
              click: function() {}
            }
          }
        ]
      });
    }
  },

  mounted: function() {
    this.getData();
    var data =  [
      {name:"教育",value: "5329"},
      {name:"互联网",value:"1558"},
      {name:"华为",value:"836"},
      {name:"阿里",value:"572"},
      {name:"小镇做题家",value:"13980"},
      {name:"鸡娃",value:"572"},
      {name:"996",value:"13980"},
      {name:"奋斗",value:"1000"},
      {name:"努力",value:"200"},
      {name:"竞争",value:"100"}
    ]
    this.initHighCharts("highchartsWordcloud1","#2e52bf",data);
    this.initHighCharts("highchartsWordcloud2","#feb66a",data);
    this.initHighCharts("highchartsWordcloud3","#eea1ac",data)
    this.initHighCharts("highchartsWordcloud4","#6adbfe",data);

    //以下改为词云图
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
          }
        },
        function(err) {
          console.log('err', err);
        })
  }
};
</script>

<style scoped>
.page-nav{
  text-align: center;
  margin-top: 1px;
  padding-bottom: 1px;
  font-size: 12px
}
</style>