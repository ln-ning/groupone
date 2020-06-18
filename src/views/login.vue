<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <img src="../assets/bglogo.png" width="100" height="100" alt />
        <p>你小子，简直骚的不像话</p>
      </div>
      <el-input
        placeholder="请输入账号"
        suffix-icon="fa fa-user"
        v-model="usernum"
        style="margin-bottom: 18px"
      ></el-input>

      <el-input
        placeholder="请输入密码"
        suffix-icon="fa fa-keyboard-o"
        v-model="pwd"
        type="password"
        style="margin-bottom: 18px"
        @keyup.native.enter="login"
      ></el-input>

      <el-button type="primary" style="width: 100%;margin-bottom: 18px" @click.native="login">登录</el-button>
      <div class="ilogin">
        <p class="ip" @click="toreg">没有账号？去注册</p>
        <p>找回密码</p>
      </div>
    </div>
  </div>
</template>

<script>
import { logins } from "../network/login";
export default {
  components: {},
  props: {},
  data() {
    return {
      usernum: "",
      pwd: ""
    };
  },
  methods: {
    login() {
      let params = {
        g_sjh: this.usernum,
        g_mm: this.pwd
      };
      //console.log(params);
      logins(params).then(res => {
        console.log(res);
        this.$store.commit("getuid", res.data.data.uid);
        if (res.data.status == 1) {
          this.$router.push("/index").catch(err => {});
        } else {
          this.$layer.msg(res.data.info);
          this.pwd = "";
        }
      });
    },
    toreg() {
      this.$router.push("/register").catch(err => {});
    }
  }
};
</script>
<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #e4e5e6;
  background-image: url("../assets/222.jpg");
  background-size: 100% 100%;
  .login-form {
    width: 375px;
    height: 400px;
    padding: 30px;
    background-color: white;
    text-align: left;
    border-radius: 4px;
    position: relative;
    margin-left: 0;
    margin-right: 0;
    zoom: 1;
    display: block;
    .login-header {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
}
.ilogin {
  display: flex;

  .ip {
    margin-right: 48%;
  }
}
</style>