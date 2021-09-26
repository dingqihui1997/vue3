<template>
  <e
  components: { tab1 },l-card v-if="show">
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
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="1">         <tab-1></tab-1>
</el-tab-pane>
        <el-tab-pane label="配置管理" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="4">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import tab1 from "../../components/tab1/tab1.vue";
let show = ref(true);
let activeName = ref("1");
let add = () => {
  //添加商品
  show.value = false;
};
</script>

<style scoped>
</style>