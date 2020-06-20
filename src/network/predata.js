//导入request
import {
    mylin
} from './request'
//import qs from "qs";
//手机号验证
export function user(i) {
    return mylin({
        method: 'post',
        url: '/api/yg/yg_ck',
        data: i
    })
}