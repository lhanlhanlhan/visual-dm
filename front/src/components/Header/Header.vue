<template>
  <b-navbar class="header d-print-none app-header">
    <b-nav>
      <b-nav-item>
        <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
          <i class='fi flaticon-menu' />
        </a>
        <a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
          <i class='fi flaticon-menu' />
        </a>
      </b-nav-item>
    </b-nav>
    <b-nav>
      <b-form class="d-sm-down-none ml-5" inline>
        <b-form-group>
          <b-input-group class="input-group-no-border">
            <template v-slot:prepend>
              <b-input-group-text><i class='fi flaticon-search-2'/></b-input-group-text>
            </template>
            <b-form-input disabled id="search-input" placeholder="搜寻..." />
          </b-input-group>
        </b-form-group>
      </b-form>
    </b-nav>
    <b-nav class="navbarBrand d-sm-down-none">
      Visual DM by ^_^
    </b-nav>
    <a class="navbarBrand d-md-none">
      <i class="fa fa-circle text-danger" />
      &nbsp;
      ^_^
      &nbsp;
      <i class="fa fa-circle text-primary" />
    </a>
    <b-nav class="ml-auto">
      <b-nav-item-dropdown id="v-step-2" class="settingsDropdown d-sm-down-none" no-caret right>
        <template slot="button-content">
          <i class='fi flaticon-settings-10 px-2' />
        </template>
        <b-dropdown-item-button>
          <i class="fi flaticon-power-1 px-3 mr-3" />
          ? 您有事儿吗
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
    </b-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState('layout', ['sidebarClose', 'sidebarStatic']),
  },
  methods: {
    ...mapActions('layout', ['toggleSidebar', 'switchSidebar', 'changeSidebarActive']),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    toggleSidebarMethod() {
      if (this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      } else {
        this.toggleSidebar();
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    }
  }
};
</script>

<style src="./Header.scss" lang="scss"></style>
