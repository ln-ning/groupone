<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <img src="../assets/bglogo.png" width="100" height="100" alt />
        <p>欢迎来到本系统</p>
      </div>
      <el-input
        placeholder="请输入手机号"
        suffix-icon="fa fa-user"
        v-model="unum"
        style="margin-bottom: 18px"
      ></el-input>

      <el-input
        placeholder="请输入密码"
        suffix-icon="fa fa-keyboard-o"
        v-model="pwd"
        type="password"
        style="margin-bottom: 18px"
      ></el-input>
      <el-input
        placeholder="请确认密码"
        suffix-icon="fa fa-keyboard-o"
        v-model="repwd"
        type="password"
        style="margin-bottom: 18px"
      ></el-input>

      <el-button type="primary" style="width: 100%;margin-bottom: 18px" @click.native="login">确认注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      unum: "",
      pwd: "",
      repwd: ""
    };
  },
  methods: {
    login() {
      console.log(this.unum);
      console.log(this.pwd);
      console.log(this.repwd);
      this.$router.push("/login").catch(err => {});
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

</style>