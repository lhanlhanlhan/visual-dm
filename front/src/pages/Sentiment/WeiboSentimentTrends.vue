<template>
  <div>
    <h1 class="page-title">
      <b>讨论“内卷”背后的心态</b>
    </h1>
    <!--    <p>Trends - <b>Confirmed Cases</b></p>-->
    <b-row>
      <b-col xs="12" lg="8">
        <Widget collapse>
          <highcharts :options="sentimentBars" style="height: 500px;"></highcharts>
          <!-- 数据集说明 -->
          <p class="fw-normal">
            <b-badge variant="warning" class="text-white">
              注
            </b-badge>
            我们将时间线分为5个阶段。
            <mark><strong>阶段1</strong></mark>为2020年2月4日至5月9日，是高中生备考高考过程中的的主要阶段。
            <mark><strong>阶段2</strong></mark>为2020年5月9日至6月9日，包括高考及其之前1个月。
            <mark><strong>阶段3</strong></mark>为2020年6月9日至11月30日，包括高考录取及考研准备过程中的主要阶段。
            <mark><strong>阶段4</strong></mark>为2020年11月30日至12月30日，包括考研全国统考及其之前1个月。
            <mark><strong>阶段5</strong></mark>为2020年12月30日至今年5月9日，包括推免及国外高校发放Offer等多个颇具竞争压力的事件
          </p>
        </Widget>
      </b-col>

      <b-col xs="12" lg="4">
        <Widget collapse>
          <h4>所有微博情感分布图</h4>
          <p>微博总数：305,654条</p>
          <highcharts :options="sentimentChart"></highcharts>
          <p class="fw-normal">
            <b-badge variant="warning" class="text-white">
              注
            </b-badge>
            我们使用预训练的Transformer模型对所有爬取到的微博进行情感分类 (5类)，结果显示“乐观”的数据占比较大 (80% 左右)。
          </p>
        </Widget>
        <Widget collapse>
          <h4>阶段微博分布图</h4>
          <p>微博总数：305,654条；分为5个阶段</p>
          <highcharts :options="weiboPie"></highcharts>
        </Widget>
      </b-col>

      <b-col xs="12" lg="12">
        <Widget collapse>
          <h4>分析 - <b>微博情感</b></h4>
          <p>Analysis - <b>Sentiments of Weibos</b></p>
          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <p class="fw-normal">
              xxxxxx
            </p>
            <p class="fw-normal">
              xxxxxx
            </p>
            <p>(xxx)</p>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { Chart } from "highcharts-vue";
import { makeMultiBar } from "../multibar";
import { pieChart } from '../pie';

export default {
  components: { Widget, highcharts: Chart },
  data: function () {
    return {
      sentimentBars: {},
      sentimentChart: {},
      weiboPie: {},
    };
  },
  mounted: function () {
    // 情感分析数据
    let senti = {
      比较不乐观: [
        6.6451149425287355,
        7.7949586951916965,
        7.800673132908247,
        8.017341788533713,
        9.157943862924196,
      ],
      可能不乐观: [
        2.9094827586206895,
        2.9972463461131116,
        3.41962878282233,
        5.202536560113886,
        4.270951396759784,
      ],
      中等: [
        6.716954022988506,
        6.471086634187672,
        7.1857648011133675,
        8.153228937491912,
        8.587239149276618,
      ],
      可能乐观: [
        29.274425287356323,
        35.40563439949163,
        33.919366062172486,
        39.4331564643458,
        35.52370158010534,
      ],
      比较乐观: [
        54.45402298850575,
        47.331073925015886,
        47.67456722098357,
        39.193736249514686,
        42.460164010934065,
      ],
    };
    let allSentiDist = [14564, 6817, 13593, 60897, 77639];
    let allWeiboDist = [
      ['阶段1', 2784], 
      ['阶段2', 9442], 
      ['阶段3', 70417], 
      ['阶段4', 15454], 
      ['阶段5', 74995]
    ];

    let sentiArr = [];
    let sentiDistArr = [];
    let emotions = ['比较不乐观', '可能不乐观', '中等', '可能乐观', '比较乐观'];
    let colours = ['#E78C3B', '#D7AC4A', '#6C2922', '#348243', '#537385', '#2A8473', '#295AA2'];
    for (let ii = 0; ii < emotions.length; ii++) {
      let sentiType = emotions[ii];
      let sentiSegments = senti[sentiType];
      sentiArr.push({
        name: sentiType,
        data: sentiSegments,
        color: colours[ii]
      });
      sentiDistArr.push([emotions[ii], allSentiDist[ii]]);
    }
    // 制作条形图
    this.sentimentBars = makeMultiBar(sentiArr, 
                                      '微博情感按阶段分布图', 
                                      '数据源：微博；时间跨度：2020-02-04 - 2021-05-09', 
                                      ['阶段1', '阶段2', '阶段3', '阶段4', '阶段5'],
                                      '属于该等情感的微博占该阶段总微博的比例 (%)');
    // 制作饼图
    this.sentimentChart = pieChart(sentiDistArr, '微博数', 140);
    this.weiboPie = pieChart(allWeiboDist, '微博数', 140);
  },
};
</script>
