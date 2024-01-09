/*
 * @Author: 何元鹏
 * @Date: 2023-12-13 11:12:02
 * @LastEditors: 何元鹏
 * @LastEditTime: 2023-12-13 15:48:13
 */
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
