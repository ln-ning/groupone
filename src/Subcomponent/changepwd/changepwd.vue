<template>
  <div class="ipwd">
    <p>修改密码</p>
    <div class="icpwd">
      <span>旧密码:</span>
      <el-input placeholder="请输入旧密码" v-model="oldpwd" width="180px"></el-input>
    </div>
    <div class="icpwd">
      <span>新密码:</span>
      <el-input placeholder="请输入新密码" v-model="newpwd" width="180px"></el-input>
    </div>
    <div class="icpwd">
      <span>确认密码:</span>
      <el-input placeholder="请确认密码" v-model="renewpwd" width="180px"></el-input>
    </div>
    <el-button type="primary" @click="cpwd">确认修改</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      oldpwd: "",
      newpwd: "",
      renewpwd: ""
    };
  },
  methods: {
    //修改密码，需要接口
    cpwd() {
      this.$layer.msg("没接口，改不了，你走吧");
      //console.log("没接口，改不了，你走吧")
    }
  }
};
</script>
<style scoped lang="less">
@import "./changepwd.less";
</style>