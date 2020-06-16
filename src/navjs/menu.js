let menu = {};

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
menu.hello = {
    name: 'hello',
    path: '/',
    icon: 'fa fa-tachometer',
};

/**
 * 用户信息审核
 * @type {{name: string, path: string, icon: string}}
 */
menu.usersinfo = {
    name: '用户信息审核',
    path: '/usersinfo',
    icon: 'fa fa-tachometer',
};
/**
 * 考勤管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.attend = {
    name: '考勤管理',
    icon: 'fa fa-th',
    children: {}
};
let kq = menu.attend.children;

kq.leave = {
    name: 'leave',
    path: '/leave',
};
kq.proval = {
    name: 'proval',
    path: '/proval',
};
kq.allattend = {
    name: 'allattend',
    path: '/allattend',
};
kq.preattend = {
    name: 'preattend',
    path: '/preattend',
};
/**
 * 部门管理
 * @type {{name: string, path: string, icon: string}}
 */
menu.deparadmin = {
    name: '部门管理',
    path: '/deparadmin',
    icon: 'fa fa-tachometer',
};
/**
 * 员工管理
 * @type {{name: string, path: string, icon: string}}
 */
menu.staffadmin = {
    name: '员工管理',
    path: '/staffadmin',
    icon: 'fa fa-tachometer',
};
/**
 * 个人资料
 * @type {{name: string, path: string, icon: string}}
 */
menu.predata = {
    name: '个人资料',
    path: '/predata',
    icon: 'fa fa-tachometer',
};
/**
 * 用户信息
 * @type {{name: string, path: string, icon: string}}
 */
menu.users = {
    name: '用户信息',
    path: '/users',
    icon: 'fa fa-tachometer',
};
/**
 * 公海池
 * @type {{name: string, path: string, icon: string}}
 */
menu.seaspool = {
    name: '公海池',
    path: '/seaspool',
    icon: 'fa fa-tachometer',
};
/**
 * 业务池
 * @type {{name: string, path: string, icon: string}}
 */
menu.busipool = {
    name: '业务池',
    path: '/busipool',
    icon: 'fa fa-tachometer',
};
/**
 * 员工录入
 * @type {{name: string, path: string, icon: string}}
 */
menu.empolentry = {
    name: '员工录入',
    path: '/empolentry',
    icon: 'fa fa-tachometer',
};
/**
 * 用户组
 * @type {{name: string, path: string, icon: string}}
 */
menu.usergroups = {
    name: '用户组',
    path: '/usergroups',
    icon: 'fa fa-tachometer',
};
/**
 * 修改密码
 * @type {{name: string, path: string, icon: string}}
 */
menu.changepwd = {
    name: '修改密码',
    path: '/changepwd',
    icon: 'fa fa-tachometer',
};