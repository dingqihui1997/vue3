<template>
  <div>
    <el-upload
      action="http://localhost:5000/admin/upload"
      :headers="header"
      :on-success="Imgsuccess"
      list-type="picture-card"
      :auto-upload="false"
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
let disabled = ref(false);
let Imgsuccess = (e: any) => {
  console.log(e);
};
</script>

<style scoped>
</style>