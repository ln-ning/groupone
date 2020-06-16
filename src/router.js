import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
import index from './views/index/index.vue'
import hello from './Subcomponent/hello/hello.vue'
import usersinfo from './Subcomponent/usersinfo/usersinfo.vue'
//考勤的4个版块
import leave from './Subcomponent/attend/leave/leave.vue'
import proval from './Subcomponent/attend/proval/proval.vue'
import allattend from './Subcomponent/attend/allattend/allattend.vue'
import preattend from './Subcomponent/attend/preattend/preattend.vue'
//单独版块
import deparadmin from './Subcomponent/deparadmin/deparadmin.vue'
import staffadmin from './Subcomponent/staffadmin/staffadmin.vue'
import predata from './Subcomponent/predata/predata.vue'
import users from './Subcomponent/users/users.vue'
import seaspool from './Subcomponent/seaspool/seaspool.vue'
import busipool from './Subcomponent/busipool/busipool.vue'
import empolentry from './Subcomponent/empolentry/empolentry.vue'
import usergroups from './Subcomponent/usergroups/usergroups.vue'
import changepwd from './Subcomponent/changepwd/changepwd.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            meta: {
                title: '登录'
            },
            component: login
        },
        {
            path: '/',
            name: 'index',
            meta: {
                title: 'index'
            },
            component: index,
            children: [{
                    path: '/',
                    name: 'hello',
                    meta: {
                        title: '欢迎'
                    },
                    component: hello
                }, {
                    path: '/usersinfo',
                    name: 'usersinfo',
                    meta: {
                        title: '用户信息审核'
                    },
                    component: usersinfo
                },
                //考勤版块
                {
                    path: '/leave',
                    name: 'leave',
                    meta: {
                        title: '请假'
                    },
                    component: leave
                }, {
                    path: '/proval',
                    name: 'proval',
                    meta: {
                        title: '审核'
                    },
                    component: proval
                }, {
                    path: '/allattend',
                    name: 'allattend',
                    meta: {
                        title: '考勤记录'
                    },
                    component: allattend
                }, {
                    path: '/preattend',
                    name: 'preattend',
                    meta: {
                        title: '个人考勤'
                    },
                    component: preattend
                },
                //单独版块
                {
                    path: '/deparadmin',
                    name: 'deparadmin',
                    meta: {
                        title: '部门管理'
                    },
                    component: deparadmin
                }, {
                    path: '/staffadmin',
                    name: 'staffadmin',
                    meta: {
                        title: '员工管理'
                    },
                    component: staffadmin
                }, {
                    path: '/predata',
                    name: 'predata',
                    meta: {
                        title: '个人资料'
                    },
                    component: predata
                }, {
                    path: '/users',
                    name: 'users',
                    meta: {
                        title: '用户信息'
                    },
                    component: users
                }, {
                    path: '/seaspool',
                    name: 'seaspool',
                    meta: {
                        title: '公海池'
                    },
                    component: seaspool
                }, {
                    path: '/busipool',
                    name: 'busipool',
                    meta: {
                        title: '业务池'
                    },
                    component: busipool
                },

                {
                    path: '/empolentry',
                    name: 'empolentry',
                    meta: {
                        title: '员工录入'
                    },
                    component: empolentry
                }, {
                    path: '/usergroups',
                    name: 'usergroups',
                    meta: {
                        title: '用户组'
                    },
                    component: usergroups
                }, {
                    path: '/changepwd',
                    name: 'changepwd',
                    meta: {
                        title: '修改密码'
                    },
                    component: changepwd
                },



            ]
        }

    ]
})