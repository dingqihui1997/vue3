<template>
  <el-form :model="form" :rules="rules" ref="submit">
    <el-form-item label="商品模型">
      <el-select
        v-model="form.parentId"
        placeholder="请选择"
        style="height: 30px"
        @change="change"
      >
        <el-option
          v-for="(item, index) in Model"
          :key="index"
          :label="item.name"
          :value="item._id"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import api from "../../http/api";
let data = ref<any>([]);
let submit = ref<any>(null);
// let emits = defineEmits(["picture"]);

interface form1 {
  //表单验证
  mode: string;
}
let form = ref<form1>({ mode: "" });
let rules = ref<any>({
  mode: [{ required: true, message: "图片为必传项", trigger: "blur" }],
});
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