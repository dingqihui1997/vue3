<template>
  <el-menu
    :uniqueOpened="true"
    class="el-menu-vertical-demo"
    :default-active="route.meta.index"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <template v-for="(item, index) in data" :key="index">
      <el-menu-item :index="item.url" v-if="!item.children">
        <component :is="`el-icon${toLine(item.icon)}`"></component>
        <template #title>{{ $t(item.t) }}</template>
      </el-menu-item>
      <el-sub-menu v-if="item.children" :index="item.url">
        <template #title>
          <component :is="`el-icon${toLine(item.icon)}`"></component>
          <span>{{ $t(item.t) }}</span>
        </template>
        <el-menu-item
          :index="item1.url"
          v-for="(item1, index1) in item.children"
          :key="index1"
        >
          <component :is="`el-icon${toLine(item1.icon)}`"></component>
          <template #title>
            {{ $t(item1.t) }}
          </template>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import i18n from "../../language/index";
import { onMounted, ref } from "vue";
import { toLine } from "../../utils/index";
import { useRoute } from "vue-router"; //导入路由
let route = useRoute();

let props = defineProps({
  //接收父组件传值
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
let data = ref<any>([
  {
    name: "首页",
    url: "/",
    icon: "User",
    t: "home",
  },
  {
    name: "轮播图管理",
    url: "/rotation",
    icon: "PictureFilled",
    t: "Carousel_management",
  },
  {
    name: "导航管理",
    url: "/navigation",
    icon: "Document",
    t: "Navigation_management",
  },
  {
    name: "推荐导航",
    url: "/recommend",
    icon: "Notebook",
    t: "Recommended_navigation",
  },
  {
    name: "用户管理",
    url: "/user",
    icon: "User",
    t: "User_Management",
  },
  {
    name: "商品管理",
    url: "/goods",
    icon: "CopyDocument",
    t: "Goods_Management",

    children: [
      {
        name: "添加商品",
        url: "/addgoods",
        icon: "DocumentAdd",
        t: "Adding_goods",
      },
      {
        name: "商品分类",
        url: "/categories",
        icon: "DocumentCopy",
        t: "Categories",
      },
      {
        name: "商品模型",
        url: "/pattern",
        icon: "Operation",
        t: "Commodity_model",
      },
      {
        name: "商品规格",
        url: "/norms",
        icon: "DocumentRemove",
        t: "Product_specifications",
      },
      {
        name: "商品参数",
        url: "/parameter",
        icon: "Connection",
        t: "Product_parameters",
      },
      {
        name: "规格参数",
        url: "/specifications",
        icon: "Share",
        t: "Specifications",
      },
    ],
  },
  {
    name: "秒杀管理",
    url: "/seckill",
    icon: "Timer",
    t: "Spike_management",
  },
  {
    name: "优惠券管理",
    url: "/coupon",
    icon: "List",
    t: "Coupon_management",
  },
  {
    name: "订单管理",
    url: "/order",
    icon: "DocumentCopy",
    t: "Order_management",
  },
  {
    name: "通知管理",
    url: "/notice",
    icon: "Bell",
    t: "Notification_management",
  },
  {
    name: "客服管理",
    url: "/news",
    icon: "ChatDotRound",
    t: "Customer_Service_Management",
  },
]);
</script>

<style scoped lang="scss">
svg {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.el-sub-menu   {
  .el-menu-item {
    min-width: 199px !important;
  }
}
</style>