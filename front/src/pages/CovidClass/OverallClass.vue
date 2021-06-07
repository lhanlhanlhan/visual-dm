<template>
  <div>
    <h1 class="page-title">
      数据分类可视化 - <b>概览</b>
    </h1>
    <p>Classification Visualise - <b>Overview</b></p>
    <b-row>
      <b-col xs="12" lg="6">
        <b-row>
          <b-col xs="12" lg="12">
            <Widget
            collapse
            >
              <!-- 标题栏 -->
              <div class="d-flex align-items-center">
                <div class="mr-5">
                  <h4>分类概况 (PCA 后)</h4>
                  <p>标签种类：7；主成分 2 个</p>
                </div>
              </div>
              <!-- 散点图 -->
              <img :src="overallScatter" width="100%"/>
              <div class="mr-5 mt-5">
                <h4>分类步骤及其说明</h4>
                <p>标签种类：7；主成分 2 个</p>
              </div>
              <p class="fw-normal mt-3">
                我们进行多分类的标签依据是每条样本
                <mark><strong>「确诊人数 - 治愈人数」值的相对大小</strong></mark>，
                即<mark><strong>「疫情严重程度」</strong></mark>。
                通过将「确诊人数 - 治愈人数」的 (最小值, 最大值) 区间划分为 7 个区间，
                我们依据每条数据所在的区间为数据依次打上这 7 种标签。
                然后，我们将有标签的数据划分为训练集和测试集，
                并训练和评估「<mark><strong>scikit-learn</strong></mark>」库中提供的 7 种不同的分类算法。
              </p>
              <p class="fw-normal mt-3">
                但是，标签为 0 的数据 (来自低风险地区的数据) 占数据集的 80% 以上，
                在不做处理的情况下，所有分类算法的准确率都将大于 80%；
                而因为大多数测试集数据标签也都为 0，
                <mark><strong>即使算法将测试集全预测为「0」，也能获得大于 80% 的准确率</strong></mark>
                ——
                因此，为了避免样本分布不均所带来的一系列问题，
                我们只从标签为0的数据中<mark><strong>随机取 300 条</strong></mark>，作为有监督分类所用的标签为0的数据。<br/>
              </p>
            </Widget>
          </b-col>
        </b-row>
        <!-- 分类时间图 -->
        <b-row v-if="ready">
          <b-col class="col-12">
            <Widget collapse>
              <div class="mr-5">
                <h4>算法拟合所用时间</h4>
                <p>全部采用 scikit-learn 包的默认配置</p>
              </div>
              <highcharts :options="classTimeBarChartOption" />
            </Widget>
          </b-col>
        </b-row>
        <!-- 数据标签分布 -->
        <b-row>
          <b-col xs="12" lg="6">
            <Widget collapse
            >
              <!-- 标题栏 -->
              <div class="mr-5">
                <h4>样本-标签分布</h4>
                <p>1,073个样本；共7种标签</p>
              </div>
              <!-- 绘图 -->
              <div v-if="ready">
                <!-- 一些其他资讯 -->
                <highcharts :options="labelDistPieOption" />
              </div>
              <!-- 数据集说明 -->
              <div class="mt-3">
                <b-badge variant="danger" class="text-white">
                  数据集特点
                </b-badge>
                <p class="fw-normal mt-2">
                  1. 数据量比较小 (去重后共 1,000 多条)；<br />
                  2. 维度低 (降维后仅剩 2 个维度)；<br />
                  3. 非线性可分 (几率边界是非线性的)；<br />
                  4. 特征关联度强 (降维的两个特征维度之间尚存在较强相关性)
                </p>
              </div>
            </Widget>
          </b-col>
          <b-col xs="12" lg="6">
            <Widget collapse
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
              <p class="fw-normal mt-3">
                <b-badge variant="danger" class="text-white">
                  注
                </b-badge>
                7 个分类算法的输入都是 577 条训练集数据和 193 条测试集数据。
              </p>
            </Widget>
          </b-col>
        </b-row>
      </b-col>
      <b-col xs="12" lg="6">
        <!-- 分类算法一览 -->
        <b-row>
          <b-col xs="12" lg="12">
            <Widget collapse
            >
              <!-- 标题栏 -->
              <div class="mr-5">
                <h4>7 种分类算法一览</h4>
                <p>总样本：1,073；点击算法名称可进入对应详情页</p>
              </div>
              <!-- 表格 -->
              <div>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>算法名称</th>
                      <!-- <th>Acc. (%)</th> -->
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
                          <a :href="'#/portal/class/algos?name=' + algo.key">{{algo.name}}</a>
                        </span>&nbsp;<b-badge variant="success" class="text-gray-dark">OPT.</b-badge>
                      </td>
                      <td v-else-if="algo.modest">
                        <span class="fw-semi-bold">
                          <a :href="'#/portal/class/algos?name=' + algo.key">{{algo.name}}</a>
                        </span>&nbsp;<b-badge variant="warning" class="text-gray-dark">INTERM.</b-badge>
                      </td>
                      <td v-else>
                        <a :href="'#/portal/class/algos?name=' + algo.key">{{algo.name}}</a>
                      </td>
                      <!-- <td>{{toTwoDecimal(algo.acc * 100)}}</td> -->
                      <td>{{toTwoDecimal(algo.pcs * 100)}}</td>
                      <td>{{toTwoDecimal(algo.rec * 100)}}</td>
                      <td>{{toTwoDecimal(algo.f1 * 100)}}</td>
                      <td>{{toFourDecimal(algo.time)}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 解析 -->
              <b-badge variant="danger" class="text-white">
                分析
              </b-badge>
              <p class="fw-normal mt-2">
                多分类问题中，使用「micro」平均法计算的四个值相等，无法提供区分度。
                使用「macro」简单平均法取平均，给所有类别相同的权重，
                它的值会受稀有类别影响。
                从 macro 和 weighted 的区别种可以看到，所有算法在
                <mark><strong>稀有类别</strong></mark>上
                都表现相对较差。
                由于我们的数据集数据量小且类别不平衡，应当更多地考虑常见类对分类的影响，
                因此，我们采用 
                <mark><strong>weighted precision/recall/f1 </strong></mark>
                三个指标来综合评定不同分类算法。<br />
                根据 Weighted f1，
                <mark><strong>
                  {Random forest, Decision Tree} > KNN > Naive Bayes >> 其他算法
                </strong></mark>
                。
              </p>
              <!-- 分类算法选择依据 -->
              <b-badge variant="success" class="text-white">
                分类算法选择依据
              </b-badge>
              <p class="fw-normal mt-2">
                1. 数据集不线性可分，<mark><strong>排除线性分类器</strong></mark>；<br/>
                2. 数据不平衡，<mark><strong>排除MLP、LR等方法</strong></mark>，因为 FP 值太多；<br/>
                3. 分类结果的分析；<br/>
                根据数据集特点及各模型在数据集上的表现，我们选择<mark><strong>决策树和随机森林</strong></mark>。
                其中，随机森林可以视为决策树的升级版本，理论上会有更高的F1值。
              </p>
            </Widget>
          </b-col>
        </b-row>

        <!-- 混淆矩阵分析 -->
        <b-row>
          <b-col xs="12" lg="12">
            <Widget collapse
            >
              <!-- 标题栏 -->
              <div class="mr-5">
                <h4>混淆矩阵概览</h4>
                <p>7 种分类算法</p>
              </div>
              <!-- 表格 -->
              <div>
                <b-row>
                  <b-col class="col-4"
                   v-for="(algo, algoIdx) in classResultsA" :key="algoIdx">
                    <img :src="require('../../assets/figs/' + algo.key + '/cm.svg')" width="100%" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="col-3"
                   v-for="(algo, algoIdx) in classResultsB" :key="algoIdx">
                    <img :src="require('../../assets/figs/' + algo.key + '/cm.svg')" width="100%" />
                  </b-col>
                </b-row>
              </div>
              <!-- 解析 -->
              <b-badge variant="danger" class="text-white">
                分析
              </b-badge>
              <p class="fw-normal mt-2">
                  从LR、SVM、MLP 三个算法的混淆矩阵可以看出：
                  这些算法预测的 False Positive 样本数 (预测为正实际为负的样本) 太多，
                  因此 P 值显著小于 R 值。
                  这些算法 
                  <mark><strong>将大多数测试数据预测到类 0 和类 1 中</strong></mark>
                  (这两类数据量占比最高）。
              </p>
            </Widget>
          </b-col>
        </b-row>

        <!-- 决策边界分析 -->
        <b-row>
          <b-col xs="12" lg="12">
            <Widget collapse
            >
              <!-- 标题栏 -->
              <div class="mr-5">
                <h4>决策边界图概览</h4>
                <p>7 种分类算法</p>
              </div>
              <!-- 表格 -->
              <div>
                <b-row>
                  <b-col class="col-4"
                   v-for="(algo, algoIdx) in classResultsA" :key="algoIdx">
                    <img :src="require('../../assets/figs/' + algo.key + '/bound.svg')" width="100%" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="col-3"
                   v-for="(algo, algoIdx) in classResultsB" :key="algoIdx">
                    <img :src="require('../../assets/figs/' + algo.key + '/bound.svg')" width="100%" />
                  </b-col>
                </b-row>
              </div>
              <!-- 解析 -->
              <b-badge variant="danger" class="text-white">
                分析
              </b-badge>
              <p class="fw-normal mt-2">
                  三个 f1 值较好的模型中，
                  <mark><strong>决策树和随机森林算法</strong></mark>
                  把输入空间划分为和坐标轴平行的<mark><strong>长方形</strong></mark>，
                  每个长方形中的点归属同一个类。
                  <mark><strong>KNN算法</strong></mark>
                  的决策边界是<mark><strong>分段线性</strong></mark>的，
                  每个部分都是一个超平面，它垂直于不同类别点对的平分线。
              </p>
            </Widget>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import { pieChart } from '../pie';
import { makeBar } from "../bar";
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
      classTimeBarChartOption: null,
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
      classResultsA: [
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
      ],
      classResultsB: [
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
      ]
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
      this.labelDistPieOption = pieChart(dataArr, "样本数", 140);
    },
    drawDatasetDistPie: function() {
      let dataArr = [
        ['Train', 577],
        ['Test', 193],
      ];
      this.datasetDistPieOption = pieChart(dataArr, "样本数", 140);
    },
    drawTimeBar: function() {
      let dataArr = [];
      let algoNames = [];
      for (let algoIdx in this.classResults) {
        let algo = this.classResults[algoIdx];
        dataArr.push([algo.name, algo.time]);
        algoNames.push(algo.name);
      }
      this.classTimeBarChartOption = makeBar(dataArr, "", '', algoNames, "算法拟合所用时间", "#537385");
    },
  },
  mounted: function() {
    this.drawLabelDistPie();
    this.drawDatasetDistPie();
    this.drawTimeBar();
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
