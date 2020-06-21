<template>
  <div class="all">
    <div class="top">
      <div class="top-left">
        <el-button type="primary" @click="months">近一个月</el-button>
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
      <el-table :data="firsttime" border style="width: 100%" class="el-table">
        <el-table-column fixed prop="name" label="姓名"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="m_stime" label="上午上班时间"></el-table-column>
        <el-table-column prop="m_xtime" label="上午下班时间"></el-table-column>
        <el-table-column prop="a_stime" label="下午上班时间"></el-table-column>
        <el-table-column prop="a_xtime" label="下午下班时间"></el-table-column>
        <el-table-column prop="morn" label="上午"></el-table-column>
        <el-table-column prop="aft" label="下午"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      //表格信息
      firsttime: [],
      tableData: [
        {
          name: "张三",
          time: "2020-04-10",
          m_stime: "08:01:00",
          m_xtime: "12:04:00",
          a_stime: "14:05:00",
          a_xtime: "18:02:00",
          morn: "打游戏",
          aft: "睡觉"
        },
        {
          name: "李四",
          time: "2020-06-10",
          m_stime: "08:05:00",
          m_xtime: "12:04:00",
          a_stime: "14:00:00",
          a_xtime: "18:00:00",
          morn: "打游戏",
          aft: "睡觉"
        },
        {
          name: "王二",
          time: "2020-06-20",
          m_stime: "08:07:00",
          m_xtime: "12:00:00",
          a_stime: "14:00:00",
          a_xtime: "18:00:00",
          morn: "打游戏",
          aft: "睡觉"
        },
        {
          name: "赵六",
          time: "2020-06-21",
          m_stime: "08:00:00",
          m_xtime: "12:00:00",
          a_stime: "14:00:00",
          a_xtime: "18:00:00",
          morn: "打游戏",
          aft: "睡觉"
        }
      ],
      time1: "",
      time2: "",
      ct_month: "",
      nowtime: ""
    };
  },
  created() {
    this.firsttime = this.tableData;
  },
  methods: {
    timesearch() {
      // console.log(this.time1);
      // console.log(this.time2);
      //都没有
      if (this.time1 == "" && this.time2 == "") {
        this.$layer.msg("请选择查询时间");
      }
      //开始没有
      else if (this.time1 == "" && this.time2 != "") {
        let all = this.tableData.filter(n => {
          if (n.time < this.time2) {
            return n;
          }
        });
        this.firsttime = all;
      }
      //结束没有
      else if (this.time1 != "" && this.time2 == "") {
        let all = this.tableData.filter(n => {
          if (n.time > this.time1) {
            return n;
          }
        });
        this.firsttime = all;
      }
      //都有
      else {
        let all = this.tableData.filter(n => {
          if (n.time >= this.time1 && n.time <= this.time2) {
            return n;
          }
        });
        this.firsttime = all;
      }
    },
    //格式化函数
    formatDate(now) {
      var year = now.getFullYear(); //取得4位数的年份
      var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate(); //返回日期月份中的天数（1到31）
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      return year + "-" + month + "-" + date;
    },
    //近一个月
    months() {
      this.nowtime = new Date();
      this.ct_month = new Date();
      let monthday = this.ct_month.setTime(
        this.ct_month.getTime() - 3600 * 1000 * 24 * 30
      );
      let nowday = this.ct_month.setTime(this.nowtime.getTime());
      let action = new Date(nowday);
      let end = new Date(monthday);
      this.firsttime = this.tableData.filter(n => {
        if (
          n.time <= this.formatDate(action) &&
          n.time > this.formatDate(end)
        ) {
          return n;
        }
      });
      // this.nowtime = new Date();
      // this.ct_month = new Date();
      // let monthday = this.ct_month.setTime(
      //   this.ct_month.getTime() - 3600 * 1000 * 24 * 30
      // );
      // let nowday = this.ct_month.setTime(this.nowtime.getTime());
      // let action = new Date(nowday);
      // let end = new Date(monthday);
      // // console.log(this.formatDate(action));
      // this.firsttime = this.tableData.filter(res => {
      //   if (
      //     res.time <= this.formatDate(action) &&
      //     res.time > this.formatDate(end)
      //   ) {
      //     return res;
      //   }
      // });
      // let times = new Date().getTime(); //当前时间
      // let old_times = times - 1000 * 60 * 60 * 24 * 30; //获取时间戳
      // let that = this;
      // let list = [];
      // let j = 0;
      // for (let i of that.tableData) {
      //   if (
      //     new Date(i.time).getTime() >= old_times &&
      //     new Date(i.time).getTime() <= new Date().getTime()
      //   ) {
      //     list[j] = i;
      //     j++;
      //   }
      // }
      // console.log(list);

      // this.tableData = list;
    },
    //近一周
    week() {
      this.nowtime = new Date();
      this.ct_month = new Date();
      let monthday = this.ct_month.setTime(
        this.ct_month.getTime() - 3600 * 1000 * 24 * 7
      );
      let nowday = this.ct_month.setTime(this.nowtime.getTime());
      let action = new Date(nowday);
      let end = new Date(monthday);
      this.firsttime = this.tableData.filter(n => {
        if (
          n.time <= this.formatDate(action) &&
          n.time > this.formatDate(end)
        ) {
          return n;
        }
      });
      // let times = new Date().getTime(); //当前时间
      // let old_times = times - 1000 * 60 * 60 * 24 * 7; //获取时间戳
      // let that = this;
      // let list = [];
      // let j = 0;
      // for (let i of that.tableData) {
      //   if (
      //     new Date(i.time).getTime() >= old_times &&
      //     new Date(i.time).getTime() <= new Date().getTime()
      //   ) {
      //     list[j] = i;
      //     j++;
      //   }
      // }

      // this.tableData = list;
    },
    //当天
    day() {
      this.nowtime = new Date();
      this.ct_month = new Date();
      let monthday = this.ct_month.setTime(
        this.ct_month.getTime() - 3600 * 1000 * 24
      );
      let nowday = this.ct_month.setTime(this.nowtime.getTime());
      let action = new Date(nowday);
      let end = new Date(monthday);
      this.firsttime = this.tableData.filter(n => {
        if (
          n.time <= this.formatDate(action) &&
          n.time > this.formatDate(end)
        ) {
          return n;
        }
      });
      // // for (let i = 0; i < this.tableData.length; i++) {
      // //   //console.log(this.tableData[i].time);
      // // }
      // let times = new Date().getTime(); //当前时间
      // let old_times = times - 1000 * 60 * 60 * 24; //获取时间戳
      // let that = this;
      // let list = [];
      // let j = 0;
      // for (let i of that.tableData) {
      //   if (
      //     new Date(i.time).getTime() >= old_times &&
      //     new Date(i.time).getTime() <= new Date().getTime()
      //   ) {
      //     list[j] = i;
      //     j++;
      //   }
      // }

      // this.tableData = list;
    },
    //获取当前时间
    // currentTime() {
    //   setInterval(this.getTime, 500);
    // },
    // gettimes: function(datets) {
    //   var that;
    //   datets ? (that = datets) : (that = this);
    //   var dates = new Date(that);
    //   let yy = dates.getFullYear();
    //   let mm = dates.getMonth() + 1;
    //   let dd = dates.getDate();
    //   return yy + "-" + mm + "-" + dd;
    // },
    // getTime: function() {
    //   var _this = this;

    //   var dates = new Date();
    //   let yy = dates.getFullYear();
    //   let mm = dates.getMonth() + 1;
    //   let dd = dates.getDate();
    //   this.gettime = yy + "-" + mm + "-" + dd;
    // }
  }
};
</script>
<style scoped lang="less">
@import "./allattend.less";
</style>