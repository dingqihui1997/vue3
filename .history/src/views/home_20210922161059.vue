<template>
  <div class="flex color3f">
    <div class="flex1 order">
      <div>{{ user && user.orderCount }}</div>
      <div class="mat10">订单总数</div>
    </div>
    <div class="flex1 goods">
      <div>
        {{ user && user.goodsCount }}
      </div>
      <div class="mat10">商品总数</div>
    </div>
    <div class="flex1 user">
      <div>{{ user && user.userCount }}</div>
      <div class="mat10">用户总数</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../http/api";
interface obj {
  goodsCount: 15;
  orderCount: 4;
  userCount: 6;
}
let user = ref<obj>();
let getIndex = () => {
  api
    .getIndex()
    .then((res) => {
      user.value = res.data;
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
  padding: 20px 10px;
}
.goods {
  margin-right: 20px;
  background: #30b95c;
  height: 100px;
  padding: 20px 10px;
}
.user {
  background: #1f2d3d;
  height: 100px;
  padding: 20px 10px;
}
</style>