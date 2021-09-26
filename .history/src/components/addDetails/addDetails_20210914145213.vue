<template>
  <div>
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item prop="detail">
        <div id="div1"></div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import E from "wangeditor";
import { ref, onMounted } from "vue";
let submit = ref<any>(null);
interface form1 {
  //表单验证
  detail: string;
}
let form = ref<form1>({ detail: "" });
let rules = ref<any>({
  detail: [{ required: true, message: "图片为必传项", trigger: "blur" }],
});
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