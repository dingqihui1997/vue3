<template>
  <el-form :model="form" :rules="rules" ref="submit">
    <el-form-item></el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../../http/api";
let data = ref<any>([]);
onMounted(() => {
  getModel();
});
let getModel = () => {
  api
    .getModel({
      current: 1,
      pageSize: 9999,
      query: "",
    })
    .then((res: any) => {
      data.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped>
</style>