<template>
  <div>
    <h1 class="page-title">
      <b>当我们在讨论「内卷」时，都在讨论些什么？</b>
    </h1>
    <b-row>
      <b-col xs="12" lg="4">
        <Widget collapse>
          <h4 style="text-align: center">阶段 1：2020/2/4 - 2020/3/2</h4>
          <img :src="cluster_image_1" width="100%" />
        </Widget>
      </b-col>

      <b-col xs="12" lg="4">
        <Widget collapse>
          <h4 style="text-align: center">阶段 2：2020/6/1 - 2020/8/29</h4>
          <img :src="cluster_image_2" width="100%" />
        </Widget>
      </b-col>

      <b-col xs="12" lg="4">
        <Widget collapse>
          <h4 style="text-align: center">阶段 3：2020/8/30 - 2021/5/9</h4>
          <img :src="cluster_image_3" width="100%" />
        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12" lg="3">
        <Widget collapse>
          <h4
            style="text-align: center; font-size: 20px; color: #2e52bf"
          >
            ■ 话题一 : 职场
          </h4>
          <highcharts v-if="ready" :options="highchartsWordcloud1"></highcharts>
          <div>
            <p>
              <strong>打工人</strong> :
              互联网、金融等高压行业，加班和996常态化，对行业内卷化的吐槽
            </p>
            <p>
              <strong>女性</strong> :
              <a href="https://www.sohu.com/a/444765810_515203">
                ”重男轻女“ -> "只招男性" -> ”大龄女青年“ -> "家庭主妇”</a
              >
            </p>
          </div>
        </Widget>
      </b-col>
      <b-col xs="12" lg="3">
        <Widget collapse>
          <h4
            style="text-align: center; font-size: 20px; color: #feb66a"
          >
            ■ 话题二 : 校园
          </h4>
          <highcharts v-if="ready" :options="highchartsWordcloud2"></highcharts>
          <div>
            <p>
              <strong>大学生</strong> :
              无论是对于作业or考试的吐槽，不过是在为“保研、考研、出国”三条路而忙的焦头烂额
            </p>
          </div>
        </Widget>
      </b-col>
      <b-col xs="12" lg="3">
        <Widget collapse>
          <h4
            style="text-align: center; font-size: 20px; color: #5fd1f3"
          >
            ■ 话题三 : 市场
          </h4>
          <highcharts v-if="ready" :options="highchartsWordcloud3"></highcharts>
          <div>
            <p>
              <strong>企业</strong>:
              后疫情时代下的经济格局变化，企业在市场中的份额竞争。
              在阶段3出现较多讨论的原因: ①疫情开始对全球市场产生影响
              ②"2021年5月1日的巴菲特股东大会"
            </p>
          </div>
        </Widget>
      </b-col>
      <b-col xs="12" lg="3">
        <Widget collapse>
          <h4
            style="text-align: center; font-size: 20px; color: #eea1ac"
          >
            ■ 话题四 : 思考
          </h4>
          <highcharts v-if="ready" :options="highchartsWordcloud4"></highcharts>
          <div>
            <p>
              <strong>大家</strong> :
              人生、意义、个人、社会、自由、赛道等词汇的频率较高，说明对"内卷"现象的本质和应对策略的更深度的思考，而非停留在对表面现象的吐槽，
            </p>
          </div>
        </Widget>
      </b-col>
      <!--        </div>-->
    </b-row>

    <b-row>
      <b-col>
        <Widget collapse>
          <h4 style="text-align: center">延伸</h4>
          <div
            class="widget-padding-md w-100 h-100 text-left border rounded"
          >
            <p>
              在<strong>大学</strong>里，作为<strong>学生</strong>的我们，更多的"内卷"焦虑来源于<strong>毕业</strong>去向
              (
              <strong>研究生</strong>、
              <strong>工作</strong>
              )
              ，或来源于<strong>优秀</strong>的同龄人(<strong>同学</strong>、<strong>朋友</strong>)，
              如何面对焦虑，<strong>词云图</strong>中或许有一些答案:
            </p>
            <p>
              1.
              <strong>想要</strong
              >：总的来说，“内卷”焦虑来源于外界<strong>压力</strong>，外界的变化 (
              比如<strong>疫情</strong> ) 是无法掌控的，
              但自己的<strong>选择</strong>是可以把握的，通过尝试和<strong>思考</strong>，清晰<strong>自我</strong>认知，而不是被外界的各种力量拉向随波逐流的泥潭
              ，在跟着大家一起参与一场“就算<strong>拼命</strong>卷赢了也不是自己<strong>想要</strong>”的内卷。
              当做一件事情的动力源于<strong>自我</strong>的某种坚持，而非外界力量的驱动，内心会格外平静，不会因外界的变化而有太多波动。
            </p>
            <p>
              2.<strong> 价值</strong
              >、<strong>意义</strong>与<strong>影响</strong>:
              关注事情的“价值”、“意义”和“影响”，于<strong>个人</strong>也好，于<strong>社会</strong>也好，
              ,因为兴趣是在变化的，你所<strong>想要</strong>的东西，可能不是你一直想要的。
              但如果一件事情有<strong>价值</strong>，有<strong>意义</strong>，能对<strong>世界</strong>有哪怕是一点微弱的<strong>影响</strong>，或许是你在某个内卷<strong>专业</strong>或者
              <strong>行业</strong> 坚持下去的更持久的动力
            </p>

            <p>
              3.<strong> 生活</strong
              >、<strong>目标</strong>与<strong>人生</strong>: To Write
            </p>

            <p>4.<strong> 奋斗 </strong>与<strong>努力</strong>: To Write</p>

            <p align="right">By 张悦</p>
          </div>
        </Widget>
      </b-col>
    </b-row>

    <!--    </b-row>-->
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { Chart } from "highcharts-vue";
//import { makeTrend } from '../trends';
//import { fetchOnline } from '../fetch';
// 引入词云图需要的包
import Highcharts from "highcharts/highcharts";
import wordcloud from "highcharts/modules/wordcloud";
wordcloud(Highcharts);

export default {
  components: { Widget, highcharts: Chart },
  data: function () {
    return {
      trendData: {},
      cluster_image_1: null,
      cluster_image_2: null,
      cluster_image_3: null,
    };
  },

  methods: {
    getData: function () {
      this.cluster_image_1 = require("../../assets/figs/cluster/Phase_1.png");
      this.cluster_image_2 = require("../../assets/figs/cluster/Phase_2.png");
      this.cluster_image_3 = require("../../assets/figs/cluster/Phase_3.png");
    },

    initTotalHighCharts(graphTitle, data) {
      Highcharts.chart(graphTitle, {
        colors: ["#6A7AFE", "#9DBBEC", "#FFDB35", "#FFFFFF"],
        // colors: [color],
        tooltip: {
          enabled: true,
          // value: data.value
        },
        chart: {
          plotBackgroundColor: null,
          backgroundColor: null,
        },
        title: {
          text: null,
        },
        credits: {
          enabled: false, // 禁用版权信息
        },
        exporting: { enabled: false },
        series: [
          {
            type: "wordcloud",
            data: data,
            cursor: "pointer",
            rotation: {
              from: 0,
              to: 0,
              orientations: 5,
            },
            maxFontSize: 10, //最大字体
            minFontSize: 4, //最小字体
            //点击事件
            events: {
              click: function () {},
            },
          },
        ],
      });
    },

    initHighCharts(color, data) {
      return {
        // colors: ["#6A7AFE", "#9DBBEC", "#FFDB35", "#FFFFFF"],
        colors: [color],
        tooltip: {
          enabled: true,
          // value: data.value
        },
        chart: {
          plotBackgroundColor: null,
          backgroundColor: null,
        },
        title: {
          text: null,
        },
        credits: {
          enabled: false, // 禁用版权信息
        },
        exporting: { enabled: false },
        series: [
          {
            type: "wordcloud",
            data: data,
            cursor: "pointer",
            rotation: {
              from: 0,
              to: 0,
              orientations: 5,
            },
            maxFontSize: 10, //最大字体
            minFontSize: 4, //最小字体
            //点击事件
            events: {
              click: function () {},
            },
          },
        ],
      };
    },
  },

  mounted: function () {
    this.getData();
    var data1 = [
      { name: "社会", weight: 1.0 },

      { name: "工作", weight: 0.9 },
      { name: "中国", weight: 0.9 },
      { name: "孩子", weight: 0.9 },
      { name: "问题", weight: 0.9 },
      { name: "生活", weight: 0.9 },

      { name: "女性", weight: 0.8 },
      { name: "竞争", weight: 0.8 },
      { name: "教育", weight: 0.8 },
      { name: "世界", weight: 0.8 },

      { name: "企业", weight: 0.75 },
      { name: "行业", weight: 0.75 },
      { name: "互联网", weight: 0.75 },
      { name: "时代", weight: 0.75 },
      { name: "选择", weight: 0.75 },
      { name: "国家", weight: 0.75 },

      { name: "加班", weight: 0.7 },
      { name: "压力", weight: 0.7 },
      { name: "能力", weight: 0.7 },
      { name: "资源", weight: 0.7 },
      { name: "家长", weight: 0.7 },
      { name: "市场", weight: 0.7 },
      { name: "奋斗", weight: 0.7 },
      { name: "个人", weight: 0.7 },

      { name: "资本", weight: 0.6 },
      { name: "意义", weight: 0.6 },
      { name: "机会", weight: 0.6 },
      { name: "环境", weight: 0.6 },
      { name: "家庭", weight: 0.6 },
      { name: "同学", weight: 0.6 },
      { name: "想要", weight: 0.6 },
      { name: "价值", weight: 0.6 },
    ];
    var data2 = [
      { name: "工作", weight: 1.0 },
      { name: "社会", weight: 0.9 },
      { name: "生活", weight: 0.9 },
      { name: "学习", weight: 0.9 },
      { name: "竞争", weight: 0.9 },

      { name: "学校", weight: 0.8 },
      { name: "学生", weight: 0.8 },
      { name: "朋友", weight: 0.8 },
      { name: "大学", weight: 0.8 },

      { name: "人生", weight: 0.75 },
      { name: "北京", weight: 0.75 },
      { name: "专业", weight: 0.75 },
      { name: "时代", weight: 0.75 },
      { name: "压力", weight: 0.75 },
      { name: "年轻人", weight: 0.75 },
      { name: "考研", weight: 0.75 },
      { name: "小时", weight: 0.75 },
      { name: "想要", weight: 0.75 },

      { name: "影响", weight: 0.7 },
      { name: "实习", weight: 0.7 },
      { name: "同学", weight: 0.7 },
      { name: "准备", weight: 0.7 },
      { name: "父母", weight: 0.7 },
      { name: "作业", weight: 0.7 },
      { name: "成长", weight: 0.7 },
      { name: "毕业", weight: 0.7 },
      { name: "关系", weight: 0.7 },

      { name: "奋斗", weight: 0.6 },
      { name: "目标", weight: 0.6 },
      { name: "思考", weight: 0.6 },
      { name: "考试", weight: 0.6 },
      { name: "研究生", weight: 0.6 },
    ];
    var data3 = [
      { name: "地主", weight: 1.0 },

      { name: "疫情", weight: 0.9 },
      { name: "银行", weight: 0.9 },
      { name: "全球", weight: 0.9 },
      { name: "估值", weight: 0.9 },
      { name: "拼命", weight: 0.9 },
      { name: "资产", weight: 0.9 },

      { name: "泡沫", weight: 0.8 },
      { name: "方式", weight: 0.8 },
      { name: "中国", weight: 0.8 },
      { name: "选择", weight: 0.8 },
      { name: "利率", weight: 0.8 },
      { name: "过剩", weight: 0.8 },

      { name: "产业链", weight: 0.7 },

      { name: "农民", weight: 0.7 },
      { name: "抛售", weight: 0.7 },
      { name: "美国", weight: 0.7 },
      { name: "影响", weight: 0.7 },
      { name: "韭菜", weight: 0.7 },
      { name: "发展", weight: 0.7 },
      { name: "价值", weight: 0.7 },
      { name: "逻辑", weight: 0.7 },
      { name: "芒格", weight: 0.7 },
      { name: "航空公司", weight: 0.7 },

      { name: "市场", weight: 0.6 },
      { name: "投资", weight: 0.6 },
      { name: "下跌", weight: 0.6 },
      { name: "市场", weight: 0.6 },
      { name: "停滞", weight: 0.6 },
    ];

    var data4 = [
      { name: "工作", weight: 1.0 },

      { name: "问题", weight: 0.9 },
      { name: "社会", weight: 0.9 },
      { name: "生活", weight: 0.9 },
      { name: "后浪", weight: 0.9 },

      { name: "自我", weight: 0.8 },
      { name: "生活", weight: 0.8 },
      { name: "30", weight: 0.8 },
      { name: "社会", weight: 0.8 },

      { name: "焦虑", weight: 0.75 },
      { name: "努力", weight: 0.75 },
      { name: "喜欢", weight: 0.75 },
      { name: "学校", weight: 0.75 },
      { name: "老师", weight: 0.75 },
      { name: "希望", weight: 0.75 },
      { name: "选择", weight: 0.75 },
      { name: "今天", weight: 0.75 },

      { name: "加班", weight: 0.7 },
      { name: "拱墅区", weight: 0.7 },
      { name: "高考", weight: 0.7 },
      { name: "人生", weight: 0.7 },
      { name: "面试", weight: 0.7 },
      { name: "学习", weight: 0.7 },

      { name: "趋势", weight: 0.7 },

      { name: "朋友", weight: 0.6 },
      { name: "快乐", weight: 0.6 },
      { name: "教育", weight: 0.6 },
      { name: "竞争", weight: 0.6 },
      { name: "意义", weight: 0.6 },
      { name: "最近", weight: 0.6 },

      { name: "时代", weight: 0.4 },
      { name: "疫情", weight: 0.4 },
      { name: "分钟", weight: 0.4 },
      { name: "机会", weight: 0.4 },
      { name: "个人", weight: 0.4 },
      { name: "思考", weight: 0.4 },
      { name: "自由", weight: 0.4 },
      { name: "赛道", weight: 0.4 },
      { name: "无法", weight: 0.4 },
      { name: "永远", weight: 0.4 },
      { name: "目标", weight: 0.4 },
      { name: "梦想", weight: 0.4 },
      { name: "优秀", weight: 0.4 },
    ];

    this.highchartsWordcloud1 = this.initHighCharts("#2e52bf", data1);
    this.highchartsWordcloud2 = this.initHighCharts("#feb66a", data2);
    this.highchartsWordcloud3 = this.initHighCharts("#5fd1f3", data3);
    this.highchartsWordcloud4 = this.initHighCharts("#eea1ac", data4);

    this.ready = true;
  },
};
</script>

<style scoped>
.page-nav {
  text-align: center;
  margin-top: 1px;
  padding-bottom: 1px;
  font-size: 12px;
}
</style>