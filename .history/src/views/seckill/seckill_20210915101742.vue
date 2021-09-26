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
      >添加秒杀</el-button
    >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="goods.name" label="秒杀商品" align="center">
      </el-table-column>
      <el-table-column prop="start_time" label="开始时间" align="center">
        <template #default="scoped">
          <span>{{
            dayjs(scoped.row.start_time).format(`YYYY-MM-DD HH:mm:ss`)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" align="center">
        <template #default="scoped">
          <span>{{
            dayjs(scoped.row.end_time).format(`YYYY-MM-DD HH:mm:ss`)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="秒杀价格" align="center">
      </el-table-column>
      <el-table-column prop="goods_number" label="秒杀数量" align="center">
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
          <el-button type="primary" size="mini" @click="eidt(scoped.row)">
            编辑</el-button
          >
          <el-popconfirm
            title="确定删除该条数据吗？"
            @confirm="del(scoped.row._id, scoped.row.goods._id)"
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
    :title="num ? '添加秒杀' : '编辑秒杀'"
    v-model="Visible"
    width="580px"
    :destroy-on-close="true"
  >
    <el-form :model="form" :rules="rules" ref="submit" style="padding: 10px">
      <el-form-item label="秒杀商品" prop="goods">
        <el-select
          v-model="form.goods"
          placeholder="请选择秒杀商品"
          style="width: 440px"
          @change="change"
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
      <el-form-item label="开始时间" prop="start_time">
        <el-date-picker
          style="width: 440px"
          v-model="form.start_time"
          type="datetime"
          placeholder="选择开始时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="end_time">
        <el-date-picker
          style="width: 440px"
          v-model="form.end_time"
          type="datetime"
          placeholder="选择结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="秒杀价格" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="秒杀数量" prop="goods_number">
        <el-input v-model="form.goods_number"></el-input>
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
import dayjs from "dayjs";
let Visible = ref(false);
let query = ref<string>("");
let tableData = ref<any[]>([]);
let goods = ref<any[]>([]);
let submit = ref<any>(null);
let current = ref(1); //页数
let pageSize = ref(5);
let total = ref(0);
let num = ref(1);
let id = ref<string>("");
interface form1 {
  //表单验证
  goods: string;
  price: string;
  start_time: string;
  end_time: string;
  goods_number: string;
  isShow: boolean;
  id: string;
}
let form = ref<form1>({
  goods: "",
  price: "",
  start_time: "",
  end_time: "",
  goods_number: "",
  isShow: true,
  id: "",
});
let rules = ref<any>({
  goods: [{ required: true, message: "优惠名称不能为空", trigger: "blur" }],
  price: [{ required: true, message: "使用门槛不能为空", trigger: "blur" }],
  threshold: [{ required: true, message: "优惠金额不能为空", trigger: "blur" }],
  start_time: [
    { required: true, message: "开始时间不能为空", trigger: "blur" },
  ],
  end_time: [{ required: true, message: "结束时间不能为空", trigger: "blur" }],
  goods_number: [
    { required: true, message: "发放数量不能为空", trigger: "blur" },
  ],
});
//添加轮播图按钮
let add = () => {
  Visible.value = true;
  form.value = {
    goods: "",
    price: "",
    start_time: "",
    end_time: "",
    goods_number: "",
    isShow: true,
    id: "",
  };
  num.value = 1;
};
//选择商品
let change = (e: any) => {
  console.log(e);
};
let submitForm = () => {
  submit.value!.validate((valid: boolean) => {
    if (valid) {
      if (num.value) {
        //添加
        form.value.goods = goods.value.find((item: any) => {
          return item._id === form.value.goods;
        });
        console.log(form.value.goods);

        // api
        //   .addSeckill(form.value)
        //   .then((res: any) => {
        //     if (res.code === 200) {
        //       getSeckill();
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      } else {
        //修改
        console.log(form.value);
        //         form.value.goods = goods.value.find((item: any) => {
        //   return item._id === e;
        // });
        // api
        //   .updateSeckill(form.value)
        //   .then((res: any) => {
        //     if (res.code === 200) {
        //       getSeckill();
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
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
  getSeckill();
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
// 获取秒杀
let getSeckill = () => {
  api
    .getSeckill({
      current: current.value,
      pageSize: pageSize.value,
      query: query.value,
    })
    .then((res: any) => {
      tableData.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
//分页
let handleSizeChange = (val: number) => {
  pageSize.value = val;
  getSeckill();
};
let handleCurrentChange = (val: number) => {
  current.value = val;
  getSeckill();
};
//修改状态
let close = (e: any) => {
  api
    .showSeckill({ id: e._id, isShow: e.isShow })
    .then((res: any) => {
      if (res.code === 200) {
        ElMessage.success(res.msg);
      }
    })
    .catch((err) => console.log(err));
};
// 删除
let del = (e: string, n: string) => {
  api
    .delSeckill({ id: e, goodsId: n })
    .then((res: any) => {
      console.log(res);
      if (res.code === 200) {
        ElMessage.success(res.msg);
        getSeckill();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
let eidt = (e: any) => {
  //编辑
  console.log(e);
  form.value = { ...e };
  form.value.id = e._id;
  // form.value.goods = e._id;
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