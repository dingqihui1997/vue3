<template>
  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="content"
        label="用户名称"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column prop="content" label="通知内容" align="center">
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
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../../http/api";
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
});
</script>

<style scoped>
</style>