<template>
  <div class="user-list">
    <!-- <el-button type="primary" icon="el-icon-plus" @click="appendLog = true"></el-button> -->
    <el-table :data="isdata" border ref="table" style="width: 100%">
      <el-table-column prop="id" label="ID" align="center" width="80"></el-table-column>
      <el-table-column prop="y_name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="y_xb" label="性别" align="center" width="80"></el-table-column>
      <el-table-column prop="y_nl" label="年龄" align="center" width="80"></el-table-column>
      <el-table-column prop="y_sjh" label="手机号" align="center"></el-table-column>
      <el-table-column prop="y_dz" label="地址" align="center"></el-table-column>
      <el-table-column prop="y_wx" label="微信" align="center"></el-table-column>
      <el-table-column prop="y_qq" label="QQ" align="center"></el-table-column>
      <el-table-column prop="y_sj" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="cjr" label="创建人" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            class="user_look"
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="look(scope.$index,scope.row)"
          ></el-button>
          <el-button
            class="user_edit"
            type="primary"
            size="mini"
            @click="apply(scope.$index,scope.row)"
          >申领</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看信息 -->
    <el-dialog width="500px" title="用户信息" class="allTable" :visible.sync="dialogTableVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户信息" name="first">
          <el-form :label-position="labelPosition" label-width="80px" :model="lookform">
            <el-form-item label="姓名">
              <el-input :value="lookform.y_name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="lookform.y_xb">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input :value="lookform.y_nl"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input :value="lookform.y_dz"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input :value="lookform.y_sjh"></el-input>
            </el-form-item>
            <el-form-item label="微信">
              <el-input :value="lookform.y_wx"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
              <el-input :value="lookform.y_qq"></el-input>
            </el-form-item>
            <!-- <el-form-item label="创建人">
              <el-input :value="cjr"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input :value="y_sj"></el-input>
            </el-form-item> -->
            <el-form-item label="所属">
              <el-input :value="lookform.type"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="成交商品" name="second">
          <el-table :data="subData" style="width: 100%">
            <el-table-column prop="product" label="产品" width="90px"></el-table-column>
            <el-table-column prop="price" label="单价" width="90px"></el-table-column>
            <el-table-column prop="sum" label="总价" width="90px"></el-table-column>
            <el-table-column prop="num" label="数量" width="90px"></el-table-column>
            <el-table-column prop="name" label="成交人" width="90px"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="跟踪进程" name="third">
          <el-timeline class="timeline">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :color="activity.color"
              :timestamp="activity.timestamp"
            >{{activity.content}}</el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { allpool, slpool } from "../../network/seaspool";
export default {
  inject: ["reload"],
  data() {
    return {
      params: {
        name: ""
      },
      form: {
        id: "",
        name: "",
        nickname: "",
        age: "",
        cellphone: "",
        QQ: "",
        wx: "",
        place: "",
        tp: ""
      },
      subData: [
        {
          product: "火箭",
          price: "199",
          sum: "398",
          num: "2",
          name: "张三"
        },
        {
          product: "飞船",
          price: "199",
          sum: "398",
          num: "2",
          name: "李四"
        }
      ],
      usersData: [
        {
          id: 1,
          name: "张三",
          nickname: "管理员",
          age: "19",
          cellphone: "151178xxxx",
          QQ: "2222222",
          wx: "111111",
          place: "洛职",
          tp: "男",
          active: 1
        },
        {
          id: 2,
          name: "李四",
          nickname: "森林",
          age: "20",
          cellphone: "151178xxxx",
          QQ: "111111",
          wx: "2222222",
          place: "洛职",
          tp: "女",
          active: 0
        }
      ],
      isdata: [],
      lookform: [],
      activities: [
        {
          content: "这是一个进程",
          timestamp: "张三提交于：2018-04-12 20:46",
          color: "#0bbd87"
        },
        {
          content: "这是一个进程",
          timestamp: "张三提交于：2018-04-12 20:46",
          color: "#0bbd87"
        },
        {
          content: "这是一个进程",
          timestamp: "张三提交于：2018-04-12 20:46",
          color: "#0bbd87"
        },
        {
          content: "这是一个进程",
          timestamp: "张三提交于：2018-04-12 20:46",
          color: "#0bbd87"
        }
      ],
      editForm: {},
      labelPosition: "left",
      dialogTableVisible: false,
      activeIndex: "1",
      activeIndex2: "1",
      activeName: "first",
      appendLog: false,
      time: "2020-06-15",
      site: "admin",
      edit: false,
      index: ""
    };
  },
  created() {
    let params = {
      uid: this.$store.state.uid
    };
    // console.log(params);
    allpool(params).then(res => {
      //  console.log(res.data);
      this.isdata = res.data;
    });
  },
  methods: {
    look(i, row) {
      console.log(row);
      this.dialogTableVisible = true;
      this.lookform = row;
    },
    subChange(index) {
      this.edit = false;
      this.usersData.splice(index, 1, this.editForm);
    },
    apply(index, row) {
      let params = {
        uid: this.$store.state.uid,
        id: row.id
      };
      console.log(params);
      slpool(params).then(res => {
        //console.log(res.data);
        this.$layer.msg(res.data.info);
        this.reload();
      });
    }
  },
  components: {}
};
</script>
<style scoped lang="less">
@import "./seaspool.less";
</style>
