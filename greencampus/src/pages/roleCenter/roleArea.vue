<template>
  <div class="roleArea">
    <h3>主要区域信息</h3>
      <ol class="list-header">
        <li v-for="item of columns1" :key="item.id">{{item.title}}</li>
      </ol>
      <ul v-for="(item,index) of mainAreaList" :key="item.regionId">
        <li>{{index+1}}</li>
        <li>{{item.regionName}}</li>
        <li>{{item.area}}</li>
        <li>{{item.manager}}</li>
        <li>{{item.managerPhoneNumber}}</li>
        <li>{{item.people}}</li>
        <li>
          <!-- <Button type="info" @click="handleChildAreaInfo(item.regionId)" to="/Cost/childAreaInfo">获取子区域信息</Button> -->
          <Button type="error" @click="handleAreaDelete(item.regionId)">删除</Button>
          <Button type="warning"  @click="modal2 = true, handleUpdateArea(item)">更新</Button>
        </li>
      </ul>
      <div class="operaArea">
        <Button type="primary" @click="handleAddArea()">添加主区域</Button>
        <Modal
          v-model="modal1"
          title="添加区域"
          @on-ok="ok"
          @on-cancel="cancel">
          <ul class="userMesage">
            <li>
              <span>区域名称：</span>
              <input type="text" placeholder="请输入区域名称" v-model="regionName">
            </li>
            <li>
              <span>管理人员：</span>
            <input type="text" placeholder="请输入管理员姓名" v-model="manager">
            </li>

            <li>
              <span>联系方式：</span>
              <input type="text" placeholder="请输入管理员电话" v-model="managerPhoneNumber">
              <span class="remind"></span>
            </li>
            <li>
              <span>区域人数：</span>
              <input type="text" placeholder="请输入区域人数" v-model="people">
            </li>
            <li>
              <span>区域面积：</span>
              <input type="text" placeholder="请输入区域面积" v-model="area">
            </li>
          </ul>
        </Modal>
        <Modal
          v-model="modal2"
          title="更新区域信息"
          @on-ok="modify"
          @on-cancel="cancel">
          <ul class="userMesage">
            <li>
              <span>区域名称：</span>
              <input type="text" placeholder="请输入区域名称" v-model="regionName">
            </li>
            <li>
              <span>管理人员：</span>
            <input type="text" placeholder="请输入管理员姓名" v-model="manager">
            </li>

            <li>
              <span>联系方式：</span>
              <input type="text" placeholder="请输入管理员电话" v-model="managerPhoneNumber">
              <span class="remind"></span>
            </li>
            <li>
              <span>区域人数：</span>
              <input type="text" placeholder="请输入区域人数" v-model="people">
            </li>
            <li>
              <span>区域面积：</span>
              <input type="text" placeholder="请输入区域面积" v-model="area">
            </li>
          </ul>
        </Modal>
      </div>
      
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'areaAnlyze',
  data () {
    return {
      modal1: false,
      modal2: false,
      mainAreaList: [],
      regionName: '',
      people: '',
      managerPhoneNumber: '',
      manager: '',
      area: '',
      regionId: -2,
      columns1: [
        {
          title: '序号',
          key: 'id'
        },
        {
          title: '区域名称',
          key: 'regionName'
        },{
          title: '区域面积',
          key: 'area'
        },{
          title: '管理人员',
          key: 'manager'
        },{
          title: '管理人员电话',
          key: 'managerPhoneNumber'
        },{
          title: '区域人数',
          key: 'people'
        },{
          title: '操作',
          key: 'opera'
        }
      ]
    }
  },
  mounted () {
    this.getAllarea()
  },
  watch: {
  },
  methods: {
    getAllarea () {
      axios.get('api/GreenCampus/region/main').then( res => {
        this.mainAreaList = res.data.detail
      })
    },
    handleChildAreaInfo (id) {
      this.$store.dispatch('getChildRegionId', id)
    },
    handleAddArea () {
      this.modal1 = true
      this.regionName = ''
      this.people = ''
      this.managerPhoneNumber = ''
      this.area = ''
      this.manager = ''
    },
    handleAreaDelete (id) {
      const data = {
        regionId: id
      }
      const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/GreenCampus/region/delete'
      }
      axios(options).then(res => {
        this.$Message.info('成功删除');
        this.getAllarea()
      }).catch(error => {
        alert('您的权限不够')
      })
      
    },
    ok () {
      if(this.regionName == '' && this.people == '' && this.managerPhoneNumber == '' && this.manager == '' && this.area == '') {
        return
      }
      const data = {
        regionName: this.regionName,
        people: Number(this.people),
        managerPhoneNumber: Number(this.managerPhoneNumber),
        manager: this.manager,
        area: Number(this.area),
        parentId: -1
      }
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/GreenCampus/region/add'
      }
      axios(options).then(res => {
        this.getAllarea()
        this.$Message.info('添加成功');
      }).catch(error => {
        alert('您的权限不够')
      })
      
    },
    handleUpdateArea (item) {
      // this.$store.dispatch('getModifyId', id)
      this.regionId = item.regionId
      this.regionName = item.regionName
      this.people = item.people
      this.managerPhoneNumber = item.managerPhoneNumber
      this.area = item.area
      this.manager = item.manager
    },
    modify () {
      const data = {
        regionName: this.regionName,
        people: Number(this.people),
        managerPhoneNumber: Number(this.managerPhoneNumber),
        manager: this.manager,
        area: Number(this.area),
        parentId: -1,
        regionId: this.regionId
      }
      const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/GreenCampus/region/update'
      }
      axios(options).then(res => {
        this.$Message.info('修改成功')
        this.getAllarea()
      }).catch(error => {
        alert('您的权限不够')
      })
    },
    cancel () {
      this.$Message.info('已取消 ');
    },
  }
}
</script>

<style scoped>
  .roleArea{
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
  .roleArea ul, .list-header{
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
   .userMesage li{
    height: 50px;
    line-height: 50px;
  }
  .userMesage li input{
    width: 250px;
    height: 32px;
    box-sizing:border-box;
    background:none;  
    outline:none;  
    border:none;
    border: 1px #e9ebed solid;
    border-radius: 5px;
    margin-right: 20px;
    padding-left: 20px;
    cursor:pointer;
  }
  .userMesage li input:hover{
    border: 1px #b9d6f8 solid;
  }
</style>