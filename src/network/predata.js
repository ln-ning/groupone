//导入request
import {
    mylin
} from './request'
//import qs from "qs";
//用户信息
export function user(i) {
    return mylin({
        method: 'post',
        url: '/api/yg/yg_ck',
        data: i
    })
}
//修改信息
export function edituser(i) {
    return mylin({
        method: 'post',
        url: '/api/yg/add',
        data: i
    })
}