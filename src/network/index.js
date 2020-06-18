//导入request
import {
    mylin
} from './request'
//import qs from "qs";
//手机号验证
export function cindex(i) {
    return mylin({
        method: 'post',
        url: '/api/index/index',
        data: i
    })
}