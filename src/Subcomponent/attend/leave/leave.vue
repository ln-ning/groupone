<template>
  <div class="body">
    <div class="button">
      <div class="button-left">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addcont = true"></el-button>
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
          </template>
        </el-table-column>
        <el-table-column label="操作" class="table_i">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click.native.prevent="editdata(scope.$index,tableData)"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click.native.prevent="del(scope.$index, tableData)"
              size="mini"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- //弹框 -->
    <div class="alert">
      <el-dialog title="请假申请" :visible.sync="addcont">
        <div class="place">
          <el-form :label-position="labelPosition">
            <el-form-item label="开始时间">
              <el-input v-model="again"></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-input v-model="end"></el-input>
            </el-form-item>
            <el-form-item label="天数">
              <el-input v-model="allday"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="zip" placeholder="请选择">
                <el-option
                  v-for="item in typelist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="原因">
              <el-input v-model="be" type="textarea" :rows="2"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addemp" type="primary">添 加</el-button>
          <el-button @click="addcont = false">取 消</el-button>
        </div>
      </el-dialog>
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
      day: "",
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
      ],
      //弹框
     
      again: "",
      end: "",
      allday: "",
      zip: "",
      be: "",
      addcont: false,
      typelist: [
        {
          value: "请假",
          label: "请假"
        },
        {
          value: "外出",
          label: "外出"
        }
      ],
      //编辑
      
      dialogFormVisible: false,
      addcont: false,
      labelPosition: "right",
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleEdit(index, row) {},
    add() {
      this.layer.open({
        type: 2,

        title: "layer 测试",

        area: "auto",

        btn: "确定",

        shade: 0.4,

        content: {
          content: Test, // Test为要打开的子组件Name

          parent: this
        }
      });
    },
    //申请外出
    addemp() {
      let obj = {
        again: this.again,
        end: this.end,
        allday: this.allday,
        zip: this.zip,
        be: this.be
      };
      console.log(obj);
      this.tableData.push(obj);
      this.addcont = false;
    },
 
    //删除
    del(index, row) {
      row.splice(index, 1);
    }
  }
};
</script>
<style scoped>
</style>