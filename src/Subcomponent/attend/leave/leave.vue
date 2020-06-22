<template>
  <div class="body">
    <div class="button">
      <div class="button-left">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addcont = true"></el-button>
      </div>
      <div class="button-right">
        <el-date-picker v-model="time1" type="date" value-format="yyyy-MM-dd" ></el-date-picker>-
        <el-date-picker v-model="time2" type="date" value-format="yyyy-MM-dd" ></el-date-picker>
        <el-button type="primary" class="button-right-button" @click="searchcon">搜索</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="showtab" style="width: 100%">
        <el-table-column label="发起人" prop="g_name" width="180"></el-table-column>
        <el-table-column label="开始时间" prop="j_ksj" width="180"></el-table-column>
        <el-table-column label="结束时间" prop="j_jsj"></el-table-column>
        <el-table-column prop="j_ts" label="天数"></el-table-column>
        <el-table-column prop="j_yy" label="原因"></el-table-column>
        <!-- <el-table-column prop="zip" label="类型">
          <template
            slot-scope="scope"
          >{{ scope.row.zip == 1 ? '请假' : scope.row.zip == 2 ?'外出': '' }}</template>
        </el-table-column>-->
        <el-table-column label="状态" prop="j_zt">
          <!-- <template slot-scope="scope">
            {{ scope.row.zip == 0 ? '待审核' : scope.row.zip == 1 ?'通过':scope.row.zip == 2 ? '拒绝' : '' }}
          </template>-->
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
            <!-- <el-form-item label="结束时间">
              <el-date-picker v-model="end" type="date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>-->
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
            <!-- <el-input v-model="form.j_ksj"></el-input> -->
            <el-date-picker v-model="form.j_ksj" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="天数">
            <el-input v-model="form.j_ts"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-radio label="1" v-model="form.j_type">请假</el-radio>
            <el-radio label="2" v-model="form.j_type">外出</el-radio>
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
            <el-input v-model="form.j_yy" type="textarea" :rows="2"></el-input>
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
import { leavelist, leaves, editleave } from "../../../network/leave";
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
      //请假信息
      tableData: [],
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
    let params = {
      uid: this.$store.state.uid
    };
    leavelist(this.$store.state.uid).then(res => {
      //  console.log(res.data.data);
      this.tableData = res.data.data;
      this.showtab = this.tableData;
    });
  },
  methods: {
    //搜索
    searchcon() {
      // console.log(this.time1);
      // console.log(this.time2);
      //都没有
      if (
        (this.time1 == "" || this.time1 == null) &&
        (this.time2 == "" || this.time2 == null)
      ) {
        //console.log(1111);
        // this.$layer.msg("请选择查询时间");
        this.showtab = this.tableData;
      }
      //开始没有
      else if ((this.time1 == "" || this.time1 == null) && this.time2 != "") {
        let all = this.tableData.filter(n => {
          console.log(n.j_jsj);
          if (n.j_jsj < this.time2) {
            return n;
          }
        });
        this.showtab = all;
      }
      //结束没有
      else if (this.time1 != "" && (this.time2 == "" || this.time2 == null)) {
        let all = this.tableData.filter(n => {
          if (n.j_ksj > this.time1) {
            return n;
          }
        });
        this.showtab = all;
      }
      //都有
      else {
        let all = this.tableData.filter(n => {
          if (n.j_ksj >= this.time1 && n.j_jsj <= this.time2) {
            return n;
          }
        });
        this.showtab = all;
      }
    },
    handleEdit(index, row) {},
      //申请外出
    addemp() {
      let obj = {
        uid: this.$store.state.uid,
        j_ksj: this.again,
        // end: this.end,
        j_ts: this.allday,
        j_type: this.zip,
        j_yy: this.be
      };
      console.log(obj);
      leaves(obj).then(res => {
        console.log(res);
        //this.showtab.push(obj);
        this.addcont = false;
        this.reload();
      });
    },

    //编辑
    editdata(i, e) {
      this.editcont = true;
      this.form = e[i];
      console.log(e[i]);
    },
    //确定
    editsub() {
      let obj = {
        uid: this.$store.state.uid,
        id: this.form.id,
        j_ksj: this.form.j_ksj,
        j_ts: this.form.j_ts,
        j_yy: this.form.j_yy,
        j_type: this.form.j_type
      };
      // console.log(obj);
      editleave(obj).then(res => {
        //console.log(res.data);
        this.editcont = false;
      });
      // this.showtab.push(obj);
      // this.$layer.msg("老铁，这缺个接口");
      //
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