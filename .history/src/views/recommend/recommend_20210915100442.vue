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
      >添加推荐导航</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="导航名称" align="center">
      </el-table-column>
      <el-table-column prop="desc" label="导航描述" align="center">
      </el-table-column>
      <el-table-column prop="isShow" label="是否禁用" align="center">
        <template #default="scoped">
          <el-switch
            v-model="scoped.row.isShow"
            @change="close(scoped.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scoped">
          <el-button size="mini" @click="see(scoped.row)">查看商品</el-button>
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
    :title="num ? '添加推荐导航' : '编辑推荐导航'"
    v-model="Visible"
    width="580px"
    :destroy-on-close="true"
  >
    <el-form :model="form" :rules="rules" ref="submit" style="padding: 10px">
      <el-form-item label="导航名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="导航描述" prop="desc">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="下属商品" prop="goods">
        <el-select
          v-model="form.goods"
          placeholder="请选择秒杀商品"
          style="width: 440px"
          @change="change"
          multiple
        >
          <el-option
            v-for="(item, index) in goods"
            :key="index"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog title="商品详情" v-model="dialogVisible" width="700px">
    <div class="mat10">商品名称:{{ basic.name }}</div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import api from "../../http/api";
import dayjs from "dayjs";
let Visible = ref(false);
let dialogVisible = ref(false);
let query = ref<string>("");
let tableData = ref<any[]>([]);
let goods = ref<any[]>([]);
let submit = ref<any>(null);
let current = ref(1); //页数
let pageSize = ref(5);
let total = ref(0);
let num = ref(1);
let goodslist = ref<any[]>([]);
interface form1 {
  //表单验证
  goods: any[];
  desc: string;
  name: string;
  id: string;
}
let form = ref<form1>({
  goods: [],
  desc: "",
  name: "",
  id: "",
});
let rules = ref<any>({
  name: [{ required: true, message: "导航名称不能为空", trigger: "blur" }],
  desc: [{ required: true, message: "导航描述不能为空", trigger: "blur" }],
  goods: [{ required: true, message: "下属商品能为空", trigger: "blur" }],
});
//添加轮播图按钮
let add = () => {
  Visible.value = true;
  form.value = {
    goods: [],
    desc: "",
    name: "",
    id: "",
  };
  num.value = 1;
};
let see = (e: any) => {
  console.log(e);
};
//选择商品
let change = (e: any) => {
  console.log(form.value.goods);
};
let submitForm = () => {
  submit.value!.validate((valid: boolean) => {
    if (valid) {
      if (num.value) {
        //添加
        form.value.goods = goods.value.filter((item: any) => {
          return form.value.goods.some((item1: any) => {
            return item1 === item._id;
          });
        });
        api
          .addRecommendNav(form.value)
          .then((res: any) => {
            console.log(res);
            if (res.code === 200) {
              getRecommendNav();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //修改
        form.value.goods = goods.value.filter((item: any) => {
          return form.value.goods.some((item1: any) => {
            return item1 === item._id;
          });
        });
        console.log(form.value);
        api
          .updateRecommendNav(form.value)
          .then((res: any) => {
            console.log(res);
            if (res.code === 200) {
              getRecommendNav();
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
  getGoods();
  getRecommendNav();
});
let getGoods = () => {
  api
    .getGoods({
      current: 1,
      pageSize: 9999,
      query: "",
    })
    .then((res: any) => {
      goods.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
let getRecommendNav = () => {
  api
    .getRecommendNav({
      current: current.value,
      pageSize: pageSize.value,
      query: query.value,
    })
    .then((res: any) => {
      tableData.value = res.data;
      console.log(tableData.value);
    })
    .catch((err) => {
      console.log(err);
    });
};
//分页
let handleSizeChange = (val: number) => {
  pageSize.value = val;
  getRecommendNav();
};
let handleCurrentChange = (val: number) => {
  current.value = val;
  getRecommendNav();
};
//修改状态
let close = (e: any) => {
  api
    .showRecommendNav({ id: e._id, isShow: e.isShow })
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
    .delRecommendNav({ id: e })
    .then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        ElMessage.success(res.msg);
        getRecommendNav();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
let eidt = (e: any) => {
  //编辑
  let arr: any = [];
  e.goods.map((item: any) => {
    arr.push(item._id);
  });
  form.value = { ...e };
  form.value.goods = arr;
  form.value.id = e._id;
  Visible.value = true;
  num.value = 0;
};
let search = () => {
  //搜索
  if (query.value) {
    getCoupon();
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