import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import findPassword from '@/pages/board/components/findPassword'

import Login from '@/pages/login/Login'
import register from '@/pages/register/register'

import board from '@/pages/board/board'
import energyBoard from '@/pages/board/components/energyBoard'
import alarm from '@/pages/board/components/alarm'


import roleManagement from '@/pages/roleCenter/rolemanagement'
import roleQuota from '@/pages/roleCenter/roleQuota'
import hoildayControl from '@/pages/roleCenter/hoildayControl'
import roleArea from '@/pages/roleCenter/roleArea'
import roleEquip from '@/pages/roleCenter/roleEquip'
import roleAlarm from '@/pages/roleCenter/roleAlarm'


import diagnoseEnergy from '@/pages/diagnose/diagnoseEnergy'
import diagnoseDevice from '@/pages/diagnose/diagnoseDevice'
import diagnoseQuota from '@/pages/diagnose/diagnoseQuota'

import equipConsume from '@/pages/energyAnalysis/equipConsume'
import equipConsumeCollect from '@/pages/energyAnalysis/equipConsumeCollect'
import hoildayConsume from '@/pages/energyAnalysis/hoildayConsume'
import areaConsumeAnalysis from '@/pages/energyAnalysis/areaConsumeAnalysis'
import areaConsumeCollect from '@/pages/energyAnalysis/areaConsumeCollect'
import areaConsumeLine from '@/pages/energyAnalysis/areaConsumeLine'
import areaConsumeQuery from '@/pages/energyAnalysis/areaConsumeQuery'


import areaCost from '@/pages/Cost/areaCost'
import equipCost from '@/pages/Cost/equipCost'
import hoildayCost from '@/pages/Cost/hoildayCost'





Vue.use(Router)

export default new Router({
  mode: "hash",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/findPassword',
      name: 'findPassword',
      component: findPassword
    },
    {
      path: '/board',
      name: 'board',
      component: board,
      redirect: '/board/energyBoard',
      children: [
        {
          path: '/board/energyBoard',
          name: 'energyBoard',
          component: energyBoard,
        },{
          path: '/board/alarm',
          name: 'alarm',
          component: alarm,
        },{
          path: '/board/areaCost',
          name: 'areaCost',
          component: areaCost
        },{
          path: '/board/equipCost',
          name: 'equipCost',
          component: equipCost
        },{
          path: '/board/hoildayCost',
          name: 'hoildayCost',
          component: hoildayCost
        },{
          path: '/board/roleManagement',
          name: 'roleManagement',
          component: roleManagement
        },{ 
          path: '/board/roleQuota',
          name: 'roleQuota',
          component: roleQuota
        },{
          path: '/board/roleEquip',
          name: 'roleEquip',
          component: roleEquip
        },{
          path: '/board/roleArea',
          name: 'roleArea',
          component: roleArea
        },{
          path: '/board/hoildayControl',
          name: 'hoildayControl',
          component: hoildayControl
        },{
          path: '/board/roleAlarm',
          name: 'roleAlarm',
          component: roleAlarm
        },{
          path: '/board/diagnoseEnergy',
          name: 'diagnoseEnergy',
          component: diagnoseEnergy
        },
        {
          path: '/board/diagnoseDevice',
          name: 'diagnoseDevice',
          component: diagnoseDevice
        },
        {
          path: '/board/diagnoseQuota',
          name: 'diagnoseQuota',
          component: diagnoseQuota
        },
        {
          path: '/board/hoildayConsume',
          name: 'hoildayConsume',
          component: hoildayConsume
        },{
          path: '/board/areaConsumeAnalysis',
          name: 'areaConsumeAnalysis',
          component: areaConsumeAnalysis,
          redirect: '/board/areaConsumeAnalysis/areaConsumeCollect',
          children: [
            {
              path: '/board/areaConsumeAnalysis/areaConsumeLine',
              name: 'areaConsumeLine',
              component: areaConsumeLine,
            },
            {
              path: '/board/areaConsumeAnalysis/areaConsumeCollect',
              name: 'areaConsumeCollect',
              component: areaConsumeCollect
            },
            {
              path: '/board/areaConsumeAnalysis/areaConsumeQuery',
              name: 'areaConsumeQuery',
              component: areaConsumeQuery
            }
          ]
        },{
          path:'/board/equipConsume',
          name: 'equipConsume',
          component: equipConsume,
          redirect: '/board/equipConsume/equipConsumeCollect',
          children: [
            {
              path: '/board/equipConsume/equipConsumeCollect',
              name: 'equipConsumeCollect',
              component: equipConsumeCollect
            }
          ]
        }
      ]
    },
   
    
    
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
