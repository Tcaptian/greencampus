<template>
    <div class="layout" :style="conheight">
            <div class="header">
              <div class="layout-logo">
                <img src="@/assets/img/logo.png" alt="">
                      绿色校园能耗管理系统
              </div>
              <div class="user">
                <router-link  to="/board/alarm">
                  <i class="iconfont">&#xe679;</i>
                </router-link>
                <span>欢迎您！</span>
                <div>
                  <img src="@/assets/img/headerPic.png" alt="">
                  <span>管理员</span>
                  <router-link to="/">
                    <span @click="handleLoginOut()" >退出</span>
                  </router-link>
                </div>
              </div>
                
            </div>
            <div class="contain">
              <div class="sider">
                <Menu @on-select="handleChoice" :active-name="name">
                  <MenuItem name="/board/energyBoard" to="/board/energyBoard">
                    <Icon type="ios-filing" />
                    看板首页
                  </MenuItem>
                  
                  <Submenu :name="items.name" v-for="items of lists" :key="items.id">
                      <template slot="title">
                          <Icon :type="items.type" />
                          {{items.text}}
                      </template>
                      <MenuItem :name="item.name" v-for="item of items.subMenus" :key="item.id" :to="item.path">
                        <Icon :type="item.type" />
                        {{item.text}}
                      </MenuItem>
                  </Submenu>
                </Menu>
              </div>

              <div class="content">
                <div class="content-title">
                  <Icon type="md-arrow-dropright" />
                  <span>{{pageName}}</span>
                </div>
                  <router-view>

                  </router-view>
                
              </div>
            </div>
            <div class="footer">
              <p>公司地址：陕西省西安市临潼区斜口街道西安科技大学临潼校区 联系电话：80-800-8800</p>
              <p>绿色校园能耗管理系统  版权所有 。。。  技术支持：西安科技大学 毕设系统</p>
            </div>
  </div>
</template>
<script>
import axios from 'axios'
    export default {
      data () {
        return {
          lists: [
            {
              name: '2',
              text: '用能分析',
              type: 'ios-analytics',
              subMenus: [
                {
                  name: '2-1',
                  text: '设备用能分析',
                  path: '/board/equipConsume'
                },
                {
                  name: '2-2',
                  text: '区域用能分析',
                  path: '/board/areaConsumeAnalysis'
                  
                },
                {
                  name: '2-3',
                  text: '工作日假期用能分析',
                  path: '/board/hoildayConsume'
                }
              ]
            },
            {
              name: '3',
              text: '费用统计',
              type: 'ios-analytics',
              subMenus: [
                {
                  name: '3-1',
                  text: '区域费用',
                  path: '/board/areaCost',
                },
                {
                  name: '3-2',
                  text: '设备费用',
                  path: '/board/equipCost'
                },
                {
                  name: '3-3',
                  text: '工作日假期费用',
                  path: '/board/hoildayCost'
                }
              ]
            },
            {
              name: '4',
              text: '用能诊断',
              type: 'ios-analytics',
              subMenus: [
                {
                  name: '4-1',
                  text: '能耗诊断',
                  path: '/board/diagnoseEnergy'
                },
                {
                  name: '4-2',
                  text: '设备诊断',
                  path: '/board/diagnoseDevice'
                },
                {
                  name: '4-3',
                  text: '指标诊断',
                  path: '/board/diagnoseQuota'
                }
              ]
            },
            {
              name: '5',
              text: '管理中心',
              type: 'ios-keypad',
              subMenus: [
                {
                  name: '5-1',
                  text: '工作日假期配置',
                  path: '/board/hoildayControl'
                },
                {
                  name: '5-2',
                  text: '指标配置',
                  path: '/board/roleQuota'
                },
                {
                  name: '5-3',
                  text: '区域信息管理',
                  path: '/board/roleArea',
                },
                {
                  name: '5-4',
                  text: '设备信息管理',
                  path: '/board/roleEquip'
                },
                {
                  name: '5-5',
                  text: '告警配置',
                  path: '/board/roleAlarm'
                }
              ]
            },
          ],
          pageName: '看板首页',
          accordion: true,
          name: '',
          conheight:{
            height: ''
          }
        }
      },
      methods: {
        getHeight () {
          this.conheight.height = window.innerHeight + 'px'
        },
        handleChoice (name) {
          this.name = name
        },
        handleLoginOut () {
          axios.get('api/logout').catch(error => {
            console.log(error)
          })
        }
      },
      created () {
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
      },
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .layout{
    height: 100%;
    padding-bottom: 58px;
  }
  .layout .header{
    height: 58px;
    line-height: 58px;
    border: none;
  }
  .layout-logo{
    display: inline-block;
    margin-left: -5px;
    width: 260px;
    height: 36px;
    text-align:center;
    line-height: 36px;
    color: #5e99df;
    font-size: 18px;
  }
  /* .layout-nav{
    overflow: hidden;
    float: right;
  } */
  .layout-logo img{
    width:35px;
    height:35px;
    margin-bottom: 6px;
  }
  .header .user{
    width: 200px;
    height: 58px;
    display: flex;
    float: right;
    margin-right: 50px;
    align-items:center;
    justify-content: space-around;
    
  }
  .header .user a{
    padding-top: 2px;
    height: 58px;
    line-height: 58px;
  }
  .header .user img{
    width: 28px;
    height: 28px;
  }
  .contain{
    width: 100%;
    height: 100%;
    display: flex;
  }
  .contain .sider{
    padding-top: 10px;
    padding-bottom: 58px;
    width: 280px;
    border-right: 1px #ccc solid;
    overflow: scroll;
  }
  .contain .content{
    width: 100%;
    background-color: #f0f1f5;
    padding: 50px 20px;
    overflow: scroll;
  }
  .contain .content .content-title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    position:fixed;
    top: 58px;
    background-color:#f0f1f5;
    z-index: 999;
  }

  .footer{
    overflow: hidden;
    width: 100%;
    height: 58px;
    background-color: #ededed;
    text-align:center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
  }
  .footer p{
    margin-top:5px;
    color: #969090;
  }
</style>