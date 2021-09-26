<template>
  <div class="flex">
    <div class="flex1 order">
      <div>{{ user.orderCount }}</div>
      <div>订单总数</div>
    </div>
    <div class="flex1 goods">
      <div>
        {{ user.goodsCount }}
      </div>
      <div>商品总数</div>
    </div>
    <div class="flex1 user">用户000</div>
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
      console.log(res);
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