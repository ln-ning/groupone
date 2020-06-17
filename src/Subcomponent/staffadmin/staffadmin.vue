<template>
  <div>
    <!-- 信息 -->
    <!-- 搜索 -->
    <div>
      <el-input placeholder="请输入用户昵称！" size="small" style="width: 140px" v-model="name" @clear="searchUser" clearable>
      </el-input>
      <el-button @click="searchUser" type="success" icon="el-icon-search" size="small"></el-button>
    </div>
    <!-- 内容 -->
    <el-table :data="tableData" border ref="table" style="width: 100%">
      <el-table-column label="照片">
        <el-image style="width: 100px; height: 100px" props='url'></el-image>
      </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="民族" prop="nation"></el-table-column>
      <el-table-column label="手机号" prop="cellphone"></el-table-column>
      <el-table-column label="部门" prop="department"></el-table-column>
      <el-table-column label="职位" prop="post"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="dialogFormVisible = true">查看</el-button>
          <el-button type="danger" icon="el-icon-delete" @click.native.prevent="deleteRow(scope.$index, tableData)"
            size="mini" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :page-size="5" layout="prev, pager, next" :total="total" @current-change="currentChage">
    </el-pagination>
    <!-- 弹窗框 -->
    <el-dialog title="员工信息" :visible.sync="dialogFormVisible">
      <div class="place">
        <el-form :model="form" :label-position="labelPosition" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.sex"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.idcard"></el-input>
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="form.nation"></el-input>
          </el-form-item>
          <el-form-item label="学历">
            <el-input v-model="form.education"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
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
        name: '',
        tableData: [{
            name: '张三',
            sex: '男',
            age: 20,
            nation: '汉',
            cellphone: '18437930195',
            department: '人资',
            post: '员工',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            name: '张三',
            sex: '男',
            age: 20,
            nation: '汉',
            cellphone: '18437930195',
            department: '人资',
            post: '员工',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            name: '张三',
            sex: '男',
            age: 20,
            nation: '汉',
            cellphone: '18437930195',
            department: '人资',
            post: '员工',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            name: '张三',
            sex: '男',
            age: 20,
            nation: '汉',
            cellphone: '18437930195',
            department: '人资',
            post: '员工',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            name: '李四',
            sex: '男',
            age: 20,
            nation: '汉',
            cellphone: '18437930195',
            department: '人资',
            post: '员工',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }
        ],
        total:0,
        // 弹框
        dialogFormVisible: false,
        labelPosition: 'right',
        form: {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          name: '张三',
          sex: '男',
          age: '20',
          idcard: '410305199906010531',
          nation: '汉',
          education: '研究生',
          address: '河南洛阳',
          cellphone: '18437930195',
          department: '人资',
          post: '员工',
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      // 搜索
      searchUser() {
        
      },
      // 分页
      currentChage(){

      },
      // 删除
      deleteRow(index, row) {
        row.splice(index, 1);
      },

    },
  }
</script>
<style scoped>
  .el-input {
    width: 35%;
  }
</style>