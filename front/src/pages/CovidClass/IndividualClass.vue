<template>
  <div>
    <h1 class="page-title">
      数据分类可视化 - <b>{{algorithms[algoKey].name}}</b>
    </h1>
    <p>Classification Visualise - <b>{{algorithms[algoKey].nameEng}}</b></p>
    <b-row>
      <b-col xs="12" lg="4">
        <!-- 混淆矩阵 -->
        <b-row>
          <b-col xs="12" lg="12">
            <Widget
            collapse
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
            collapse
            >
              <!-- 标题栏 -->
              <b-row>
                <b-col>
                  <div class="d-flex align-items-center">
                    <div class="mr-5">
                      <h4>效果解析 - {{algorithms[algoKey].name}}</h4>
                      <p>Analysis - {{algorithms[algoKey].nameEng}}</p>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="fw-normal"
                   v-for="(anaTxt, anaIdx) in analysis[algoKey].text" :key="anaIdx">
                    <p v-html="'' + (anaIdx + 1) + '. ' + anaTxt" />
                  </div>
                  <p class="fw-normal">「
                    <strong>
                      {{analysis[algoKey].comment}}
                    </strong>
                    」</p>
                </b-col>
              </b-row>
            </Widget>
          </b-col>
        </b-row>
      </b-col>
      <b-col xs="12" lg="8">
        <!-- 决策边界、几率边界 -->
        <b-row>
          <b-col xs="12" lg="12">
            <Widget collapse
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
            <Widget collapse
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

      // 分类结果分析
      analysis: {
        'lr': {
          text: [
            '从混淆矩阵中可发现<mark>预测结果只在占比最高的三类中</mark>，对数据量少的类的预测准确度为0',
            '<mark>准确率低</mark>——因为 LR 是线性分类器，形式简单，难以拟合真实的数据分布',
            '难以处理数据不平衡的问题，预测结果集中在<mark>数据量最大的三类</mark>中'
          ],
          comment: '效果差，排除该算法'
        },
        'rf': {
          text: [
            '各类指标最高，在我们的数据集上表现非常好',
            '是非线性分类器，<mark>对数据集的适应能力强</mark>。既能处理离散型数据，也能处理连续型数据，数据集无需规范化',
            '在决策边界上，决策树把输入空间划分为和坐标轴平行的长方形，每个长方形都是一个类'
          ],
          comment: '效果好，我们认为应当采用这种模型'
        },
        'svm': {
          text: [
            '效果差，需要对数据集进行预先处理',
            'SVM 是为了找到分开数据的最优平面，在PCA后，数据的主成分 (principal component 是原 variable 的线性组合) 变化较大，因此<mark>对数据预处理要求高</mark>，因为我们数据集的缺陷，SVM效果较差。'
          ], 
          comment: '效果差，排除该算法'
        },
        'nb': {
          text: [
            '通过先验和数据决定后验的概率从而决定分类',
            '朴素贝叶斯算法假设属性之间相对独立，而在我们的数据集中，此假设明显不成立，应当考虑对算法进行改进。'
          ],
          comment: '要求太高了！！排除此算法。'
        },
        'dt': {
          text: [
            '各类指标最高，在我们的数据集上表现非常好',
            '是非线性分类器，<mark>对数据集的适应能力强</mark>。既能处理离散型数据，也能处理连续型数据，数据集无需规范化',
            '在决策边界上，决策树把输入空间划分为和坐标轴平行的长方形，每个长方形都是一个类'
          ],
          comment: '效果好，我们认为应当采用这种模型'
        },
        'knn': {
          text: [
            'KNN 比较复杂，对标签噪声敏感。',
            '不相关的特性对分类结果影响较其他算法大，因为KNN假设所有的特征同样重要。',
            '在macro f1上表现差，说明它更多的预测对了常见类的数据。',
            '决策边界为分段线性，每个部分都是一个超平面，它垂直于不同类别点对的平分线。'
          ],
          comment: '在少见类上表现差，排除该算法。'
        },
        'mlp': {
          text: [
            '神经网络属非线性模型，理论上可以获得较强的拟合优度。但是在本次分类实践中，该模型拟合出了线性决策边界。',
            '神经网络适合以大量数据作为学习材料进行特征挖掘。但在本次分类中，数据集本身规模较小 (1000 条左右)，因此<mark>不能够充分发掘</mark>神经网络的潜力。',
            '大量数据集中在标签为0及1的数据上。<mark>不平衡分布的数据集</mark>。利于神经网络进行拟合。'
          ],
          comment: '训练时间太久，且在少量数据上效果不好，排除该算法。'
        },
      }
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
