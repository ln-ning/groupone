<template>
  <div>
    <i style="font-size: 40px; color: #009688;" class="fa fa-plus-square fa-5" aria-hidden="true" @click="add"></i>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" type="index"
      width="50">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="radio" label="性别">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column prop="cellphone" label="手机号">
      </el-table-column>
      <el-table-column prop="chat" label="微信">
      </el-table-column>
      <el-table-column prop="QQ" label="QQ">
      </el-table-column>
      <el-table-column prop="time" label="创建时间">
      </el-table-column>
      <el-table-column prop="founder" label="创始人">
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button @click="see(scope.row)" style="background: #009688; color: #fff;" size="small" circle><i
              class="fa fa-search" aria-hidden="true"></i></el-button>
          <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)" size="mini" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- form弹框 -->
    <!-- 添加信息 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.radio" label="男">男</el-radio>
          <el-radio v-model="form.radio" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.cellphone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="form.chat" placeholder="请输入微信"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="form.QQ" placeholder="请输入QQ号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickItem" size="mini">添加</el-button>
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 查看信息 -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible2">
      <el-form :model="getform" label-width="100px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户信息" name="first">
            <el-form-item label="用户ID">
              <el-input v-model="getform.id"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="getform.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="getform.radio"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="getform.age"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="getform.address"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="getform.cellphone"></el-input>
            </el-form-item>
            <el-form-item label="微信">
              <el-input v-model="getform.chat"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input v-model="getform.QQ"></el-input>
            </el-form-item>
            <el-form-item label="创建人">
              <el-input v-model="getform.founder"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="getform.time"></el-input>
            </el-form-item>
            <el-form-item label="所属">
              <el-input v-model="getform.post"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="成交产品" name="second">
            <el-table :data="getTable" style="width: 100%">
              <el-table-column prop="product" label="产品">
              </el-table-column>
              <el-table-column prop="price" label="单价">
              </el-table-column>
              <el-table-column prop="totalprice" label="总价">
              </el-table-column>
              <el-table-column prop="number" label="数量">
              </el-table-column>
              <el-table-column prop="Clincher" label="成交人">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="跟踪进程" name="third"></el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改信息 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible1">
      <el-form :model="form1">
        <el-form-item label="姓名">
          <el-input v-model="form1.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form1.radio" label="男">男</el-radio>
          <el-radio v-model="form1.radio" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form1.age"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form1.address"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form1.cellphone"></el-input>
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="form1.chat"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="form1.QQ"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickChange" size="mini">修改</el-button>
        <el-button @click="dialogFormVisible1 = false" size="mini">取 消</el-button>
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
        tableData: [],
        // 添加信息
        dialogFormVisible: false,
        form: {},
        // 修改信息
        dialogFormVisible1: false,
        form1: {},
        // 查看
        dialogFormVisible2: false,
        getform: {},
        activeName: 'first',
        getTable: []
      }
    },
    methods: {
      // 添加
      add() {
        this.dialogFormVisible = true;
        
      },
      clickItem() {
        this.dialogFormVisible = false
        let obj = {
          name: this.form.name,
          radio: this.form.radio,
          age: this.form.age,
          address:this.form.address,
          cellphone: this.form.cellphone,
          chat: this.form.chat,
          QQ: this.form.QQ
        }
        this.tableData.push(obj);
        console.log(this.tableData)
      },
      // 查看信息
      see(row) {
        console.log(row);
        this.dialogFormVisible2 = true
        this.getform = row;
        // this.getform=this.form

      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 编辑
      edit(row) {
        this.dialogFormVisible1 = true
        this.form1 = row
      },
      // 确认修改
      clickChange() {
        this.tableData==this.form1
        this.dialogFormVisible1 = false
      },
    },
  }
</script>
<style scoped>
  @import './users.css'
</style>