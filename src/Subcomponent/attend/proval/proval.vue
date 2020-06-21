<template>
  <div class="body">
    <div class="button">
      <el-button type="primary" size="mini">全部</el-button>
      <el-button type="warning" size="mini">待审核</el-button>
      <el-button type="primary" size="mini">已通过</el-button>
      <el-button type="danger" size="mini">已拒绝</el-button>
    </div>
    <div class="name">
      <el-table :data="showtab" style="width: 100%">
        <el-table-column label="发起人" prop="name" width="180"></el-table-column>
        <el-table-column label="开始时间" prop="again" width="180"></el-table-column>
        <el-table-column label="结束时间" prop="end"></el-table-column>
        <el-table-column prop="allday" label="天数"></el-table-column>
        <el-table-column prop="be" label="原因"></el-table-column>
        <el-table-column prop="zip" label="类型">
          <template
            slot-scope="scope"
          >{{ scope.row.zip == 1 ? '请假' : scope.row.zip == 2 ?'外出': '' }}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="warning" size="mini">待审核</el-button>
            <el-button type="success" size="mini" v-show="is_active">通过</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" class="table_i">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click.native.prevent="adopt(scope.$index,tableData)"
              size="mini"
            >通过</el-button>
            <el-button
              type="danger"
              @click.native.prevent="refuse(scope.$index, tableData)"
              size="mini"
            >拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          name: "张三",
          again: "2020-06-01",
          end: "2020-06-20",
          allday: "8",
          be: "生病",
          zip: 1,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "李四",
          again: "2020-06-06",
          end: "2020-06-30",
          allday: "8",
          be: "生病",
          zip: 2,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王二",
          again: "2020-06-08",
          end: "2020-06-21",
          allday: "8",
          be: "生病",
          zip: 2,
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "麻子",
          again: "2020-05-20",
          end: "2020-06-20",
          allday: "8",
          be: "生病",
          zip: 1,
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      showtab: [],
      is_active: false
    };
  },
  created() {
    this.showtab = this.tableData;
  },
  methods: {
    adopt() {
      this.$layer.msg("通过");
    },
    refuse() {
      this.$layer.msg("拒绝");
    }
  }
};
</script>
<style scoped lang="less">
@import "./proval.less";
</style>