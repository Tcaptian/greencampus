<template>
<div>
<!--   <div class="roleArea">
      <h3>用户角色管理</h3>
      <ol class="list-header">
        <li v-for="item of columns1" :key="item.id">{{item.title}}</li>
      </ol>
      <ul v-for="item of allUserList" :key="item.regionId">
        <li>{{item.userName}}</li>
        <li>{{item.sex}}</li>
        <li>{{item.age}}</li>
        <li>{{item.email}}</li>
        <li>{{item.phoneNumber}}</li>
        <li>{{item.jobId}}</li>
        <li>{{item.ponsition}}</li>
        <li>
          <Button type="error" @click="handleRemoveUser(item.userId)">删除</Button>
          <Button type="warning"  @click="handleModifyUser(item)">更新</Button>
        </li>
      </ul>
  </div>
  <Page :total="100"  :page-size="5" show-elevator @on-change="handleChangePage"/>
  <div class="operaArea">
        <Modal
          v-model="modal2"
          title="更新用户信息"
          @on-ok="modify"
          @on-cancel="cancel">
          
          <Form ref="formDynamic" :model="formItem" :label-width="80" style="width: 300px">
            <FormItem label="用户名称">
                <Input v-model="formItem.userName" placeholder="请输入用户名称"></Input>
            </FormItem>
            <FormItem label="性别">
              <RadioGroup v-model="formItem.sex">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="邮箱">
                <Input v-model="formItem.email" placeholder="请输入邮箱"></Input>
            </FormItem>
            <FormItem label="联系方式">
                <Input v-model="formItem.phoneNumber" placeholder="请输入邮箱"></Input>
            </FormItem>
            <FormItem label="工号">
                <Input v-model="formItem.jobId" placeholder="请输入工号"></Input>
            </FormItem>
            <FormItem label="年龄">
                <Input v-model="formItem.jobId" placeholder="age"></Input>
            </FormItem>
            <FormItem label="职位">
                <Input v-model="formItem.jobId" placeholder="ponsition"></Input>
            </FormItem>
          </Form>

        </Modal>
      </div> -->
</div>
  
</template>

<script>
/* import axios from 'axios'
import qs from 'qs'
export default {
  name: 'areaAnlyze',
  data () {
    return {
      modal2: false,
      pageTotal: 1,
      allUserList: [],
      formItem: {
        userId: -2,
        userName: '',
        sex: '男',
        email: '',
        phoneNumber: '',
        jobId: '',
        age: '',
        ponsition: ''
      },
      columns1: [
        {
          title: '姓名',
          key: 'userName'
        },{
          title: '性别',
          key: 'sex'
        },{
          title: '邮箱',
          key: 'email'
        },{
          title: '联系方式',
          key: 'phoneNumber'
        },{
          title: '工号',
          key: 'jobId'
        },{
          title: '年龄',
          key: 'age'
        },{
          title: '职位',
          key: 'ponsition'
        },{
          title: '操作',
          key: 'action'
        }
        
      ]
      
    }
  },
  mounted () {
    this.getAllUser()
  },
  methods: {
    getAllUser() {
      axios.get('api/GreenCampus/user/all', {
        params: {
          pageNo: 1,
          pageSize: 5
        }
      }).then(res => {
        this.allUserList = res.data.detail
        
      })
    },
    handleModifyUser (userItem) {
      this.modal2 = true
      this.formItem.userName = userItem.userName
      this.sex = userItem
    },
    handleRemoveUser (id) {
      const data = {
        deviceId: id
      }
      const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/GreenCampus/user/delete'
      }
      axios(options).then(res => {
        this.getAllUser()
      })
    },
    handleChangePage (page) {
      this.allUserList = []
      axios.get('api/GreenCampus/user/all', {
        params: {
          pageNo: page,
          pageSize: 5
        }
      }).then(res => {
        this.allUserList = res.data.detail
      })
    },
    
    cancel() {
      this.$Message.info("已取消")
    },
    modify () {
      
    }
  }
 
} */
</script>

<style>
  /* .roleArea{
    width: 100%;
    background-color: white;
  }
  .roleArea h3{
    height: 30px;
    padding-left: 20px;
    line-height: 30px;
    background-color: #71a5e1;
    color: white;
    border-radius: 5px;
  }
  .roleArea ul, .roleArea .list-header{
    width: 100%;
    height: 48px;
    padding-left: 18px;
    border-bottom: 1px solid #e8eaec;
    display: flex;
    justify-content: space-around;
  }
  .roleArea ul:nth-child(2n) {
    background-color: #f8f8f9;
  }
  .roleArea ul li:nth-child(2) {
    flex-grow: 2;
  }
  .roleArea ul:hover{
    background-color: #f0faff;
  }
  .roleArea .list-header{
    font-weight: bolder;
    background-color: #f8f8f9;
  }
  .roleArea ul li, .list-header li{
    width: 20%;
    height: 48px;
    line-height: 48px;
    text-align:center;
  }
  .ivu-btn span{
    color: white;
  }
  .operaArea{
    width: 100%;
    margin-top: 20px;
  }
  .ivu-form-item-label{
    width: 90px;
  }
  .page .ivu-btn-dashed span {
    color: black;
  } */
</style>