<template>
  <div>
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item label="商品名称:" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类:" prop="category">
        <el-cascader
          :options="options"
          :props="props1"
          style="width: 1520px"
          @change="change"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="商品原价:" prop="originalPrice">
        <el-input v-model="form.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品现价:" prop="presentPrice">
        <el-input v-model="form.presentPrice"></el-input>
      </el-form-item>
      <el-form-item label="封面图:" prop="cover">
        <el-upload
          action="http://localhost:5000/admin/upload"
          :headers="header"
          :on-success="Imgsuccess"
          :show-file-list="false"
        >
          <div class="upload">点击上传图片</div>
        </el-upload>
        <el-image
          v-if="form.cover"
          style="width: 200px; height: 100px"
          :src="form.cover"
          :preview-src-list="imglist"
          :on-success="Imgsuccess"
        >
        </el-image>
      </el-form-item>
      <el-form-item label="商品单位:" prop="company">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item label="商品库存:" prop="stock">
        <el-input v-model="form.stock"></el-input>
      </el-form-item>
      <el-form-item label="商品简介:" prop="introduction">
        <el-input type="textarea" v-model="form.introduction"></el-input>
      </el-form-item>
      <el-form-item label="推荐介绍:" prop="sellDesc">
        <el-input type="textarea" v-model="form.sellDesc"></el-input>
      </el-form-item>
      <el-form-item
        label="是否新品:"
        prop="isNewGood"
        style="margin-left: 10px"
      >
        <el-switch v-model="form.isNewGood"></el-switch>
      </el-form-item>
      <el-form-item label="是否热销:" prop="isHot" style="margin-left: 10px">
        <el-switch v-model="form.isHot"></el-switch>
      </el-form-item>
      <el-form-item
        label="是否推荐:"
        prop="isRecommend"
        style="margin-left: 10px"
      >
        <el-switch v-model="form.isRecommend"></el-switch>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-button @click="back">取消</el-button
    ><el-button type="primary" @click="submitForm">确认</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../../http/api";
let header = ref<any>({ Authorization: localStorage.getItem("token")! });
let url = ref(""); //图片预览
let submit = ref<any>(null);
let imglist = ref<string[]>([]);
let options = ref<any>([]);
let emits = defineEmits(["send", "update:activeName"]);
let props = defineProps({
  activeName: {
    type: String,
    required: true,
  },
});
interface cascader {
  value: string;
  label: string;
  children: string;
}
let props1 = ref<cascader>({
  value: "_id",
  label: "name",
  children: "list",
});
interface form1 {
  name: string;
  category: string;
  originalPrice: string;
  presentPrice: string;
  cover: string;
  company: string;
  stock: string;
  introduction: string;
  sellDesc: string;
  isNewGood: boolean;
  isHot: boolean;
  isRecommend: boolean;
}
let form = ref<form1>({
  name: "",
  category: "",
  originalPrice: "",
  presentPrice: "",
  cover: "",
  company: "",
  stock: "",
  introduction: "",
  sellDesc: "",
  isNewGood: true,
  isHot: true,
  isRecommend: true,
});
let rules = ref<any>({
  name: [{ required: true, message: "商品名称为必传项", trigger: "blur" }],
  category: [{ required: true, message: "商品分类为必传项", trigger: "blur" }],
  originalPrice: [
    { required: true, message: "商品原价为必传项", trigger: "blur" },
  ],
  presentPrice: [
    { required: true, message: "商品现价为必传项", trigger: "blur" },
  ],
  cover: [{ required: true, message: "封面图为必传项", trigger: "blur" }],
  company: [{ required: true, message: "商品单位为必传项", trigger: "blur" }],
  stock: [{ required: true, message: "商品库存为必传项", trigger: "blur" }],
  introduction: [
    { required: true, message: "商品简介为必传项", trigger: "blur" },
  ],
  sellDesc: [{ required: true, message: "推荐介绍为必传项", trigger: "blur" }],
});
let change = (e: string) => {
  form.value.category = e[e.length - 1];
  console.log(e);
};
let Imgsuccess = (e: any) => {
  //图片上传成功
  console.log(e);
  imglist.value[0] = e.data;
  form.value.cover = e.data;
};
onMounted(() => {
  api
    .getCategory("")
    .then((res) => {
      options.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
let submitForm = () => {
  submit.value!.validate((valid: boolean) => {
    if (valid) {
      emits("send", form.value);
      emits("update:activeName", "2");
    }
  });
};
let back = () => {
  //
  emits("update:activeName", "1");
};
</script>

<style lang="scss" scoped>
</style>