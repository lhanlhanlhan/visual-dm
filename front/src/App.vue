<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    const currentPath = this.$router.history.current.path;

    if (currentPath === "/" || currentPath === "/portal") {
      this.$router.push("/portal/index");
    }
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
