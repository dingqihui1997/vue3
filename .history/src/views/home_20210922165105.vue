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
  <div class="flex chart">
    <div class="flex1" id="main"></div>
    <div class="flex1"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../http/api";
import * as echarts from "echarts";
import dayjs from "dayjs";
let record = ref<number[]>([
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]);
interface obj {
  goodsCount: 15;
  orderCount: 4;
  userCount: 6;
}
let user = ref<obj>();
// 获取首页数据
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
// 获取订单列表
let getOrder = () => {
  api
    .getOrder()
    .then((res) => {
      res.data.map((item: any) => {
        let num = dayjs(Number(item.pay_time)).hour();
        record.value[num] += 1;
      });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(record.value);
  char(record.value);
};
let char = (e: any) => {
  var chartDom = document.getElementById("main")!;
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    xAxis: {
      type: "category",
      data: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: e,
        type: "line",
      },
    ],
  };
  option && myChart.setOption(option);
};
onMounted(() => {
  getIndex();
  getOrder();
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
.chart {
  width: 100%;
  height: 400px;
}
</style>