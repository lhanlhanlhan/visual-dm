<template>
  <div>
    <h1 class="page-title">
      疫情地图 - <b>各地</b>
    </h1>
    <b-row>
      <b-col xs="12" lg="8">
        <Widget
          collapse
        >
          <b-row>
            <b-col>
              <div class="d-flex align-items-center">
                <div class="mr-5">
                  <h4>疫情地图 ({{ provinces[confirmedProvince].name }})</h4>
                  <p>数据来源：丁香园；分级：7 级</p>
                </div>
                <!-- 旋转圈 -->
                <div class="spinner-border" role="status" v-if="!ready">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </b-col>
          </b-row>
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
            <b-tabs>
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
            <div class="clearfix">
              <div class="float-right">
                <b-dropdown variant="default" class="mr-xs" 
                    :text="provinces[choseProvince].name" 
                    id="province-picker">
                    <b-dropdown-item 
                    v-for="(prov, provIdx) in provinces"
                    :key="provIdx"
                    @click="chooseProvince(provIdx)">
                    {{ prov.name }}
                  </b-dropdown-item>
                </b-dropdown>
                <b-button variant="inverse" class="mr-3" size="sm"
                @click="confirmProvince()">
                  去
                </b-button>
              </div>
              <p>时间跨度：{{ startDate }} - {{ endDate }}</p>
            </div>
          </div>
        </Widget>
      </b-col>
      <b-col xs="12" lg="4">
        <Widget
          collapse
        >
          <h4>分析 - <b>疫情地图</b></h4>
          <p>Analysis - <b>Domestic Pandemic Map</b></p>
          <div class="">
            <p class="fw-normal">
              疫情主要以武汉为中心向周围扩散，主要爆发点在我国中部和东南沿海片区，
              又通过人口流动将病情传播至一线城市，北上广等成为二级传播中心。<br />
              此次疫情具有明显的地域特征：
              <mark><strong>距离湖北越近，经济越发达，交通越发达，人口越多，越严重</strong></mark>。
              在疫情初期，湖北省疫情增长速度快，其他省份增长速度较平缓。
            </p>
            <p class="fw-normal">
              1月24日，全国23个省份出现新冠病毒确诊病例，
              <mark><strong>武汉封城</strong></mark>，
              <mark><strong>核酸检测试剂盒开始量产</strong></mark>。<br />
              2月12日湖北地区新增病例异常升高，原因是
              <mark><strong>湖北地区更改诊断标准</strong></mark>，使得确诊更加容易。<br />
              3月初，政府采取有力措施，
              <mark><strong>疫情拐点出现</strong></mark>。<br />
              此后，湖北地区和全国地区新增数据的趋势一致。疫情具有放缓的态势。
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
/* 引入地图组件 */
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/map'
exportingInit(Highcharts)
/* 引入地图组件 */
import { makeProvinceMap } from './maps';
import { fetchOnline } from '../fetch';

export default {
  components: { Widget, highcharts: Chart },
  data: function() {
    return {
      // 省份列表
      provinces: [
        { 'name': '广西壮族自治区', 'key': '广西' },
        { 'name': '湖北省', 'key': '湖北' },
        { 'name': '广东省', 'key': '广东' },
        { 'name': '福建省', 'key': '福建' },
        { 'name': '河北省', 'key': '河北' },
      ],
      choseProvince: 0,
      confirmedProvince: 0,

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
      ready: false
    }
  },
  methods: {
    confirmProvince: function() {
      // 确认 Province
      if (this.playing) {
        this.stopClock();
      }
      this.confirmedProvince = this.choseProvince;
      // 刷新页面
      this.$router.replace({
        path: "/portal/maps/prov-maps",
        query: { prov: this.confirmedProvince }
      });
    },
    chooseProvince: function(key) {
      // 选择省份
      this.choseProvince = key;
    },
    fetchProvData: function(prov, successHandler) {
      let province = this.provinces[prov].key;
      let operation = 'covid/provinces/' + province + '/numbers?start=' + this.startDate + '&end=' + this.endDate;
      fetchOnline(operation, 
      function(res) {
        console.log('正在获取' + province + '数据中')
        if (res.code === 200) {
          successHandler(res.data);
        } else {
          console.log(res)
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
      let provName = this.provinces[this.confirmedProvince].key;
      that.fetchProvData(this.confirmedProvince, data => {
        for (let ii in that.dataSources) {
          let dsName = that.dataSources[ii].name;
          let dsKey = that.dataSources[ii].select;
          let dsColour = that.dataSources[ii].colour;
          let mapInfo = that.dealWithMap(data, dsKey);
          that.mapData[dsKey] = mapInfo[0];
          that.timeLine = mapInfo[1];
          that.mapProperty[dsKey] = makeProvinceMap(provName, that.getMapDate(0, dsKey), that.getMapTitle(0, dsName), dsColour, dsName);
        }
        that.rangeVal = 0;
      })
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
      let provName = this.provinces[this.confirmedProvince].key;
      for (let ii in this.dataSources) {
        let ds = this.dataSources[ii];
        let dsName = ds.name;
        let dsKey = ds.select;
        let dsColour = ds.colour;
        let title = this.getMapTitle(this.rangeVal, ds.name);
        this.mapProperty[ds.select] = makeProvinceMap(provName, this.getMapDate(this.rangeVal, dsKey), title, dsColour, dsName);
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
      return this.provinces[this.confirmedProvince].name + "新冠" + name + "数分布图 (" + date + ")";
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
        let date = record.time;
        if (dailyData[date] === undefined) {
          dailyData[date] = []
        }
        let newRecord = [
          record.city_name,
          record[dataSourceIdx],
        ]
        dailyData[date].push(newRecord);
      }
      // 遍历所有日期
      let stat = { };
      let trueDailyData = {};
      let trueTimeLine = [];
      for (let date in dailyData) {
        let records = dailyData[date];
        for (let rr in records) {
          let r = records[rr];
          let cityName = r[0];
          let cityValue = r[1];
          // 修改纪录
          stat[cityName] = cityValue;
        }
        // 刷新本日纪录
        let todayRecord = [];
        for (let cityName in stat) {
          todayRecord.push({
            'name': cityName, 
            'value': stat[cityName]
          });
        }
        trueDailyData[date] = todayRecord;
        trueTimeLine.push(date);
      }
      return [trueDailyData, trueTimeLine];
    },
    getMap: function() {
      let that = this;
      let provName = this.provinces[this.confirmedProvince].key;
      that.fetchProvData(this.confirmedProvince, data => {
        for (let ii in this.dataSources) {
          let dsName = this.dataSources[ii].name;
          let dsKey = this.dataSources[ii].select;
          let dsColour = this.dataSources[ii].colour;
          let mapInfo = that.dealWithMap(data, dsKey);
          that.mapData[dsKey] = mapInfo[0];
          that.timeLine = mapInfo[1];
          that.mapProperty[dsKey] = makeProvinceMap(provName, that.getMapDate(0, dsKey), that.getMapTitle(0, dsName), dsColour, dsName);
          that.dataOK[ii] = true;
        }
        that.ready = true;
        that.rangeVal = 0;
      })
    },
  },
  mounted: function() {
    var provinceId = this.$route.query.prov;
    if (provinceId) {
      this.confirmedProvince = provinceId;
      this.choseProvince = provinceId;
    }
    this.getMap();
  },
  watch: {
    // 防止页面不刷新之用
    $route () {
      window.location.reload()
    }
  }
};
</script>
