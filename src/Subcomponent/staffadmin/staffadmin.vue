<template>
  <div class="isadmin">
    <!-- 信息 -->
    <!-- 搜索 -->
    <div>
      <el-input
        placeholder="请输入要搜索的员工姓名"
        size="small"
        style="width: 200px"
        v-model="isname"
        @clear="searchUser"
        clearable
      ></el-input>
      <el-button @click="searchUser" type="primary" icon="el-icon-search" size="small"></el-button>
    </div>
    <!-- 内容 -->
    <el-table :data="istable" border ref="table" style="width: 100%;" class="itab">
      <el-table-column label="照片" width="120">
        <template slot-scope="scope">
          <img :src="'http://'+scope.row.g_zp" width="60" height="60" />
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="g_name"></el-table-column>
      <el-table-column label="性别" prop="g_xb"></el-table-column>
      <el-table-column label="年龄" prop="g_nl"></el-table-column>
      <el-table-column label="民族" prop="g_mz"></el-table-column>
      <el-table-column label="手机号" prop="g_sjh"></el-table-column>
      <el-table-column label="部门" prop="bm"></el-table-column>
      <el-table-column label="职位" prop="zw"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-search"
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
        <el-form :model="form" :label-position="labelPosition" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="form.g_name"></el-input>
          </el-form-item>
          <el-form-item label="照片" width="120" v-model="form.g_zp">
            <img :src="'http://'+form.g_zp" width="100" height="100" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.g_xb"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.g_nl"></el-input>
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="form.g_mz"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.g_sjh"></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-input v-model="form.bm"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="form.zw"></el-input>
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
import { admin, seaadmin } from "../../network/staffadmin";
export default {
  components: {},
  props: {},
  data() {
    return {
      isname: "",
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
            "http://api.switchyl.online/public/Upload/img/2020-05-11/5eb91ecd7d93c.png"
        },
        {
          name: "李四",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "人资",
          post: "员工",
          url:
            "http://api.switchyl.online/public/Upload/img/2020-05-11/5eb91ecd7d93c.png"
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
            "http://api.switchyl.online/public/Upload/img/2020-05-11/5eb91ecd7d93c.png"
        },
        {
          name: "赵六",
          sex: "男",
          age: 20,
          nation: "汉",
          cellphone: "18437930195",
          department: "人资",
          post: "员工",
          url:
            "http://api.switchyl.online/public/Upload/img/2020-05-11/5eb91ecd7d93c.png"
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
            "http://api.switchyl.online/public/Upload/img/2020-05-11/5eb91ecd7d93c.png"
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
    let params = {
      uid: this.$store.state.uid
    };
    //console.log(params);
    admin(1).then(res => {
      console.log(res.data);
      this.istable = res.data.staff;
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
      if (this.isname != "") {
        let all = this.tableData.filter(n => {
          if (this.isname == n.name) {
            return n;
          }
          //console.log(n.name);
        });
        this.istable = all;
        if (this.istable == "") {
          this.$layer.msg("抱歉，没有您查找的这个员工");
        }
      } else {
        this.$layer.msg("您输入的为空，请重新输入");
        setTimeout(() => {
         // this.istable = this.istable;
        }, 1000);
      }
    },
    //查看
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
@import "./staffadmin.less";
</style>