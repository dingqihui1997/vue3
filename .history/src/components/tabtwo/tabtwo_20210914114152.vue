<template>
  <el-form :model="form" :rules="rules" ref="submit">
    <el-form-item prop="pic" label="商品图片">
      <el-upload
        action="http://localhost:5000/admin/upload"
        :headers="header"
        :on-success="Imgsuccess"
        list-type="picture-card"
        :show-file-list="true"
        :on-remove="handleRemove"
      >
        <template #default>
          <i class="el-icon-plus"></i>
        </template>
        <template #file="{ file }">
          <div>
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <div class="flex-a">
      <span>点击预览大图</span>
      <el-image
        v-if="src"
        style="width: 200px; height: 100px"
        :src="src"
        :preview-src-list="pic"
      >
      </el-image>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
let header = ref<any>({ Authorization: localStorage.getItem("token")! });
let disabled = ref(false);
let submit = ref<any>(null);
let pic = ref<any[]>([]);
let src = ref("");
interface form1 {
  //表单验证
  pic: string;
}
let form = ref<form1>({ pic: "" });
let rules = ref<any>({
  pic: [{ required: true, message: "图片为必传项", trigger: "blur" }],
});
let Imgsuccess = (e: any) => {
  console.log(e);
  pic.value.push(e.data);
  src.value = pic.value[0];
};
let handleRemove = (file: any, fileList: any) => {
  console.log(fileList);
};
let handlePictureCardPreview = () => {};
</script>

<style scoped>
</style>