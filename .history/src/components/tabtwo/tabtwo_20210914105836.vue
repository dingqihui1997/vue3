<template>
  <el-upload
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    :on-success="success"
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

<script setup>
import { ref } from "vue";
let dialogImageUrl = ref("");
let dialogVisible = ref(false);
let disabled = ref(false);
let success = (e) => {
  console.log(e);
};
</script>

<style lang="scss" scoped>
</style>