import Vue from 'vue';
import Router from 'vue-router';

// 主页
import HomePage from '@/pages/HomePage/HomePage';

// 确诊趋势分析
import ConfTrendsPage from '@/pages/Trends/ConfTrends';

// 死亡趋势分析
import DeadTrendsPage from '@/pages/Trends/DeadTrends';

// 治愈趋势分析
import CuredTrendsPage from '@/pages/Trends/CuredTrends'

//微博热度趋势分析
import WeiboCountTrendsPage from '@/pages/WeiboTrends/WeiboCountTrends'

//微博发布设备词云图
import DeviceWordCloudPage from '@/pages/WordClouds/DeviceWordCloud'

//微博文本词云图
import TextWordCloudPage from '@/pages/WordClouds/TextWordCloud'

//微博情感变化曲线图
import WeiboSentimentTrendsPage from '@/pages/Sentiment/WeiboSentimentTrends'

// 国内地图
import DomMapPage from '@/pages/CovidMap/DomesticMap';

// 分省地图
import ProvMapPage from '@/pages/CovidMap/ProvincialMap';

// 分类汇总
import ClassPage from '@/pages/CovidClass/OverallClass';

// 分类算法页面
import ClassAlgoPage from '@/pages/CovidClass/IndividualClass';

import Layout from '@/components/Layout/Layout';
import ErrorPage from '@/pages/Error/Error';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/404',
      name: 'Error',
      component: ErrorPage,
    },
    // 程序主要路径
    {
      path: '/portal',
      name: 'Layout',  // 父页面
      component: Layout,
      children: [
        {  // /portal/index 主页
          path: 'index',
          name: '主页',
          component: HomePage,
        },
        {  // /portal/trends 趋势分析
          path: 'trends',
          name: '趋势分析',
          component: ConfTrendsPage,
        },
        {  // /portal/trends/conf-trends 确诊趋势分析
          path: 'trends/conf-trends',
          name: '确诊趋势分析',
          component: ConfTrendsPage,
        },
        {  // /portal/trends/demise-trends 死亡趋势分析
          path: 'trends/demise-trends',
          name: '病亡趋势分析',
          component: DeadTrendsPage,
        },
        {  // /portal/trends/cured-trends 治愈趋势分析
          path: 'trends/cured-trends',
          name: '治愈趋势分析',
          component: CuredTrendsPage,
        },

        {  // /portal/trends 趋势分析
          path: 'how',
          name: '热度趋势',
          component: WeiboCountTrendsPage,
        },
        {  // /portal/what 热点分析 - 发布设备词云图
          path: 'what',
          name: '热点分析',
          component: TextWordCloudPage,
        },
        {  // /portal/who 热点分析
          path: 'who',
          name: '人群画像',
          component: DeviceWordCloudPage,
        },
        {  // /portal/sentiment 发布设备词云图
          path: 'sentiment',
          name: '微博情感变化分析',
          component: WeiboSentimentTrendsPage ,
        },
        {  // /portal/maps/dom-maps 国内地图
          path: 'maps/dom-maps',
          name: '国内地图',
          component: DomMapPage,
        },
        {  // /portal/maps/prov-maps 分省地图
          path: 'maps/prov-maps',
          name: '分省地图',
          component: ProvMapPage,
        },
        {  // /portal/class 分类汇总
          path: 'class',
          name: '分类汇总',
          component: ClassPage,
        },
        {  // /portal/class/algos 分类算法页面
          path: 'class/algos',
          name: '分类算法',
          component: ClassAlgoPage,
        }
      ],
    },
    // 泛解析
    {
      path: '/',
      name: 'Index',
      component: HomePage,
    },
    // 404
    {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/404"
    }
  ],
});
