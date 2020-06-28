<template>
  <div class="content-list">
      <ol class="list-header">
        <li v-for="(item, index) of columns1" :key="index">{{item.title}}</li>
      </ol>
      <ul v-for="(item, index) of showList" :key="index">
        <li>{{index+1}}</li>
        <li>{{item.regionName}}</li>
        <li>{{item.consumeType}}</li>
        <li>{{item.battery}}</li>
      </ul>
      <h2 v-if="instead">暂无数据</h2>
  </div>
</template>

<script>
export default {
  name: 'myTable',
  data () {
    return {
      instead: true,
      tableHead: this.columns1,
      tableContent: this.showList
    }
  },
  props:{
    columns1: Array,
    showList: Array
  },
  watch: {
    tableContent () {
      this.instead = false
    }
  }
}
</script>

<style scoped>
  .content-list{
    width: 100%;
    margin-top: 10px;
  }
  .content-list h2{
    width: 100%;
    height: 250px;
    background-color: white;
    line-height: 250px;
    text-align:center;
  }
  .content-list ul, .list-header{
    width: 100%;
    height: 48px;
    padding-left: 18px;
    border-bottom: 1px solid #e8eaec;
    display: flex;
    justify-content: space-around;
  }
  .content-list ul{
   height: 200px;
  }
  .content-list ul:nth-child(2n) {
    background-color: #f8f8f9;
  }
  .content-list ul:hover{
    background-color: #f0faff;
  }
  .content-list .list-header{
    font-weight: bolder;
    background-color: #f8f8f9;
  }
  .content-list ul li, .list-header li{
    width: 20%;
    height: 48px;
    line-height: 48px;
    text-align:center;
  }
</style>