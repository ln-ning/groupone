//导入request
import {
    mylin
} from './request'
//import qs from "qs";
//获取部门/职位
export function attend(qqq) {
    return mylin({
        method: 'post',
        url: '/api/kq/kq',
        data: qqq
    })
}