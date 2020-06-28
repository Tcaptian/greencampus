<template>
<div>
  <div class="roleEquip">
    <h3>重要设备管理</h3>
      <ol class="list-header">
        <li v-for="item of columns1" :key="item.id">{{item.title}}</li>
      </ol>
      <ul v-for="item of allDeviceList" :key="item.regionId">
        <li>{{item.deviceName}}</li>
        <li>{{item.deviceNumber}}</li>
        <li>{{item.deviceOwner}}</li>
        <li>{{item.deviceType}}</li>
        <li>{{item.isImportantEquipment == 0 ? '否' : '是'}}</li>
        <li>
          <Button type="error" @click="handleRemoveDevice(item.deviceId)">删除</Button>
          <Button type="warning"  @click="handleModifyDeviceInfo(item)">更新</Button>
          <Button type="info" @click="showelectricMeter(item.eletricMeterId)">查看</Button>
        </li>
      </ul>
  </div>
  <Page :total="10"  :page-size="5" show-elevator @on-change="handleChangePage"/>
  <div class="operaArea">
        <Button type="primary" @click="modal1 = true">添加设备</Button>
        <Modal
          v-model="modal1"
          title="添加设备"
          @on-ok="ok"
          @on-cancel="cancel">
          <Form :model="formItem" :label-width="100">
            <FormItem label="设备名称">
                <Input v-model="formItem.deviceName" placeholder="请输入设备名称"></Input>
            </FormItem>
            <FormItem label="设备编号">
                <Input v-model="formItem.deviceNumber" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="设备账户">
                <Input v-model="formItem.deviceOwner" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="设备类型">
                <Input v-model="formItem.deviceType" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="维修电话">
                <Input v-model="formItem.repairPhoneNumber" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="重要设备" class="mainDevice">
                <RadioGroup v-model="formItem.radio">
                    <Radio label="1">是</Radio>
                    <Radio label="0">否</Radio>
                </RadioGroup>
            </FormItem>
          </Form>
        </Modal>
        <Modal
          v-model="modal2"
          title="更新区域信息"
          @on-ok="modify"
          @on-cancel="cancel">
          <Form :model="formItem" :label-width="100">
            <FormItem label="设备名称">
                <Input v-model="formItem.deviceName" placeholder="请输入设备名称"></Input>
            </FormItem>
            <FormItem label="设备编号">
                <Input v-model="formItem.deviceNumber" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="设备账户">
                <Input v-model="formItem.deviceOwner" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="设备类型">
                <Input v-model="formItem.deviceType" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="重要设备" class="mainDevice">
                <RadioGroup v-model="formItem.radio">
                    <Radio label="1">是</Radio>
                    <Radio label="0">否</Radio>
                </RadioGroup>
            </FormItem>
          </Form>
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
      allDeviceList: [],
      formItem: {
          deviceName: '',
          deviceNumber: '',
          deviceOwner: '',
          deviceType: '',
          repairPhoneNumber: '',
          radio: 0,
      },
      deviceId: -2,
      columns1: [
        {
          title: '设备名称'
        },{
          title: '设备编号'
        },{
          title: '设备账户'
        },{
          title: '设备类型'
        },{
          title: '是否为重要设备'
        },{
          title: '操作'
        }
        
      ]
    }
  },
  mounted () {
    this.getAllDevice()
  },
  methods: {
    getAllDevice() {
      axios.get('api/GreenCampus/device/all', {
        params: {
          pageNo: 1,
          pageSize: 5
        }
      }).then(res => {
        this.allDeviceList = res.data.detail
      })
    },
    showelectricMeter (electricMeterId) {
      axios.get('api/GreenCampus/device/getdeviceParameter', {
        params: {
          electricMeterId: electricMeterId
        }
      }).then(res => {
        this.$Modal.info({
          title: '对应电表信息',
          content: `电表名称：${res.data.detail.electricMeterName}<br>电压：${res.data.detail.voltage} V<br>额定电流${res.data.detail.ratedCurrent} A<br>最大电流：${res.data.detail.maximumCurrent} A<br>频率：${res.data.detail.frequency} HZ`
        })
      })
    },
    handleRemoveDevice (id) {
      const data = {
        deviceId: id
      }
      const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/GreenCampus/device/delete'
      }
      axios(options).then(res => {
        this.getAllDevice()
      }).catch(error => {
          alert('您的权限不够')
      })
    },
    handleChangePage (page) {
      this.allDeviceList = []
      axios.get('api/GreenCampus/device/all', {
        params: {
          pageNo: page,
          pageSize: 5
        }
      }).then(res => {
        this.allDeviceList = res.data.detail
      })
    },
    handleModifyDeviceInfo (deviceInfo) {
      this.modal2 = true
      this.formItem.deviceName = deviceInfo.deviceName
      this.formItem.deviceNumber = deviceInfo.deviceNumber
      this.formItem.deviceOwner = deviceInfo.deviceOwner
      this.formItem.deviceType = deviceInfo.deviceType
      this.formItem.radio = deviceInfo.isImportantEquipment
      this.deviceId = deviceInfo.deviceId
    },
    ok () {
      
      
    },
    cancel() {
      this.$Message.info("已取消")
    },
    modify () {
       const data = {
        deviceId: this.deviceId,
        deviceName: this.formItem.deviceName,
        deviceNumber: this.formItem.deviceNumber,
        deviceOwner: this.formItem.deviceOwner,
        deviceType: this.formItem.deviceType,
        repairPhoneNumber:this.formItem.repairPhoneNumber,
        isImportantEquipment: this.formItem.radio
      }
      const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/GreenCampus/device/update'
      }
      axios(options).then(res => {
        this.getAllDevice()
        this.$Message.info('修改成功');
      }).catch(error => {
          alert('您的权限不够')
      })
    }
  }
 
}
</script>

<style scoped>
  .roleEquip{
    width: 100%;
    min-height: 320px;
    background-color: white;
  }
  .roleEquip h3{
    height: 30px;
    padding-left: 20px;
    line-height: 30px;
    background-color: #71a5e1;
    color: white;
    border-radius: 5px;
  }
  .roleEquip ul, .list-header{
    width: 100%;
    height: 48px;
    padding-left: 18px;
    border-bottom: 1px solid #e8eaec;
    display: flex;
    justify-content: space-around;
  }
  .roleEquip ul:nth-child(2n) {
    background-color: #f8f8f9;
  }
  .roleEquip ul li:nth-child(2) {
    flex-grow: 2;
  }
  .roleEquip ul:hover{
    background-color: #f0faff;
  }
  .roleEquip .list-header{
    font-weight: bolder;
    background-color: #f8f8f9;
  }
  .roleEquip ul li, .list-header li{
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
  
</style>