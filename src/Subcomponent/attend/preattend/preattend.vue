<template>
  <div class="all">
    <div class="top">
      <div class="top-left">
        <el-button type="primary" @click="month">近一个月</el-button>
        <el-button type="primary" @click="week">近一星期</el-button>
        <el-button type="primary" @click="day">当天</el-button>
      </div>
      <div class="top-right">
        <el-date-picker v-model="time1" type="date" value-format="yyyy-MM-dd"></el-date-picker>-
        <el-date-picker v-model="time2" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        <el-button type="primary" class="top-right-button" @click="timesearch">搜索</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%" class="el-table">
        <el-table-column fixed prop="name" label="姓名"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="province" label="上午上班时间"></el-table-column>
        <el-table-column prop="city" label="上午下班时间"></el-table-column>
        <el-table-column prop="address" label="下午上班时间"></el-table-column>
        <el-table-column prop="zip" label="下午下班时间"></el-table-column>
        <el-table-column prop="add" label="上午"></el-table-column>
        <el-table-column prop="z" label="下午"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import "@/Subcomponent/attend/preattend/preattend.less";
export default {
  components: {},
  props: {},
  data() {
    return {
      //表格信息
      firsttime: [],
      tableData: [
        {
          time: "2020-06-16",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          add: "旷工",
          z: "请假"
        },
        {
          time: "2020-06-17",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          add: "旷工",
          z: "请假"
        },
        {
          time: "2020-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          add: "旷工",
          z: "请假"
        },
        {
          time: "2020-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          add: "旷工",
          z: "请假"
        },
        {
          time: "2020-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          add: "旷工",
          z: "请假"
        },
        {
          time: "2020-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          add: "旷工",
          z: "请假"
        },
        {
          time: "2020-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          add: "旷工",
          z: "请假"
        }
      ],
      time1: "",
      time2: "",
      gettime: ""
    };
  },
  created() {
    this.firsttime = this.tableData;
    this.currentTime();
  },
  methods: {
    timesearch() {
      //0 0
      if (
        (this.time1 == "" || this.time1 == null) &&
        (this.time2 == "" || this.time2 == null)
      ) {
        this.firsttime = this.tableData;
        // console.log(this.firsttime);
      }
      //1 0
      else if (this.time1 !== "" && (this.time2 == "" || this.time2 == null)) {
        for (let i = 0; i < this.tableData.length; i++) {
          let list = this.tableData.filter(n => {
            if (n.time < this.time2) {
              return n;
            }
          });
          this.tableData = list;
        }
      }

      //0 1
      else if ((this.time1 == "" || this.time1 == null) && this.time2 != "") {
        let list = this.tableData.filter(n => {
          if (n.time < this.time2) {
            return n;
          }
        });
        this.tableData = list;
      }
      // 1 1
      else {
        let list = this.tableData.filter(n => {
          if (n.time < this.time2 && n.time > this.time1) {
            return n;
          }
        });
        this.tableData = list;
        // console.log(list);
      }
    },
    //近一个月
    month() {
      let times = new Date().getTime(); //当前时间
      let old_times = times - 1000 * 60 * 60 * 24 * 30; //获取时间戳
      let that = this;
      let list = [];
      let j = 0;
      for (let i of that.tableData) {
        if (
          new Date(i.time).getTime() >= old_times &&
          new Date(i.time).getTime() <= new Date().getTime()
        ) {
          list[j] = i;
          j++;
        }
      }
      console.log(list);

      this.tableData = list;
    },
    //近一周
    week() {
      let times = new Date().getTime(); //当前时间
      let old_times = times - 1000 * 60 * 60 * 24 * 7; //获取时间戳
      let that = this;
      let list = [];
      let j = 0;
      for (let i of that.tableData) {
        if (
          new Date(i.time).getTime() >= old_times &&
          new Date(i.time).getTime() <= new Date().getTime()
        ) {
          list[j] = i;
          j++;
        }
      }
     

      this.tableData = list;
    },
    //当天
    day() {
      // for (let i = 0; i < this.tableData.length; i++) {
      //   //console.log(this.tableData[i].time);
      // }
      let times = new Date().getTime(); //当前时间
      let old_times = times - 1000 * 60 * 60 * 24; //获取时间戳
      let that = this;
      let list = [];
      let j = 0;
      for (let i of that.tableData) {
        if (
          new Date(i.time).getTime() >= old_times &&
          new Date(i.time).getTime() <= new Date().getTime()
        ) {
          list[j] = i;
          j++;
        }
      }
    

      this.tableData = list;
    },
    //获取当前时间
    currentTime() {
      setInterval(this.getTime, 500);
    },
    gettimes: function(datets) {
      var that;
      datets ? (that = datets) : (that = this);
      var dates = new Date(that);
      let yy = dates.getFullYear();
      let mm = dates.getMonth() + 1;
      let dd = dates.getDate();
      return yy + "-" + mm + "-" + dd;
    },
    getTime: function() {
      var _this = this;

      var dates = new Date();
      let yy = dates.getFullYear();
      let mm = dates.getMonth() + 1;
      let dd = dates.getDate();
      this.gettime = yy + "-" + mm + "-" + dd;
    }
  }
};
</script>
<style scoped>
</style>