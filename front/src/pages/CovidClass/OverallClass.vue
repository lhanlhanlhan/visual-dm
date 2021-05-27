<template>
  <div>
    <h1 class="page-title">
      数据分类可视化 - <b>概览</b>
    </h1>
    <p>Classification Visualise - <b>Overview</b></p>
    <b-row>
      <b-col xs="12" lg="5">
        <b-row>
          <b-col xs="12" lg="12">
            <Widget
            close collapse
            >
              <!-- 标题栏 -->
              <b-row>
                <b-col>
                  <div class="d-flex align-items-center">
                    <div class="mr-5">
                      <h4>分类概况 (PCA 后)</h4>
                      <p>标签种类：7；主成分 2 个</p>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <!-- 绘图 -->
              <b-row>
                <b-col>
                  <!-- 散点图 -->
                  <img :src="overallScatter" width="100%"/>
                  <!-- 数据集说明 -->
                  <p class="fw-normal">
                    <b-badge variant="warning" class="text-white">
                      注
                    </b-badge>
                    我们注意到原数据集中标签为「0」的数据过多 (达 12,000 多条)，
                    占总数据量 80% 以上。为避免样本分布不均，
                    我们仅从标签为「0」的数据中
                    <mark><strong>随机选择 300 条</strong></mark>
                    数据来进行分类实验。
                  </p>
                </b-col>
              </b-row>
            </Widget>
          </b-col>
        </b-row>
        <b-row>
          <b-col xs="12" lg="12">
            <!-- 说明？分析？ -->
            <Widget
              close collapse
            >
              <!-- 标题栏 -->
              <div class="mr-5">
                <h4>分类总分析</h4>
                <p>总样本：1,073</p>
              </div>
              <p>这里写分类总分析！这里写分类总分析！这里写分类总分析！</p>
              <p>这里写分类总分析！这里写分类总分析！这里写分类总分析！</p>
            </Widget>
          </b-col>
        </b-row>
      </b-col>
      <b-col xs="12" lg="7">
        <b-row>
          <!-- 数据标签分布 -->
          <b-col xs="12" lg="6">
            <Widget
              close collapse
            >
              <!-- 标题栏 -->
              <div class="mr-5">
                <h4>样本-标签分布</h4>
                <p>总样本：1,073；总标签：7</p>
              </div>
              <!-- 绘图 -->
              <div v-if="ready">
                <!-- 一些其他资讯 -->
                <highcharts :options="labelDistPieOption" />
              </div>
            </Widget>
          </b-col>
          <!-- 数据集分布 -->
          <b-col xs="12" lg="6">
            <Widget
              close collapse
            >
              <!-- 标题栏 -->
              <div class="mr-5">
                <h4>训练/测试集分割</h4>
                <p>比例：3:1</p>
              </div>
              <!-- 绘图 -->
              <div v-if="ready">
                <!-- 一些其他资讯 -->
                <highcharts :options="datasetDistPieOption" />
              </div>
            </Widget>
          </b-col>
        </b-row>
        <b-row>
          <!-- 分类算法一览 -->
          <b-col xs="12" lg="12">
            <Widget
              close collapse
            >
              <!-- 标题栏 -->
              <div class="mr-5">
                <h4>分类算法一览</h4>
                <p>总样本：1,073</p>
              </div>
              <!-- 表格 -->
              <div>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>算法名称</th>
                    <th>Acc. (%)</th>
                    <th>Prec. (%)</th>
                    <th>Rec. (%)</th>
                    <th>F1 (%)</th>
                    <th>Time (s)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(algo, algoIdx) in classResults" :key="algoIdx">
                    <td v-if="algo.optimal">
                      <span class="fw-bold">
                        <a :href="'#/app/class/algos?name=' + algo.key">{{algo.name}}</a>
                      </span>&nbsp;<b-badge variant="success" class="text-gray-dark">OPT.</b-badge>
                    </td>
                    <td v-else-if="algo.modest">
                      <span class="fw-semi-bold">
                        <a :href="'#/app/class/algos?name=' + algo.key">{{algo.name}}</a>
                      </span>&nbsp;<b-badge variant="warning" class="text-gray-dark">INTERM.</b-badge>
                    </td>
                    <td v-else>
                      <a :href="'#/app/class/algos?name=' + algo.key">{{algo.name}}</a>
                    </td>
                    <td>{{toTwoDecimal(algo.acc * 100)}}</td>
                    <td>{{toTwoDecimal(algo.pcs * 100)}}</td>
                    <td>{{toTwoDecimal(algo.rec * 100)}}</td>
                    <td>{{toTwoDecimal(algo.f1 * 100)}}</td>
                    <td>{{toFourDecimal(algo.time)}}</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </Widget>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import { pieChart } from './pie';
// import { getScatter } from './scatter';
import { Chart } from 'highcharts-vue';
// ajax

export default {
  components: { Widget, highcharts: Chart },
  // components: { Widget },
  data: function() {
    return {
      // overallScatter: null,
      overallScatter: require('../../assets/figs/dataset.svg'),
      labelDistPieOption: null,
      datasetDistPieOption: null,
      ready: false,

      // 分类效果表格
      classResults: [
        {
          'name': 'Logistic Regression',
          'key': 'lr',
          'acc': 0.6269430051813472,
          'pcs': 0.466255822473439,
          'rec': 0.6269430051813472,
          'f1': 0.5319828533229751,
          'time': 0.018412113189697266,
        },
        {
          'name': 'Random Forest',
          'key': 'rf',
          'acc': 0.9740932642487047,
          'pcs': 0.9703055841077385,
          'rec': 0.9740932642487047,
          'f1': 0.9715504454367779,
          'time': 0.13544797897338867,
          'optimal': true,
        },
        {
          'name': 'SVM',
          'key': 'svm',
          'acc': 0.6269430051813472,
          'pcs': 0.5175339791244273,
          'rec': 0.6269430051813472,
          'f1': 0.5594548700309139,
          'time': 0.046469926834106445,
        },
        {
          'name': 'Gaussian Naive Bayes',
          'key': 'nb',
          'acc': 0.7616580310880829,
          'pcs': 0.7600224012517237,
          'rec': 0.7616580310880829,
          'f1': 0.7572061200653244,
          'time': 0.0016300678253173828,
        },
        {
          'name': 'Decision Tree',
          'key': 'dt',
          'acc': 0.9792746113989638,
          'pcs': 0.9751899611347548,
          'rec': 0.9792746113989638,
          'f1': 0.9767092015067521,
          'time': 0.0017180442810058594,
          'optimal': true,
        },
        {
          'name': 'KNN (k=5)',
          'key': 'knn',
          'acc': 0.9430051813471503,
          'pcs': 0.9419810817280699,
          'rec': 0.9430051813471503,
          'f1': 0.9394698233293125,
          'time': 0.0011179447174072266,
          'modest': true,
        },
        {
          'name': 'MLP Classifier - Adam',
          'key': 'mlp',
          'acc': 0.533678756476684,
          'pcs': 0.36034533382902784,
          'rec': 0.533678756476684,
          'f1': 0.4241895364884184,
          'time': 0.3023872375488281,
        },
      ],
    }
  },
  methods: {
    toTwoDecimal(number) {
      return String(Math.floor(number * 100) / 100)
    },
    toFourDecimal(number) {
      return String(Math.floor(number * 10000) / 10000)
    },
    drawLabelDistPie: function() {
      let dataArr = [
        ['Level #0', 300],
        ['Level #1', 275],
        ['Level #2', 132],
        ['Level #3', 112],
        ['Level #4', 50],
        ['Level #5', 46],
        ['Level #6', 158]
      ];
      this.labelDistPieOption = pieChart(dataArr, "样本数");
    },
    drawDatasetDistPie: function() {
      let dataArr = [
        ['Train', 577],
        ['Test', 193],
      ];
      this.datasetDistPieOption = pieChart(dataArr, "样本数");
    }
  },
  mounted: function() {
    this.drawLabelDistPie();
    this.drawDatasetDistPie();
    this.ready = true;

    // 直接加载图片好了
    // this.fetchData(data => {
    //   // 處理下數據
    //   let labels = {};
    //   let labelTypes = [];
    //   for (let ii in data) {
    //     let record = data[ii];
    //     let x = record.pca0;
    //     let y = record.pca1;
    //     let lbl = record.level;
    //     if (labels[lbl] === undefined) {
    //       labels[lbl] = []
    //       labelTypes.push(lbl);
    //     }
    //     labels[lbl].push([x, y])
    //   }
    //   that.overallScatter = getScatter(labels);
    //   console.log("data:", that.overallScatter)
    //   console.log('loaded')
    //   that.ready = true;
    // })
    
  }
};
</script>
