//导入request
import { mylin } from './request'
//import qs from "qs";
//员工列表
export function admin(qqq) {
    return mylin({
        method: 'post',
        url: '/api/yg/yg',
        data: qqq
    })
}