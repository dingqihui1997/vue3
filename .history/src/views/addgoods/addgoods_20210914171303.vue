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
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="url" label="图片" align="center">
        <template #default="scoped">
          <img :src="scoped.row.url" style="width: 120px; height: 40px" />
        </template>
      </el-table-column>
      <el-table-column prop="url" label="路径" align="center" width="600">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="isShow" label="是否显示" align="center">
        <template #default="scoped">
          <el-switch
            v-model="scoped.row.isShow"
            @change="close(scoped.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scoped">
          <el-button type="primary" size="mini" @click="eidt(scoped.row)">
            编辑</el-button
          >
          <el-popconfirm
            title="确定删除该条数据吗？"
            @confirm="del(scoped.row._id)"
          >
            <template #reference>
              <el-button type="danger" plain size="mini">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-card v-else>
    <div class="wi100">
      <div class="flex-sb">
        <div>添加商品</div>
        <div @click="close"><i class="el-icon-close"></i></div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础设置" name="1">
          <tab1 @send="send" v-model:activeName="activeName"></tab1>
        </el-tab-pane>
        <el-tab-pane
          label="媒体信息"
          name="2"
          :disabled="Number(activeName) < 2"
        >
          <tabtwo @send="send" v-model:activeName="activeName"></tabtwo>
        </el-tab-pane>
        <el-tab-pane
          label="商品规格"
          name="3"
          :disabled="Number(activeName) < 3"
        >
          <tabsku @send="send" v-model:activeName="activeName"></tabsku>
        </el-tab-pane>
        <el-tab-pane
          label="商品详情"
          name="4"
          :disabled="Number(activeName) < 4"
        >
          <addDetails @send="send" v-model:activeName="activeName"></addDetails>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../../http/api";
import tab1 from "../../components/tabOne/tabOne.vue";
import tabtwo from "../../components/tabtwo/tabtwo.vue";
import tabsku from "../../components/tabsku/tabsku.vue";
import addDetails from "../../components/addDetails/addDetails.vue";
let show = ref(true);
let basic = ref<any>({}); //基础信息
let pic = ref<string[]>([]); //媒体图片信息
let sku = ref<any>([]); //商品规格
let adddetail = ref<any>({}); //商品详情
let query = ref("");
let current = ref(1); //页数
let pageSize = ref(5);
let total = ref(0);
let activeName = ref("1");
let tableData = ref<any[]>([]);
let add = () => {
  //添加商品
  show.value = false;
};
let close = () => {
  show.value = true;
};
let search = () => {};
let send = (e: any) => {
  adddetail.value = { ...adddetail.value, ...e };
  if (activeName.value === "4") {
    console.log(adddetail.value);
    api
      .addGoods(adddetail.value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    show.value = true;
  }
};
onMounted(() => {
  //获取商品列表
  getGoods();
});
let getGoods = () => {
  api
    .getGoods({
      current: current.value,
      pageSize: pageSize.value,
      query: query.value,
    })
    .then((res: any) => {
      console.log(res);
      tableData.value = res.data;
      total.value = res.total;
    })
    .catch((err) => {
      console.log(err);
    });
};
let handleSizeChange = (val: number) => {
  pageSize.value = val;
  getGoods();
};
let handleCurrentChange = (val: number) => {
  current.value = val;
  getGoods();
};
</script>

<style scoped>
</style>