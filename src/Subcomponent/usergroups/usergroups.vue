
<template>
  <div>
    <div class="userGroup-bg">
      <div class="grid-content bg-purple">
        <el-button type="primary" @click="userGroupShow" style="margin-top:20px;">
          <i class="el-icon-plus"></i>
        </el-button>
      </div>

      <!-- 表格 -->

      <div class="grid-content bg-purple-dark">
        <el-table :data="tableData" border style="width:100%;margin-top:10px;">
          <el-table-column prop="id" label="id" width="200px" align="center"></el-table-column>
          <el-table-column prop="group" label="用户组名" width="200px" align="center"></el-table-column>
          <el-table-column prop="qx" label="权限"  align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" width="180px" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                class="table-edit"
                size="mini"
                @click="userGroupEdit(scope.$index, tableData)"
              >
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                class="table-del"
                type="primary"
                size="mini"
                @click.native.prevent="delUserGroupRow(scope.$index, tableData)"
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 弹框 -->
        <el-dialog class="allTable" title="添加用户组" :visible.sync="dialogVisible" width="40%">
          <!-- 用户组名 -->
          <div class="usergroup-input">
            <p>
              用户组名
              <span>
                <el-input v-model="userinput" placeholder="请输入用户组名"></el-input>
              </span>
            </p>
          </div>

          <!-- 选择权限 -->
          <div class="usergroup-tree">
            <p>用户权限</p>
            <el-tree
              class="qx-tree"
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
            ></el-tree>
          </div>

          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @row-click="dialogVisible = false">添 加</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
 

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          id: "1",
          group: "销售经理",
          qx: "63,43,40,13,39,12,10,51,65,42,18,41,17,69,68,67,66,11",
          operation: ""
        },
        {
          id: "1",
          group: "销售经理",
          qx: "63,43,40,13,39,12,10,51,65,42,18,41,17,69,68,67,66,11",
          operation: ""
        }
      ],
      dialogVisible: false,
      userinput: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    userGroupEdit(i, e) {
      //console.log(111);
      //console.log(e[i]);
      this.$layer.msg("不要点了，不会写");
    },
    delUserGroupRow(index, rows) {
      rows.splice(index, 1);
    },
    userGroupShow() {
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import "./usergroups.less";
</style>