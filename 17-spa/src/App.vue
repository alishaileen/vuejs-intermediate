<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  // watch: {
  //   $route(to) {
  //     document.title = to.meta.title;
  //   },
  //   immediate: true,
  // },
};
</script>
