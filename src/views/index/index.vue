<template>
  <div class="main">
    <div class="header">
      <!-- logo部分 -->
      <div class="logo">
        <span class="big">OA</span>
        <span class="min">
          <img width="40" style="margin-top: 5px" alt />
        </span>
      </div>
      <!-- 隐藏左侧 -->
      <span class="header-btn" @click="hiddenSidebar">
        <i class="el-icon-menu"></i>
      </span>
      <!-- 时间 -->
      <span class="header-btn">{{time}}</span>
      <!-- 右边功能 -->
      <div class="right">
        <span class="header-btn" @click="qiandao">签到</span>
        <span class="header-btn" @click="screenfullToggle">
          <i class="fa fa-arrows-alt"></i>
        </span>
        <el-dropdown>
          <span class="header-btn">
            <i class="el-icon-setting"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div style="padding: 10px;text-align: center;width: 420px">
              <div class="setting-category">
                <el-switch
                  @change="saveSwitchTabBarVal"
                  v-model="switchTabBar"
                  active-text="开启TabBar"
                  inactive-text="关闭TabBar"
                ></el-switch>
                <el-switch
                  @change="saveFixedTabBar"
                  v-if="switchTabBar"
                  v-model="fixedTabBar"
                  style="margin-top: 10px"
                  active-text="固定在顶部"
                  inactive-text="随页面滚动"
                ></el-switch>
                <el-alert
                  v-if="switchTabBar"
                  style="margin-top: 10px"
                  title="导航标签超过容器时,可在导航上滚动鼠标来移动标签"
                  type="info"
                  show-icon
                ></el-alert>
              </div>
              <div class="setting-category" style="display: flex;height: 80px;align-items: center">
                <div style="width: 80px">
                  <el-button
                    type="primary"
                    icon="el-icon-sort"
                    circle
                    @click="ToggleGrayMode"
                    style="transform: rotate(90deg)"
                  ></el-button>
                </div>
                <div style="flex: 1;margin-top: -8px">
                  <el-alert style="margin-top: 10px" title="切换灰度模式!" type="info" show-icon></el-alert>
                </div>
              </div>
              <!--<div class="setting-category">-->
              <!--下个设置块-->
              <!--</div>-->
            </div>
          </el-dropdown-menu>
        </el-dropdown>

        <span class="header-btn">
          <el-badge :value="3" class="badge">
            <i class="el-icon-bell"></i>
          </el-badge>
        </span>
        <el-dropdown>
          <span class="header-btn">
            Admin
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push('/index')">
              <i style="padding-right: 8px" class="fa fa-cog"></i>个人中心
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              <i style="padding-right: 8px" class="fa fa-key"></i>退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 主体 -->
    <div class="app">
      <!-- 侧边栏 -->
      <div class="aside">
        <div class="menu">
          <el-menu
            router
            background-color="#222d32"
            text-color="#fff"
            :default-active="$route.path"
            class="menu"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <!-- <template v-for="item in ilist">
              <el-submenu v-if="item.items" :index="item.l_name" :key="item.id">
                <template>
                  <span slot="title" @click="qqq">{{ item.l_name }}</span>
                </template>
                <el-menu-item v-for="citem in item.items" :key="citem.id" :index="ipath">
                  <span slot="title" @click="qqq">{{ citem.l_name }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="ipath" :key="item.id">
                <span slot="title" @click="qqq">{{ item.l_name }}</span>
              </el-menu-item>
            </template>-->
            <template v-for="(item,menu_k) in menu">
              <el-submenu v-if="item.children" :index="menu_k" :key="item.name ">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.name }}</span>
                </template>
                <el-menu-item
                  v-for="(menuChildren_v,menuChildren_k) in item.children"
                  :key="menuChildren_k"
                  :index="menuChildren_v.path"
                >
                  <i class="is-children fa fa-circle-o"></i>
                  <span slot="title">{{ menuChildren_v.name }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="item.path" :key="item.name ">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
        <div class="sidebar-toggle" @click="sidebarToggle">
          <div class="icon-left">
            <i class="el-icon-back"></i>
          </div>
        </div>
      </div>
      <!-- 主体显示部位 -->
      <div class="app-body">
        <!-- 内部路由导航 -->
        <cnavbar
          id="nav-bar"
          v-if="switchTabBar"
          :style="fixedTabBar && switchTabBar?'position: fixed;top: 0;':''"
        ></cnavbar>
        <div v-else style="margin-top: 50px;"></div>
        <div
          id="mainContainer"
          :style="fixedTabBar && switchTabBar?'margin-top: 88px;':''"
          class="main-container"
        >
          <!-- 路由内容显示的地方 -->
          <router-view v-if="isRouterAlive"></router-view>
        </div>
        <!-- 页脚 -->
        <cfooter></cfooter>
      </div>
    </div>
  </div>
</template>

<script>
import { qian } from "../../network/sign";
import { cindex } from "../../network/index";
import Menu from "../../navjs/index";
import cfooter from "../../components/cfooter/cfooter";
import cnavbar from "../../components/cnavbar/cnavbar";
export default {
  components: {
    cnavbar,
    cfooter
  },
  props: {},
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      fixedTabBar: false,
      switchTabBar: false,
      // siteName: this.$Config.siteName,
      isCollapse: false,
      menu: Menu,
      time: "",
      ilist: [],
      ipath: ""
    };
  },
  created() {
    let params = {
      uid: this.$store.state.uid
    };
    cindex(params).then(res => {
      // console.log(res.data.data);
      this.ilist = res.data.data;
      // for (let i in this.ilist) {
      //   if (this.ilist[i].id == 64) {
      //     //console.log(555);
      //     //this.ipath == "/usersinfo";
      //     this.$router.push("/usersinfo").catch(err => {});
      //   }
      //   //console.log(this.ilist[i].id);
      // }

      // if(this.ilist[0].id==64){
      //     console.log(555)
      // }
    });
    this.currentTime();
    console.log("用户id为" + this.$store.state.uid);
  },
  methods: {
    qqq() {
      for (let i in this.ilist) {
        if (this.ilist[i].id == 64) {
          this.ipath == "/usersinfo";
          //this.$router.push("/usersinfo").catch(err => {});
        }
        if (this.ilist[i].id == 63) {
          //this.$router.push("/usersinfo").catch(err => {});
        }
        if (this.ilist[i].id == 43) {
          // this.$router.push("/leave").catch(err => {});
        }
        if (this.ilist[i].id == 52) {
          // this.$router.push("/deparadmin").catch(err => {});
        }
      }
    },
    qiandao() {
      qian().then(res => {
        // console.log(res.data);
        this.$layer.msg(res.data.info);
      });
    },
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    },
    //页面打开触发定时器
    currentTime() {
      setInterval(this.getTime, 500);
    },
    //获取时间代码
    getTime() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.time = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    },
    //不用怀疑，底下的代码都是借鉴的
    NavBarWidth() {
      let navBar = document.getElementById("nav-bar");
      if (!navBar) return;
      if (!(this.fixedTabBar && this.switchTabBar)) {
        navBar.style.width = "100%";
        return;
      }
      let sidebarClose = document.body.classList.contains("sidebar-close");
      if (sidebarClose) {
        navBar.style.width = "100%";
        return;
      }
      if (this.isCollapse) navBar.style.width = "calc(100% - 64px)";
      else navBar.style.width = "calc(100% - 230px)";
    },
    ToggleGrayMode() {
      document.body.classList.toggle("gray-mode");
    },
    screenfullToggle() {
      //  if (!Screenfull.enabled) {
      this.$message({
        message: "你点个锤子，我不会做",
        type: "warning"
      });
      // return false;
      // }
      //Screenfull.toggle();
    },
    saveFixedTabBar(v) {
      v
        ? localStorage.setItem("fixedTabBar", v)
        : localStorage.removeItem("fixedTabBar");
      this.NavBarWidth();
    },
    saveSwitchTabBarVal(v) {
      let containerDom = document.getElementById("mainContainer");
      v
        ? (containerDom.style.minHeight = "calc(100vh - 139px)")
        : (containerDom.style.minHeight = "calc(100vh - 101px)");
      v
        ? localStorage.setItem("switchTabBar", v)
        : localStorage.removeItem("switchTabBar");
      this.NavBarWidth();
    },
    sidebarToggle(e) {
      e.preventDefault();
      if (this.isCollapse) {
        document.body.classList.remove("sidebar-hidden");
        //this.siteName = this.$Config.siteName;
        this.isCollapse = false;
      } else {
        document.body.classList.add("sidebar-hidden");
        this.isCollapse = true;
      }
      this.NavBarWidth();
    },
    hiddenSidebar(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-close");
      this.NavBarWidth();
    },
    logout() {
      //sessionStorage.removeItem(this.$Config.tokenKey);
      this.$router.push({ path: "/" });
    },
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //关闭菜单
    }
  },
  mounted() {
    this.switchTabBar = localStorage.getItem("switchTabBar") ? true : false;
    this.fixedTabBar = localStorage.getItem("fixedTabBar") ? true : false;
    if (this.switchTabBar)
      document.getElementById("mainContainer").style.minHeight =
        "calc(100vh - 139px)";

    if (!this.isCollapse) {
      document.body.classList.remove("sidebar-hidden");
      // this.siteName = this.$Config.siteName
    } else {
      document.body.classList.add("sidebar-hidden");
    }

    setTimeout(() => {
      this.NavBarWidth();
    }, 1000);
  }
};
</script>
<style scoped>
@import "./index.css";
</style>