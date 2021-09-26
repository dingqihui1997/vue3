<template>
  <el-container>
    <el-aside width="auto">
      <navLeft :isCollapse="isCollapse"></navLeft>
    </el-aside>
    <el-container>
      <el-header>
        <navHead v-model:isCollapse="isCollapse"></navHead>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import navHead from "../../components/navHead/navHead.vue";
import navLeft from "../../components/navLeft/navLeft.vue";

let isCollapse = ref<boolean>(false);
</script>

<style scoped >
svg {
  width: 20px;
  height: 20px;
}
.el-header {
  height: 50px;
  padding: 0;
}
</style>