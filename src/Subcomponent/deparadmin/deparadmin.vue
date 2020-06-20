<template>
  <div class="ideadmin">
    <el-button type="primary" size="small" icon="el-icon-plus" @click="isadd = true"></el-button>
    <!-- 内容 -->
    <el-table :data="istable" border ref="table" style="width: 100%;" class="itab">
      <el-table-column label="ID" prop="id" width="120"></el-table-column>
      <el-table-column label="名称" prop="m_name"></el-table-column>
      <el-table-column label="类型" prop="m_type">
        <!-- <template
          slot-scope="scope"
        >{{ scope.row.m_type == 1 ? '部门' : scope.row.m_type == 2 ?'职位': '' }}</template>-->
      </el-table-column>
      <el-table-column label="排序" prop="px" width="120"></el-table-column>
      <el-table-column label="操作" width="180">
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
    <!-- 添加弹窗框 -->
    <el-dialog title="添加职位/部门" :visible.sync="isadd">
      <div class="place">
        <el-form :label-position="labelPosition" label-width="100px" input-width="100px">
          <el-form-item label="名称">
            <el-input v-model="mname" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="lxradio">
              <el-radio :label="1">部门</el-radio>
              <el-radio :label="2">职位</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="上级职位" v-if="lxradio==2">
            <el-select v-model="sval" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addadmin" type="primary">添 加</el-button>
        <el-button @click="isadd = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改弹窗框 -->
    <el-dialog title="修改职位/部门" :visible.sync="isedit">
      <div class="place">
        <el-form
          :model="form"
          :label-position="labelPosition"
          label-width="100px"
          input-width="100px"
        >
          <el-form-item label="名称">
            <el-input v-model="form.m_name"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <!-- <el-radio-group v-model="form.m_type">
              <el-radio>部门</el-radio>
              <el-radio>职位</el-radio>
            </el-radio-group>-->
            <el-radio v-model="form.m_type" label="1">部门</el-radio>
            <el-radio v-model="form.m_type" label="2">职位</el-radio>
          </el-form-item>
          <el-form-item label="上级职位" v-if="form.m_type==2">
            <el-select v-model="sval" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editadmin" type="primary">修 改</el-button>
        <el-button @click="isedit = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deparadmin, addadmins } from "../../network/deparadmin";
export default {
  inject: ["reload"],
  components: {},
  props: {},
  data() {
    return {
      isname: "",
      //搜索之后的数据
      istable: [],
      total: 0,
      // 弹框
      isadd: false,
      isedit: false,
      labelPosition: "right",
      form: "",
      formLabelWidth: "120px",
      //添加三部曲
      mname: "",
      lxradio: "",
      sval: "",
      options: [
        {
          value: "选项1",
          label: "Boss"
        },
        {
          value: "选项2",
          label: "销售"
        },
        {
          value: "选项3",
          label: "前端工程师"
        },
        {
          value: "选项4",
          label: "经理"
        },
        {
          value: "选项5",
          label: "副经理"
        },
        {
          value: "选项6",
          label: "员工"
        },
        {
          value: "选项7",
          label: "终极Boss"
        }
      ]
    };
  },
  created() {
    let params = {
      uid: this.$store.state.uid
    };
    //console.log(params);
    deparadmin(params).then(res => {
     // console.log(res.data);
      this.istable = res.data.data;
    });
  },

  methods: {
    // 搜索
    searchUser() {
      // let params = {
      //   g_name: this.isname
      // };
      // console.log(params);
      // seaadmin("张三").then(res => {
      //   console.log(res);
      // });
      // if (this.isname != "") {
      //   let all = this.tableData.filter(n => {
      //     if (this.isname == n.name) {
      //       return n;
      //     }
      //     //console.log(n.name);
      //   });
      //   this.istable = all;
      //   if (this.istable == "") {
      //     this.$layer.msg("抱歉，没有您查找的这个员工");
      //   }
      // } else {
      //   this.$layer.msg("您输入的为空，请重新输入");
      //   setTimeout(() => {
      //     // this.istable = this.istable;
      //   }, 1000);
      // }
    },
    //添加
    addadmin() {
      let params = {
        // uid: this.$store.state.uid,
        m_name: this.mname,
        m_type: this.lxradio,
        m_fid: 8
        // id: 10
      };
      //console.log(params);
      addadmins(params).then(res => {
        //console.log(res);
        if (res.data.status == 1) {
          this.isadd = false;
          this.reload();
        }
      });
    },
    //打开编辑   /修改
    editdata(i, e) {
      this.isedit = true;
      this.form = e[i];
      //  console.log(this.form);
      //console.log(e[i].id);
      //console.log(e[i].m_fid);
    },
    //修改
    editadmin() {
      let params = {
        id: this.form.id,
        m_name: this.form.m_name,
        m_type: this.form.m_type,
        m_fid: this.form.m_fid
      };
      //console.log(params);
      addadmins(params).then(res => {
        console.log(res.data);
        if (res.data.status == 1) {
          this.isadd = false;
          this.reload();
        }
      });
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
@import "./deparadmin.less";
</style>