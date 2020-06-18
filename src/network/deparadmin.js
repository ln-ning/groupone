//导入request
import {
    mylin
} from './request'
//import qs from "qs";
//获取部门/职位
export function deparadmin(qqq) {
    return mylin({
        // method: 'post',
        url: '/api/bm/index',
        data: qqq
    })
}
//修改部门/职位
export function addadmins(www) {
    return mylin({
        method: 'post',
        url: '/api/bm/add',
        data: www
    })
}