/*
 * @Author: 何元鹏
 * @Date: 2023-12-13 11:12:02
 * @LastEditors: 何元鹏
 * @LastEditTime: 2024-03-12 15:04:43
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
    {
      path: '/Clock',  
      name: "Clock",
      component: () => import("@/views/Clock.vue")
    },
    {
      path: '/PopUps',  
      name: "PopUps",
      component: () => import("@/views/PopUps.vue")
    }, 
    {
      path: '/QueryData',  
      name: "QueryData",
      component: () => import("@/views/QueryData.vue")
    },
    {
      path: '/handler',  
      name: "handler",
      component: () => import("@/views/handler.vue")
    }
  ]
})

export default router
