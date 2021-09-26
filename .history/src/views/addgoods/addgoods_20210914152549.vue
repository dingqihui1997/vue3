<template>
  <el-card v-if="show">
    <el-input placeholder="请输入" v-model="query" style="width: 350px">
    </el-input>
    <el-button
      icon="el-icon-search"
      style="margin-left: -5px"
      @click="search"
    ></el-button>
    <el-button type="primary" @click="add">添加商品</el-button>
  </el-card>
  <el-card v-else>
    <div class="wi100">
      <div class="flex-sb">
        <div>添加商品</div>
        <div><i class="el-icon-close"></i></div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础设置" name="1">
          <tab1 @send="send"></tab1>
        </el-tab-pane>
        <el-tab-pane label="媒体信息" name="2">
          <tabtwo @picture="picture"></tabtwo>
        </el-tab-pane>
        <el-tab-pane label="商品规格" name="3">
          <tabsku @spec="spec"></tabsku>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="4">
          <addDetails @detail1="detail1"></addDetails>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "../../http/api";
import tab1 from "../../components/tabOne/tabOne.vue";
import tabtwo from "../../components/tabtwo/tabtwo.vue";
import tabsku from "../../components/tabsku/tabsku.vue";
import addDetails from "../../components/addDetails/addDetails.vue";
let show = ref(true);
let basic = ref<any>({}); //基础信息
let pic = ref<string[]>([]); //媒体图片信息
let sku = ref<any>([]); //商品规格
let adddetail = <any>""; //商品详情
let query = ref("");
let activeName = ref("1");
let add = () => {
  //添加商品
  show.value = false;
};
let search = () => {};
let send = (e: any) => {
  basic.value = e;
  activeName.value = "2";
};
//接收图片
let picture = (e: any) => {
  activeName.value = "3";
  pic.value = e;
};
//商品规格
let spec = (e: any) => {
  activeName.value = "4";
  sku.value = e;
};
//详情
let detail1 = (e: string) => {
  adddetail.value = e;
  console.log(basic.value);
  console.log(pic.value);
  console.log(sku.value);
  console.log(adddetail.value);
};
let addgoods = () => {
  // api.addGoods({
  // })
};
</script>

<style scoped>
</style>