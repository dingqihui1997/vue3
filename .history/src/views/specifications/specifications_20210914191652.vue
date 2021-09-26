<template>
  <el-card>
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item label="所属商品" prop="content">
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
    <div style="z-index: 99; position: relative">
      <div id="div1">
        <p v-html="specParams"></p>
      </div>
    </div>
    <div class="flex-end mat10">
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import E from "wangeditor";
import { ref, onMounted, watch } from "vue";
import api from "../../http/api";
import { ElMessage } from "element-plus";
let tableData = ref<any[]>([]);
let submit = ref<any>(null);
let specParams = ref<any>();
interface form1 {
  //表单验证
  content: string;
}
let form = ref<form1>({
  content: "",
});
let change = (e: string) => {
  api
    .getSpecParams({ parentId: e })
    .then((res) => {
      specParams.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
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
let submitForm = () => {
  submit.value!.validate((valid: boolean) => {
    if (valid && specParams.value) {
      api
        .addSpecParams({
          parentId: form.value.content,
          specParams: specParams.value,
        })
        .then((res: any) => {
          console.log(res);
          if (res.code === 200) {
            // const editor = new E(document.getElementById("div1"));
            // editor.txt.clear();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      ElMessage.error("请填写完整信息");
    }
  });
};
onMounted(() => {
  getGoods();
  const editor = new E(document.getElementById("div1"));
  editor.create();
  editor.config.onchange = function (newHtml: any) {
    specParams.value = newHtml;
  };
});
</script>

<style scoped>
</style>