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
        <el-tab-pane label="商品规格" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="商品详情" name="4">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import tab1 from "../../components/tabOne/tabOne.vue";
import tabtwo from "../../components/tabtwo/tabtwo.vue";
let show = ref(true);
let basic = ref<any>({}); //基础信息
let pic = ref<string[]>([]);
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
let picture = (e: any) => {
  //接收图片
  activeName.value = "3";
  pic.value = e;
  console.log(e);
};
</script>

<style scoped>
</style>