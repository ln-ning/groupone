//导入request
import {
    mylin
} from './request'
//import qs from "qs";
//员工列表
export function admin(qqq) {
    return mylin({
        // method: 'post',
        url: '/api/yg/yg?uid=' + qqq,
        //data: qqq
    })
}
//搜索员工
export function seaadmin(www) {
    return mylin({
        method: 'post',
        url: '/api/yg/yg',
        data: www
    })
}