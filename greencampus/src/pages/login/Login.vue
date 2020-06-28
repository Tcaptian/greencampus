<template>
  <div class="login">
    <div class="content">
      <div class="content-left">
        <img src="@/assets/img/logo.jpg" alt=""><br>
        <span>绿色校园能耗管理系统</span>
        <div class="login-form">
          <input type="text" placeholder="请输入账号" v-model="userId">
          <input type="password" placeholder="请输入密码" v-model="password">
          <!-- <Button type="success" long @click="toLoading()">登录</Button> -->
          <Button type="success" :loading="loading" @click="toLoading" @keyup.enter="toLoading">
              <span v-if="!loading">登录</span>
              <span v-else>Loading...</span>
          </Button>
        </div>
        <router-link tag="span" class="password" to='/findPassword'>忘记密码？</router-link>
        <div class="login-form-bottom">
          <router-link tag="span" class="back-home" to="/">返回首页</router-link>
          <p class="go-register"><span>还没有账号？</span><router-link tag="span" class="register-tag" to="/register">去注册</router-link></p>
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
  name: 'Login',
  data () {
    return {
      loading: false,
      userId: '',
      password: '',
      path: ''
    }
  },
  methods: {
    
  
    toLoading () {
      if(this.userId == '') {
        alert("账号为空")
        return
      }
      if(this.username == '') {
        alert("密码为空")
        return
      }
      this.loading = true;
      let password = Base64.encode(this.password)
      
      const data = {
        username: this.userId,
        password: password
      };
      const options = {
        method: 'POST',
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'api/login'
      };
      axios(options)
        .then((res) => {
          if(res.data.errorMsg == '成功') {
            this.$router.push('/board')
          }
          if(res.data.errorMsg == '账号不存在') {
            alert('账号不存在')
            this.loading = false
          }
          if(res.data.errorMsg == '密码错误') {
            alert('密码错误')
            this.loading = false
          }
        })
        .catch(err => {
          if(err) {
            this.loading = false
            alert('请求超时')
          }
        })
    },
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
  .login-form input :nth-child(1) :active{
    border: 1px #ccc solid;
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