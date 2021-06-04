<template>
  <div>
    <h1 class="page-title">
      数据分类可视化 - <b>{{algorithms[algoKey].name}}</b>
    </h1>
    <p>Classification Visualise - <b>{{algorithms[algoKey].nameEng}}</b></p>
    <b-row>
      <b-col xs="12" lg="5">
        <!-- 混淆矩阵 -->
        <b-row>
          <b-col xs="12" lg="12">
            <Widget
            close collapse
            >
              <!-- 标题栏 -->
              <b-row>
                <b-col>
                  <div class="mr-5">
                    <h4>混淆矩阵</h4>
                    <p>Confusion Matrix</p>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <img :src="confMatrix" width="100%" height="auto" />
              </b-row>
            </Widget>
          </b-col>
        </b-row>
        <!-- 分析 -->
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
                      <h4>分类结果分析</h4>
                      <p>Analysis</p>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <p>这里放分类结果分析</p>
                  <p>这里放分类结果分析</p>
                  <p>这里放分类结果分析</p>
                </b-col>
              </b-row>
            </Widget>
          </b-col>
        </b-row>
      </b-col>
      <b-col xs="12" lg="7">
        <!-- 决策边界、几率边界 -->
        <b-row>
          <b-col xs="12" lg="12">
            <Widget
              close collapse
            >
              <!-- 标题栏 -->
              <div class="mr-5">
                <h4>决策、几率边界</h4>
                <p>Decision Boundary</p>
              </div>
              <!-- 绘图 -->
              <div>
                <img :src="boundGraph" width="100%" />
                <img :src="probabilityBoundGraph" width="100%" />
              </div>
            </Widget>
          </b-col>
        </b-row>
        <!-- KNN 曲线 -->
        <b-row v-if="algoKey === 'knn'">
          <b-col xs="12" lg="12">
            <Widget
              close collapse
            >
              <!-- 标题栏 -->
              <div class="mr-5">
                <h4>k-accuracy 曲线</h4>
                <p>k-accuracy Line Graph</p>
              </div>
              <!-- 绘图 -->
              <div>
                <img :src="knnKLineGraph" width="100%" />
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
import { Chart } from 'highcharts-vue';
// ajax

export default {
  components: { Widget, highcharts: Chart },
  // components: { Widget },
  data: function() {
    return {
      // 算法名
      algorithms: {
        "lr": {
          'name': '逻辑回归',
          'nameEng': 'Logistic Regression',
        },
        "nb": {
          'name': '朴素贝叶斯分类器 (Gaussian)',
          'nameEng': 'Gaussian Naive Bayes Classifier',
        },
        "dt": {
          'name': '决策树',
          'nameEng': 'Decision Tree',
        },
        "knn": {
          'name': 'k-近邻 (k = 5)',
          'nameEng': 'k-nn',
        },
        "mlp": {
          'name': '多层感知器神经网络',
          'nameEng': 'MLP Classifier',
        },
        "svm": {
          'name': '支持向量机',
          'nameEng': 'SVM',
        },
        "rf": {
          'name': '随机森林',
          'nameEng': 'Random Forest',
        },
      },
      algoKey: 'nb',

      // overallScatter: null,
      confMatrix: null,
      boundGraph: null,
      probabilityBoundGraph: null,
      knnKLineGraph: null,
    }
  },
  methods: {
    toTwoDecimal(number) {
      return String(Math.floor(number * 100) / 100)
    },
    toFourDecimal(number) {
      return String(Math.floor(number * 10000) / 10000)
    },
    getData: function(algoKey) {
      this.confMatrix = require('../../assets/figs/' + algoKey + '/cm.svg');
      this.boundGraph = require('../../assets/figs/' + algoKey + '/bound.svg');
      this.probabilityBoundGraph = require('../../assets/figs/' + algoKey + '/prob.svg');
      if (algoKey === 'knn') {
        this.knnKLineGraph = require('../../assets/figs/' + algoKey + '/knn.svg');
      }
    }
  },
  mounted: function() {
    let algoKey = this.$route.query.name;
    if (algoKey) {
      this.algoKey = algoKey;
    }
    this.getData(this.algoKey);
  }
};
</script>
