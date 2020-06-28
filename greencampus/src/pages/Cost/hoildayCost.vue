<template>
  <div class="hoildayCost">
    <Table :columns="columns1" :data="data1"></Table>
    <Modal
    style="width: 600px;"
    v-model="modal1"
    title="费用信息统计图"
    @on-ok="ok"
    @on-cancel="cancel">
      <div id="hoildayChart"></div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hoildayConsume',
  data () {
    return {
      columns1: [
        {
          title: '显示内容',
          key: 'workHolidayName'
        },
        {
          title: '起始时间',
          key: 'startTime'
        },
        {
          title: '结束时间',
          key: 'endTime'
        },
        {
          title: '费用',
          key: 'free'
        },
        {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'error',
                              size: 'small'
                          },
                          on: {
                              click: () => {
                                  this.modal1 = true
                                  this.controlData(params.row.batteryFreeVOList)
                                  this.drawLine()
                              }
                          }
                      }, '查看详情')
                  ]);
              }
          }
      ],
      data1: [],
      modal1: false,
      agencySeriersData: [],
      seriesData: [],
      agencyXData: [],
      xData: [],
      chartName: ''
    }
  },
  mounted () {
    this.getAllWorkHoildayConsume()
  },
  methods: {
    getAllWorkHoildayConsume () {
      axios.get('api/GreenCampus/free/allWorkHolidayFree').then(res => {
          this.data1 = res.data.detail
        
          this.data1.forEach(item => {
            item.free = item.batteryFreeVOList[0].free
          })
        }
      )
    },
    controlData (showData) {
      showData.forEach(item => {
        this.agencySeriersData.push(item.free)
        this.agencyXData.push(item.time)
      });
      this.agencySeriersData.shift()
      this.agencyXData.shift()
      this.seriesData = this.agencySeriersData
      this.xData = this.agencyXData
      this.agencySeriersData = []
      this.agencyXData = []
      this.chartName = showData.workHolidayName
    },
    drawLine () {
      var echarts = require('echarts')
      var barChart = echarts.init(document.getElementById('hoildayChart'))

      barChart.setOption({
          title: {
              text: this.workHolidayName,
              left: 'center',
              subtext: '各时间费用详情'
          },
          tooltip: {},
          xAxis: {
            //  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              data: this.xData
          },
          yAxis: {},
          series: [{
              name: '能耗',
              type: 'bar',
              data: this.seriesData
          }]
      });
    },
    ok () {
    },
    cancel () {
    }
  }
}
</script>

<style scoped>
  #hoildayChart{
    width: 400px;
    height: 400px;
  }
  .ivu-btn span{
    color:white;
  }
</style>