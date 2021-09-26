<template>
  <router-view></router-view>
</template>

<style lang='scss'>
@import "./styles/common.scss";
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app,
.el-container,
.el-menu {
  height: 100% !important;
}

.el-main {
  background-color: #f0f2f5 !important;
}
</style>