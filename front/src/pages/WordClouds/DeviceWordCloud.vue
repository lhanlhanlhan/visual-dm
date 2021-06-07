<template>
  <div>
    <h1 class="page-title">
      <b>谁在讨论「内卷」？</b>
    </h1>
<!--    <p>Trends - <b>Confirmed Cases</b></p>-->
    <b-row>
      <b-col xs="12" lg="4">
        <Widget collapse>
          <h4 style="text-align: center">发布设备</h4>
<!--          <p>数据来源：微博；时间跨度：22/1/2020 - 22/1/2021</p>-->
<!--          <highcharts :options="trendData"></highcharts>-->
          <div id="DeviceWordCloud" style="width:100%;height:100%;"></div>
        </Widget>
      </b-col>
        <b-col xs="12" lg="4">

        <Widget collapse>
          <h4 style="text-align: center">发布位置</h4>
          <!--          <p>数据来源：微博；时间跨度：22/1/2020 - 22/1/2021</p>-->
          <!--          <highcharts :options="trendData"></highcharts>-->
          <div id="CityWordCloud" style="width:100%;height:100%;"></div>
        </Widget>
      </b-col>
        <b-col xs="12" lg="4">

        <Widget collapse>
          <h4 style="text-align: center">微博内容</h4>
          <!--          <p>数据来源：微博；时间跨度：22/1/2020 - 22/1/2021</p>-->
          <!--          <highcharts :options="trendData"></highcharts>-->
          <div id="ProfessionWordCloud" style="width:100%;height:100%;"></div>
        </Widget>
      </b-col>

      <b-col xs="12" lg="3">
        <Widget collapse>
          <h4 style="text-align: center"><b>粉丝</b></h4>
          <h5 style="text-align: center"><b>「除了工作之外，我们连追星都在内卷」</b></h5>
          <div class="widget-padding-md w-100 h-100 text-left border rounded" style="font-size:20px">
            <img :src="persona_fans" width="100%" />
          </div>
          <p class="fw-normal mt-3">
            娱乐圈的内卷，既有内在身份、财富、阶层的多方位卷，而更大一部分原因，是真的有人愿意他们这样“卷”下去，对粉丝而言，我的爱豆榜单遥遥领先，多才多艺，貌美帅气，他们是真正为艺术为世界而生，我是为爱豆而生。
            有人说：“有的时候就感觉自己被道德绑架一样，你喜欢他就必须去支持他的代言或者就要去为他打榜，就有些人就觉得自己是饭圈主导一样，难道我就想开开心心追星不行吗？”
          </p>
        </Widget>
      </b-col>

      <b-col xs="12" lg="3">
        <Widget collapse>
          <h4 style="text-align: center"><b>打工人</b></h4>
          <h5 style="text-align: center"><b>「让你加班的不是老板，而是其他愿意加班的人」</b></h5>
          <div class="widget-padding-md w-100 h-100 text-left border rounded" style="font-size:20px">
            <img :src="persona_996" width="100%" />
          </div>
          <p class="fw-normal mt-3">
            现实生活中，总有响应职场996号召的“劳模”。他们每天熬夜、牺牲周末，通过“疯狂加班”来获得领导的肯定。表面上埋头苦干，实则效率低下。
            这些“形式主义奋斗者”打破了原有的工作模式。其他人为了在表现上过得去，也开始加班。久而久之，到了下班点却没有一个人离开，大家都选择“同甘共苦，继续奋战”。
            然而，与自愿加班不同，内卷状态下加班的职场人陷入了低效重复的怪圈。
          </p>
        </Widget>
      </b-col>

      <b-col xs="12" lg="3">
        <Widget collapse>
          <h4 style="text-align: center"><b>大学生</b></h4>
          <h5 style="text-align: center"><b>「绩点不满3.95不改名」</b></h5>
          <div class="widget-padding-md w-100 h-100 text-left border rounded" style="font-size:20px">
            <img :src="persona_student" width="100%" />
          </div>
          <p class="fw-normal mt-3">
            大学生内卷最早的出处是几张名校学霸的图片，这些图片最早在清华北大的学霸之间流传。
            图片的内容均是与学习相关，有的人在宿舍床上堆满了书；有的人骑在自行车上看书；有的人甚至边骑车边端着电脑写论文。
            然而，随着社会竞争的加剧，这样的现象也不仅仅只是存在国内的顶尖高校之中，其逐渐演变成为了一种普遍现象。因此，网络上也经常有大学生自嘲：”卷“不动了！
          </p>
        </Widget>
      </b-col>

      <b-col xs="12" lg="3">
        <Widget collapse>
          <h4 style="text-align: center"><b>家长</b></h4>
          <h5 style="text-align: center"><b>「再不学就跟不上了」</b></h5>
          <div class="widget-padding-md w-100 h-100 text-left border rounded" style="font-size:20px">
            <img :src="persona_parents" width="100%" />
          </div>
          <p class="fw-normal mt-3">
            越来越多的父母们为孩子投入大量时间、精力和金钱，从幼儿园，哦不，从早教起步，便开启了一场漫长而看不到尽头的凡人间的军备赛。
            曾经有一个段子刷爆朋友圈。有网友提问：孩子4岁，英语词汇量只有1500左右，是不是不太够？回答：在美国肯定是够了，在海淀肯定是不够。
          </p>

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
      persona_fans: null,

    }
  },
  methods: {
    initHighCharts(graphTitle,data){
      Highcharts.chart(graphTitle, {
        colors: ["#0dbd20", "#f6ea0b", "rgba(246,149,1,0.73)", "rgba(43,102,205,0.71)"],
        tooltip: {
          // enabled: true
          // headerFormat: '<b>{data.name}</b><br>',
          // pointFormat: '{pointer.name},{pointer.value}'
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
            maxFontSize: 10,//最大字体
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

    this.persona_fans = require('../../assets/figs/persona/' + 'fans.jpeg');
    this.persona_996 = require('../../assets/figs/persona/' + '996.jpg');
    this.persona_parents  = require('../../assets/figs/persona/' + 'parents2.jpg');
    this.persona_student  = require('../../assets/figs/persona/' + 'student.jpg');

    let operation = 'national/numbers/summary?start=2020-01-22&end=2021-01-22';
    let that = this;
    // var data=[('华为', 52899), ('超话', 496693), ('微博国际版', 35574), ('android', 92), ('小米', 5745), ('vivo', 2472), ('oppo', 5703), ('iPhone', 543627), ('微博网页版', 473772)]
    var data =  [
      {name: "华为",weight: "5329"},
      {name:"超话",weight:"496693"},
      {name:"微博国际版",weight:"35574"},
      {name:"android",weight:"92"},
      {name:"小米",weight:"5745"},
      {name:"vivo",weight:"2472"},
      {name:"oppo",weight:"5703"},
      {name:"iPhone",weight:"543627"},
      {name:"微博网页版",weight:"473772"},
    ]

    var profession_data=
        [
      {'name': '孩子', 'weight': 53.049119900389066},
      {'name': '老师', 'weight': 34.74678683520338},
      {'name': '行业', 'weight': 34.060487998369375},
      {'name': '公司', 'weight': 33.83424184448656},
      {'name': '学生', 'weight': 27.551077602413837},
      {'name': '学校', 'weight': 25.818378400688736},
      {'name': '女性', 'weight': 24.781114435786243},
      {'name': '大学', 'weight': 23.008456087278013},
      {'name': '专业', 'weight': 21.951697486857064},
      {'name': '家长', 'weight': 19.48957082594412},
     {'name': '企业', 'weight': 19.164533692262697},
      {'name': '互联网', 'weight': 19.157749215611805},
    {'name': '家庭', 'weight': 14.991879134625558},
    {'name': '作业', 'weight': 14.537393474982633},
    {'name': '同学', 'weight': 14.478948547938858},
    {'name': '毕业', 'weight': 14.299960674193061},

    ]

    var city_data=
        [{'name': '北京', 'weight': 1.0},
          {'name': '上海', 'weight': 0.7932372431202643},
          {'name': '南京', 'weight': 0.49280449446438784},
          {'name': '校区', 'weight': 0.4785459043558068},
          {'name': '杭州', 'weight': 0.3775583287001283},
          {'name': '成都', 'weight': 0.3773929053731587},
          {'name': '武汉', 'weight': 0.3737904444564886},
          {'name': '深圳', 'weight': 0.34535767217268376},
          {'name': '大学', 'weight': 0.34344753801124406},
          {'name': '西安', 'weight': 0.28219171187113656},
          {'name': '天津', 'weight': 0.243144551928188},
          {'name': '广州', 'weight': 0.23183848481176816},
          {'name': '重庆', 'weight': 0.17235626157222658},
          {'name': '济南', 'weight': 0.1384101144691715},
          {'name': '哈尔滨', 'weight': 0.13541254097313557},
          {'name': '青岛', 'weight': 0.1332241010509434},
          {'name': '学院', 'weight': 0.1266723613063657},
          {'name': '广场', 'weight': 0.12598291644232756},
          {'name': '国际', 'weight': 0.12162019081586943},
          {'name': '厦门', 'weight': 0.11983114959553663}]

    this.initHighCharts("DeviceWordCloud",data);
    this.initHighCharts("CityWordCloud",city_data);
    this.initHighCharts("ProfessionWordCloud",profession_data);

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
        that.trendData = makeTrend(series, "微博热度趋势图", null, "#9DC7F1");
      }
    },
    function(err) {
      console.log('err', err);
    })
  }
};
</script>
