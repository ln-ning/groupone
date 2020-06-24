<template>
  <div class="iemp">
    <!-- 添加  搜索 -->
    <div class="ieadd">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addcont = true"></el-button>
      <div class="ieright">
        <el-select v-model="postval" filterable size="small" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          placeholder="请输入姓名"
          size="small"
          style="width: 120px"
          v-model="isname"
          @clear="searchUser"
          clearable
        ></el-input>
        <el-button @click="searchUser" type="primary" icon="el-icon-search" size="small"></el-button>
      </div>
    </div>
    <!-- 内容 -->
    <el-table :data="istable" border ref="table" style="width: 100%;" class="itab">
      <el-table-column label="照片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.url" width="60" height="60" />
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="民族" prop="nation"></el-table-column>
      <el-table-column label="手机号" prop="cellphone"></el-table-column>
      <el-table-column label="部门" prop="department"></el-table-column>
      <el-table-column label="职位" prop="post"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-search"
            circle
            @click.native.prevent="lookdata(scope.$index,istable)"
            size="mini"
          ></el-button>
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
    <el-dialog title="录入员工信息" :visible.sync="addcont">
      <div class="place">
        <el-form :label-position="labelPosition">
          <el-form-item label="姓名">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="照片" width="120">
            <el-input placeholder="暂时没有照片"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="sex" placeholder="请选择">
              <el-option
                v-for="item in sexlist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="age"></el-input>
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="nation"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="cellphone"></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select v-model="department" placeholder="请选择">
              <el-option
                v-for="item in delist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位">
            <el-select v-model="post" placeholder="请选择">
              <el-option
                v-for="item in postlist"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addemp" type="primary">添 加</el-button>
        <el-button @click="addcont = false">取 消</el-button>
      </div>
    </el-dialog>
    <!--查看弹窗框 -->
    <el-dialog title="员工信息" :visible.sync="dialogFormVisible">
      <div class="place">
        <el-form :model="form" :label-position="labelPosition" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="照片" width="120" v-model="form.url">
            <img :src="form.url" width="100" height="100" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.sex"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="form.nation"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.cellphone"></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="form.post"></el-input>
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
      name: "",
      sex: "",
      sexlist: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ],
      age: "",
      //民族
      nation: "",

      //手机号
      cellphone: "",
      //所属部门
      department: "",
      delist: [
        {
          value: "销售",
          label: "销售"
        },
        {
          value: "人资",
          label: "人资"
        }
      ],
      //职位
      post: "",
      postlist: [
        {
          value: "经理",
          label: "经理"
        },
        {
          value: "CEO",
          label: "CEO"
        },
        {
          value: "前端工程师",
          label: "前端工程师"
        },
        {
          value: "后端工程师",
          label: "后端工程师"
        }
      ],
      //搜索字段
      isname: "",
      //下拉选择职业
      postval: "",
      //职业
      options: [
        {
          value: "销售",
          label: "销售"
        },
        {
          value: "人资",
          label: "人资"
        }
      ],
      //员工信息   暂时是死数据
      tableData: [
        {
          name: "张三",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "人资",
          post: "员工",
          url:
            "http://lmq.switchyl.online/static/img/20200618/0c6827c477c83356d29623b24ed7250f.png"
        },
        {
          name: "李四",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "销售",
          post: "员工",
          url:
            "http://lmq.switchyl.online/static/img/20200618/0c6827c477c83356d29623b24ed7250f.png"
        },
        {
          name: "王二",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "人资",
          post: "员工",
          url:
            "http://lmq.switchyl.online/static/img/20200618/0c6827c477c83356d29623b24ed7250f.png"
        },
        {
          name: "赵六",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "销售",
          post: "员工",
          url:
            "http://lmq.switchyl.online/static/img/20200618/0c6827c477c83356d29623b24ed7250f.png"
        },
        {
          name: "李七",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "人资",
          post: "员工",
          url:
            "http://lmq.switchyl.online/static/img/20200618/0c6827c477c83356d29623b24ed7250f.png"
        }
      ],
      //搜索之后的数据
      istable: [],
      total: 0,
      // 弹框
      dialogFormVisible: false,
      addcont: false,
      labelPosition: "right",
      form: [],
      formLabelWidth: "120px"
    };
  },
  created() {
    this.istable = this.tableData;
  },
  methods: {
    //添加
    addemp() {
      let obj = {
        name: this.name,
        sex: this.sex,
        age: this.age,
        nation: this.nation,
        cellphone: this.cellphone,
        department: this.department,
        post: this.post
      };
      console.log(obj);
      this.istable.push(obj);
      this.addcont = false;
    },
    // 搜索
    searchUser() {
      console.log(this.postval);
      console.log(this.isname);

      //都为空
      if (this.isname == "" && this.postval == "") {
        this.$layer.msg("您输入的为空，请重新输入");
        setTimeout(() => {
          this.istable = this.tableData;
        }, 1000);
      } //名字为空
      else if (this.isname == "" && this.postval != "") {
        let all = this.tableData.filter(n => {
          if (this.postval == n.department) {
            return n;
          }
        });
        this.istable = all;
      } //部门为空
      else if (this.isname != "" && this.postval == "") {
        let all = this.tableData.filter(n => {
          if (this.isname == n.name) {
            return n;
          }
          console.log(n.department);
        });
        this.istable = all;
      }
      //都有
      else {
        let all = this.tableData.filter(n => {
          if (this.isname == n.name && this.postval == n.department) {
            return n;
          }
          console.log(n.department);
        });
        this.istable = all;
      }
      // if (this.isname != "" || this.postval != "") {
      //   let all = this.tableData.filter(n => {
      //     if (this.isname == n.name || this.postval == n.department) {
      //       return n;
      //     }
      //     console.log(n.department);
      //   });
      //   this.istable = all;
      //   if (this.istable == "") {
      //     this.$layer.msg("抱歉，没有您查找的这个员工");
      //   }
      // } else {
      //   this.$layer.msg("您输入的为空，请重新输入");
      //   setTimeout(() => {
      //     this.istable = this.tableData;
      //   }, 1000);
      // }
    },

    //查看
    lookdata(i, e) {
      this.dialogFormVisible = true;
      this.form = e[i];
    },
    //编辑
    editdata(i, e) {
      this.edit = true;
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
@import "./empolentry.less";
</style>