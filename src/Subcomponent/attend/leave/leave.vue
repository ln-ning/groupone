<template>
  <div class="body">
    <div class="button">
      <div class="button-left">
        <el-button type="primary">+</el-button>
      </div>
      <div class="button-right">
        <el-date-picker v-model="time1" type="date" value-format="yyyy-MM-dd"></el-date-picker>-
        <el-date-picker v-model="time2" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        <el-button type="primary" class="button-right-button">搜索</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="发起人" prop="name" width="180"></el-table-column>
        <el-table-column label="开始时间" prop="again" width="180"></el-table-column>
        <el-table-column label="结束时间" prop="end"></el-table-column>
        <el-table-column prop="allday" label="天数"></el-table-column>
        <el-table-column prop="be" label="原因"></el-table-column>
        <el-table-column prop="zip" label="类型"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="warning" @click="handleEdit(scope.$index, scope.row)">待审核</el-button>
            <el-button type="success" v-show="is_active">通过</el-button>
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
        <el-table-column label="操作" class="table_i">
          <i class="el-icon-edit" style="background:#FFB800"></i>
          <i class="el-icon-delete" style=" background: #f00;"></i>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import "@/Subcomponent/attend/leave/leave.less";
export default {
  components: {},
  props: {},
  data() {
    return {
      //button
      time1: "",
      time2: "",
      //table
      is_active: false,
      tableData: [
        {
          name: "王小虎",
          again: "2016-05-02",
          end: "2016-05-10",
          allday: "8",
          be: "生病",
          zip: "请假",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          again: "2016-05-02",
          end: "2016-05-10",
          allday: "8",
          be: "生病",
          zip: "请假",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          again: "2016-05-02",
          end: "2016-05-10",
          allday: "8",
          be: "生病",
          zip: "请假",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          again: "2016-05-02",
          end: "2016-05-10",
          allday: "8",
          be: "生病",
          zip: "请假",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {}
  }
};
</script>
<style scoped>
</style>