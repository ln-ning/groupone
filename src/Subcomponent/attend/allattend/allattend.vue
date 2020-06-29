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
        <el-table-column fixed prop="g_name" label="姓名"></el-table-column>
        <el-table-column prop="q_date" label="时间"></el-table-column>
        <el-table-column prop="q_s_stime" label="上午上班时间" :formatter="this.$func.dateFormat"></el-table-column>
        <el-table-column prop="q_s_xtime" label="上午下班时间" :formatter="this.$func.dateFormat"></el-table-column>
        <el-table-column prop="q_x_stime" label="下午上班时间" :formatter="this.$func.dateFormat"></el-table-column>
        <el-table-column prop="q_x_xtime" label="下午下班时间" :formatter="this.$func.dateFormat"></el-table-column>
        <el-table-column prop="q_s" label="上午">
          <template
            slot-scope="scope"
          >{{ scope.row.q_s == 1 ? '迟到' : scope.row.q_s == 2 ?'请假':scope.row.q_s == 3 ?'旷工': '' }}</template>
        </el-table-column>
        <el-table-column prop="q_x" label="下午">
          <template
            slot-scope="scope"
          >{{ scope.row.q_x == 1 ? '迟到' : scope.row.q_x == 2 ?'请假':scope.row.q_x == 3 ?'旷工': '' }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { allkq } from "../../../network/attend";
export default {
  inject: ["reload"],
  components: {},
  props: {},
  data() {
    return {
      //表格信息
      firsttime: [],
      alldata: [],
      tableData: [],
      time1: "",
      time2: "",
      ct_month: "",
      nowtime: ""
    };
  },
  created() {
    this.alltimes();
    allkq().then(res => {
      // console.log(res.data.data);
      this.firsttime = res.data.data;
    });
  },
  methods: {
    //时间查询
    timesearch() {
      //console.log(this.time1);
      //console.log(this.time2);
      //都没有
      if (
        (this.time1 == "" || this.time1 == null) &&
        (this.time2 == "" || this.time2 == null)
      ) {
        this.$layer.msg("请选择查询时间");
        this.reload();
      }
      //开始没有
      else if (this.time1 == "" && this.time2 != "") {
        this.firsttime = this.alldata.filter(n => {
          if (n.q_date <= this.time2) {
            return n;
          }
        });
        // this.firsttime = all;
      }
      //结束没有
      else if (this.time1 != "" && this.time2 == "") {
        //console.log(this.alldata);
        this.firsttime = this.alldata.filter(n => {
          if (n.q_date >= this.time1) {
            return n;
          }
        });
        //this.firsttime = all;
      }
      //都有
      else {
        this.firsttime = this.alldata.filter(n => {
          if (n.q_date >= this.time1 && n.q_date <= this.time2) {
            return n;
          }
        });
        // this.firsttime = all;
      }
    },
    //总数据
    alltimes() {
      this.nowtime = new Date();
      this.ct_month = new Date();
      let monthday = this.ct_month.setTime(
        this.ct_month.getTime() - 3600 * 1000 * 24 * 60
      );
      let nowday = this.ct_month.setTime(this.nowtime.getTime());
      let action = new Date(nowday);
      let end = new Date(monthday);

      let params = {
        sj: this.$func.formatDate(end),
        sj1: this.$func.formatDate(action)
      };
      // console.log(params);
      allkq(params).then(res => {
        //  console.log(res.data.data);
        this.alldata = res.data.data;
      });
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

      // let params = {
      //   sj: this.$func.formatDate(end),
      //   sj1: this.$func.formatDate(action)
      // };
      // console.log(params);
      // allkq(params).then(res => {
      //   console.log(res.data.data);
      //   this.firsttime = res.data.data;
      // });

      this.firsttime = this.alldata.filter(n => {
        if (
          n.q_date <= this.$func.formatDate(action) &&
          n.q_date >= this.$func.formatDate(end)
        ) {
          return n;
        }
      });
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

      // let params = {
      //   sj: this.$func.formatDate(end),
      //   sj1: this.$func.formatDate(action)
      // };
      // allkq(params).then(res => {
      //  console.log(res.data.data);
      //   this.firsttime = res.data.data;
      // });

      this.firsttime = this.alldata.filter(n => {
        if (
          n.q_date <= this.$func.formatDate(action) &&
          n.q_date >= this.$func.formatDate(end)
        ) {
          return n;
        }
      });
    },
    //当天
    day() {
      this.reload();
      // this.nowtime = new Date();
      // this.ct_month = new Date();
      // let monthday = this.ct_month.setTime(
      //   this.ct_month.getTime() - 3600 * 1000 * 24
      // );
      // let nowday = this.ct_month.setTime(this.nowtime.getTime());
      // let action = new Date(nowday);
      // let end = new Date(monthday);
      // // // console.log(action);
      // // // console.log(end);
      // // // console.log(this.formatDate(end));
      // // let params = {
      // //   uid: this.$store.state.uid
      // //   //sj: this.$func.formatDate(action),
      // //   //sj1: this.$func.formatDate(end)
      // // };
      // // grkq(params).then(res => {
      // //   console.log(res.data);
      // //   this.firsttime = res.data;
      // // });
      // //console.log(params);
      // this.firsttime.filter(n => {
      //   if (
      //     n.time <= this.$func.formatDate(action) &&
      //     n.time > this.$func.formatDate(end)
      //   ) {
      //     return n;
      //   }
      // });
    }
  }
};
</script>
<style scoped lang="less">
@import "./allattend.less";
</style>