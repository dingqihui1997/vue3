<template>
  <el-card>
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item label="商品模型" prop="content">
        <el-select
          v-model="form.content"
          placeholder="请选择"
          style="height: 30px"
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
    <div>
      <div id="div1" style="z-index: -1; position: relative"></div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import E from "wangeditor";
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
onMounted(() => {
  getGoods();
  const editor = new E(document.getElementById("div1"));
  editor.create();
  editor.config.onchange = function (newHtml: any) {
    form.value.content = newHtml;
  };
});
</script>

<style scoped>
</style>