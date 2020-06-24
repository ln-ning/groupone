<template>
  <div class="big">
    <div class="bgColor">
      <header>设置我的资料</header>
      <el-form :model="{ruleForm}" ref="editFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="图片">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.g_zp" :src="ruleForm.g_zp" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input style="width: 26.8%;" v-model="ruleForm.g_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input style="width: 26.8%;" v-model="ruleForm.g_xb"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input style="width: 26.8%;" v-model="ruleForm.g_nl"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input style="width: 26.8%;" v-model="ruleForm.g_sfz"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input style="width: 26.8%;" v-model="ruleForm.g_mz"></el-input>
        </el-form-item>
        <!-- <el-form-item label="学历" prop="education">
          <el-select v-model="ruleForm.education" placeholder="——请选择——">
            <el-option label="——请选择——" value></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="专科" value="专科"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生" value="研究生"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="所属部门" prop="department">
          <el-input style="width: 26.8%;" v-model="ruleForm.bm"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="post">
          <el-input style="width: 26.8%;" v-model="ruleForm.zw"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="cellphone">
          <el-input style="width: 26.8%;" v-model="ruleForm.g_sjh" placeholder="请输入电话"></el-input>
        </el-form-item>
        <!-- <el-form-item label="地址" prop="address">
          <el-input style="width: 26.8%;" v-model="ruleForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>-->
      </el-form>
    </div>
    <el-row>
      <el-button size="mini" @click="submitForm">修改</el-button>
      <el-button size="mini">取消</el-button>
    </el-row>
  </div>
</template>

<script>
  import {
    user,
    edituser
  } from "../../network/predata";
  export default {
    components: {},
    props: {},
    data() {
      return {
        ruleForm: []
      };
    },
    created() {
      let params = {
        id: this.$store.state.uid
      };
      user(params).then(res => {
        // console.log(res.data.data);
        this.ruleForm = res.data.data;
      });

    },
    methods: {
      // 提交
      submitForm() {
        let params = {
          id: this.$store.state.uid,
          g_name: this.ruleForm.g_name,
          g_xb: this.ruleForm.g_xb,
          g_nl: this.ruleForm.g_nl,
          g_sjh: this.ruleForm.g_sjh,
          g_zp: this.ruleForm.g_zp,
          g_dz: this.ruleForm.g_dz,
          g_mz: this.ruleForm.g_mz,
          g_sfz: this.ruleForm.g_sfz,
          g_bmid: this.ruleForm.g_bmid,
          g_zwid: this.ruleForm.g_zwid,
          g_xl: this.ruleForm.g_xl
        };
        edituser(params).then(res => {
          console.log(res.data);
          this.$layer.msg("修改成功");
        })
        //console.log(params);
        // edituser(params).then(res => {
        //   console.log(res);
        // });

        // console.log(this.ruleForm);
        //  this.$layer.msg("由于技术问题，暂时无法修改");

      },
      // 图片上传
      handleAvatarSuccess(res, file) {
        this.ruleForm.g_zp = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      }
    }
  };
</script>
<style scoped>
  @import "./predata.css";
</style>