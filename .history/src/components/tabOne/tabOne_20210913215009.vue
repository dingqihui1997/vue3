<template>
  <div>
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item label="商品名称:" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类:" prop="category">
        <el-input v-model="form.category"></el-input>
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
        <el-input v-model="form.introduction"></el-input>
      </el-form-item>
      <el-form-item label="推荐介绍:" prop="sellDesc">
        <el-input v-model="form.sellDesc"></el-input>
      </el-form-item>
      <el-form-item label="是否新品:" prop="isNewGood">
        <el-switch v-model="form.isNewGood"></el-switch>
      </el-form-item>
      <el-form-item label="是否热销:" prop="isHot">
        <el-switch v-model="form.isHot"></el-switch>
      </el-form-item>
      <el-form-item label="是否推荐:" prop="isRecommend">
        <el-switch v-model="form.isRecommend"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
let header = ref<any>({ Authorization: localStorage.getItem("token")! });
let url = ref(""); //图片预览
let imglist = ref<string[]>([]);
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
  isNewGood: string;
  isHot: string;
  isRecommend: string;
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
  isNewGood: "",
  isHot: "",
  isRecommend: "",
});
let rules = ref<any>({
  url: [{ required: true, message: "图片为必传项", trigger: "blur" }],
  title: [{ required: true, message: "导航标题为必传项", trigger: "blur" }],
});

let Imgsuccess = (e: any) => {
  //图片上传成功
  console.log(e);
  imglist.value[0] = e.data;
  form.value.cover = e.data;
};

// let submitForm = () => {
// submit.value!.validate((valid: boolean) => {
//   if (valid) {

//   } else {
//     console.log("error submit!!");
//     return false;
//   }
//   });
// };
</script>

<style lang="scss" scoped>
</style>