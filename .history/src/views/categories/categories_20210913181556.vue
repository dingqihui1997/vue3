<template>
  <el-card class="box">
    <div class="flex">
      <div class="flex1">
        <el-input placeholder="请输入" v-model="query" style="width: 350px">
        </el-input>
        <el-button
          icon="el-icon-search"
          style="margin-left: -5px"
          @click="search"
        ></el-button>
        <el-tree
          :data="Category"
          :props="defaultProps"
          style="margin-top: 10px"
        >
          <template #default="{ node, data }">
            <div class="flex-sb wi100 boxlabel">
              <div>{{ node.label }}</div>
              <div v-if="data.list" class="font14 font-w7 operation">
                <span class="mar10" @click="add(data)">新增</span>
                <span class="mar10">禁用</span>
                <el-popconfirm title="确定删该条分类吗？" @confirm="del(data)">
                  <template #reference>
                    <span>删除</span>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </template>
        </el-tree>
      </div>
      <div class="flex1 flex-j">
        <div class="right">
          <div class="flex-sb righthead">
            <div class="font18 font-w7">新增分类</div>
            <div class="sure" @click="sure">确认</div>
          </div>
          <el-form :model="form" :rules="rules" ref="submit">
            <el-form-item label="分类名称" prop="name" class="mar-l-15">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="上级分类" prop="parentId">
              <el-select
                v-model="form.parentId"
                placeholder="请选择"
                style="width: 500px"
                @change="change"
              >
                <el-option
                  v-for="(item, index) in Category"
                  :key="index"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类别名" prop="short_name">
              <el-input v-model="form.short_name"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import api from "../../http/api";
let submit = ref<any>(null);
let Category = ref<any[]>([]);
let query = ref("");
interface tree {
  children: string;
  label: string;
}
let defaultProps = ref<tree>({
  children: "list",
  label: "name",
});
interface form1 {
  //表单验证
  name: string;
  short_name: string;
  parentId: string;
  isShow: boolean;
}
let form = ref<form1>({
  name: "",
  short_name: "",
  parentId: "",
  isShow: true,
});
let rules = ref<any>({
  name: [{ required: true, message: "规格名称不能为空", trigger: "blur" }],
});
let search = () => {
  getCategory();
};
let add = (e: any) => {
  console.log(e);
  form.value.parentId = e._id;
};
let del = (e: any) => {
  api
    .delCategory(e._id)
    .then((res) => {
      console.log(res);
      getCategory();
    })
    .catch((err) => {
      console.log(err);
    });
};
let sure = () => {
  //确定添加
  submit.value!.validate((valid: boolean) => {
    if (valid) {
      if (form.value.parentId) {
        //添加二级
        api
          .addSecondCategory(form.value)
          .then((res) => {
            console.log(res);
            getCategory();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //添加一级
        api
          .addCategory(form.value)
          .then((res) => {
            console.log(res);
            getCategory();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      form.value.name = "";
      form.value.parentId = "";
    }
  });
};
onMounted(() => {
  getCategory();
});
let getCategory = () => {
  // 获取分类
  api
    .getCategory(query.value)
    .then((res: any) => {
      console.log(res);
      Category.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
let change = () => {}; //选择一级分类
</script>

<style scoped lang="scss">
.box {
  height: 800px;
  margin: 20px;
}
.right {
  width: 80%;
  height: 600px;
  border: 1px solid #eee;
  padding: 0 25px;
}
.righthead {
  padding: 20px;
  border: 1px solid #eee;
  margin-bottom: 30px;
}
.sure {
  color: #2190ff;
}
.operation {
  display: none;
}
.boxlabel {
  &:hover {
    .operation {
      display: block;
    }
  }
}
</style>