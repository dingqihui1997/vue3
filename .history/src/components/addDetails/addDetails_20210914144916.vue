<template>
  <div>
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item prop="detail"></el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import E from "wangeditor";
let submit = ref<any>(null);
interface form1 {
  //表单验证
  detail: string;
}
let form = ref<form1>({ detail: "" });
let rules = ref<any>({
  detail: [{ required: true, message: "图片为必传项", trigger: "blur" }],
});
const editor = new E(document.getElementById("div1"));
</script>

<style scoped>
</style>