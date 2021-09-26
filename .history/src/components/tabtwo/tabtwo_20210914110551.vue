<template>
  <el-upload
    list-type="picture-card"
    :auto-upload="false"
    action="http://localhost:5000/admin/upload"
    :headers="header"
    :on-change="success"
  >
    <template #default>
      <i class="el-icon-plus"></i>
    </template>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
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
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
let header = ref<any>({ Authorization: localStorage.getItem("token")! });
let dialogImageUrl = ref("");
let dialogVisible = ref(false);
let disabled = ref(false);
let success = (e: any) => {
  console.log(e);
};
onMounted(() => {});
</script>

<style lang="scss" scoped>
</style>