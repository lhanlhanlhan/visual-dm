<template>
  <div>
    <h1 class="page-title">
      <b>「内卷」到底是怎么火起来的？</b>
    </h1>
    <b-row>
      <b-col xs="12" lg="7">
        <!-- 热度趋势图 -->
        <Widget collapse>
          <div class="d-flex align-items-center">
            <div class="mr-5">
              <h4>「内卷」微博热度-时间</h4>
              <p>数据来源：微博；时间跨度：2017-03-20 - 2021-05-04</p>
            </div>
            <!-- 旋转圈 -->
            <div class="spinner-border" role="status" v-if="!ready">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <highcharts v-if="ready" :options="trendData" style="height: 300px;"></highcharts>
          <!-- 分析 -->
          <h4 class="mt-5">热度波峰与热议事件对照表</h4>
          <p>整理人：张悦</p>
          <div class="widget-table-overflow">
            <div class="table-responsive">
              <table class="table table-hover fw-normal">
                <thead>
                  <tr>
                    <th>时间</th>
                    <th>热议的事件</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2020 年 5 月</td>
                    <td>某自媒体号发布《腾讯的背水一战》中<mark><strong>「市场内卷」</strong></mark>一词引起了不少网民的注意，
              此事后「内卷」的热度开始提升。</td>
                  </tr>
                  <tr>
                    <td>2020 年 6-8 月</td>
                    <td>
                      伴随高考、保研以及开学季，
                      「内卷」话题持续保持热度。
                      知乎话题「如何看待河北高考一分一档线理科600分排到三万多名？」
                      将<mark><strong>「教育内卷化」</strong></mark>带入人们的视野。
                    </td>
                  </tr>
                  <tr>
                    <td>2020 年 9 月底</td>
                    <td>
                      <mark><strong>「小镇做题家」</strong></mark>这一群体「破圈」，引发不少共鸣。
              随着讨论升温，「教育内卷」被运用到从幼儿园到大学毕业生，
              多元的关注群体使此阶段「内卷」的整体热度再次提升。
                    </td>
                  </tr>
                  <tr>
                    <td>2020 年 10 月</td>
                    <td>
                      澎湃新闻网发布《十三邀》栏目
              对牛津大学人类学教授<mark><strong>项飙</strong></mark>专访的关于「内卷」的部分内容。
                    </td>
                  </tr>
                  <tr>
                    <td>2020 年 11 月</td>
                    <td>
                      中国青年网刊登北京航空航天大学副教授《<mark><strong>年轻人为何会有内卷情绪？</strong></mark>》一文
              以及《「卷人」不该是年轻的唯一样态》一文。
                    </td>
                  </tr>
                  <tr>
                    <td>2020 年 12 月</td>
                    <td>
                      《咬文嚼字》杂志编辑部发布<mark><strong>2020年度十大流行语</strong></mark>：「内卷」位列其中。
                    </td>
                  </tr>
                  <tr>
                    <td>2021 年 3 月</td>
                    <td>
                      GQ杂志专访学者林西（化名）时，谈到<mark><strong>偶像工业</strong></mark>内卷话题。
                    </td>
                  </tr>
                  <tr>
                    <td>2021 年 4 月</td>
                    <td>
                      <mark><strong>电视剧《小舍得》</strong></mark>播出，掀起一波<mark><strong>「教育内卷」</strong></mark><mark><strong>「鸡娃」</strong></mark>等热词的讨论。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p>(上述内容不代表本组立场)</p>
        </Widget>
      </b-col>
      <b-col xs="12" lg="5">
        <!-- 问题引入 -->
        <Widget collapse>
          <h4><b>问题引入</b></h4>
          <p>「内卷」的起源与演化</p>
            <p class="fw-normal">
              「内卷」本是一个<mark><strong>人类学术语</strong></mark>，
              最早是人类学家格尔茨通过对爪哇岛的农业经济的总结提出，
              用于描述农耕社会农耕经济越来越精细化，
              但却没有重大突破的现象。
              这个概念被引申为<mark><strong>描述一个社会或组织既无突变式发展</strong></mark>，
              而只是在一个简单层次上自我重复。
            </p>
            <p class="fw-normal">
              而现在，「内卷」则意味着<mark><strong>「白热化的竞争」</strong></mark>，
              人们在日常生活的方方面面拼尽全力，
              以使自己在社会上获取少量竞争优势，
              挤占他人的生存空间，
              同时造成<mark><strong>精神内耗和浪费</strong></mark>。
              「内卷」的使用场景至今仍在不断扩大，
              甚至于网民纷纷感慨「<mark><strong>万物皆可卷</strong></mark>」。
            </p>
            <p class="fw-normal">
              那么，「内卷」到底是怎么火起来的？
            </p>
        </Widget>
        <!-- 发博频次 -->
        <Widget collapse>
          <h4><b>各时间段微博频次 (日均)</b></h4>
          <p>时间分段长度：1h</p>
          <highcharts v-if="readyHotDist" :options="hotDistChart" style="height: 300px;"></highcharts>
          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <p class="fw-normal">
              从一天中的微博热度分布可以看到，
              晚上 <mark><strong>22:00</strong></mark> 左右出现峰值，
              可能原因是「打工人」996工作制，大多数十点下班，
              可能在以下2种场景发微博：
            </p>
            <p class="fw-normal">
              1. 「被加班」到了22:00才下班，<mark><strong>发条微博吐槽</strong></mark>
            </p>
            <p class="fw-normal">
              2. 本来22:00能下班，<mark><strong>突然被要求加班；开始加班前，发条微博吐槽</strong></mark>
            </p>
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
import { fetchOnline } from '../fetch';

export default {
  components: { Widget, highcharts: Chart },
  data: function() {
    return {
      trendData: {},
      hotDistChart: {},
      ready: false,
      readyHotDist: false,
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
          that.trendData = makeTrend(series, "", null, "#d84315");
          that.ready = true;
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
          that.hotDistChart = makeBar(series, "", '', times, "该时间段内的微博数", "#537385");
          that.readyHotDist = true;
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
