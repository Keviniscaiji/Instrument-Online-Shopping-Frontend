<template>
  <div>
  <div class="avatar-container">
    <template>
      <lang-select class="langIcon" />
    </template>
  </div>
  <div class="login-container">
     
    <el-form ref="loginForm" :model="loginForm"  class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">{{$t("role.intro")}}</h3>
    
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="" />
      </el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          {{$t("role.login")}}
        </el-button>
      <div class="tips">
        <span style="margin-right:20px;">{{$t("role.tip1")}}</span>
        <!-- <span> password: admin</span> -->
      </div >
         <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="vxLogin">
          {{$t("role.wxlogin")}}
        </el-button>
        <div class="tips">
        <span style="margin-right:20px;">{{$t("role.tip2")}}</span>
        <!-- <span> password: admin</span> -->
      </div >
        <!-- <a id="weixin" class="weixin" target="_blank" href="http://localhost:8160/api/ucenter/wx/login" >VX Login</a> -->
          <!-- <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li> -->
    </el-form>
  </div>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import {loginByUserName} from '@/api/login'
import LangSelect from '@/components/LangSelect'

export default {
  name: 'Login',
  components: {LangSelect},
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 5) {
    //     callback(new Error('密码不能小于5位'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        username: '',
        password: 'admin'
      },
      // loginRules: {
      //   username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      //   password: [{ required: true, trigger: 'blur', validator: validatePass }]
      // },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    vxLogin(){
        window.location.href = "http://localhost:8160/api/ucenter/wx/login"
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      loginByUserName(this.loginForm.username)
         .then(response => {
              // response接口返回的数据
              const token = response.data.token
               this.$router.push({path:'/middlepage?token=' + token})
               //{path:'/commodity/publish/'+this.commodityId}
              console.log(response)
        }).catch(error => {
          console.log("Wrong username")
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>


<style rel="stylesheet/scss" lang="scss">
.avatar-container {
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    position: absolute;
    z-index: 1;
  }
  .langIcon{
    width: 100%;
    height: 100%;
  }

$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  
}

</style>

<style>

</style>

