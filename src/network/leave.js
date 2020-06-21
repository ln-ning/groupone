//导入request
import {
    mylin
} from './request'
//import qs from "qs";
//请假列表
export function leavelist(i) {
    return mylin({
        // method: 'post',
        url: '/api/qj/qj?uid=' + i,
        // data: i
    })
}
//请假
export function leaves(i) {
    return mylin({
        method: 'post',
        url: '/api/qj/add',
        data: i
    })
}
//修改请假
export function editleave(i) {
    return mylin({
        method: 'post',
        url: '/api/qj/add',
        data: i
    })
}