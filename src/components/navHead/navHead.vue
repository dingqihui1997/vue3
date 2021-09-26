<template>
  <div class="flex-sba hei100 headtop">
    <div @click="toggle">
      <el-icon-expand v-if="isCollapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </div>
    <div class="flex-ja">
      <div>
        <iframe
          width="350"
          height="25"
          frameborder="0"
          scrolling="no"
          hspace="0"
          src="https://i.tianqi.com/?c=code&id=40"
        ></iframe>
      </div>
      <el-dropdown>
        <div class="flex-a">
          <img src="../../assets/user.png" class="user" />{{ user }}
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="out">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown>
        <div>
          <img src="../../assets/yuyan.png" class="yuyan" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="click('zh-CN')"
              >切换中文</el-dropdown-item
            >
            <el-dropdown-item @click="click('id-ID')"
              >切换繁体</el-dropdown-item
            >
            <el-dropdown-item @click="click('en-US')"
              >切换英语</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n"; //引入语言文件
const { locale } = useI18n();
let router = useRouter();
let user = localStorage.getItem("username");
const click = (val: string) => {
  locale.value = val;
  localStorage.setItem("language", locale.value);
};

let props = defineProps({
  //接收父组件传过来的值
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
let emits = defineEmits(["update:isCollapse"]); //分发事件
let toggle = () => {
  emits("update:isCollapse", !props.isCollapse);
};
let out = () => {
  //退出登录
  localStorage.clear();
  router.push("/login");
};
</script>

<style scoped>
svg {
  width: 20px;
  height: 20px;
}
.user {
  width: 25px;
  height: 25px;
  margin: 0 10px;
}
.yuyan {
  width: 25px;
  height: 25px;
  margin-left: 10px;
  margin-right: 10px;
}
.headtop {
  padding: 0 10px;
}
</style>