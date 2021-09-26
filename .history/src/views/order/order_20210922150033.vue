<template>
  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="user_id"
        label="用户名称"
        align="center"
        width="220"
      >
      </el-table-column>
      <el-table-column prop="content" label="订单日期" align="center">
        <template #default="scoped">
          <div>
            {{ dayjs(scoped.row.pay_time).format("YYYY-MM-DD HH:mm:ss") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="商品数量" align="center">
      </el-table-column>
      <el-table-column prop="price" label="订单价格" align="center">
      </el-table-column>
      <el-table-column prop="goods_list" label="商品名称" align="center">
        <template #default="scoped">
          <div v-for="(item, index) in scoped.row.goods_list" :key="index">
            {{ item.goods.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="订单地址" align="center">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../../http/api";
import dayjs from "dayjs";
let tableData = ref<any[]>([]);

// 获取订单
let getOrder = () => {
  api
    .getOrder()
    .then((res) => {
      console.log(res);
      tableData.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  getOrder();
  dayjs();
});
</script>

<style scoped>
</style>