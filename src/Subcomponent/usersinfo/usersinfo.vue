<template>
  <div class="iuser">
    <!-- 内容 -->
    <el-table :data="istable" border ref="table" style="width: 100%;" class="itab">
      <!-- <el-table-column label="照片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.url" width="60" height="60" />
        </template>
      </el-table-column>-->
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="手机号" prop="cellphone"></el-table-column>
      <el-table-column label="地址" prop="address" width="220"></el-table-column>
      <el-table-column label="微信" prop="wx"></el-table-column>
      <el-table-column label="QQ" prop="qq"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click.native.prevent="editdata(scope.$index,istable)"
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click.native.prevent="deleteRow(scope.$index, istable)"
            size="mini"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-size="5"
      layout="prev, pager, next"
      :total="total"
      @current-change="currentChage"
    ></el-pagination>
    <!-- 弹窗框 -->
    <el-dialog title="员工信息" :visible.sync="dialogFormVisible">
      <div class="place">
        <el-form :model="form" :label-position="labelPosition">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.sex"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.cellphone"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="微信">
            <el-input v-model="form.wx"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
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
          name: "小宁",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "17639613650",
          address: "河南省洛阳市洛龙区",
          wx: "17639613650",
          qq: "3165837730"
        },
        {
          name: "李四",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          address: "河南省洛阳市洛龙区",
          wx: "17639613650",
          qq: "3165837730"
        },
        {
          name: "王二",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          address: "河南省洛阳市洛龙区",
          wx: "17639613650",
          qq: "3165837730"
        },
        {
          name: "赵六",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          address: "河南省洛阳市洛龙区",
          wx: "17639613650",
          qq: "3165837730"
        },
        {
          name: "李七",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          address: "河南省洛阳市洛龙区",
          wx: "17639613650",
          qq: "3165837730"
        }
      ],
      //搜索之后的数据
      istable: [],
      total: 0,
      // 弹框
      dialogFormVisible: false,
      labelPosition: "right",
      form: [],
      formLabelWidth: "120px"
    };
  },
  created() {
    this.istable = this.tableData;
  },
  methods: {
    
    //编辑
    editdata(i, e) {
      this.dialogFormVisible = true;
      this.form = e[i];
    },
    // 分页
    currentChage() {},
    // 删除
    deleteRow(index, row) {
      row.splice(index, 1);
    }
  }
};
</script>
<style scoped lang="less">
/deep/.el-table .cell {
  text-align: center;
}
/deep/.el-form-item__label {
  width: 100px;
}
@import "./usersinfo.less";
</style>