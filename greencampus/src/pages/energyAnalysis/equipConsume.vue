<template>
  <div class="equipAnalysis">
    <div class="areaList">
      <h3>设备列表</h3>
      <Tree :data="dataDeivce" show-checkbox ref="tree" disabled></Tree>
    </div>
    <div class="areaChart">
      <h3>设备用能分析</h3>
      <div class="query">
          查询方案：
          <div>
            时间类型
            <Select v-model="timeType" style="width:200px">
              <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div>
            <span>时间范围：</span>
            <DatePicker  placeholder="请选择开始时间" style="width: 200px" format="yyyy-MM-dd" @on-change="time1"></DatePicker>
            <DatePicker placeholder="请选择结束时间" style="width: 200px"  format="yyyy-MM-dd" @on-change="time2"></DatePicker>
          </div>
          <div>
              <Button type="info" @click="hanleQueryClick()">查询</Button>
          </div>
      </div>
      <div class="equipEnergyAnalysis">
        <div id="equipChart" v-show="equipChartshow"></div>
        <h4 v-show="instead">暂无数据</h4>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import axios from 'axios'
export default {
  name: 'areaConsumeAnalysis',
  data () {
    return {
      dataDeivce: [],
      timeType: 'day',
      timeList: [
        {
            value: 'year',
            label: '年'
        },
        {
            value: 'month',
            label: '月'
        },
        {
            value: 'day',
            label: '日'
        },
      ],
      deviceNumberList : [],
      xData: [],
      agencyseries: [],
      series: [],
      legendData: [],
      instead: true,
      equipChartshow: false
    }
  },
  mounted () {
    this.getAllDevice()
  },
  watch: {
    series () {
      this.equipDrawLine()
    }
  },
  methods: {
    getAllDevice() {
      axios.get('api/GreenCampus/device/all',{
        params: {
          pageNo: 1,
          pageSize: 100
        }
      }).then(res => {
        
       this.dataDeivce = res.data.detail
       this.dataDeivce.forEach(item => {
         item.title = item.deviceName
       });
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
    hanleQueryClick() {
      this.equipChartshow = true
      this.instead = false
      let deviceInfo = this.$refs.tree.getCheckedNodes()
      let agencydeviceNumberList = []
      deviceInfo.forEach(item => {
        agencydeviceNumberList.push(Number(item.deviceNumber))
      })
      // deviceNumberList = qs.stringify({deviceNumberList}, {indices: false})
      this.deviceNumberList = agencydeviceNumberList
      agencydeviceNumberList = []
      axios.get('api/GreenCampus/elec/partDevice', {
        params: {
          deviceNumberList: this.deviceNumberList,
          startTime: this.startTime,
          endTime: this.endTime,
          timeType: this.timeType
        },
        paramsSerializer (params) {
          return qs.stringify(params, {arrayFormat: 'repeat'})
        }
      }).then(res => {
        this.handleResData(res.data.detail, deviceInfo)
      })
      
    },
    handleResData (resData, deviceInfo) {
      let timeArray = []
      let seriesData = []
      let agencyLegendData = []
      let markPoint = {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      }
      let markLine = {
        data: [
          {type: 'average', name: '平均值'}
        ]
      }
      let map = new Map()
      resData.forEach(item => {
        timeArray.push(item.queryTime)
        map.has(item.deviceNumber) ? map.get(item.deviceNumber).push(item) : map.set(item.deviceNumber, [item])
      })
      seriesData = [...map.values()]
      this.xData = Array.from(new Set(timeArray))
      seriesData.forEach(items => {
        let yData = []
        let resSeries = {}
        items.forEach(item  => {
          yData.push(item.battery)
        })
        resSeries.data = yData
        this.agencyseries.push(resSeries)
      })
      this.series = this.agencyseries
      this.agencyseries = []
      this.series.forEach(item => {
        item.type = 'bar'
      })
      deviceInfo.forEach(items => {
        agencyLegendData.push(items.deviceName)
        return items.deviceName
      })
      for(let i = 0; i < agencyLegendData.length; i++) {
        this.series[i].name = agencyLegendData[i]
        this.series[i].markPoint = markPoint
        this.series[i].markLine = markLine
      }
      this.legendData = agencyLegendData
      agencyLegendData = []
    },
    equipDrawLine () {
      var echarts = require('echarts')
      var barChart = echarts.init(document.getElementById('equipChart'))
      barChart.setOption({
          title: {
              text: this.title,
              left: 'center',
              subtext: '设备用能分析'
          },
          tooltip: {},
          legend: {
            data: this.legendData
          },
          xAxis: {
            //  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              data: this.xData
          },
          yAxis: {},
          /* series: [{
              name: '销量',
              type: 'bar',
              data: this.yData
          }] */
          series: this.series
      }, true);
    }
  }
}
</script>

<style scoped>
  .equipAnalysis{
    width: 100%;
    display: flex;
  }
  .ivu-tree{
    width: 150px;
    border-radius: 0 0 5px 5px;
  }
  .areaList{
    width: 150px;
    background-color: #f8f8f9;
  }
  .equipEnergyAnalysis h4{
    width: 100%;
    height: 300px;
    text-align:center;
    line-height: 300px;
  }
  .areaList h3, .areaChart h3{
    height: 30px;
    padding-left: 20px;
    line-height: 30px;
    background-color: #71a5e1;
    color: white;
    border-radius: 5px;
  }
  .areaChart{
    width: 100%;
    margin-left: 20px;
  }
  .query{
    width: 100%;
    height: 78px;
    background-color: #f8f8f9;
    display: flex;
    justify-content: space-around;
    align-items:center;
    border-radius: 10px;
    overflow: hidden;
  }
  .equipEnergyAnalysis{
    width: 100%;
    background-color: white;
    margin-top: 10px;
  }
  #equipChart{
    width: 100%;
    height: 300px;
  }
</style>