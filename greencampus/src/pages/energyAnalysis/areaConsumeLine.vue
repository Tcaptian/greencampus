<template>
  <div class="areaLine">
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
      
    
    <div class="consumeLine">
      <div id="lineChart"></div>
    </div>
       
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'areaConsumeLine',
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
      xData: ['2020年1月', '2020年2月', '2020年3月', '2020年4月'],
      seriesData: [0, 2, 2, 3],
      agencyXData : [],
      agencySeriesData : [],
      chartName: '示例数据'
    }
  },
  mounted() {
    this.drawLine()
  },
  watch : {
    seriesData () {
      this.drawLine()
    }
  },
  methods: {
    time1 (e) {
      var date = new Date(e)
      this.startTime = date.getTime()
    },
    time2 (e) {
      var date = new Date(e)
      this.endTime = date.getTime()
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
      if(!this.$store.state.regionInfo.regionId) {
        alert('请选择要查询的区域')
        return
      }
      this.chartName = this.$store.state.regionInfo.regionName
      axios.get('api/GreenCampus/elec/getOneRegion', {
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          timeType: this.timeType,
          regionId: this.$store.state.regionInfo.regionId
        }
      }).then(res => {
        this.$store.dispatch('getAreaConsume', res.data.detail)
        res.data.detail.forEach(item => {
          this.agencyXData.push(item.time)
          this.agencySeriesData.push(item.battery)
        })
          this.agencySeriesData.shift()
          this.agencyXData.shift()
          this.xData = this.agencyXData
          this.seriesData = this.agencySeriesData
          this.agencyXData = []
          this.agencySeriesData = []
      })
    },
    drawLine () {
      var echarts = require('echarts')
      var lineChart = echarts.init(document.getElementById('lineChart'))
      var option = {
        title: {
          text: '能耗趋势分析'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          // data: ['图书馆']
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

          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // name: this.regionName,
          name: this.chartName,
          type: 'line',
          stack: '能耗',
          // data: [120, 132, 101, 134, 90, 230, 210]
          data: this.seriesData
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
#lineChart{
    width:100%;
    height: 400px;
  }
  .ivu-btn span{
    color:white;
  }
</style>