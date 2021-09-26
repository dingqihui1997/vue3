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
    <div></div>
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