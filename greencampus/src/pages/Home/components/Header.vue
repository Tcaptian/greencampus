<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/img/logo.jpg" alt="">
      <span>绿色校园能耗管理系统</span>
    </div>
    <div class="nav">
      <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          产品介绍
      </MenuItem>
      <MenuItem name="2">
          <Icon type="ios-keypad"></Icon>
          团队
      </MenuItem>
      <MenuItem name="3">
          <Icon type="ios-analytics"></Icon>
          使用说明
      </MenuItem>
    </div>
    <div class="login-button">
      <Button type="info" to="/login">登录</Button>
      <Button type="info" to="/register">注册</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader'
}
</script>
 
<style scoped>
  .header{
    height: 68px;
    border-bottom:#ccc 1px solid;
    overflow:hidden;
    position:sticky;
    top:0;
    z-index: 99;
    background-color:white;
    display: flex;
    align-items:center;
    justify-content: space-between;
    padding: 0 40px;
  }
  .header .nav{
    /* margin-right: 800px; */
    width: 300px;
    display: flex;
    justify-content: space-around;
    margin-right: 700px;
  }
  .header .logo span{
    margin-left: 7px;
  }
  .header .logo img{
    width:45px;
    height:47px;
  }
  .ivu-btn span{
    color:white;
  }
</style>