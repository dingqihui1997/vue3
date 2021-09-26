<template>
  <el-card> </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../../http/api";
let tableData = ref<any[]>([]);

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
onMounted(() => {
  getOrder();
});
</script>

<style scoped>
</style>