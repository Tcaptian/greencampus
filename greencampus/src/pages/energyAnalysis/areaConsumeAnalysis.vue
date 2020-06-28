<template>
  <div class="areaAnalysis">
    <div class="areaList">
      <h3>区域列表</h3>
      <Tree :data="dataArea" @on-select-change="handleChoice"></Tree>
    </div>
    <div class="areaChart">
      <h3>区域用能分析</h3>
      <Breadcrumb>
        <BreadcrumbItem to="/board/areaConsumeAnalysis/areaConsumeCollect">区域能耗综合查询</BreadcrumbItem>
        <BreadcrumbItem to="/board/areaConsumeAnalysis/areaConsumeLine">区域用能趋势分析</BreadcrumbItem>
        <BreadcrumbItem to="/board/areaConsumeAnalysis/areaConsumeQuery">区域能耗报表</BreadcrumbItem>
      </Breadcrumb>
      <div class="areaConsumecontent">
        <router-view>
          
        </router-view>
      </div>
    </div>
  </div>
</template>

<script scoped>
import axios from 'axios'
export default {
  name: 'areaConsumeAnalysis',
  data () {
    return {
      dataArea: [],
    }
  },
  mounted () {
    this.getAllMainArea()
  },
  methods: {
    getAllMainArea() {
      axios.get('api//GreenCampus/region/main').then(res => {
       this.dataArea = res.data.detail
       this.dataArea.forEach(item => {
         item.title = item.regionName
         this.getChildrenArea(item.regionId, res => {
           item.children = res
           item.children.forEach(Element => {
             Element.title = Element.regionName
           })
         })
       });
      })
    },
    getChildrenArea (id, callback) {
      axios.get('api/GreenCampus/region/children', {
        params: {
          regionId : id
        }
      }).then(res => {
        callback(res.data.detail)
      })
    },
    handleChoice (e) {
      e.forEach(item => {
        let regionInfo = {
          regionName: item.regionName,
          regionId: item.regionId
        }
        this.$store.dispatch('getRegionInfo', regionInfo)
      })
    }
  }
}
</script>

<style scoped>
  .areaAnalysis{
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
  .consumeLine{
    width: 100%;
    height: 400px;
    background: white;
  }
  
  .areaChart .ivu-breadcrumb{
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    display:flex;
  }
  .areaChart .ivu-breadcrumb a{
    width: 100%;
    font-weight: 100;
    display: inline-block;
    text-align: center;
    margin-right: 20px;
  }
  .areaChart .ivu-breadcrumb a:hover{
    background-color: white;
  }
  .areaChart .ivu-breadcrumb a:active{
     background-color: white;
     font-weight: 1000;
  }
  .areaChart .ivu-breadcrumb-item-separator{
    display: none;
  }
</style>