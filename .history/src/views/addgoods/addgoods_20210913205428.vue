<template>
  <el-card>
    <el-input placeholder="请输入" v-model="query" style="width: 350px">
    </el-input>
    <el-button
      icon="el-icon-search"
      style="margin-left: -5px"
      @click="search"
    ></el-button>
  </el-card>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>