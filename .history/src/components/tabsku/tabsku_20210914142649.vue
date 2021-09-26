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
        <el-checkbox
          v-model="item.checkd"
          @change="handleCheckAllChange(item, $event)"
          >{{ item.name }}</el-checkbox
        >
        <el-checkbox-group
          v-model="item.checkedList"
          @change="handleCheckedCitiesChange(item, $event)"
        >
          <el-checkbox
            v-for="item1 in item.spec_item"
            :label="item1"
            :key="item1"
            >{{ item1 }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-form-item>
  </el-form>
  <el-divider></el-divider>
  <el-button>取消</el-button
  ><el-button type="primary" @click="submitForm">确认</el-button>
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
  api
    .getSpec({ parentId: e })
    .then((res: any) => {
      res.data.map((item: any) => {
        item.spec_item = item.spec_item.split("\n");
        item.checkedList = [];
        item.checkd = false;
      });
      sku.value = res.data;
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
//全选
let handleCheckAllChange = (item: any, val: boolean) => {
  val ? (item.checkedList = item.spec_item) : (item.checkedList = []);
};
//单选
let handleCheckedCitiesChange = (item: any, val: string[]) => {
  const checkedCount = val.length;
  item.checkd = checkedCount === item.spec_item.length;
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