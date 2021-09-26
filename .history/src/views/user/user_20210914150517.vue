<template>
  <el-card class="box-card">
    <el-input placeholder="请输入" v-model="query" style="width: 350px">
    </el-input>
    <el-button
      icon="el-icon-search"
      style="margin-left: -5px"
      @click="search"
    ></el-button>
    <el-button type="primary" style="margin-left: 10px" @click="add"
      >添加用户</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="avatar" label="用户头像" align="center">
        <template #default="scoped">
          <img :src="scoped.row.avatar" style="width: 120px; height: 40px" />
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名称"
        align="center"
        width="600"
      >
      </el-table-column>
      <el-table-column prop="mobile" label="用户电话" align="center">
      </el-table-column>
      <el-table-column prop="email" label="用户邮箱" align="center">
      </el-table-column>
      <el-table-column prop="status" label="是否显示" align="center">
        <template #default="scoped">
          <el-switch
            v-model="scoped.row.status"
            @change="close(scoped.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scoped">
          <el-button type="primary" size="mini" @click="eidt(scoped.row)">
            编辑</el-button
          >
          <el-popconfirm
            title="确定删除该条数据吗？"
            @confirm="del(scoped.row._id)"
          >
            <template #reference>
              <el-button type="danger" plain size="mini">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[5, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
  <el-dialog
    :title="num ? '添加用户' : '编辑用户'"
    v-model="Visible"
    width="580px"
    :destroy-on-close="true"
  >
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item label="图片地址" prop="avatar">
        <el-upload
          action="http://localhost:5000/admin/upload"
          :headers="header"
          :on-success="Imgsuccess"
          :show-file-list="false"
        >
          <div class="upload">点击上传图片</div>
        </el-upload>
        <el-image
          v-if="avatar"
          style="width: 200px; height: 100px"
          :src="avatar"
          :preview-src-list="imglist"
        >
        </el-image>
      </el-form-item>
      <el-form-item label="用户名称" prop="username" class="mar-l15">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password" class="mar-l15">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="用户电话" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import api from "../../http/api";
let Visible = ref(false);
let query = ref<string>("");
let tableData = ref<any[]>([]);
let header = ref<any>({ Authorization: localStorage.getItem("token")! });
let avatar = ref(""); //图片预览 用户头像
let imglist = ref<string[]>([]);
let submit = ref<any>(null);
let current = ref(1); //页数
let pageSize = ref(5);
let total = ref(0);
let num = ref(1);
let id = ref<string>("");
interface form1 {
  //表单验证
  avatar: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  status: boolean;
}
let form = ref<form1>({
  avatar: "",
  username: "",
  email: "",
  mobile: "",
  password: "",
  status: false,
});
let rules = ref<any>({
  username: [{ required: true, message: "用户名称必传项", trigger: "blur" }],
  password: [{ required: true, message: "用户密码为必传项", trigger: "blur" }],
});
//添加轮播图按钮
let add = () => {
  Visible.value = true;
  form.value = {
    avatar: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    status: true,
  };
  avatar.value = "";
  num.value = 1;
};
let Imgsuccess = (e: any) => {
  //图片上传成功
  avatar.value = e.data;
  imglist.value[0] = e.data;
  form.value.avatar = e.data;
};
let submitForm = () => {
  submit.value!.validate((valid: boolean) => {
    if (valid) {
      if (num.value) {
        //添加
        api
          .addUser(form.value)
          .then((res: any) => {
            if (res.code === 200) {
              ElMessage.success(res.msg);
              getUser();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .updateUser({
            id: id.value,
            username: form.value.username,
            avatar: form.value.avatar,
            email: form.value.email,
            mobile: form.value.mobile,
            status: form.value.status,
          })
          .then((res: any) => {
            if (res.code === 200) {
              ElMessage.success(res.msg);
              getUser();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      Visible.value = false;
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
onMounted(() => {
  getUser();
});
let getUser = () => {
  api
    .getUser({
      current: current.value,
      pageSize: pageSize.value,
      query: query.value,
    })
    .then((res: any) => {
      tableData.value = res.data;
      total.value = res.total;
    })
    .catch((err) => {
      console.log(err);
    });
};
//分页
let handleSizeChange = (val: number) => {
  pageSize.value = val;
  getUser();
};
let handleCurrentChange = (val: number) => {
  current.value = val;
  getUser();
};
//修改状态
let close = (e: any) => {
  api
    .showUser({ id: e._id, status: e.status })
    .then((res: any) => {
      if (res.code === 200) {
        ElMessage.success(res.msg);
      }
    })
    .catch((err) => console.log(err));
};
// 删除
let del = (e: string) => {
  api
    .delUser(e)
    .then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        ElMessage.success(res.msg);
        getUser();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
let eidt = (e: any) => {
  //编辑
  Visible.value = true;
  console.log(e);
  form.value = e;
  avatar.value = e.avatar;
  imglist.value[0] = e.avatar;
  num.value = 0;
  id.value = e._id;
};
let search = () => {
  //搜索
  if (query.value) {
    getUser();
  }
};
watch: {
}
</script>

<style scoped>
.upload {
  color: #2190ff;
}
</style>