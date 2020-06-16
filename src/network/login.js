//导入request
import { mylin } from './request'
//import qs from "qs";
//手机号验证
export function nums(nums) {
    return mylin({
        method: 'post',
        url: '/api/login/check',
        data: nums
    })
}
//注册验证
export function zhuce(regis) {
    return mylin({
        method: 'post',
        url: '/api/login/register',
        data: regis
    })
}
//登录验证
export function logins(login) {
    return mylin({
        method: 'post',
        url: '/api/login/login',
        data: login
    })
}