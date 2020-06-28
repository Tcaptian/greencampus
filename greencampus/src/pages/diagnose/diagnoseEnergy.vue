<template>
  <div>
    <h3>
      能耗诊断记录
    </h3>
    <!-- <list :columns1="columns1" :data1="data1"></list> -->
    <div class="roleMessage">
      <ul class="list-header">
        <li v-for="item of columns1" :key="item.id">{{item.title}}</li>
      </ul>
      <ul v-for="(item, index) of data1" :key="item.id">
        <li>{{index+1}}</li>
        <li>{{item.diaBatteryName}}</li>
        <li>{{item.diaBatteryType}}</li>
        <li>{{item.time}}</li>
        <li>
           <Button type="info" @click="handleShowDiaList(item.diaBatteryId)" >查看详情</Button>
           <Button type="warning" @click="handleUpdateDia(item.diaBatteryId)" >更新</Button>
        </li>
      </ul>
    </div>
    <Page :total="dataCount" :page-size="pageSize" @on-change="handleChangePage" show-elevator/>
    <Modal
        v-model="modal1"
        :title="diaBatteryName">
        <div class="dia-detail">
          <div id="increaseChart"></div>
          <ul class="dia-info">
            <h4>诊断信息</h4>
            <li>异常类型：{{diaBatteryType}}</li>
            <li>月平均能耗：{{batteryAvgMonth}}</li>
            <li>今日能耗：{{batteryToday}}</li>
            <li>诊断意见：{{opinion}}</li>
            <li>确认意见：{{opinionRe}}</li>
            <li>诊断时间：{{time}}</li>
          </ul>
        </div>
    </Modal>
     <Modal
        v-model="modal2"
        title="更新诊断确认信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="formItem" :label-width="80">
          <FormItem label="意见确认">
              <Input v-model="formItem.input" placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
    </Modal>
    
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'roleManagement',
  data () {
    return {
      columns1: [
        {
          title: '序号',
          key: ''
        },{
          title: '诊断情况',
          key: 'diaBatteryName'
        },{
          title: '异常类型',
          key: 'diaBatteryType'
        },{
          title: '诊断日期',
          key: 'time'
        },{
          title: '操作',
          key: 'action'
        }],
      data1: [],
      dataCount: 400,
      pageSize: 5,
      showList: [],
      modal1: false,
      modal2: false,
      seriesData: [],
      xData: [],
      diaBatteryType: '',
      diaBatteryName: '',
      batteryAvgMonth: 0,
      batteryToday: 0,
      opinion: '',
      opinionRe: '',
      time: '',
      updateId: -2,
      formItem: {
          input: '',
      }
    }
  },
  mounted () {
    
    this.getDiaData()
  },
  methods: {
    
    handleChangePage (index) {
      /* let _start = (index - 1) * this.pageSize
      let _end = index * this.pageSize
      this.showList = this.data1.slice(_start, _end) */
      axios.get('api/GreenCampusDia/allDiaBattery', {
        params: {
          pageNo: index,
          pageSize: 5
        }
      }).then(res => {
        this.data1 = res.data.detail
      })
    },
    handleShowDiaList (id) {
      this.modal1 = true
      axios.get('api/GreenCampusDia/oneDiaBattery', {
        params: {
          id: id
        }
      }).then(res => {
        this.opinionRe = res.data.detail.opinionRe
        this.diaBatteryName = res.data.detail.diaBatteryName
        this.diaBatteryType = res.data.detail.diaBatteryType
        this.batteryAvgMonth = res.data.detail.batteryAvgMonth
        this.batteryToday = res.data.detail.batteryToday
        this.opinion = res.data.detail.opinion
        this.time = res.data.detail.time
        this.seriesData = Object.keys(res.data.detail.diaBatteryContent)
        this.xData = Object.values(res.data.detail.diaBatteryContent)
        this.drawLine()
      })
      
    },
    handleUpdateDia (id) {
      this.modal2 = true
      this.updateId = id
    },
    getDiaData() {
      axios.get('api/GreenCampusDia/allDiaBattery', {
        params: {
          pageNo: 1,
          pageSize: 5
        }
      }).then(res => {
        this.data1 = res.data.detail
      })
    },
    ok () {
        this.$Message.info('Clicked ok');
        const data = {
          id: this.updateId,
          opinion: this.formItem.input
        }
        const options = {
          method: 'PUT',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(data),
          url: 'api/GreenCampusDia/updateDiaBattery'
        }
        axios(options)
    },
    cancel () {
        this.$Message.info('Clicked cancel');
    },
    drawLine () {
      var echarts = require('echarts')
      var increaseChart = echarts.init(document.getElementById('increaseChart'))
      var option = {
        xAxis: {
        type: 'category',
        data: this.xData
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            barWidth: '20px',
            barGap: '10px',
            data: this.seriesData,
            type: 'bar'
        }]
      }
      increaseChart.setOption(option)
    }
  }
}
</script> 

<style scoped>
  h3{
    height: 30px;
    padding-left: 20px;
    line-height: 30px;
    background-color: #71a5e1;
    color: white;
    border-radius: 5px;
  }
  .roleMessage{
    width: 100%;
    min-height: 200px;
    background-color: white;
  }
  .roleMessage ul{
    width: 100%;
    height: 48px;
    padding-left: 18px;
    border-bottom: 1px solid #e8eaec;
    display: flex;
    justify-content: space-around;
  }
  .roleMessage ul:nth-child(2n+1) {
    background-color: #f8f8f9;
  }
  .roleMessage ul li:nth-child(1) {
    width: 50px;
  }
  .roleMessage ul:hover{
    background-color: #f0faff;
  }
  .roleMessage ul:nth-child(1){
    font-weight: bolder;
    background-color: #f8f8f9;
  }
  .roleMessage ul li{
    width: 20%;
    height: 48px;
    line-height: 48px;
    text-align:center;
  }
  .ivu-page{
    margin-top: 10px;
    text-align:center;
    background-color:white;
  }
  .ivu-btn span{
    color: white;
  }
  .dia-detail{
    width: 100%;
    height: 350px;
    background-color:#f8f8f9;
  }
  #increaseChart{
    width: 100%;
    height: 200px;
    background:white;
  }
  .dia-info{
    background: white;
    margin-top: 10px;
    padding-left: 20px;
  }
  h4{
    text-align:center;
  }
</style>