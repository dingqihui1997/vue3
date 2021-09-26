<template>
  <el-form :model="form" :rules="rules" ref="submit">
    <el-form-item label="商品模型" prop="mode">
      <el-select
        v-model="form.mode"
        placeholder="请选择"
        style="height: 30px"
        @change="change"
      >
        <el-option
          v-for="(item, index) in data"
          :key="index"
          :label="item.name"
          :value="item._id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品规格">
      <div v-for="(item, index) in sku" :key="index">
        <el-checkbox v-model="item.checkd" @change="handleCheckAllChange">{{
          item.name
        }}</el-checkbox>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../../http/api";
let data = ref<any>([]);
let submit = ref<any>(null);
let sku = ref<any[]>([]);
// let emits = defineEmits(["picture"]);

interface form1 {
  //表单验证
  mode: string;
}
let form = ref<form1>({ mode: "" });
let rules = ref<any>({
  mode: [{ required: true, message: "图片为必传项", trigger: "blur" }],
});
let change = (e: string) => {
  console.log(e);
  api
    .getSpec({ parentId: e })
    .then((res: any) => {
      console.log(res);
      res.data.map((item: any) => {
        item.spec_item = item.spec_item.split("\n");
        item.checkedList = [];
        item.checkd = false;
      });
      sku.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
let handleCheckAllChange = () => {
  //全选
};
let submitForm = () => {
  //确定
  submit.value!.validate((valid: boolean) => {
    if (valid) {
      //   emits("picture", pic.value);
    }
  });
};
onMounted(() => {
  getModel();
});
let getModel = () => {
  api
    .getModel({
      current: 1,
      pageSize: 9999,
      query: "",
    })
    .then((res: any) => {
      data.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped>
</style>