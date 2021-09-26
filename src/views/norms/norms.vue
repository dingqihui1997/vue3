<template>
  <el-card>
    <el-form :model="form" :rules="rules" ref="submit1">
      <el-form-item label="模型名称" prop="parentId">
        <el-select
          v-model="form.parentId"
          placeholder="请选择"
          style="height: 30px"
          @change="change"
        >
          <el-option
            v-for="(item, index) in Model"
            :key="index"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          style="margin-left: 20px"
          @click="submitForm(1)"
          >查询</el-button
        >
        <el-button plain icon="el-icon-refresh" size="mini" @click="Reset"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      icon="el-icon-plus"
      size="mini"
      :disabled="flag"
      @click="add"
      >添加规格</el-button
    >
  </el-card>
  <el-card class="mart20">
    <el-table :data="tableData" style="width: 100% margin-top:10px">
      <el-table-column type="index" label="#" align="center" width="80">
      </el-table-column>
      <el-table-column prop="name" label="模型名称" align="center">
      </el-table-column>
      <el-table-column prop="model" label="所属模型" align="center">
      </el-table-column>
      <el-table-column prop="mode" label="展现方式" align="center">
      </el-table-column>
      <el-table-column prop="spec_item" label="规格项" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scoped">
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
  </el-card>
  <el-dialog
    :title="num ? '新增规格' : '编辑规格'"
    v-model="Visible"
    width="550px"
    :destroy-on-close="true"
  >
    <el-form :model="form" :rules="rules" ref="submit">
      <el-form-item label="规格名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="所属模型" prop="parentId">
        <el-select
          v-model="form.parentId"
          placeholder="请选择"
          style="width: 430px"
          @change="change"
        >
          <el-option
            v-for="(item, index) in Model"
            :key="index"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格项" prop="spec_item" style="margin-left: 15px">
        <el-input type="textarea" v-model="form.spec_item"></el-input>
      </el-form-item>
      <el-form-item label="展现方式" prop="mode">
        <el-radio v-model="form.mode" label="文字">文字</el-radio>
        <el-radio v-model="form.mode" label="图片">图片</el-radio>
        <el-radio v-model="form.mode" label="颜色">颜色</el-radio>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(0)">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import api from "../../http/api";
import { useRoute } from "vue-router";
let route = useRoute();
let submit = ref<any>(null);
let submit1 = ref<any>(null);
let Visible = ref(false);
let total = ref(0);
let Model = ref<any[]>([]); //模型
let parentId = ref("");
let flag = ref(true);
let num = ref(1);
let radio1 = ref("");
let tableData = ref<any[]>([]);

interface form1 {
  //表单验证
  name: string;
  spec_item: string;
  mode: string;
  parentId: string;
}
let form = ref<form1>({
  name: "",
  spec_item: "",
  mode: "",
  parentId: "",
});
let rules = ref<any>({
  parentId: [{ required: true, message: "模型名称不能为空", trigger: "blur" }],
  name: [{ required: true, message: "规格名称不能为空", trigger: "blur" }],
  spec_item: [{ required: true, message: "规格项", trigger: "blur" }],
  mode: [{ required: true, message: "展示不能为空", trigger: "blur" }],
});
let submitForm = (e: number) => {
  //验证第一个查询表单
  if (e) {
    submit1.value!.validate((valid: boolean) => {
      if (valid) {
        flag.value = false;
        getSpec();
      }
    });
  } else {
    submit.value!.validate((valid: boolean) => {
      //新增
      if (valid) {
        let model = Model.value.find((item: any) => {
          return item._id === form.value.parentId;
        });
        api
          .addSpec({
            name: form.value.name,
            model: model.name,
            spec_item: form.value.spec_item,
            mode: form.value.mode,
            parentId: form.value.parentId,
          })
          .then((res: any) => {
            if (res.code === 200) {
              ElMessage.success(res.msg);
              getSpec();
            }
          })
          .catch((err) => {
            console.log(err);
          });
        Visible.value = false;
      }
    });
  }
};
let Reset = () => {
  //重置
  form.value.parentId = "";
  tableData.value = [];
  flag.value = true;
};
//添加规格
let add = () => {
  Visible.value = true;
  num.value = 1;
};
let getSpec = () => {
  api
    .getSpec({ parentId: parentId.value })
    .then((res: any) => {
      if (res.code === 200) {
        res.data.map((item: any) => {
          item.spec_item = item.spec_item.split("\n");
        });
        tableData.value = res.data;
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
let change = (e: any) => {
  parentId.value = e;
};
onMounted(() => {
  getModel();
  if (route.query.id) {
    let a: any = route.query.id;
    form.value.parentId = a;
    parentId.value = a;
  }
});
let getModel = () => {
  //获取模型
  api
    .getModel({
      current: 1,
      pageSize: 9999,
      query: "",
    })
    .then((res: any) => {
      Model.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
//删除
let del = (e: string) => {
  api
    .delSpec({ parentId: parentId.value, attrId: e })
    .then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        ElMessage.success(res.msg);
        submitForm(1);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped>
</style>