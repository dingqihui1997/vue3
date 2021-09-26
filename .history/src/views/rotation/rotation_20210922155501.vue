<template>
  <el-card class="box-card">
    <el-input placeholder="请搜索" v-model="query" style="width: 350px">
    </el-input>
    <el-button
      icon="el-icon-search"
      style="margin-left: -5px"
      @click="search"
    ></el-button>
    <el-button type="primary" style="margin-left: 10px" @click="add"
      >添加轮播图</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" align="center"> </el-table-column>
      <el-table-column prop="url" label="图片" align="center">
        <template #default="scoped">
          <img :src="scoped.row.url" style="width: 120px; height: 40px" />
        </template>
      </el-table-column>
      <el-table-column prop="url" label="路径" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="url" label="链接" align="center">
      </el-table-column>
      <el-table-column prop="isShow" label="是否显示" align="center">
        <template #default="scoped">
          <el-switch
            v-model="scoped.row.isShow"
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
    :title="num ? '添加轮播图' : '编辑轮播图'"
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
      <el-form-item label="图片标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="图片链接" prop="link">
        <el-input v-model="form.link"></el-input>
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
let url = ref(""); //图片预览
let imglist = ref<string[]>([]);
let current = ref(1); //页数
let pageSize = ref(5);
let total = ref(0);
let num = ref(1);
let id = ref<string>("");
let submit = ref<any>(null);
interface form1 {
  //表单验证
  url: string;
  title: string;
  link: string;
}
let form = ref<form1>({
  url: "",
  title: "",
  link: "",
});
let rules = ref<any>({
  url: [{ required: true, message: "图片为必传项", trigger: "blur" }],
});
//添加轮播图按钮
let add = () => {
  Visible.value = true;
  form.value = { url: "", title: "", link: "" };
  url.value = "";
  num.value = 1;
};
let Imgsuccess = (e: any) => {
  //图片上传成功
  console.log(e);
  url.value = e.data;
  imglist.value[0] = e.data;
  form.value.url = e.data;
};
let submitForm = () => {
  submit.value!.validate((valid: boolean) => {
    if (valid) {
      if (num.value) {
        //添加
        api
          .addBanner(form.value)
          .then((res: any) => {
            if (res.code === 200) {
              ElMessage.success(res.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .updateBanner({
            id: id.value,
            url: form.value.url,
            title: form.value.title,
            link: form.value.link,
          })
          .then((res: any) => {
            if (res.code === 200) {
              ElMessage.success(res.msg);
              getBanner();
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
  getBanner();
});
let getBanner = () => {
  api
    .getBanner({
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
  getBanner();
};
let handleCurrentChange = (val: number) => {
  current.value = val;
  getBanner();
};
//修改状态
let close = (e: any) => {
  api
    .showBanner({ id: e._id, isShow: e.isShow })
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
    .delBanner(e)
    .then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        ElMessage.success(res.msg);
        getBanner();
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
  form.value = { ...e };
  url.value = e.url;
  imglist.value[0] = e.url;
  num.value = 0;
  id.value = e._id;
};
let search = () => {
  //搜索
  if (query.value) {
    getBanner();
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