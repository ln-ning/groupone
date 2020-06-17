<template>
  <div class="ihello">
    <div class="ihead">
      <p>欢迎您：{{uname}}</p>
    </div>
    <div class="iteam">
      <p>开发团队</p>
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="title" label="职务"></el-table-column>
        <el-table-column prop="contact" label="联系方式"></el-table-column>
      </el-table>
    </div>
    <div class="iteam">
      <p>版本信息</p>
      <table class="itab" border="0">
        <tr>
          <td>当前版本</td>
          <td>V1.0.0</td>
        </tr>
        <tr>
          <td>基于框架</td>
          <td>element</td>
        </tr>
        <tr>
          <td>主要特色</td>
          <td>零门槛 / 响应式 / 清爽 / 极简</td>
        </tr>
        <tr>
          <td>获取渠道</td>
          <td>请自行百度</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      uname: "小宁",
      tableData: [
        { name: "小宁", title: "高级工程师", contact: "17639613650" },
        { name: "小宁", title: "高级工程师", contact: "17639613650" }
      ]
    };
  }
};
</script>
<style scoped >
@import "./hello.css";
</style>