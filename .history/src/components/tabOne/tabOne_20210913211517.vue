<template>
  <div>
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item label="图片地址" prop="url">
        <el-upload
          action="http://localhost:5000/admin/upload"
          :headers="header"
          :on-success="Imgsuccess"
          :show-file-list="false"
        >
          <div class="upload">点击上传图片</div>
        </el-upload>
        <el-image
          v-if="url"
          style="width: 200px; height: 100px"
          :src="url"
          :preview-src-list="imglist"
        >
        </el-image>
      </el-form-item>
      <el-form-item label="导航标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
interface form1 {
  //表单验证
  url: string;
  title: string;
}
let form = ref<form1>({
  url: "",
  title: "",
});
let rules = ref<any>({
  url: [{ required: true, message: "图片为必传项", trigger: "blur" }],
  title: [{ required: true, message: "导航标题为必传项", trigger: "blur" }],
});
// let Imgsuccess = (e:any) => {
  //图片上传成功
  // url.value = e.data;
  // imglist.value[0] = e.data;
  // form.value.url = e.data;
// };
let submitForm = () => {
  // submit.value!.validate((valid: boolean) => {
  //   if (valid) {
 
  //   } else {
  //     console.log("error submit!!");
  //     return false;
  //   }
  });
};
</script>

<style lang="scss" scoped>
</style>