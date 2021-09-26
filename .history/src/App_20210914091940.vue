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

.el-sub-menu  .el-menu-item  {
    min-width: 190px !important;
}
</style>