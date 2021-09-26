import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          title: '首页',
          index: '/'
        }
      },
      {
        path: '/rotation',
        name: 'rotation',
        component: () => import('../views/rotation/rotation.vue'),
        meta: {
          title: '轮播图管理',
          index: '/rotation'
        }
      },
      {
        path: '/navigation',
        name: 'navigation',
        component: () => import('../views/navigation/navigation.vue'),
        meta: {
          title: '导航管理',
          index: '/navigation',

        }
      },
      {
        path: '/recommend',
        name: 'recommend',
        component: () => import('../views/recommend/recommend.vue'),
        meta: {
          title: '推荐管理',
          index: '/recommend',
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user/user.vue'),
        meta: {
          title: '用户管理',
          index: '/user',
        }
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/goods/goods.vue'),
        meta: {
          title: '商品管理',
          index: '/goods',
        }
      },
      {
        path: '/addgoods',
        name: 'addgoods',
        component: () => import('../views/addgoods/addgoods.vue'),
        meta: {
          title: '添加商品',
          index: '/addgoods',
        }
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('../views/categories/categories.vue'),
        meta: {
          title: '商品分类',
          index: '/categories',
        }
      },
      {
        path: '/pattern',
        name: 'pattern',
        component: () => import('../views/pattern/pattern.vue'),
        meta: {
          title: '商品模型',
          index: '/pattern',
        }
      },
      {
        path: '/norms',
        name: 'norms',
        component: () => import('../views/norms/norms.vue'),
        meta: {
          title: '商品规格',
          index: '/norms',
        }
      },
      {
        path: '/parameter',
        name: 'parameter',
        component: () => import('../views/parameter/parameter.vue'),
        meta: {
          title: '商品参数',
          index: '/parameter',
        }
      },
      {
        path: '/specifications',
        name: 'specifications',
        component: () => import('../views/specifications/specifications.vue'),
        meta: {
          title: '规格参数',
          index: '/specifications',
        }
      },
      {
        path: '/seckill',
        name: 'seckill',
        component: () => import('../views/seckill/seckill.vue'),
        meta: {
          title: '秒杀管理',
          index: '/seckill',
        }
      },
      {
        path: '/coupon',
        name: 'coupon',
        component: () => import('../views/coupon/coupon.vue'),
        meta: {
          title: '优惠券管理',
          index: '/coupon',
        }
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/order/order.vue'),
        meta: {
          title: '订单管理',
          index: '/order',
        }
      },
      {
        path: '/notice',
        name: 'notice',
        component: () => import('../views/notice/notice.vue'),
        meta: {
          title: '通知管理',
          index: '/notice',
        }
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('../views/news/news.vue'),
        meta: {
          title: '客服管理',
          index: '/news',
        }
      },
    ]
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router