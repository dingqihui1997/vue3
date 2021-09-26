<template>
  <el-card>
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item label="商品模型" prop="parentId">
        <el-select
          v-model="form.parentId"
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
        <el-button type="primary" style="margin-left: 10px" @click="add"
          >添加参数</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>