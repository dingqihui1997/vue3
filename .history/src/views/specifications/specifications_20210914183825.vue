<template>
  <el-card>
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item label="商品模型" prop="content">
        <el-select
          v-model="form.content"
          placeholder="请选择"
          style="height: 30px"
          @change="change"
        >
          <el-option
            v-for="(item, index) in tableData"
            :key="index"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import api from "../../http/api";
let tableData = ref<any[]>([]);

interface form1 {
  //表单验证
  content: string;
}
let form = ref<form1>({
  content: "",
});
let rules = ref<any>({
  content: [{ required: true, message: "参数名称为必传项", trigger: "blur" }],
});
let getGoods = () => {
  api
    .getGoods({
      current: 1,
      pageSize: 99999,
      query: "",
    })
    .then((res: any) => {
      tableData.value = res.data;
    })
    .catch((err: any) => {
      console.log(err);
    });
};
</script>

<style scoped>
</style>