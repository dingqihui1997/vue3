import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as Icons from '@element-plus/icons'
import { toLine } from './utils'

import i18n from './language/index';

const app = createApp(App)
// el-icon-xxx  注册图标
for (let i in Icons) {
    app.component(`el-icon${toLine(i)}`, (Icons as any)[i])
}
app.use(i18n);

app.use(router)
app.use(store)
app.use(ElementPlus, { //国际化
    locale: zhCn,
})
app.mount('#app')