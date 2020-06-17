<template>
  <nav class="nav-bar">
    <router-link to="/index" class="itohome">
      <i class="fa fa-home" aria-hidden="true"></i>
    </router-link>
    <router-link
      :to="v.path"
      class="nav-bar-tag"
      v-for="(v,i) in nav"
      :key="i.path"
      :class="$route.path == v.path ? ' active':''"
    >
      {{ v.title }}
      <div v-show="nav.length != 1" class="close-box">
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(i)" closable></span>
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      nav: []
    };
  },
  watch: {
    $route: {
      handler: function() {
        let index = this.$func.hasValInArrayObj(
          this.nav,
          "path",
          this.$route.path
        );
        if (index != -1) return;
        this.nav.push({
          path: this.$route.path,
          title: this.$route.meta.title
        });
      },
      // 深度观察
      deep: true
    }
  },
  methods: {
    closeSelectedTag(i) {
      console.log(i);
      let nav = this.nav;
      let thisPath = nav[i].path;
      nav.splice(i, 1);
      if (thisPath == this.$route.path) {
        this.$router.push(nav[nav.length - 1].path);
      }
    }
  },
  mounted() {
    this.nav.push({
      path: this.$route.path,
      title: this.$route.meta.title
    });
  }
};
</script>
<style scoped>
@import "./cnavbar.css";
</style>