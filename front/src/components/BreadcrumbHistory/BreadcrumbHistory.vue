<template>
  <div v-if="!excluded">
    <b-breadcrumb :items="tree"></b-breadcrumb>
  </div>
</template>
<script>
  export default {
    name: 'BreadcrumbHistory',
    props: {
      exclude: {type: Array, default: () => []}
    },
    computed: {
      excluded() {
        return this.exclude.indexOf(this.$route.path.split('/').pop()) > -1;
      },
      tree() {
        let pageName = {
          'portal': '功能',
          'index': '主页',
          'trends': '趋势分析',
          'conf-trends': '确诊趋势分析',
          'demise-trends': '病亡趋势分析',
          'cured-trends': '治愈趋势分析',
          'maps': '疫情地图',
          'dom-maps': '全国疫情地图',
          'prov-maps': '各地疫情地图',
          'class': '数据分类',
          'algos': '算法',

          // 微博
          'how': '热度趋势——热度变化分析',
          'what': '热点分析——词云图',
          'who': '人群画像——发布设备分析',
          'sentiment': '社会心态——情感分析'
        };
        return ['阁下在']
          .concat(this.$route.path
            .split('/')
            .slice(1)
            .map(function(w) {
                let pName = pageName[w];
                if (pName) {
                  return pName;
                } else return w
              }
            )
          );
      }
    }
  }
</script>
