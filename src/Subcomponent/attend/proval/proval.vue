<template>
  <div class="body">
    <div class="button">
      <el-button type="primary">全部</el-button>
      <el-button type="warning">待审核</el-button>
      <el-button type="primary">已通过</el-button>
      <el-button type="danger">已拒绝</el-button>
    </div>
    <div class="name">
      <el-table :data="tableData" border style="width: 100%" class="el-table">
        <el-table-column fixed prop="name" label="发起人"></el-table-column>
        <el-table-column prop="time" label="开始时间"></el-table-column>
        <el-table-column prop="province" label="结束时间"></el-table-column>
        <el-table-column prop="city" label="天数"></el-table-column>
        <el-table-column prop="address" label="原因"></el-table-column>
        <el-table-column prop="zip" label="类型"></el-table-column>
        <el-table-column prop="add" label="状态"></el-table-column>
        <el-table-column prop="z" label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import "@/Subcomponent/attend/proval/proval.less";
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData:[]
    };
  }
};
</script>
<style scoped>
</style>