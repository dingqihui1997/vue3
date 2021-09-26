<template>
  <div>
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item prop="detail" label="商品详情">
        <div id="div1"></div>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-button>取消</el-button
    ><el-button type="primary" @click="submitForm">确认</el-button>
  </div>
</template>

<script setup lang="ts">
import E from "wangeditor";
import { ref, onMounted } from "vue";
let submit = ref<any>(null);
let emits = defineEmits(["detail"]);
interface form1 {
  //表单验证
  detail: string;
}
let form = ref<form1>({ detail: "" });
let rules = ref<any>({
  detail: [{ required: true, message: "商品详情为必传项", trigger: "blur" }],
});
let submitForm = () => {
  //确定
  submit.value!.validate((valid: boolean) => {
    if (valid) {
      emits("detail", form.value.detail);
    }
  });
};
onMounted(() => {
  const editor = new E(document.getElementById("div1"));
  editor.create();
  editor.config.onchange = function (newHtml: any) {
    form.value.detail = newHtml;
  };
});
</script>

<style scoped>
</style>