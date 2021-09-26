<template>
  <div class="flex">
    <div class="flex1 order">
      <div></div>
    </div>
    <div class="flex1 goods">11111111111</div>
    <div class="flex1 user">用户000</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import api from "../http/api";

let getIndex = () => {
  api
    .getIndex()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  getIndex();
});
</script>

<style scoped lang="scss">
.order {
  margin-right: 20px;
  background: #e64241;
  height: 100px;
}
.goods {
  margin-right: 20px;
  background: #30b95c;
  height: 100px;
}
.user {
  background: #1f2d3d;
  height: 100px;
}
</style>