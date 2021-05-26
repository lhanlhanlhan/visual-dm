<template>
  <div>
    <h1 class="page-title">
      疫情地图 - <b>全国</b>
    </h1>
    <b-row>
      <b-col xs="12" lg="8">
        <Widget
          close collapse
        >
          <div class="d-flex align-items-center">
            <div class="mr-5">
              <h4>全国疫情地图</h4>
              <p>数据来源：丁香园；分级：7 级</p>
            </div>
            <!-- 旋转圈 -->
            <div class="spinner-border" role="status" v-if="!ready">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-if="ready">
            <!-- 日期选择器 -->
            <b-row class="mt mb">
              <b-col class="col-5">
                <b-form-group 
                  label-cols="1" label-cols-lg="2"
                  label="开始" label-for="start-picker">
                  <b-form-datepicker 
                    id="start-picker"
                    variant="default" class="mr-3"
                    v-model="startDate" 
                    min="2020-01-22" :max="endDate" 
                    locale="zh"
                    @input="onDateChanged()">
                  </b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col class="col-5">
                <b-form-group 
                  label-cols="1" label-cols-lg="2"
                  label="结束" label-for="end-picker">
                  <b-form-datepicker 
                    id="end-picker"
                    variant="default" class="mr-3"
                    v-model="endDate" 
                    :min="startDate" max="2021-01-22" 
                    locale="zh"
                    @input="onDateChanged()">
                  </b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col class="col-2">
                <b-button 
                variant="inverse" class="mr-3" size="sm"
                @click="startStopClicked()">
                  开始/停止
                </b-button>
              </b-col>
            </b-row>
            <!-- 进度条 -->
            <b-form-input 
            v-model="rangeVal" 
            type="range" 
            min="0" 
            :max="timeLine.length - 1" 
            @change="onRangeChanged()"></b-form-input>
            <!-- tab -->
            <b-tabs v-if="dataOK">
              <b-tab 
              v-for="(dataSource, dsIdx) in dataSources"
              :key="dsIdx"
              :title="dataSource.name"
              >
                <div v-if="dataOK[dsIdx]">
                  <!-- chart -->
                  <highcharts
                    :constructor-type="'mapChart'" 
                    :options="mapProperty[dataSource.select]" 
                    style="height: 600px;"/>
                </div>
              </b-tab>
            </b-tabs>
            <!-- 脚注 -->
            <b-row class="mt">
              <b-col class="col-10">
                <p>时间跨度：{{ startDate }} - {{ endDate }}</p>
              </b-col>
            </b-row>
          </div>
        </Widget>
      </b-col>
      <b-col xs="12" lg="4">
        <Widget
          close collapse
        >
          <h4>分析 - <b>确诊病例</b></h4>
          <p>Analysis - <b>Confirmed Count</b></p>
          <div class="widget-padding-md w-100 h-100 text-left border rounded">
            <p class="fw-normal">
              可以看到，确诊人数的两次爆发点分别在
              <mark><strong>2020年1月-2月期间</strong></mark>，
              以及
              <mark><strong>2021年1月左右</strong></mark>，
              这也正是我国疫情在所研究的时间范围内最严重的两次。
            </p>
            <p class="fw-normal">在这两次爆发点只间，也零星分布一些小的爆发。</p>
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
/* 引入地图组件 */
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/map'
exportingInit(Highcharts)
/* 引入地图组件 */
import { makeMap } from './maps';
import { fetchOnline } from '../fetch';

export default {
  components: { Widget, highcharts: Chart },
  methods: {
    fetchData: function(successHandler) {
      let operation = 'national/numbers?start=' + this.startDate + '&end=' + this.endDate;
      fetchOnline(operation, 
      function(res) {
        console.log('正在获取数据中')
        if (res.code === 200) {
          successHandler(res.data);
        }
      },
      function(err) {
        console.log('err', err);
      })
    },
    onDateChanged: function() {
      console.log('范围更换:', this.startDate, this.endDate);
      if (this.playing) {
        this.stopClock();
      }
      // 获取新数据
      let that = this;
      that.fetchData(data => {
        for (let ii in this.dataSources) {
          let dsName = this.dataSources[ii].name;
          let dsKey = this.dataSources[ii].select;
          let dsColour = this.dataSources[ii].colour;
          let mapInfo = that.dealWithMap(data, dsKey);
          that.mapData[dsKey] = mapInfo[0];
          that.timeLine = mapInfo[1];
          that.mapProperty[dsKey] = makeMap(that.getMapDate(0, dsKey), that.getMapTitle(0, dsName), dsColour, dsName);
        }
      })
      that.rangeVal = 0;
    },
    startStopClicked: function() {
      if (this.playing) {
        this.stopClock();
      } else {
        this.startClock();
      }
    },
    startClock: function() {
      let that = this;
      if (that.rangeVal === that.timeLine.length) {
        return;
      }
      that.playing = true;
      that.clockId = setInterval(function() {
        that.rangeVal += 1;
        if (that.rangeVal === that.timeLine.length) {
          that.stopClock();
          return;
        }
        that.refreshMap();
      }, 400)
    },
    stopClock: function() {
      if (this.playing) {
        this.playing = false;
        clearInterval(this.clockId);
      }
    },
    refreshMap: function() {
      for (let ii in this.dataSources) {
        let ds = this.dataSources[ii];
        let dsName = ds.name;
        let dsKey = ds.select;
        let dsColour = ds.colour;
        let title = this.getMapTitle(this.rangeVal, ds.name);
        this.mapProperty[ds.select] = makeMap(this.getMapDate(this.rangeVal, dsKey), title, dsColour, dsName);
        // N.B. 直接修改 properties 似乎不管用了！
        // // 设置 title
        // this.mapProperty[ds.select].title.text = title;
        // // 设置 data
        // this.mapProperty[ds.select].series[0].data = this.getMapDate(this.rangeVal, ds.select);
      }
    },
    getMapDate: function(dateIdx, dataSource) {
      let date = this.timeLine[dateIdx];
      return this.mapData[dataSource][date];
    },
    getMapTitle: function(dateIdx, name) {
      let date = this.timeLine[dateIdx];
      return "全国新冠" + name + "分布图 (" + date + ")";
    },
    onRangeChanged: function() {
      this.rangeVal = parseInt(this.rangeVal);
      this.stopClock();
      this.refreshMap();
    },
    dealWithMap: function(data, dataSourceIdx) {
      let dailyData = {};
      // 遍历所有记录
      for (let ii in data) {
        let record = data[ii];
        let date = record.datetime;
        if (dailyData[date] === undefined) {
          dailyData[date] = []
        }
        let newRecord = [
          record.province_shortname,
          record[dataSourceIdx],
        ]
        dailyData[date].push(newRecord);
      }
      // 遍历所有日期
      let stat = { '北京': 0, '天津': 0, '上海': 0, '重庆': 0, '河北': 0, '河南': 0, '云南': 0, '辽宁': 0, '黑龙江': 0, '湖南': 0, '安徽': 0, '山东': 0, '新疆': 0, '江苏': 0, '浙江': 0, '江西': 0, '湖北': 0, '广西': 0, '甘肃': 0, '山西': 0, '内蒙古': 0, '陕西': 0, '吉林': 0, '福建': 0, '贵州': 0, '广东': 0, '青海': 0, '西藏': 0, '四川': 0, '宁夏': 0, '海南': 0, '台湾': 0, '香港': 0, '澳门': 0 };
      let trueDailyData = {};
      let trueTimeLine = [];
      for (let date in dailyData) {
        let records = dailyData[date];
        for (let rr in records) {
          let r = records[rr];
          let provName = r[0];
          let provValue = r[1];
          // 修改纪录
          stat[provName] = provValue;
        }
        // 刷新本日纪录
        let todayRecord = [];
        for (let provName in stat) {
          todayRecord.push({
            'name': provName, 
            'value': stat[provName]
          });
        }
        trueDailyData[date] = todayRecord;
        trueTimeLine.push(date);
      }
      return [trueDailyData, trueTimeLine];
    }
  },
  data: function() {
    return {
      ready: false,
      mapData: {},
      mapProperty: {},
      timeLine: [],
      rangeVal: 0,
      playing: false,
      clockId: -1,

      // 选择日期
      startDate: '2020-01-22',
      endDate: '2021-01-22',

      // 数据源
      dataSources: [
        { 'name': '确诊个案', 'select': 'confirmed_count', 'colour': '#4F87BE' },
        { 'name': '病亡个案', 'select': 'dead_count', 'colour': '#C45252' },
        { 'name': '治愈个案', 'select': 'cured_count', 'colour': '#05AAA1' }
      ],
      dataOK: [false, false, false],
    }
  },
  mounted: function() {
    let that = this;
    that.fetchData(data => {
      for (let ii in this.dataSources) {
        let dsName = this.dataSources[ii].name;
        let dsKey = this.dataSources[ii].select;
        let dsColour = this.dataSources[ii].colour;
        let mapInfo = that.dealWithMap(data, dsKey);
        that.mapData[dsKey] = mapInfo[0];
        that.timeLine = mapInfo[1];
        that.mapProperty[dsKey] = makeMap(that.getMapDate(0, dsKey), that.getMapTitle(0, dsName), dsColour, dsName);
        that.dataOK[ii] = true;
      }
      that.ready = true;
    })
  }
};
</script>
