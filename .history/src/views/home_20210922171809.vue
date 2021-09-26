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
    <div class="flex1" id="div1"></div>
  </div>
  <div id="box1"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../http/api";
import * as echarts from "echarts";
import dayjs from "dayjs";
const start = new Date(new Date().toLocaleDateString()).getTime();
let end = dayjs().endOf("day").valueOf();
let order = ref<number[]>([
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]);
let price = ref<number[]>([
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
      let arr = res.data.filter((item: any, index: number) => {
        return Number(item.pay_time) > start && Number(item.pay_time) < end;
      });
      arr.map((item: any) => {
        let num = dayjs(Number(item.pay_time)).hour();
        order.value[num] += 1;
        price.value[num] += Number(item.price);
      });
      orderChar(order.value);
      priceChar(price.value);
    })
    .catch((err) => {
      console.log(err);
    });
};
let orderChar = (e: any) => {
  var chartDom = document.getElementById("main")!;
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    title: {
      text: "今日订单",
    },
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
let priceChar = (e: any) => {
  var chartDom = document.getElementById("div1")!;
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    title: {
      text: "今日销售额",
    },
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
let categoryChar = (e: any) => {
  var chartDom = document.getElementById("box1")!;
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    title: {
      text: "商品分类",
      left: "left",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "10%",
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: e,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  option && myChart.setOption(option);
};
// 获取分类
let getCategory = () => {
  api
    .getCategory("")
    .then((res) => {
      console.log(res);
      let arr: any = [];
      res.data.map((item: any) => {
        let obj = { name: item.name, value: item.list.length };
        arr.push(obj);
      });
      categoryChar(arr);
    })
    .catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  getIndex();
  getOrder();
  getCategory();
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
#box1 {
  height: 400px;
  width: 800px;
}
</style>