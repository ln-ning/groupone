//导入request
import {
    mylin
} from './request'
//import qs from "qs";
//获取所有的考勤记录
export function allkq(qqq) {
    return mylin({
        method: 'post',
        url: '/api/kq/kq',
        data: qqq
    })
}
//获取个人考勤记录
export function grkq(uid) {
    return mylin({
        method: 'post',
        url: '/api/kq/gr_kq',
        data: uid
    })
}