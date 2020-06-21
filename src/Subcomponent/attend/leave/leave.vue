<template>
  <div class="body">
    <div class="button">
      <div class="button-left">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addcont = true"></el-button>
      </div>
      <div class="button-right">
        <el-date-picker v-model="time1" type="date" value-format="yyyy-MM-dd"></el-date-picker>-
        <el-date-picker v-model="time2" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        <el-button type="primary" class="button-right-button" @click="searchcon">搜索</el-button>
      </div>
    </div>
    <div class="table">
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
            <el-button type="warning" size="mini" @click="handleEdit(scope.$index, scope.row)">待审核</el-button>
            <el-button type="success" size="mini" v-show="is_active">通过</el-button>
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
    <!-- 请假弹框 -->
    <div class="alert">
      <el-dialog title="请假申请" :visible.sync="addcont">
        <div class="place">
          <el-form :label-position="labelPosition">
            <el-form-item label="开始时间">
              <el-date-picker v-model="again" type="date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="end" type="date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="天数">
              <el-input v-model="allday"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model="zip">
                <el-radio :label="1">请假</el-radio>
                <el-radio :label="2">外出</el-radio>
              </el-radio-group>
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
    <!--修改请假申请-->
    <el-dialog title="修改请假申请" :visible.sync="editcont">
      <div class="place">
        <el-form :model="form" :label-position="labelPosition">
          <el-form-item label="开始时间">
            <el-input v-model="form.again"></el-input>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-input v-model="form.end"></el-input>
          </el-form-item>
          <el-form-item label="类型" v-model="form.zip">
            <el-radio label="1" v-model="form.zip">请假</el-radio>
            <el-radio label="2" v-model="form.zip">外出</el-radio>
            <!-- <el-select v-model="form.zip" placeholder="请选择">
              <el-option
                v-for="item in typelist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="原因">
            <el-input v-model="form.be" type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editsub" type="primary">提交</el-button>
        <el-button @click="editcont = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
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
      form: [],
      //弹框
      again: "",
      end: "",
      allday: "",
      zip: "",
      be: "",
      addcont: false,
      editcont: false,
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
  created() {
    this.showtab = this.tableData;
  },
  methods: {
    //搜索
    searchcon() {
      //console.log(this.time1);
      //console.log(this.time2);
      //都没有
      if (this.time1 == "" && this.time2 == "") {
        this.$layer.msg("请选择查询时间");
      }
      //开始没有
      else if (this.time1 == "" && this.time2 != "") {
        let all = this.tableData.filter(n => {
          if (n.end < this.time2) {
            return n;
          }
        });
        this.showtab = all;
      }
      //结束没有
      else if (this.time1 != "" && this.time2 == "") {
        let all = this.tableData.filter(n => {
          if (n.again > this.time1) {
            return n;
          }
        });
        this.showtab = all;
      }
      //都有
      else {
        let all = this.tableData.filter(n => {
          if (n.again >= this.time1 && n.end <= this.time2) {
            return n;
          }
        });
        this.showtab = all;
      }
    },
    handleEdit(index, row) {},
    //编辑
    editdata(i, e) {
      this.editcont = true;
      this.form = e[i];
      console.log(e[i]);
    },
    //确定
    editsub() {
      let obj = {
        again: this.form.again,
        end: this.form.end,
        zip: this.form.zip,
        be: this.form.be
      };
      console.log(obj);
      // this.showtab.push(obj);
      this.$layer.msg("老铁，这缺个接口");
      this.editcont = false;
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
      this.showtab.push(obj);
      this.addcont = false;
      //this.reload();
    },

    //删除
    del(index, row) {
      row.splice(index, 1);
    }
  }
};
</script>
<style scoped lang="less">
/deep/.el-form-item__label {
  width: 100px;
}
@import "./leave.less";
</style>