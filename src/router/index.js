import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Table   from '../views/Table'
import Aside from '../views/Aside'
import About from '../views/About'
import Teacher from '../views/Teacher'
import Finance from '../views/Finance'
import ClassSystem from '../views/ClassSystem'
import SystemConfig from '../views/SystemConfig'
import BedRoom from '../views/BedRoom'
import Facelogin from '../views/FaceLogin'
import GetFace from '../views/GetFaceInfo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '登陆',
    component: Login
  },{
    path:'/login',
        name:'登陆',
        component:Login

    },{
    path:'/loginface',
        name:"刷脸登陆",
        component:Facelogin
    },

    {
    path: '/home',
    name: 'Home',
    component: Home
  },

    {
        path: '/aside',
        name: '学生管理系统',
        component: Aside,
        show:true,
        redirect:'/table',
        //包含的子页面
        children:[
            {
            path: '/table',
            name: '学生基本信息',
            component: Table
        },{
            path:'/teacher',
                name:'教师基本信息',
                component:Teacher
            },
            {
                path:'/fanance',
                name:'财务管理系统',
                component:Finance
            },
            {
                path:'/classSystem',
                name:'班级信息管理',
                component:ClassSystem
            },
            {
                path:'/systemconfig',
                name:'系统设置',
                component:SystemConfig
            },
            {
                path:'/bedroom',
                name:'寝室管理',
                component:BedRoom
            },{
            path:'/getface',
                name:'注册人脸信息',
                component:GetFace

            }
        ]

    },{
        path:'/about',
        name:"",
        component:About
    }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
