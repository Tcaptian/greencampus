<template>
  <div class="equipCost">
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
    <div class="showDeviceFree">
      <ul class="mianDevice">
        <h3>设备列表</h3>
        <Tree :data="mainDeviceList" @on-select-change="handleChoice"></Tree>
      </ul>
      <div class="deviceFreeChart">
        <h3>设备能耗趋势分析</h3>
        <div id="deviceFreeLine"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'equipQuery',
  data () {
    return {
      startTime: 0,
      endTime: 0,
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
      mainDeviceList: [],
      deviceNumber: '',
      agencyDeviceFree: [],
      deviceFree: [0, 2, 2, 3],
      agencyXData: [],
      xData: ['2020年1月', '2020年2月', '2020年3月', '2020年4月'],
      deviceName: '示例'
    }
  },
  mounted () {
    this.getMainDevice()
    this.deviceFreeLine()
  },
  watch: {
    deviceFree () {
      this.deviceFreeLine()
    }
  },
  methods: {
    getDeviceIdFree (deviceNumber) {
      axios.get('api/GreenCampus/free/oneDevice', {
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          timeType: this.timeType,
          deviceNumber: Number(deviceNumber)
        }
      }).then(res => {
        res.data.detail.forEach(item => {
          this.agencyDeviceFree.push(item.free)
          this.agencyXData.push(item.time)
        })
        this.agencyDeviceFree.shift()
        this.agencyXData.shift()
        this.deviceFree = this.agencyDeviceFree
        this.xData = this.agencyXData
        this.agencyXData = []
        this.agencyDeviceFree = []
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
    handleChoice (e) {
      e.forEach(item => {
        this.deviceNumber = item.deviceNumber
        this.deviceName = item.deviceName
      });
    },
    hanleQueryClick () {
      if(this.startTime == 0) {
        alert('请选择起始时间')
        return
      }
      if(this.endTime == 0) {
        alert('请选择结束时间')
        return
      }
      if(this.deviceNumber == '') {
        alert('请选择要查询的设备')
        return
      }
      this.getDeviceIdFree(this.deviceNumber)
    },
    getMainDevice () {
      axios.get('api/GreenCampus/device/all', {
        params: {
          pageNo: 1,
          pageSize: 100
        }
      }).then(res => {
        this.mainDeviceList = res.data.detail
        this.mainDeviceList.forEach(item => {
          item.title = item.deviceName
        })
      })
    },
    deviceFreeLine () {
      var echarts = require('echarts')
      var lineChart = echarts.init(document.getElementById('deviceFreeLine'))
      var option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: this.deviceName,
          type: 'line',
          stack: '能耗',
          data: this.deviceFree
        },]
      }
      lineChart.setOption(option)
    }
  }
}
</script>

<style scoped>
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
  .showDeviceFree {
    display: flex;
    width: 100%;
    margin-top: 10px;
  }
  .deviceFreeChart{
    width: 100%;
    background-color:white;
    margin-left: 10px;
  }
  .mianDevice{
    width: 150px;
    background-color: #f8f8f9
  }
  .mianDevice h3, .deviceFreeChart h3{
    height: 30px;
    padding-left: 20px;
    line-height: 30px;
    background-color: #71a5e1;
    color: white;
    border-radius: 5px;
  }
  .ivu-tree{
    width: 150px;
    border-radius: 0 0 5px 5px;
  }
  #deviceFreeLine{
    width: 100%;
    height: 400px;
  }
</style>