<template>
  <div class="login">
    <div class="content">
      <div class="content-left">
        <img src="@/assets/img/logo.jpg" alt=""><br>
        <span>绿色校园能耗管理系统</span>
        <div class="login-form">
          <input type="text" placeholder="请输入用户名" v-model="username">
          <input type="password" placeholder="设置密码" v-model="password">
          <Button type="success" long @click="handleRegister()">注册</Button>
        </div>
        <div class="login-form-bottom">
          <router-link tag="span" class="back-home" to="/">返回首页</router-link>
          <p class="go-register"><span>已有账号？</span><router-link tag="span" class="register-tag" to="/register">登录</router-link></p>
        </div>
      </div>
      <div class="content-right">
        <img src="@/assets/img/login.png" alt="" class="pic">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { Base64 } from 'js-base64'
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleRegister () {
      if(this.username == '' || this.password == '') {
       alert("账号或密码不能为空")
       return
      }
      let password = Base64.encode(this.password)
      const data = {
        userName: this.username,
        password: password
      };
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/GreenCampus/user/add'
      };
      axios(options)
        .then((res) => {
          alert('注册成功')
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style scoped>
 .login{
    width: 100%;
    height: 100%;
    background-color:#5AD1E5;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .login .content{
    width: 812px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    display: flex;
  }
  .login .content-left{
    width: 350px;
    height: 443px;
    background-color: white;
    border-radius: 10px 0 0 10px;
    order: 1;
    text-align:center;
    padding-top: 20px;
  }
  .login .content-right{
    top: 198px;
    left:700px;
    float:right;
    order: 2
  }
  .login .content-left img{
    width: 100px;
    height: 80px;
    margin-bottom: 10px;
  }
  .login-form{
    height: 200px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-around;
  }
  .login-form input{
    border:none;
    outline:none;
    border-bottom: 1px #ccc solid;
  }
  .login .content-left .password{
    color: #999;
    position: relative;
    top: -10px;
    right: 70px;
    font-size: 12px;
    cursor: pointer;
  }
  .login .login-form-bottom{
    margin-top: 30px;
  }
  .login .login-form-bottom .back-home{
    color: #3a92dd;
    position: relative;
    left: -20px;
    cursor: pointer;
  }
  .login .login-form-bottom .go-register{
    display: inline-block;
  }
  .login .login-form-bottom .go-register span{
    color: #999;
  }
  .login .login-form-bottom .go-register .register-tag{
    color: #3a92dd;
    cursor: pointer;
  }
  .login .content-left .ivu-btn{
    width: 220px;
  }
  .ivu-btn span{
    color: white;
  }
</style>