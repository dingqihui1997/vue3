<template>
  <el-card v-if="show">
    <el-input placeholder="请输入" v-model="query" style="width: 350px">
    </el-input>
    <el-button
      icon="el-icon-search"
      style="margin-left: -5px"
      @click="search"
    ></el-button>
    <el-button type="primary" @click="add">添加商品</el-button>
  </el-card>
  <el-card v-else>
    <div class="wi100">
      <div class="flex-sb">
        <div>添加商品</div>
        <div><i class="el-icon-close"></i></div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"
          >定时任务补偿</el-tab-pane
        >
      </el-tabs>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
let show = ref(true);
let add = () => {
  //添加商品
  show.value = false;
};
</script>

<style scoped>
</style>