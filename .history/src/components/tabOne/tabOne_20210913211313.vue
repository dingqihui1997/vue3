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
</script>

<style lang="scss" scoped>
</style>