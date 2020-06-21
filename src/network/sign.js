//导入request
import {
    mylin
} from './request'
//import qs from "qs";
//签到
export function qian(i) {
    return mylin({
        method: 'post',
        url: '/api/kq/dk',
        data: i
    })
}