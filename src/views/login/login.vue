<template>
  <div class="loginbox boxcenter">
    <div class="font20 flex-ja Lite font-w7 margin-b10">小米Lite</div>
    <div class="a0a0 font14 flex-ja margin-b20">
      欢迎来到小米lite后台管理系统
    </div>
    <div class="flex-ja">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="submit"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" style="width: 500px"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from "../../http/api";
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
let router = useRouter();
let submit = ref<any>(null);
interface Obj {
  username: string;
  password: string;
}
let ruleForm = ref<Obj>({
  username: "",
  password: "",
});
let rules = ref<any>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 8, message: "长度在 5到 8个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
  ],
});
let submitForm = () => {
  submit.value!.validate((valid: boolean) => {
    if (valid) {
      //校验通过
      api
        .login(ruleForm.value)
        .then((res: any) => {
          if (res.code === 200) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.data.username);
            router.push("/");
          } else {
            ElMessage.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
onMounted(() => {});
// 验证表单
</script>

<style scoped>
.loginbox {
  width: 600px;
  height: 500px;
}
.Lite {
  margin-top: 20px;
}
</style>