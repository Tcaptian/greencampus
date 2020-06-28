<template>
  <div class="hoildayControll">
    <div>
      <Modal
          v-model="modal1"
          title="配置"
          @on-ok="ok"
          @on-cancel="cancel">
          <Form :model="formItem" :label-width="100">
            <FormItem label="名称">
                <Input v-model="formItem.workHolidayName" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="共计能耗">
                <Input v-model="formItem.battery" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="消耗费用">
                <Input v-model="formItem.free" placeholder="Enter something..."></Input>
            </FormItem>
            
            <FormItem label="起始时间">
                 <DatePicker  placeholder="请选择开始时间" style="width: 200px" format="yyyy-MM-dd" @on-change="time1"></DatePicker>
            </FormItem>
            <FormItem label="结束时间">
                 <DatePicker  placeholder="请选择结束时间" style="width: 200px" format="yyyy-MM-dd" @on-change="time2"></DatePicker>
            </FormItem>
            <FormItem label="是否为工作日">
                <RadioGroup v-model="formItem.radio">
                    <Radio label=1>是</Radio>
                    <Radio label=0>否</Radio>
                </RadioGroup>
            </FormItem>
          </Form>
          
        </Modal>
    </div>
    <div class="hoilday-list">
      <h3>工作日假期列表</h3>
      <ol class="list-header">
        <li v-for="(item, index) of columns1" :key="index">{{item.title}}</li>
      </ol>
      <ul v-for="(item, index) of allWorkHoilday" :key="item.workHolidayId">
        <li>{{index+1}}</li>
        <li>{{item.startTime}} 至 {{item.endTime}}</li>
        <li>{{item.workHolidayName}}</li>
        <li>
           <Button type="error" @click="handleDeleteHoilday(item.workHolidayId)">删除</Button>
        </li>
      </ul>
    </div>
    <Button type="success" @click="modal1 = true">新建</Button>
      
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'hoildayControl',
  data () {
    return {
      columns1: [
        {
          title: '序号',
          key: 'index'
        },{
          title: '具体日期',
          key: 'deviceNumber'
        },{
          title: '日期类型',
          key: 'deviceNumber'
        },{
          title: '操作',
          key: 'action'
        }
      ],
      model1: '',
      modal1: false,
      startTime: '',
      endTime: '',
      hoildayList: [
        {
            value: 1,
            label: '工作日'
        },
        {
            value: 0,
            label: '假期'
        },
      ],
      formItem: {
        workHolidayName: '',
        battery: '',
        free: '',
        radio: 0
      },
      allWorkHoilday: []
    }
  },
  mounted () {
    this.getAllWorkHoilday()
  },
  methods: {
    getAllWorkHoilday () {
      axios.get('api/GreenCampus/workHoliday/all').then(res => {
        this.allWorkHoilday = res.data.detail
        let startDate = res.data.detail.startTime
      })  
    },
    time1 (e) {
      var date = new Date(e)
      this.startTime = date.getTime()
    },
    time2 (e) {
      var date = new Date(e)
      this.endTime = date.getTime()
    },
    ok () {
      if(this.formItem.battery == '' && this.startTime == '' && this.endTime == '' && this.formItem.workHolidayName === '') {
        return
      }
      const data = {
        battery: Number(this.formItem.battery),
        startTime: this.startTime,
        endTime: this.endTime,
        isWork: Number(this.formItem.radio),
        workHolidayName: this.formItem.workHolidayName
      }
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/GreenCampus/workHoliday/add'
      }
      axios(options).then(res => {
        this.$Message.info('添加成功')
        this.getAllWorkHoilday()
      }).catch(error => {
        alert('您的权限不够')
      })
     
    },
    cancel () {
      this.$Message.info('取消添加')
    },
    handleDeleteHoilday (id) {
      const data = {
        workHolidayId: id
      }
      const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/GreenCampus/workHoliday/delete'
      }
      axios(options).then(res => {
        this.$Message.info('删除成功')
        this.getAllWorkHoilday()
      }).catch(error => {
        alert('您的权限不够')
      })
    }
  }
}
</script>

<style scoped>
.hoildayControll{
    width: 100%;
  }
  /* .query{
    width: 100%;
    height: 78px;
    background-color: #f8f8f9;
    display: flex;
    justify-content: space-around;
    align-items:center;
    border-radius: 10px;
    overflow: hidden;
  } */
  .hoilday-list{
    width: 100%;
    background-color:white;
    /* padding: 0 20px 20px 20px;
     */
  }
  .hoildayControll h3{
    height: 30px;
    padding-left: 20px;
    line-height: 30px;
    background-color: #71a5e1;
    color: white;
    border-radius: 5px;
  }
  .hoilday-list ul, .list-header{
    width: 100%;
    height: 48px;
    padding-left: 18px;
    border-bottom: 1px solid #e8eaec;
    display: flex;
    justify-content: space-around;
  }
  .hoilday-list ul:nth-child(2n) {
    background-color: #f8f8f9;
  }
  .hoilday-list ul li:nth-child(2) {
    flex-grow: 2;
  }
  .list-header li:nth-child(2) {
    flex-grow: 2;
  }
  .hoilday-list ul:hover{
    background-color: #f0faff;
  }
  .hoilday-list .list-header{
    font-weight: bolder;
    background-color: #f8f8f9;
  }
  .hoilday-list ul li, .list-header li{
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