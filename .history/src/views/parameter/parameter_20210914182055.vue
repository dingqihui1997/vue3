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
    <el-table :data="mode" style="width: 100%">
      <el-table-column type="index" label="#" align="center"> </el-table-column>
      <el-table-column prop="name" label="参数名称" align="center" width="600">
      </el-table-column>
      <el-table-column prop="title" label="参数描述" align="center">
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
    <el-dialog
      title="添加导航"
      v-model="Visible"
      width="550px"
      :destroy-on-close="true"
    >
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
        <el-form-item label="参数名称" prop="name">
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
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import api from "../../http/api";
let Visible = ref(false);
let query = ref<string>("");
let tableData = ref<any[]>([]);
let mode = ref<any[]>([]);
let header = ref<any>({ Authorization: localStorage.getItem("token")! });
let url = ref(""); //图片预览
let imglist = ref<string[]>([]);
let submit = ref<any>(null);
let current = ref(1); //页数
let pageSize = ref(5);
let total = ref(0);
let num = ref(1);
let id = ref<string>("");
interface form1 {
  //表单验证
  parentId: string;
  url: string;
  name: string;
  desc: string;
}
let form = ref<form1>({
  parentId: "",
  url: "",
  name: "",
  desc: "",
});
let rules = ref<any>({
  parentId: [{ required: true, message: "参数名称为必传项", trigger: "blur" }],
  name: [{ required: true, message: "参数名称为必传项", trigger: "blur" }],
});
//添加轮播图按钮
let add = () => {
  if (form.value.parentId) {
    Visible.value = true;
  } else {
    ElMessage.error("请选择商品");
  }
};
let change = (e: string) => {
  getParams(e);
};
let submitForm = () => {
  submit.value!.validate((valid: boolean) => {
    if (valid) {
      console.log(form.value);
      api
        .addParams(form.value)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};
let getGoods = () => {
  api
    .getGoods({
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
let Imgsuccess = (e: any) => {
  //图片上传成功
  console.log(e);
  url.value = e.data;
  imglist.value[0] = e.data;
  form.value.url = e.data;
};
onMounted(() => {
  getGoods();
});

let getParams = (e: string) => {
  api
    .getParams({ parentId: e })
    .then((res) => {
      mode.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
// 删除
let del = (e: string) => {
  api
    .delNav(e)
    .then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        ElMessage.success(res.msg);
        getNav();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

let search = () => {
  //搜索
  if (query.value) {
    getNav();
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