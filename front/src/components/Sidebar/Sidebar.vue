/* 边栏 */
<template>
  <div class="sidebar-wrapper">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <router-link to="/portal/index">
          <span class="primary-word">^_^</span> 
        </router-link>
      </header>
      <h5 class="navTitle first">
        COVID-19 分析
      </h5>
      <ul class="nav">
        <!-- 趋势分析 -->
        <NavLink
            :activeItem="activeItem"
            header="趋势分析"
            iconName="fa-line-chart"
            link='/portal/trends'
            index="trends"
            isHeader
            :childrenLinks="[
              { header: '确诊个案趋势', iconName:'fa-stethoscope', link: '/portal/trends/conf-trends' },
              { header: '治愈个案趋势', iconName:'fa-heartbeat', link: '/portal/trends/cured-trends' },
              { header: '病亡个案趋势', iconName:'fa-ambulance', link: '/portal/trends/demise-trends' },
            ]"
        />
        <!-- 疫情地图 -->
        <NavLink
            :activeItem="activeItem"
            header="疫情地图"
            link="/portal/maps"
            iconName="fa-globe"
            index="maps"
            isHeader
            :childrenLinks="[
              { header: '国内疫情地图', iconName:'fa-street-view', link: '/portal/maps/dom-maps' },
              { header: '各地疫情地图', iconName:'fa-location-arrow ', link: '/portal/maps/prov-maps' },
            ]"
        />
        <!-- 分类 -->
        <NavLink
            :activeItem="activeItem"
            header="数据分类"
            link="/portal/class"
            iconName="fa-cubes"
            index="class"
            isHeader
            :childrenLinks="[
              { header: '分类概览', iconName:'fa-street-view', link: '/portal/class' },
              { header: '算法效果视图', iconName:'fa-location-arrow', link: '/portal/class/algos' },
            ]"
        />
      </ul>
       <h5 class="navTitle">
          “内卷”微博文本分析
       </h5>
      <ul class="nav">
        <!-- 趋势分析 -->
        <NavLink
            :activeItem="activeItem"
            header="热度趋势"
            iconName="fa-external-link-square"
            link='/portal/how'
            index="how"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="热点分析"
            link="/portal/what"
            iconName="fa-certificate"
            index="what"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="人群画像"
            link="/portal/who"
            iconName="fa-users"
            index="who"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="社会心态"
            link="/portal/sentiment"
            iconName="fa-comments"
            index="sentiment"
            isHeader
        />
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'danger',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'primary',
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
