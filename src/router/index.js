/*
 * @Author: 何元鹏
 * @Date: 2023-12-13 11:12:02
 * @LastEditors: 何元鹏
 * @LastEditTime: 2024-01-02 11:09:58
 */
import { createRouter, createWebHistory } from 'vue-router' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home', 
    },
    {
      path: '/Entity',  
      name: "Entity",
      component: () => import("@/views/Entity.vue")
    },
    {
      path: '/Pick',  
      name: "Pick",
      component: () => import("@/views/Pick.vue")
    },
    {
      path: '/Property',  
      name: "Property",
      component: () => import("@/views/Property.vue")
    }, 
    
  ]
})

export default router
