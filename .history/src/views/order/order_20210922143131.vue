<template>
  <el-card> </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import api from "../../http/api";
// 获取订单
let getOrder = () => {
  api
    .getOrder()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
onMounted(() => {});
</script>

<style scoped>
</style>