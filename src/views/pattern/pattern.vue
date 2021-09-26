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
      >添加模型</el-button
    >
    <el-table :data="tableData" style="width: 100% margin-top:10px">
      <el-table-column type="index" label="#" align="center" width="80">
      </el-table-column>
      <el-table-column prop="name" label="模型名称" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scoped">
          <el-button type="primary" size="mini" @click="eidt(scoped.row)">
            编辑</el-button
          >
          <el-button type="primary" size="mini" @click="gotoadd(scoped.row)">
            添加规格</el-button
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
    :title="num ? '添加模型' : '编辑模型'"
    v-model="Visible"
    width="550px"
    :destroy-on-close="true"
  >
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item label="模型名称" prop="name">
        <el-input v-model="form.name"></el-input>
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
import { useRouter } from "vue-router";
import api from "../../http/api";
let router = useRouter();
let Visible = ref(false);
let query = ref<string>("");
let tableData = ref<any[]>([]);
let header = ref<any>({ Authorization: localStorage.getItem("token")! });
let submit = ref<any>(null);
let current = ref(1); //页数
let pageSize = ref(5);
let total = ref(0);
let num = ref(1);
let id = ref<string>("");
interface form1 {
  //表单验证
  name: string;
}
let form = ref<form1>({
  name: "",
});
let rules = ref<any>({
  name: [{ required: true, message: "模型名称不能为空", trigger: "blur" }],
});
//添加轮播图按钮
let add = () => {
  Visible.value = true;
  form.value = {
    name: "",
  };
  num.value = 1;
};

let submitForm = () => {
  submit.value!.validate((valid: boolean) => {
    if (valid) {
      if (num.value) {
        //添加
        api
          .addModel(form.value)
          .then((res: any) => {
            if (res.code === 200) {
              ElMessage.success(res.msg);
              getModel();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .updateModel({
            id: id.value,
            name: form.value.name,
          })
          .then((res: any) => {
            if (res.code === 200) {
              ElMessage.success(res.msg);
              getModel();
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
  getModel();
});
let getModel = () => {
  api
    .getModel({
      current: current.value,
      pageSize: pageSize.value,
      query: query.value,
    })
    .then((res: any) => {
      console.log(res);
      tableData.value = res.data;
      total.value = res.total;
    })
    .catch((err) => {
      console.log(err);
    });
};
let gotoadd = (e: any) => {
  //跳转添加规格
  router.push({
    path: "/norms",
    query: {
      id: e._id,
    },
  });
};
//分页
let handleSizeChange = (val: number) => {
  pageSize.value = val;
  getModel();
};
let handleCurrentChange = (val: number) => {
  current.value = val;
  getModel();
};
// 删除
let del = (e: string) => {
  api
    .delModel(e)
    .then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        ElMessage.success(res.msg);
        getModel();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
let eidt = (e: any) => {
  //编辑
  Visible.value = true;
  form.value = { ...e };
  num.value = 0;
  id.value = e._id;
};
let search = () => {
  //搜索
  if (query.value) {
    getModel();
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